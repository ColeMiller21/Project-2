var db = require("../models");
var questions = require("./questionGet");

var currentQuizDaily = {};
var userQuizDaily = {};

// Helper functions
questions().then(function (results) {
  // console.log(JSON.stringify(results, null, 2));
  currentQuizDaily = results.currentQuiz;
  userQuizDaily = results.userQuiz;
});

// Function that accepts a function and a bool to see if the user is logged in
function checkLogInReject(res, logged, cb) {
  if (1 === 1) {
    return cb();
  } else {
    res.status(401).json({ response: "The user is not logged in" });
  }
}

function top10Scores(res, col) {
  // Getting the top 10 scores in descending order and including both the score and username
  db.Users.findAll({
    limit: 10,
    order: [[col, 'DESC']],
    attributes: ['username', col]
  }).then(function (data) {
    var temp = []
    // Sorting out all of the useless data
    for (var i = 0; i < data.length; i++) {
      temp.push(data[i].dataValues);
    }
    // Sending the data to the user
    res.json(temp);
  });
}

// Routes
module.exports = function (app) {

  // Get all examples
  app.get("/api/quiz", function (req, res) {
    checkLogInReject(res, req.session.loggedin, function () {
      res.json(userQuizDaily);
    });
  });

  // Submit a score
  app.post("/api/submit", function (req, res) {
    checkLogInReject(res, req.session.loggedin, function () {
      db.Users.findAll({
        where: {
          email: req.session.email,
        }
      }).catch(function (err) {
        // console.log(err);
      }).then(function (data) {
        // console.log(data);
        var userDaily = data[0].dataValues.daily;
        var weekly = data[0].dataValues.weekly + req.body.score;
        //GOOD A user with the submitted credentials is present
        if (data.length > 0 && userDaily === 0 && req.body.score) {
          db.Users.update({ daily: req.body.score, weekly: weekly },
            {
              where: {
                email: req.session.email
              }
            }).catch(function (err) {
              // If any database error occured then the connection is terminated
              return res.status(500).json({ response: "An error has occured." });
            }).then(function (data) {
              // This is for a success
              return res.status(200).json({ response: "The score has been submitted." });
            });
        } else {
          // If the user is not found in the database
          return res.status(401).json({ response: "An error occured with the information given." });
        }
      });
    });
  });

  // Getting the top 10 daily scores
  app.get("/api/daily", function (req, res) {
    top10Scores(res, "daily");
  });

  // Getting the top 10 weekly scores
  app.get("/api/weekly", function (req, res) {
    top10Scores(res, "weekly");
  });

}



