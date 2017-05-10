$(document).ready(function(){

	var gigArray  = [
		        {
		            title  : "Test Gig1",
		            start  : '2017-05-25T13:30:00',
		            description: 'sgsegs',
		            duration: '4',
		            location: 'Houston, TX',
		            allDay : false // will make the time show
		        },

		        {
		            title  : "Test Gig2",
		            start  : '2017-06-07T12:30:00',
		            description: 'segse',
		            duration: '3',
		            location: 'HEB (1000 E 41st St)',
		            allDay : false // will make the time show
		        },

		        {
		            title  : "Test Gig2",
		            start  : '2017-06-07T20:30:00',
		            description: 'segse',
		            duration: '2',
		            location: 'Sprouts',
		            allDay : false // will make the time show
		        }
		    ]

	//need function for reading out date nicely and time

	var jobs = $("#jobs");

	//if there are no gigs scheduled
	if (gigArray.length < 0) {
		jobs.append('<div class = "notification is-warning">Your gig employer has not scheduled any gigs!</div>');
	}

	else {

	// if there are any gigs, we will loop through them and append as we go
	// Need to convert from military time to standard time as loop
	for (var i = 0; i < gigArray.length; i++) {
		var gigId = i + 1;
		var standardHour;
		var militaryHour = gigArray[i].start[11] + gigArray[i].start[12];
		var noon;

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

		jobs.append('<div class = "notification is-primary">'
		+ gigId + ". "
		+ gigArray[i].title + " || "
		+ gigArray[i].location + " || "
		+ gigArray[i].start[5] + gigArray[i].start[6] + " / "
		+ gigArray[i].start[8] + gigArray[i].start[9] + " / "
		+ gigArray[i].start[0] + gigArray[i].start[1] + gigArray[i].start[2] + gigArray[i].start[3]
		+ " || " + standardHour + ":"
		+ gigArray[i].start[14] + gigArray[i].start[15] + noon + " || "
		+ "This gig is approximately " + gigArray[i].duration + " hours long."
		+ '</div><br>');
	}
}

});