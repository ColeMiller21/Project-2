var db = require("../models");
var questions = require("./questionGet");

var currentQuiz = {};
var userQuiz = {};

questions().then(function (results) {
  currentQuiz = results;
  userQuiz = currentQuiz;
  // Changing the user facing quiz to have all answers in the falseAnswers array for easier use
  for (var i = 0; i < userQuiz.length; i++) {
    userQuiz[i].falseAnswers.push(userQuiz[i].answer);
  }
});

module.exports = function (app) {

  // Get all examples
  app.get("/api/examples", function (req, res) {

  });

  // User score create...
  app.post("/api/user", function (req, res) {

  });

};

