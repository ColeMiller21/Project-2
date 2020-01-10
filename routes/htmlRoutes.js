var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {

  });
  // blitzhandlebars
  app.get("/blitz/:id", function (req, res) {

  });
  // dailyhandlebars
  app.get("/daily/:id", function (req, res) {

  });
  // weeklyhandlebars
  app.get("/weekly/:id", function (req, res) {

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

