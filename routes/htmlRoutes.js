var db = require("../models");


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log(req.session.loggedin);
    res.render("index");

  });


  // blitzhandlebars

  app.get("/home", function (req, res) {
    res.render("home")
  })
  app.get("/blitz", function (req, res) {
    res.render("blitz")
  });
  // dailyhandlebars
  app.get("/daily", function (req, res) {
    res.render("daily");
  });
  // weeklyhandlebars
  app.get("/weekly", function (req, res) {
    res.render("weekly")
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

