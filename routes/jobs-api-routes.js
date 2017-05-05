var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new event
  app.post("/api/jobs", function(req, res) {
    db.Job.create(req.body).then(function(dbJob) {
      res.json(dbJob);
      console.log("event route "+dbJob);
    });
  });

}