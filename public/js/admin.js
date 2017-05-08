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

	$("#createGig").on("click", function(event){

		event.preventDefault();

		var gigName = $("#gigName").val().trim();
		var gigLocation = $("#gigLocation").val().trim();
		var gigYear = $("#datepicker").val()[6] + $("#datepicker").val()[7] + $("#datepicker").val()[8] + $("#datepicker").val()[9];
		var gigMonth = $("#datepicker").val()[0] + $("#datepicker").val()[1];
		var gigDay = $("#datepicker").val()[3] + $("#datepicker").val()[4];
		var gigStart = $("#startTime");
		var gigEnd = $("#endTime");
		var gigText = $("#gigText").val().trim();

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

		if (gigStart.val()[1] === ":") {
			if (gigStart.val()[4] === "a") {
				startString += '0';
				startString += gigStart.val()[0];
				fillOutStartTime();
			}
			else if (gigStart.val()[4] === "p") {
				if (gigStart.val()[0] === "1") {
					startString += '13';
					fillOutStartTime();
				}
				else if (gigStart.val()[0] === "2") {
					startString += '14';
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
					startString += '00';
					fillOutStartTimeLong();
					//i.e midnight
				}
				else if (gigStart.val()[0] === "1" && gigStart.val()[1] === "1") {
					startString += '11';
					fillOutStartTimeLong();
					//i.e. 11am
				}
				else if (gigStart.val()[0] === "1" && gigStart.val()[1] === "0") {
					startString += '10';
					fillOutStartTimeLong();
					//i.e. 10am
				}
			}
			else if (gigStart.val()[5] === "p") {
				if (gigStart.val()[1] === "0") {
					startString += '22';
					fillOutStartTimeLong();
						//i.e. 10pm
				}
				else if (gigStart.val()[1] === "1") {
					startString += '23';
					fillOutStartTimeLong();
					console.log("hi")
					//i.e. 11pm
				}
				else if (gigStart.val()[1] === "2") {
					startString += '12';
					fillOutStartTimeLong();
					//i.e. 12pm
					}
				}
			}
		console.log(startString);

		var endString = '';
		endString += gigYear;
		endString += '-';
		endString += gigMonth;
		endString += '-';
		endString += gigDay;
		endString += 'T';

		// if ($("#endTime").val()[1] === ":") {
		// 	startString += '0';
		// 	startString += $("#startTime").val()[0];
		// 	startString += ':';
		// 	startString += $("#startTime").val()[2];
		// 	startString += $("#startTime").val()[3];
		// 	startString += ':00';
		// }
		// else {
		// 	startString += $("#startTime").val()[0];
		// 	startString += $("#startTime").val()[1];
		// 	startString += ':';
		// 	startString += $("#startTime").val()[3];
		// 	startString += $("#startTime").val()[4];
		// 	startString += ':00';
		// }


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