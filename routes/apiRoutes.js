
var db = require("../models");


var triviaQuestions = require("../public/js/app.js")
module.exports = function (app) {

  // Get all examples
  app.get("/api/examples", function (req, res) {

  });

  // Create a new example
  app.post("/api/user", function (req, res) {
    console.log(req.body)

    db.Users.Create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password

    }).then(function (data) {
      res.json(data);
    })

  });



  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {

  });


};