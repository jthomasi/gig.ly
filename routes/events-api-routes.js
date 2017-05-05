var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for creating a new job
  app.post("/api/jobs", function(req, res) {
    db.Job.create(req.body).then(function(dbJob) {
      res.json(dbJob);
    });
  });




  // Get route for retrieving a single event

 // NOT REALLY CONFIDENT ON THE JOINS BETWEEN EVENT AND ADMIN HERE
 // NEEDS TESTED
  app.get("/api/events/:id", function(req, res) {
    
    db.Event.findOne({
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
  


  // DELETE route for deleting an event
  app.delete("/api/jobs/:id", function(req, res) {
    db.Event.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });  



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



}

