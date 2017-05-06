var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for adding a new admin
  app.post("/api/admins", function(req, res) {
  	console.log(req.body);
    db.Admin.create(req.body).then(function(dbAdmin) {
      res.json(dbAdmin);
      console.log("admin route "+dbAdmin);
    });
  });

}