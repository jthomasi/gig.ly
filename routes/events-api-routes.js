var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new event
  app.post("/api/events", function(req, res) {
    db.Event.create(req.body).then(function(dbEvent) {
      res.json(dbEvent);
      console.log("event route "+dbEvent);
    });
  });

}