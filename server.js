// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

// When you require a folder, it will look for index.js
var db = require("./models");

// Sets up the Express app
// =============================================================
var app = express();
var PORT = process.env.PORT || 3434;



// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


// Override with POST having ?_method=DELETE
// =============================================================
app.use(methodOverride("_method"));

// Static directory
// =============================================================
app.use(express.static("./public"));



//commented handlebars and routes out to test models

// Set Handlebars
// =============================================================
// var exphbs = require("express-handlebars");

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");



// Import routes and give the server access to them.
// =============================================================
// var routes = require("./controllers/burgerController.js");

// app.use("/", routes);



// Syncing our sequelize models and then starting our express app
// =============================================================
db.sequelize.sync({ force: true }).then(function(){
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
})

