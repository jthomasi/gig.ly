
$(document).ready(function(){

	// var gigArray  = [
	// 	        {
	// 	            title  : "Test Gig1",
	// 	            start  : '2017-05-25T13:30:00',
	// 	            description: 'Test gig in HTWON. GET YOUR SCREWSTON ON',
	// 	            duration: '4',
	// 	            location: 'Houston, TX',
	// 	            gigTaken: false,
	// 	            allDay : false // will make the time show
	// 	        },

	// 	        {
	// 	            title  : "Tasting",
	// 	            start  : '2017-06-07T12:30:00',
	// 	            description: 'This tasting will be located at the HEB near UT Campus. Brand Ambassador is expected to work for 3 hours, not including the time it takes to set up and tear down demo equipment',
	// 	            duration: '3',
	// 	            location: 'HEB (1000 E 41st St)',
	// 	            gigTaken: true,
	// 	            allDay : false // will make the time show
	// 	        },

	// 	        {
	// 	            title  : "Demo",
	// 	            start  : '2017-06-07T20:30:00',
	// 	            description: 'Demo at Sprouts. Call 713-151-1616 for more info.',
	// 	            duration: '2',
	// 	            location: 'Sprouts',
	// 	            gigTaken: false,
	// 	            allDay : false // will make the time show
	// 	        }
	// 	    ]
	var gigArray = [];
	var url = window.location.href;
	var array = url.split('/');
	console.log("urlArray");
	console.log(array);
	var id = array[4];

	$.ajax({
	    method: "GET",
	    url: "/api/adminEvents/" + id,
	}).done(function(data) {
		console.log("get data from events api");
		console.log(data);
			for(var i=0; i< data.length; i++) {

				var singleEvent = {
					eventId: data[i].id,
					title: data[i].name,
					start: data[i].start,
					description: data[i].details,
					location: data[i].location,
					gigTaken: data[i].gigTaken,
					duration: data[i].duration
				};
				console.log(singleEvent);
				gigArray.push(singleEvent);
				console.log("gig array");
				console.log(gigArray);
			}
	    

	var jobs = $("#jobs");

	$(".closeGig").click(function(){
		$("#gigIt").fadeToggle("fast", "linear");
	});

	$(".closeInfo").click(function(){
		$("#gigInfo").fadeToggle("fast", "linear");
	});

	$(".button-home").click(function(){
		window.location.href = "/";
	});

	function gigAvailability () {

	//if there are no gigs scheduled
	if (gigArray.length < 1) {
		jobs.append('<div class = "notification is-fullwidth">This user has not scheduled any gigs :( </div>');
	}

	else {
		jobs.empty();

	// if there are any gigs, we will loop through them and append as we go
	// Need to convert from military time to standard time as loop
	for (var i = 0; i < gigArray.length; i++) {

		var gigId = gigArray[i].eventId;
		console.log(i + " gigId " + gigId);
		var standardHour;
		var militaryHour = gigArray[i].start[11] + gigArray[i].start[12];
		var noon;
		var displayStyle;

		if (militaryHour >= 12)
			noon = "p";
		else if (militaryHour < 12)
			noon = "a";

		if (parseInt(militaryHour) > 12)
			standardHour = parseInt(militaryHour) - 12
		else if (militaryHour === "12") 
			standardHour = "12";
		else if (militaryHour === "11")
			standardHour = "11";
		else if (militaryHour === "10")
			standardHour = "10";
		else if (militaryHour === "00")
			standardHour = "12";
		else
			standardHour = gigArray[i].start[12];

		console.log(standardHour);

		//append all data from gigArray onto html page
		if (gigArray[i].gigTaken === true) {
			displayStyle = '<div class = "notification is-info">' + (i+1) + ". "
			+ gigArray[i].title + " || "
			+ gigArray[i].location + "<br>"
			+ gigArray[i].start[5] + gigArray[i].start[6] + " / "
			+ gigArray[i].start[8] + gigArray[i].start[9] + " / "
			+ gigArray[i].start[0] + gigArray[i].start[1] + gigArray[i].start[2] + gigArray[i].start[3]
			+ " || " + standardHour + ":"
			+ gigArray[i].start[14] + gigArray[i].start[15] + noon + "<br>"
			+ "This gig is approximately " + gigArray[i].duration + " hours long. <br>"
			+ '<a class="button is-danger">Gig Taken!</a>  <a class="button is-info gigInfo" data-index = "' + i +'">Info</a>'
			+ '</div><br>';
		}
		else {
			displayStyle = '<div class = "notification is-primary">' + (i+1) + ". "
			+ gigArray[i].title + " || "
			+ gigArray[i].location + "<br>"
			+ gigArray[i].start[5] + gigArray[i].start[6] + " / "
			+ gigArray[i].start[8] + gigArray[i].start[9] + " / "
			+ gigArray[i].start[0] + gigArray[i].start[1] + gigArray[i].start[2] + gigArray[i].start[3]
			+ " || " + standardHour + ":"
			+ gigArray[i].start[14] + gigArray[i].start[15] + noon + "<br>"
			+ "This gig is approximately " + gigArray[i].duration + " hours long. <br>"
			+ '<a class="button is-light gigIt" data-index = "' + gigArray[i].eventId+'">Gig it!</a>  <a class="button is-info gigInfo" data-index = "' +i+'">Info</a>'
			+ '</div><br>';
		}
		jobs.append(displayStyle);
	}
	$('.gigIt').each(function(){
		$(this).on("click", function(event){
			event.preventDefault();
			$("#gigIt").fadeToggle("fast, linear");
			var gigNumber = $(this).data('index');
			$("#worker-gig").val(gigNumber);
			//gigArray[$(this).data('index')].gigTaken = false;
			//we change gigTaken to false, would need to happen to database for it to update correctly.
			//console.log(gigArray[$(this).data('index')].gigTaken);
			//setTimeout(function(){
				//gigAvailability();}, 500);
			//gigAvailability();



		})
	})

	$("#confirmGig").on("click", function(ev){
		ev.preventDefault();
		var gigNumber = $("#worker-gig").val();
		var workerName = $("#workerName").val().trim();
		var workerNumber = $("#workerNumber").val().trim();
		var workerEmail = $("#workerEmail").val().trim();
		//var gigTitle = gigArray[id].title;
		//var gigTitle = gigArray[gigNumber].title;
		
		//console.log("Title: "+gigTitle);

		//console.log(gigArray[gigNumber].title);
		// gigArray[gigNumber].gigTaken = false;

		var textObj = {
			name: workerName,
			phone: workerNumber,
			email: workerEmail
		};
		console.log(textObj);
		sendText(textObj);
		function sendText(obj){

			$.ajax({
		        method: "POST",
		        url: "/notify/admin",
		        data: textObj,
		        success: function(data) {
	                //show content
	                console.log("Success! "+data);
	            },
	            error: function(jqXHR, textStatus, err) {
	                //show error message
	                console.log('text status '+textStatus+', err '+err);
	            }
	        });
			
		};

		$.ajax({
		    method: "PUT",
		    url: "/api/adminEvents/" + gigNumber,
		}).done(function(data) {
			console.log(gigId + " gigId")
			window.location.href = "/worker/" + id;
		});
		$("#gigIt").fadeToggle("fast, linear");
	});

	$('.gigInfo').each(function(){
		$(this).on("click", function(event){
			event.preventDefault();
			$("#gigModalInfo").empty();
			var gigNum = $(this).data('index');
			var modalBody = $("#gigModalInfo");
			modalBody.append(gigArray[gigNum].description);
			$("#gigInfo").fadeToggle("fast, linear");

		});
	});
}

}

gigAvailability();

// $('.gigIt').each(function(){
// 	$(this).on("click", function(event){
// 		//event.preventDefault();
// 		// if ($(this).('#gigIt' + gigId))
// 		console.log("Gig " + $(this).data('index') + "!");
// 		gigArray[$(this).data('index')].gigTaken = false;
// 		gigAvailability();
// 	})
// })

// $('.gigInfo').each(function(){
// 	$(this).on("click", function(event){
// 		event.preventDefault();
// 		// if ($(this).('#gigIt' + gigId))
// 		console.log(gigArray[$(this).data('index')].description + "!");
// 	})
// })

//still need to append a dynamic button for accepting gigs
//2 buttons, one for showing description of event and other is for accepting
//should pop up a modal that twilio uses to send to ADMIN's phone number
});
});