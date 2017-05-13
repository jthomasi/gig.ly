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

  app.post("/api/notifyAdmin", function(req, res) {

  	res.json(req.body);

  	var accountSid = 'AC46bd7703d82e06f7b182c310775accc5';
	var authToken = '186724f2393bb53c134bc974b483d1b2';
	var client = require('twilio')(accountSid, authToken);

	console.log("^^^^^^----------^^^^^^^^^------//////////--------^^^^^^^^^"+req.body);

	// client.messages.create({
	// 	to: "+16502917670",
	// 	from: "+16506515374",
	// 	body: "Hi there, " + workerName + " would like to work your gig: " + gigArray[gigNumber].title + ". Their number is " + workerNumber + " and their email is " + workerEmail + ".",
	// 	mediaUrl: "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-5.jpg",
	// 	}, function(err, message){
	// 		console.log(message);
	// });

  });

}