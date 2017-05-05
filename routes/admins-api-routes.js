var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new admin
  app.post("/api/posts", function(req, res) {
    db.Admin.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

}