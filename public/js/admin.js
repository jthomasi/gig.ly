$(document).ready(function(){

	//initialize starting time for gig input box as a timepicker
	$('#startTime').timepicker({ 'scrollDefault': 'now' });
	//initialize end time for gig input box as a timepicker
	$('#endTime').timepicker({ 'scrollDefault': 'now' });
	//initialize full calendar to prepare to recieve event data
	$('#calendar').fullCalendar({
    	events: []
	});

	//example array that would be in a DB
	//will need to use either MySQL or
	//local storage to test
	var gigArray  = [
		        {
		            title  : "Test Gig",
		            start  : '2017-05-05T02:30:00',
		            end	: '2017-05-05T14:30:00',
		            allDay : false // will make the time show
		        }
		    ]

	$('#calendar').fullCalendar( 'addEventSource', gigArray );	

	$(".gigButt").click(function(){
		$(".createGig").fadeToggle("fast", "linear");
	});	    

	$("#createGig").on("click", function(event ) {

		event.preventDefault();

		//captures all data from front end
		var gigName = $("#gigName").val().trim();
		var gigLocation = $("#gigLocation").val().trim();
		var gigYear = $("#datepicker").val()[6] + $("#datepicker").val()[7] + $("#datepicker").val()[8] + $("#datepicker").val()[9];
		var gigMonth = $("#datepicker").val()[0] + $("#datepicker").val()[1];
		var gigDay = $("#datepicker").val()[3] + $("#datepicker").val()[4];
		var gigStart = $("#startTime");
		var gigEnd = $("#endTime");
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
		console.log(startString);

		//now we do the same thing we end time input box

		var endString = '';
		endString += gigYear;
		endString += '-';
		endString += gigMonth;
		endString += '-';
		endString += gigDay;
		endString += 'T';

		var fillOutEndTime = function () {
			endString += ':';
			endString += gigEnd.val()[2];
			endString += gigEnd.val()[3];
			endString += ':00';
		}

		var fillOutEndTimeLong = function () {
			endString += ':';
			endString += gigEnd.val()[3];
			endString += gigEnd.val()[4];
			endString += ':00';
		}

		if (gigEnd.val()[1] === ":") {
			if (gigEnd.val()[4] === "a") {
				endString += '0';
				endString += gigEnd.val()[0];
				fillOutEndTime();
				//all times 1a-9a
			}
			else if (gigEnd.val()[4] === "p") {
				if (gigEnd.val()[0] === "1") {
					endString += '13'; //i.e. 1pm
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "2") {
					endString += '14'; //i.e. 2pm etc.
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "3") {
					endString += '15';
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "4") {
					endString += '16';
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "5") {
					endString += '17';
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "6") {
					endString += '18';
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "7") {
					endString += '19';
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "8") {
					endString += '20';
					fillOutEndTime();
				}
				else if (gigEnd.val()[0] === "9") {
					endString += '21';
					fillOutEndTime();
				}
			}
		}
		if (gigEnd.val()[2] === ":") {
			if (gigEnd.val()[5] === "a") {
				if (gigEnd.val()[0] === "1" && gigEnd.val()[1] === "2") {
					endString += '00'; //i.e midnight
					fillOutEndTimeLong();
				}
				else if (gigEnd.val()[0] === "1" && gigEnd.val()[1] === "1") {
					endString += '11';  //i.e. 11am
					fillOutEndTimeLong();
				}
				else if (gigEnd.val()[0] === "1" && gigEnd.val()[1] === "0") {
					endString += '10';  //i.e. 10am
					fillOutEndTimeLong();
				}
			}
			else if (gigEnd.val()[5] === "p") {
				if (gigEnd.val()[1] === "0") {
					endString += '22'; //i.e. 10pm
					fillOutEndTimeLong();
				}
				else if (gigEnd.val()[1] === "1") {
					endString += '23';  //i.e. 11pm
					fillOutEndTimeLong();
				}
				else if (gigEnd.val()[1] === "2") {
					endString += '12';  //i.e. 12pm
					fillOutEndTimeLong();
				}
			}
		}
		console.log(endString);

		var newGig = {
			title: gigName,
			start: startString,
			end: endString,
			allDay: false
		}

		var newGigInfo = {
			location: gigLocation,
			text: gigText
		}

		gigArray.push(newGig);

		$('#calendar').fullCalendar( 'removeEventSources' );
		//remove event sources because we we are pushing one object
		//to an array and we will reload entire array of objects to
		//calendar. W/o removing we will have duplicate events

		$('#calendar').fullCalendar( 'addEventSource', gigArray );

		console.log(newGig);
		console.log(newGigInfo);

	});

	$(document).on("click", ".fc-event-container", function() {

		$("#eventModal").fadeToggle("fast", "linear");

		var event = $(this);

		displayGig(event);

		//console.log(title[this].innerHTML);
		//console.log(title[0].innerHTML);
		//console.log(time[0].innerHTML);
	});

	function displayGig(event){

		$("#eventModalInfo").empty();

		var modalBody = $("#eventModalInfo");
		var gig = $("<ul>");
		var listItemName = $("<li>");

		var name = event[0].innerText;

		listItemName.text(name);

		gig.append(listItemName);

		modalBody.append(gig);

	};
	
});