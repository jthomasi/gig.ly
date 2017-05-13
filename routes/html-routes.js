var db = require("../models");
var path = require("path");

//Routes
// =============================================================
module.exports = function(app) {


	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});

  // cms route loads cms.html
	app.get("/admin", function(req, res) {
		res.sendFile(path.join(__dirname, "../public/admin.html"));
	});

	// app.get("/admin/:id", function(req, res) {
	// 	console.log(req.params.id);
	// 	res.sendFile(path.join(__dirname, "../public/admin.html"));
	// });


  	app.get("/admin/:id", function(req, res) {
    	db.Event.findAll({
    	//join to include the admin who created the event
      	// include: [db.Admin],
        	where: {
          		AdminId: req.params.id
        	}
    	}).then(function(dbEvent) {
			res.sendFile(path.join(__dirname, "../public/admin.html"));
    	});
  	});


  	app.get("/worker/:id", function(req, res) {
    	db.Event.findAll({
    	//join to include the admin who created the event
      	// include: [db.Admin],
        	where: {
          		AdminId: req.params.id
        	}
    	}).then(function(dbEvent) {
			res.sendFile(path.join(__dirname, "../public/worker.html"));
    	});
  	});

  
};