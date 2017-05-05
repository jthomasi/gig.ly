var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  // cms route loads cms.html
  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "admin.html"));
  });

};