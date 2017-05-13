var accountSid = 'AC46bd7703d82e06f7b182c310775accc5';
var authToken = '186724f2393bb53c134bc974b483d1b2';
var client = require('twilio')(accountSid, authToken);

module.exports = function(app){

	app.post("/notify/admin", function(req, res) {

      client.messages.create({
       to: "+16502917670",
       from: "+16506515374",
       body: "Hi there, " + req.body.name + " would like to work a gig! Their number is " + req.body.phone + " and their email is " + req.body.email + ".",
       mediaUrl: "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-5.jpg",
       }, function(err, message){
         console.log(message);
      });
      
    });

};