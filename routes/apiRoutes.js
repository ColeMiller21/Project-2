var db = require("../models");
var questions = require("./questionGet");
var cron = require('node-cron');

var currentQuizDaily = {};
var userQuizDaily = {};

// Helper functions

function gettingQuestions() {
  questions().then(function (results) {
    // console.log(JSON.stringify(results, null, 2));
    currentQuizDaily = results.currentQuiz;
    userQuizDaily = results.userQuiz;
    console.log("something");
  });
}

// Running the function initially
gettingQuestions();
// Running the new quiz grab and score reset every 24h at midnight
cron.schedule('0 0 * * *', () => {
  gettingQuestions();
  // Resetting peoples daily scores
  db.Users.update({ daily: 0 }).then(function (data) {
    console.log(data);
  });
});

// Function that accepts a function and a bool to see if the user is logged in
function checkLogInReject(res, req, cb) {
  if (req.session.loggedin) {
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
    checkLogInReject(res, req, function () {
      res.json(userQuizDaily);
    });
  });

  // Submit a score
  app.post("/api/submit", function (req, res) {
    console.log(req.body);
    checkLogInReject(res, req, function () {
      db.Users.findAll({
        where: {
          email: req.session.email,
        }
      }).catch(function (err) {
        // console.log(err);
      }).then(function (data) {

        if (!data) {
          return res.status(401).json({ success: false, response: "An error occured with the information given." });
        }
        var userDaily = parseInt(data[0].dataValues.daily);
        var weekly = parseInt(data[0].dataValues.weekly) + parseInt(req.body.score);
        //GOOD A user with the submitted credentials is present
        if (data.length > 0 && userDaily === 0 && req.body.score > 0) {
          db.Users.update({ daily: req.body.score, weekly: weekly },
            {
              where: {
                email: req.session.email
              }
            }).catch(function (err) {
              // If any database error occured then the connection is terminated
              return res.status(500).json({ success: false, response: "An error has occured." });
            }).then(function (data) {
              // This is for a success
              return res.status(200).json({ success: true, response: "The score has been submitted." });
            });
        } else {
          // If the user is not found in the database
          return res.status(401).json({ success: false, response: "An error occured with the information given." });
        }
      });
    });
  });

  // Getting the top 10 daily scores
  app.get("/api/daily", function (req, res) {
    checkLogInReject(res, req, function () {
      top10Scores(res, "daily");
    });
  });

  // Getting the top 10 weekly scores
  app.get("/api/weekly", function (req, res) {
    checkLogInReject(res, req, function () {
      top10Scores(res, "weekly");
    });
  });

}



