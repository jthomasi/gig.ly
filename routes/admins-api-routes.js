var db = require("../models");


// Routes
// =============================================================
module.exports = function(app) {


  // POST route for adding a new admin
  app.post("/api/admin", function(req, res) {
  	console.log(req.body);
    db.Admin.create(req.body).then(function(dbAdmin) {
      res.json(dbAdmin);
      console.log("admin route "+dbAdmin);
    });
  });	

  app.get("/api/admin/", function(req, res) {
    db.Admin.findAll({
      //join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });

  app.get("/api/admin/:id", function(req, res) {
    db.Admin.findOne({
      where: {
        id: req.params.id
      }
    	//join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });



  app.get("/api/admin/login/:email", function(req, res) {
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
};

