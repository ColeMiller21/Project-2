var db = require("../models");
var axios = require("axios")
module.exports = function (app) {

  // Get all examples
  app.get("/api/examples", function (req, res) {


  });

  // Create a new example
  app.post("/api/examples", function (req, res) {

  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {

  });




};

for (var i = 1; i < 11; i++) {
  axios.get("http://jservice.io/api/category?&id=" + i + "&count=10")
    .then(function (response) {
      console.log(response.data)

    })
}