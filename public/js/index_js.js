$(document).ready(function(){

	$(".create-admin").click(function(){
		$(".createAdmin").fadeToggle("fast", "linear");
	});

		$(".login-admin").click(function(){
		$(".loginAdmin").fadeToggle("fast", "linear");
	});

	$("#createAdmin").on("click", function(event){

		event.preventDefault();

		var newName = $("#newAdminName").val().trim();
		var newEmail = $("#newAdminEmail").val().trim();
		var newPassword = $("#newAdminPassword").val().trim();

		var newAdmin = {
			name: newName,
			email: newEmail,
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

		var accessKey = {
			key: key
		};

		var url = window.location.href;
		console.log(accessKey);

		$.ajax({
	        method: "POST",
	        url: "/api/admins",
	        data: accessKey
	    })
	    .done(function() {
	        console.log("yay");
	    });

	})

});