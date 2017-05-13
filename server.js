var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
// var accountSid = 'AC46bd7703d82e06f7b182c310775accc5';
// var authToken = '186724f2393bb53c134bc974b483d1b2';
// var client = require('twilio')(accountSid, authToken);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));

// Routes =============================================================

require("./routes/html-routes.js")(app);
require("./routes/admins-api-routes.js")(app);
require("./routes/events-api-routes.js")(app);
require("./routes/jobs-api-routes.js")(app);
require("./routes/notify-admin-routes.js")(app);
require("./routes/workers-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
