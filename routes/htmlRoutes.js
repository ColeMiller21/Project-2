var db = require("../models");


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    console.log(req.session.loggedin);
    res.render("index");

  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    if (req.session.loggedin) {

    } else {
      res.render("index");
    }

  });
  // blitzhandlebars
  app.get("/blitz/:id", function (req, res) {

  });
  // dailyhandlebars
  app.get("/daily/", function (req, res) {
    res.render("daily");
  });
  // weeklyhandlebars
  app.get("/weekly/:id", function (req, res) {

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

