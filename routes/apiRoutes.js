var db = require("../models");
var questions = require("./questionGet");

var currentQuizDaily = {};
var userQuizDaily = {};

questions().then(function (results) {
  // console.log(JSON.stringify(results, null, 2));
  currentQuizDaily = results.currentQuiz;
  userQuizDaily = results.userQuiz;
});

allQuestions = results;

// Get all examples
app.get("/api/quiz", function (req, res) {
  res.json(userQuizDaily);
});

app.get("/api/examples", function (req, res) {
  res.json(allQuestions)
})
// User score create...
app.post("/api/user", function (req, res) {

});




};

