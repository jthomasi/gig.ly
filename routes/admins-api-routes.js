var db = require("../models");
// npm package for generating UUID's
const uuidV4 = require('uuid/v4');

// Routes
// =============================================================
module.exports = function(app) {


  // POST route for adding a new admin
  app.post("/api/admin", function(req, res) {
    req.body["id"] = uuidV4();
    req.body["urlKey"] = uuidV4();
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
        urlKey: req.params.id
      }
    	//join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });

  app.get("/api/admin/worker/:id", function(req, res) {
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

  // app.get("/api/admin/:urlKey", function(req, res) {
  //   db.Admin.findOne({
  //     where: {
  //       urlKey: req.params.
  //     }
  //     //join to include the admin who created the event
  //     // include: [db.Admin],
  //   }).then(function(dbAdmin) {
  //     console.log("Route: "+dbAdmin);
  //     res.json(dbAdmin);
  //   });
  // });

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
