$(document).ready(function(){

	var gigArray  = [
		        {
		            title  : "Test Gig1",
		            start  : '2017-05-25T13:30:00',
		            description: 'sgsegs',
		            duration: '4',
		            location: 'Houston, TX',
		            gigTaken: false,
		            allDay : false // will make the time show
		        },

		        {
		            title  : "Tasting",
		            start  : '2017-06-07T12:30:00',
		            description: 'segse',
		            duration: '3',
		            location: 'HEB (1000 E 41st St)',
		            gigTaken: true,
		            allDay : false // will make the time show
		        },

		        {
		            title  : "Demo",
		            start  : '2017-06-07T20:30:00',
		            description: 'segse',
		            duration: '2',
		            location: 'Sprouts',
		            gigTaken: false,
		            allDay : false // will make the time show
		        }
		    ]

	var jobs = $("#jobs");

	//if there are no gigs scheduled
	if (gigArray.length < 1) {
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
			displayStyle = '<div class = "notification is-warning">' + gigId + ". "
			+ gigArray[i].title + " || "
			+ gigArray[i].location + "<br>"
			+ gigArray[i].start[5] + gigArray[i].start[6] + " / "
			+ gigArray[i].start[8] + gigArray[i].start[9] + " / "
			+ gigArray[i].start[0] + gigArray[i].start[1] + gigArray[i].start[2] + gigArray[i].start[3]
			+ " || " + standardHour + ":"
			+ gigArray[i].start[14] + gigArray[i].start[15] + noon + "<br>"
			+ "This gig is approximately " + gigArray[i].duration + " hours long. <br>"
			+ '<a class="button is-danger">Gig Taken!</a>  <a class="button is-info">Info</a>'
			+ '</div><br>';
		}
		else {
			displayStyle = '<div class = "notification is-primary">' + gigId + ". "
			+ gigArray[i].title + " || "
			+ gigArray[i].location + "<br>"
			+ gigArray[i].start[5] + gigArray[i].start[6] + " / "
			+ gigArray[i].start[8] + gigArray[i].start[9] + " / "
			+ gigArray[i].start[0] + gigArray[i].start[1] + gigArray[i].start[2] + gigArray[i].start[3]
			+ " || " + standardHour + ":"
			+ gigArray[i].start[14] + gigArray[i].start[15] + noon + "<br>"
			+ "This gig is approximately " + gigArray[i].duration + " hours long. <br>"
			+ '<a class="button is-light gigIt" data-index = "'+gigId+'">Gig it!</a>  <a class="button is-info">Info</a>'
			+ '</div><br>';
		}
		jobs.append(displayStyle);

	}
}

$('.gigIt').each(function(){
	$(this).on("click", function(event){
		// if ($(this).('#gigIt' + gigId))
		console.log("Gig " + $(this).data('index') + "!");
	})
})

	// $('#gigIt' + gigId).on("click", function(event){
	// 	event.preventDefault();
	// 	console.log("Gig " + gigId + "!");
	// })

// for (var i = 0; i < gigArray.length; i++){

// 	$('#gigIt' + gigId).on("click", function(event){
// 		event.preventDefault();
// 		console.log("Gig " + this.gigId + "!");
// 	})
// }

// $("#gigIt3").on("click", function(event){
// 	event.preventDefault();
// 	console.log("Gig 3!")
// })

//still need to append a dynamic button for accepting gigs
//2 buttons, one for showing description of event and other is for accepting
//should pop up a modal that twilio uses to send to ADMIN's phone number

});