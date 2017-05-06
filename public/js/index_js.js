$(document).ready(function(){

	$("#createAdmin").on("click", function(event){

		event.preventDefault();

		var newName = $("#newAdminName").val().trim();
		var newEmail = $("#newAdminEmail").val().trim();
		var newPhone = $("#newAdminPhone").val().trim();
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
	    });

	});

	$("#loginAdmin").on("click", function(event){

		event.preventDefault();

		var loginEmail = $("#adminLoginEmail").val().trim();
		var loginPassword = $("#adminLoginPassword").val().trim();

		var loginAdmin = {
			email: loginEmail,
			password: loginPassword
		}

		console.log(loginAdmin);

		$.ajax({
	        method: "POST",
	        url: "/api/admins",
	        data: loginAdmin
	    })
	    .done(function() {
	        window.location.href = "/admin";
	    });

	});

	$("#submitKey").on("click", function(event){

		event.preventDefault();

		var key = $("#keyValue").val().trim();

		console.log(key);

		$.ajax({
	        method: "GET",
	        url: "/api/events/:"+key,
	        data: key
	    })
	    .done(function(data) {
	        console.log("yay");
	        console.log(data);
	    });

	})

});