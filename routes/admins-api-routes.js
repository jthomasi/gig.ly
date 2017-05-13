var db = require("../models");
// var accountSid = 'AC46bd7703d82e06f7b182c310775accc5';
// var authToken = '186724f2393bb53c134bc974b483d1b2';
// var client = require('twilio')(accountSid, authToken);


// Routes
// =============================================================
module.exports = function(app) {


  // POST route for adding a new admin
  app.post("/api/admin", function(req, res) {
  	console.log(req.body);
    db.Admin.create(req.body).then(function(dbAdmin) {
      res.json(dbAdmin);
      console.log("admin route "+dbAdmin);
    });
  });	

  app.get("/api/admin/", function(req, res) {
    db.Admin.findAll({
      //join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });

  app.get("/api/admin/:id", function(req, res) {
    db.Admin.findOne({
      where: {
        id: req.params.id
      }
    	//join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });

  app.get("/api/admin/login/:email", function(req, res) {
    db.Admin.findOne({
    	where: {
          email: req.params.email
        }
    	//join to include the admin who created the event
      // include: [db.Admin],
    }).then(function(dbAdmin) {
      console.log("Route: "+dbAdmin);
      res.json(dbAdmin);
    });
  });

  // app.post("/admin/notify/", function(req, res) {
        
  //     client.messages.create({
  //      to: "+16502917670",
  //      from: "+16506515374",
  //      body: "Hi there, ",
  //      mediaUrl: "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-5.jpg",
  //      }, function(err, message){
  //        console.log(message);
  //     });
      
  //   });


 // + workerName + " would like to work your gig: " + gigArray[gigNumber].title + ". Their number is " + workerNumber + " and their email is " + workerEmail + "."
};
