var db = require("../models");

module.exports = function (app) {

  // Get all examples
  app.get("/api/examples", function (req, res) {


  });

  // Create a new example
  app.post("/api/examples", function (req, res) {

  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {

  });

};

<<<<<<< HEAD
=======

// This is a test
var something = require("./questionGet");
something().then(function (results) {
  console.log("Test");
  console.log(results);
  console.log(results.length);
  console.log("End Test");
});

>>>>>>> c3a5e4cd5bf389664e4a966f54ca111c70fc60bd
