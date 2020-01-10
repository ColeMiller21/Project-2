//require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var session = require("express-session");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Cron
var cron = require('node-cron');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Running the new quiz grab and score reset every 24h at midnight
cron.schedule('0 0 * * *', () => {
  // This is where the functions to do the actions described above wil be placed
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);
require("./routes/loginRoutes")(app);


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
