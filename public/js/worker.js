$(document).ready(function(){

	var gigArray = [];
	var url = window.location.href;
	var array = url.split('/');
	var id = array[4];
	var gigNumber;

	$.ajax({
	    method: "GET",
	    url: "/api/adminEvents/" + id,
	}).done(function(data) {
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
			gigArray.push(singleEvent);
		};
	    
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
			var gigNum = $(this).data('index');
			$("#worker-gig").val(gigNum);
			gigNumber = gigNum;
		});
	});

	$("#confirmGig").on("click", function(ev){
		ev.preventDefault();
		getNumber(id);

		function getNumber(id) {
			$.ajax({
		        method: "GET",
		        url: "/api/admin/worker/"+id,
		        success: function(data) {
	                //build obj
	                var gigNumber = $("#worker-gig").val();
					var workerName = $("#workerName").val().trim();
					var workerNumber = $("#workerNumber").val().trim();
					var workerEmail = $("#workerEmail").val().trim();
	                var textObj = {
						aphone: data.cellphone,
						name: workerName,
						wphone: workerNumber,
						email: workerEmail
					};
					sendText(textObj);
	            },
	            error: function(jqXHR, textStatus, err) {
	                //show error message
	                console.log('text status '+textStatus+', err '+err);

	            }
		    });
		}

		function sendText(obj){
			$.ajax({
		        method: "POST",
		        url: "/notify/admin",
		        data: obj
		    }).done(function(data) {
		    	console.log(data);
                confirmEvent();
	        });
		};

		function confirmEvent(){
			$.ajax({
			    method: "PUT",
			    url: "/api/adminEvents/" + gigNumber,
			}).done(function(data) {
				window.location.href = "/worker/" + id;
			});
			$("#gigIt").fadeToggle("fast, linear");
		};
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

});
});