$(document).ready(function(){

	$('#startTime').timepicker({ 'scrollDefault': 'now' });

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
		            //end	: '2017-05-09T14:30:00',
		            allDay : false // will make the time show
		        }
		    ]

	$('#calendar').fullCalendar( 'addEventSource', gigArray );		    

	$("#createGig").on("click", function(event){

		event.preventDefault();

		var gigName = $("#gigName").val().trim();
		var gigLocation = $("#gigLocation").val().trim();
		var gigYear = $("#datepicker").val()[6] + $("#datepicker").val()[7] + $("#datepicker").val()[8] + $("#datepicker").val()[9];
		var gigMonth = $("#datepicker").val()[0] + $("#datepicker").val()[1];
		var gigDay = $("#datepicker").val()[3] + $("#datepicker").val()[4];
		var gigHourStart = $("#startTime").val();
		var gigMinuteStart = $("#gigMinuteStart").val();
		var gigSecondStart = $("#gigSecondStart").val();
		// var gigHourEnd = 
		// var gigMinuteEnd =
		// var gigSecondEnd =
		//var TESTgigHours = $("#gigHours").val().trim();
		var gigText = $("#gigText").val().trim();

		//so i.e. 
		var startString = '';
		startString += gigYear;
		startString += '-';
		startString += gigMonth;
		startString += '-';
		startString += gigDay;
		startString += 'T';
		startString += gigHourStart;
		startString += ':';
		startString += gigMinuteStart;
		startString += ':00';
		console.log(startString);
		console.log(gigHourStart);
		//gigYearStart + "-" + gigMonthStart + "-" gigDayStart + "T" + gigHourStart + ":" + gigMinuteStart + ":" + gigSecondStart;


		var newGig = {
			title: gigName,
			//location: gigLocation,
			start: startString,
			//hours: gigHours,
			//text: gigText
			allDay: false
		}

		gigArray.push(newGig);

		$('#calendar').fullCalendar( 'removeEventSources' );
		//remove event sources because we we are pushing one object
		//to an array and we will reload entire array of objects to
		//calendar. W/o removing we will have duplicate events

		$('#calendar').fullCalendar( 'addEventSource', gigArray );

		console.log(newGig);

	});

});