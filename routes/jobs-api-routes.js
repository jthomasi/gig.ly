var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new admin
  app.post("/api/jobs", function(req, res) {
    db.Job.create(req.body).then(function(dbJobs) {
      res.json(dbJobs);
      console.log("jobs route "+dbJobs);
    });
  });



  // Get route for retrieving a single job
 // NOT REALLY CONFIDENT ON THE JOINS BETWEEN EVENT AND JOBS HERE
 // NEEDS TESTED

  app.get("/api/jobs/:id", function(req, res) {
    
    db.Job.findOne({
    	//join to include the event that has the job
      include: [db.Event],
        where: {
          id: req.params.id
        }
    }).then(function(dbJob) {
      console.log(dbJob);
      res.json(dbJob);
    });
  });


  // DELETE route for deleting a job
  app.delete("/api/jobs/:id", function(req, res) {
    db.Job.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbJob) {
      res.json(dbJob);
    });
  });


  // GET route for getting all of the jobs
  app.get("/api/jobs", function(req, res) {
    var query = {};
    if (req.query.event_id) {
      query.EventId = req.query.event_id;
    }
    
    db.Job.findAll({
      include: [db.Event],
      where: query
    }).then(function(dbEvent) {
      res.json(dbEvent);
    });
  });




  // PUT route for updating a job
  app.put("/api/jobs", function(req, res) {
    db.Job.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbJob) {
        res.json(dbJob);
      });
  });
}