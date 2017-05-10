$(document).ready(function(){

	var gigArray  = [
		        {
		            title  : "Test Gig1",
		            start  : '2017-05-05T02:30:00',
		            end	: '2017-05-05T14:30:00',
		            allDay : false // will make the time show
		        },

		        {
		            title  : "Test Gig2",
		            start  : '2017-05-05T02:30:00',
		            end	: '2017-05-05T14:30:00',
		            allDay : false // will make the time show
		        }
		    ]

	//need function for reading out date nicely and time

	var jobs = $("#jobs");

	for (var i = 0; i < gigArray.length; i++){
		jobs.append('<div class = "notification is-primary">' + gigArray[i].title + "|" gigArray[i].start + '</div><br>');
	}

})