$(document).ready(function(){

	var url = window.location.href;
	var array = url.split('/');
	var urlKey = array[4];
	var gigArray = [];
	var gigInfo = [];
	getAdmin(urlKey);

	function getAdmin(urlKey) {

		$.ajax({
		    method: "GET",
		    url: "/api/admin/" + urlKey,
		}).done(function(data) {
			$("#adminKey").text("Admin Key: "+data.id);
			runStart(data.id);
		});	

	}

	function runStart(id) {

		//initialize starting time for gig input box as a timepicker
		$('#startTime').timepicker({ 'scrollDefault': 'now' });
		//initialize end time for gig input box as a timepicker
		$('#endTime').timepicker({ 'scrollDefault': 'now' });
		//initialize full calendar to prepare to recieve event data
		$('#calendar').fullCalendar({
	    	events: [],
	    	eventRender: function(event, element) {
	            element.qtip({
	                content: event.description + '<br />' + event.start,
	                style: {
	                    background: 'black',
	                    color: '#FFFFFF'
	                },
	                position: {
	                    corner: {
	                        target: 'center',
	                        tooltip: 'bottomMiddle'
	                    }
	                }
	            });
	        }
		});

		$.ajax({
		    method: "GET",
		    url: "/api/adminEvents/" + id,
		}).done(function(data) {
			for(var i=0; i< data.length; i++) {
				var eventTitle = data[i].name;
				var eventStart = data[i].start;
				var eventTaken;
				if (data[i].gigTaken == 0) {
					eventTaken = "No";
				}
				else {
					eventTaken = "Yes";
				}
				var eventDescription = "Gig Taken: "+ eventTaken;
				var singleEvent = {
					title: eventTitle,
					start: eventStart,
					description: eventDescription
				};
				var singleGigInfo = {
					title: eventTitle,
					location: data[i].location,
					duration: data[i].duration,
					description: data[i].details,
					gigTaken: eventTaken
				}
				gigArray.push(singleEvent);
				gigInfo.push(singleGigInfo)
			}
	        // gigArray = data;
	        $('#calendar').fullCalendar( 'addEventSource', gigArray );	
	    });

	    $("#logoutBtn").click(function(){
			window.location.href = "/";
		});	

		$(".gigButt").click(function(){
			$(".createGig").fadeToggle("fast", "linear");
		});

		$(".closeGig").click(function(){
			$("#eventModal").fadeToggle("fast", "linear");
		});  

		$("#createGig").on("click", function(event) {
			$(".createGig").fadeToggle("fast", "linear");
			event.preventDefault();

			//captures all data from front end
			var gigName = $("#gigName").val().trim();
			var gigLocation = $("#gigLocation").val().trim();
			var gigYear = $("#datepicker").val()[6] + $("#datepicker").val()[7] + $("#datepicker").val()[8] + $("#datepicker").val()[9];
			var gigMonth = $("#datepicker").val()[0] + $("#datepicker").val()[1];
			var gigDay = $("#datepicker").val()[3] + $("#datepicker").val()[4];
			var gigStart = $("#startTime");
			var gigDuration = $("#duration").val().trim();
			var gigText = $("#gigText").val().trim();

			//starts building string so fullcalendar can read our inputed gig time
			var startString = '';
			startString += gigYear;
			startString += '-';
			startString += gigMonth;
			startString += '-';
			startString += gigDay;
			startString += 'T';

			var fillOutStartTime = function () {
				startString += ':';
				startString += gigStart.val()[2];
				startString += gigStart.val()[3];
				startString += ':00';
			}

			var fillOutStartTimeLong = function () {
				startString += ':';
				startString += gigStart.val()[3];
				startString += gigStart.val()[4];
				startString += ':00';
			}

			//reads military time so we will need to convert from standard
			//have to detect where ":" is so we know where to pull data from
			if (gigStart.val()[1] === ":") {
				if (gigStart.val()[4] === "a") {
					startString += '0';
					startString += gigStart.val()[0];
					fillOutStartTime();
					//all times 1a-9a
				}
				else if (gigStart.val()[4] === "p") {
					if (gigStart.val()[0] === "1") {
						startString += '13'; //i.e. 1pm
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "2") {
						startString += '14'; //i.e. 2pm etc.
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "3") {
						startString += '15';
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "4") {
						startString += '16';
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "5") {
						startString += '17';
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "6") {
						startString += '18';
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "7") {
						startString += '19';
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "8") {
						startString += '20';
						fillOutStartTime();
					}
					else if (gigStart.val()[0] === "9") {
						startString += '21';
						fillOutStartTime();
					}
				}
			}
			if (gigStart.val()[2] === ":") {
				if (gigStart.val()[5] === "a") {
					if (gigStart.val()[0] === "1" && gigStart.val()[1] === "2") {
						startString += '00'; //i.e midnight
						fillOutStartTimeLong();
					}
					else if (gigStart.val()[0] === "1" && gigStart.val()[1] === "1") {
						startString += '11';  //i.e. 11am
						fillOutStartTimeLong();
					}
					else if (gigStart.val()[0] === "1" && gigStart.val()[1] === "0") {
						startString += '10';  //i.e. 10am
						fillOutStartTimeLong();
					}
				}
				else if (gigStart.val()[5] === "p") {
					if (gigStart.val()[1] === "0") {
						startString += '22'; //i.e. 10pm
						fillOutStartTimeLong();
					}
					else if (gigStart.val()[1] === "1") {
						startString += '23';  //i.e. 11pm
						fillOutStartTimeLong();
					}
					else if (gigStart.val()[1] === "2") {
						startString += '12';  //i.e. 12pm
						fillOutStartTimeLong();
					}
				}
			}

			// obj for mysql db
			var newSqlGig = {
				name: gigName,
				start: startString,
				duration: gigDuration,
				location: gigLocation,
				details: gigText,
				AdminId: id
			};

			$.ajax({
		        method: "POST",
		        url: "/api/events/:id",
		        data: newSqlGig
		    })
		    .done(function(data) {
		        console.log(data);
		        $("#gigName").val("");
		        $("#gigLocation").val("");
		        $("#datepicker").val("");
		        $("#startTime").val("");
		        $("#duration").val("");
		        $("#gigText").val("");
		        $('#calendar').fullCalendar( 'removeEventSources' );
		        window.location.href = "/admin/" + urlKey;
		    });

		});

		$(document).on("click", ".fc-event-container", function() {

			$("#eventModal").fadeToggle("fast", "linear");

			var eventTitle = $(this).find('.fc-title').text();

			for (var i=0;i<gigInfo.length;i++){
				if (eventTitle == gigInfo[i].title){
					var eventLocation = gigInfo[i].location;
					var eventDuration = gigInfo[i].duration;
					var eventDescription = gigInfo[i].description;
					var eventGigTaken = gigInfo[i].gigTaken;
				}
			}

			var eventTime = $(this).find('.fc-time').text();

			displayGig(eventTitle, eventTime, eventLocation, eventDuration, eventDescription, eventGigTaken);

		});

	}

	function displayGig(title, time, location, duration, description, gigTaken){

		$("#eventModalInfo").empty();

		var modalBody = $("#eventModalInfo");
		var gig = $("<ul>");
		var eventTitle = $("<li>");
		var eventTime = $("<li>");
		var eventLocation = $("<li>");
		var eventDuration = $("<li>");
		var eventDescription = $("<li>");
		var eventGigTaken = $("<li>");

		eventTitle.text("Gig Title: "+title);
		eventTime.text("When: "+time);
		eventLocation.text("Where: "+location);
		eventDuration.text("For: "+duration);
		eventDescription.text("Gig Description: "+description);
		eventGigTaken.text("Gig Taken: " + gigTaken);

		gig.append(eventTitle,eventTime,eventLocation,eventDuration,eventDescription,eventGigTaken);

		modalBody.append(gig);

	};

	$("#logoutBtn").click(function(){
		window.location.href = "/";
	});
	
});