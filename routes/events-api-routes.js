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

  app.get("/api/events/:id", function(req, res) {
    db.Event.findOne({
    	//join to include the admin who created the event
      // include: [db.Admin],
        where: {
          id: req.params.id
        }
    }).then(function(dbEvent) {
      console.log("Route: "+dbEvent);
      res.json(dbEvent);
    });
  });

}