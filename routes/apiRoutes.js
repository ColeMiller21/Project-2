var db = require("../models");


module.exports = function (app) {

  // Get all examples
  app.get("/api/examples", function (req, res) {

  });

  // User score create...
  app.post("/api/user", function (req, res) {

  });

};



var something = require("./questionGet");
something().then(function (results) {
  console.log("Test");
  console.log(results);
  console.log(results.length);
  console.log("End Test");
});
