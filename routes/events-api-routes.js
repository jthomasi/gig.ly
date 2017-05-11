var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


  app.get("/api/adminEvents/:admin", function(req, res) {
    console.log("req params admin" + req.params.admin)
    db.Event.findAll({
      where: {
        AdminId: req.params.admin
      }
      //join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbEvent) {
      console.log("Route: "+dbEvent);
      res.json(dbEvent);
    });
  });


 // NOT REALLY CONFIDENT ON THE JOINS BETWEEN EVENT AND ADMIN HERE
 // NEEDS TESTED
  app.get("/api/events/:id", function(req, res) {
    db.Event.findAll({
    	//join to include the admin who created the event
      include: [db.Admin],
        where: {
          id: req.params.id
        }
    }).then(function(dbEvent) {
      console.log(dbEvent);
      res.json(dbEvent);
    });
  });

  // POST route for creating a new event
  app.post("/api/events/:id", function(req, res) {
    console.log("create_event");
    console.log(req.body);
    db.Event.create(req.body).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });
  
  // // DELETE route for deleting an event
  // app.delete("/api/jobs/:id", function(req, res) {
  //   db.Event.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbEvent) {
  //     res.json(dbEvent);
  //   });
  // });  

  // PUT route for updating an event
  app.put("/api/events", function(req, res) {
    db.Job.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbEvent) {
        res.json(dbEvent);
      });
  });

  // app.get("/api/events/:id", function(req, res) {
  //   db.Event.findOne({
  //   	//join to include the admin who created the event
  //     // include: [db.Admin],
  //       where: {
  //         id: req.params.id
  //       }
  //   }).then(function(dbEvent) {
  //     console.log("Route: "+dbEvent);
  //     res.json(dbEvent);
  //   });
  // });

}