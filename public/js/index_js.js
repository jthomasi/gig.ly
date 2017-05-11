$(document).ready(function(){

	$(".create-admin").click(function(){
		$(".createAdmin").fadeToggle("fast", "linear");
	});

	$(".login-admin").click(function(){
		$(".loginAdmin").fadeToggle("fast", "linear");
	});

	$(".access-key").click(function(){
		$("#workersKeyModal").fadeToggle("fast", "linear");
	});

	$("#createAdmin").on("click", function(event){

		event.preventDefault();

		var newName = $("#newAdminName").val().trim();
		var newEmail = $("#newAdminEmail").val().trim();
		var newPhone = $("#newAdminPhone").val().trim();
        newPhone = newPhone.replace(/\D+/g, "");
        console.log(newPhone);

		var newPassword = $("#newAdminPassword").val().trim();

		var newAdmin = {
			name: newName,
			email: newEmail,
			cellphone: newPhone,
			password: newPassword
		}

		console.log(newAdmin);

		$.ajax({
	        method: "POST",
	        url: "/api/admin",
	        data: newAdmin
	    })
	    .done(function(data) {
	        console.log(data);
	        $("#newAdminName").val("");
	        $("#newAdminEmail").val("");
	        $("#newAdminPhone").val("");
	        $("#newAdminPassword").val("");
	        window.location.href = "/admin/" + data.id;
	    });

	});

	$("#loginAdmin").on("click", function(event){

		event.preventDefault();
		$("#validationError").empty();
		var loginEmail = $("#adminLoginEmail").val();
		var loginPassword = $("#adminLoginPassword").val();

		var loginAdmin = {
			email: loginEmail,
			password: loginPassword
		}

		$.ajax({
	        method: "GET",
	        url: "/api/admin/login/" + loginEmail
	    })
	    .done(function(data) {
	    	validatePassword(data, loginPassword);
	    });

	});

	$("#submitWorkersKey").on("click", function(event){

		event.preventDefault();

		var key = $("#key").val();

		// null value check
		if (key == ""){
			//still toggling this modal, but not moving to ajax. Need to add warning about null values to be revealed in modal
			return;
		}
		else {
			key.trim();
			$.ajax({
		        method: "GET",
		        url: "/api/events/"+key,
		        data: key
		    })
		    .done(function(data) {
		        var modalBody = $(".eventInfo");
				var gig = $("<ul>");
				var eventTitle = $("<li>");
				var eventTime = $("<li>");
				var eventLocation = $("<li>");
				var creator = $("<li>");

				eventTitle.text(data[0].name);
				eventTime.text("When: "+data[0].event_date);
				eventLocation.text("Where: "+data[0].location);
				creator.text("Created By: "+data[0].Admin.name);

				gig.append(eventTitle,eventTime,eventLocation,creator);

				modalBody.append(gig);

		    });
		}
	});

	function validatePassword(data, loginPassword) {
		console.log(data);
		console.log(loginPassword);
    	if (data.password === loginPassword) {
    		
    		window.location.href = "/admin/" + data.id;
    	} else {
    		$("#validationError").append("<div>Invalid username or password</div>");
        	$("#adminLoginPassword").val("");
    	}
	}
});
