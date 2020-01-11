var db = require("../models");
var questions = require("./questionGet");

var currentQuizDaily = {};
var userQuizDaily = {};

questions().then(function (results) {
  // console.log(JSON.stringify(results, null, 2));
  currentQuizDaily = results.currentQuiz;
  userQuizDaily = results.userQuiz;
});

module.exports = function (app) {

  // Get all examples
  app.get("/api/quiz", function (req, res) {
    res.json(userQuizDaily);
  });

  // User score create...
  app.post("/api/user", function (req, res) {

  });

};

