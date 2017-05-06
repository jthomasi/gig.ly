var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new admin
  app.post("/api/admins", function(req, res) {
  	console.log(req.body);
    db.Admin.create(req.body).then(function(dbAdmin) {
      res.json(dbAdmin);
      console.log("admin route "+dbAdmin);
    });
  });



  app.get("/api/admins", function(req, res) {
    db.Admin.findAll({
    	//join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });



  app.get("/api/admins/:email", function(req, res) {
    db.Admin.findOne({
    	where: {
          email: req.params.email
        }
    	//join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });




}