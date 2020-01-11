var db = require("../models");
var something = require("./questionGet");

var allQuestions;

something().then(function (results) {

  allQuestions = results;

  // console.log(allQuestions)
  return allQuestions

});

module.exports = function (app) {


  app.get("/api/examples", function (req, res) {
    res.json(allQuestions)
  })
  // User score create...
  app.post("/api/user", function (req, res) {

  });




};





