var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new worker
  app.post("/api/workers", function(req, res) {
    db.Worker.create(req.body).then(function(dbWorkers) {
      res.json(dbWorkers);
      console.log("worker route "+dbWorkers);
    });
  });

}