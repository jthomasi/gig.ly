$(document).ready(function(){

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
	        url: "/api/admins",
	        data: newAdmin
	    })
	    .done(function(data) {
	        console.log(data);
	        $("#newAdminName").val("");
	        $("#newAdminEmail").val("");
	        $("#newAdminPhone").val("");
	        $("#newAdminPassword").val("");
	    });

	});

	$("#loginAdmin").on("click", function(event){

		event.preventDefault();
		$(".password-validation").empty();
		var loginEmail = $("#adminLoginEmail").val().trim();
		var loginPassword = $("#adminLoginPassword").val().trim();

		var loginAdmin = {
			email: loginEmail,
			password: loginPassword
		}

		$.ajax({
	        method: "GET",
	        url: "/api/admins/" + loginEmail,
	    })
	    .done(function(data) {
	    	validatePassword(data, loginPassword);
	    });

	});

	$("#submitKey").on("click", function(event){

		event.preventDefault();

		var key = $("#keyValue").val().trim();

		console.log(key);

		$.ajax({
	        method: "GET",
	        url: "/api/events/"+key,
	        data: key
	    })
	    .done(function(data) {
	        console.log("yay");
	        console.log(data);
	    });

	})



	function validatePassword(data, loginPassword) {
		console.log(data);
		console.log(loginPassword);
    	if (data.password === loginPassword) {
    		window.location.href = "/admin";
    	} else {
    		$(".password-validation").append("<div>Invalid username or password</div>");
        	$("#adminLoginPassword").val("");
    	}
	}
});