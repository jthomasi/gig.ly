$(document).ready(function(){

	$(".create-admin").click(function(){
		$(".createAdmin").fadeToggle("fast", "linear");
		$("#newAdminName").val("");
		$("#newAdminPhone").val("");
		$("#newAdminEmail").val("");
		$("#newAdminPassword").val("");
	});

	$(".login-admin").click(function(){
		$("#validationError").empty();
		$(".loginAdmin").fadeToggle("fast", "linear");
		$("#adminLoginPassword").val("");
		$("#adminLoginEmail").val("");
		$("#adminLoginPassword").removeClass("is-danger");
		$("#adminLoginEmail").removeClass("is-danger");
	});

	$("#submitKey,.cancel-key").click(function(){
		$("#workersKeyModal").fadeToggle("fast", "linear");
	});

	$("#createAdmin").on("click", function(event){
		event.preventDefault();
		$(".createAdmin").fadeToggle("fast", "linear");

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
	    	checkNull(loginEmail, loginPassword);
	    	validatePassword(data, loginEmail,loginPassword);
	    });

	});

	$("#submitWorkersKey").on("click", function(event){
		event.preventDefault();
		$(".eventInfo").empty();

		var key = $("#key").val();

		// null value check
		if (key == ""){
			var modalBody = $(".eventInfo");
			var alertMsg = $("<p>");
			alertMsg.text("Please enter a key.");
			modalBody.append(alertMsg);
			return;
		}
		else {
			window.location.href = "/worker/" + key;
		}

	});

	function checkNull(loginEmail, loginPassword) {
		if (loginEmail == "" || loginPassword == "") {
			$("#validationError").append("<div>Invalid username or password</div>");
			$("#adminLoginPassword").val("");
			$("#adminLoginPassword").addClass("is-danger");
			$("#adminLoginEmail").addClass("is-danger");
		}
	};

	function validatePassword(data, loginEmail, loginPassword) {	
	if (loginEmail !== "" && loginPassword !== "") {
		console.log(data);
		console.log(loginPassword);
    	if (data.password === loginPassword) {
    		
    		window.location.href = "/admin/" + data.id;
    	} else {
    		$("#validationError").append("<div>Invalid username or password</div>");
    		$("#adminLoginPassword").addClass("is-danger");
        	$("#adminLoginPassword").val("");
    	}
	}
}

});
