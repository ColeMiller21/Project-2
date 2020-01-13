var db = require("../models");

module.exports = function (app) {

    // This is for a user logging in 
    app.post("/user/auth", function (req, res) {
        console.log(req)
        var email = req.body.email;
        var password = req.body.password;

        // Checking if the request sent contained non null variables
        if (email && password) {
            // Checking to see if the user has sent credentials that are currently in the db
            db.Users.findAll({
                where: {
                    email: email,
                    password: password
                }
            }).then(function (data) {
                console.log(data);
                // If the data returned has returned more than one entry than the user is considered logged in
                if (data.length > 0) {
                    console.log("success");
                    req.session.loggedin = true;
                    req.session.username = data[0].dataValues.username;
                    req.session.email = email;
                    return res.status(200).json({ response: "The user has been logged in." });
                } else {
                    console.log("no");
                    // If the data returned has nothing than a status code of 400 is sent to signify a failure
                    return res.status(401).json({ response: "This user does not exist.  Please make sure the credentials are correct." });
                }
            });

        } else {
            return res.status(401).json({ response: "This user does not exist.  Please make sure the credentials are correct." });
        }
    });

    // This is for a user signing up for the first time
    app.post("/user/signup", function (req, res) {
        console.log(req.body);
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        console.log(req.body)
        if (email && password && username) {
            // Checking if the email is already used for an account
            db.Users.findAll({
                where: {
                    email: email,
                }
            }).then(function (data) {
                // Checking if the response from the query returned anything
                // If something is returned then the response is ended
                if (data.length > 0) {
                    return res.status(401).json({ response: "This email is already in use." });
                } else {
                    // If no user was returned with from the previous query
                    // Then a new user is created with the credentials from the user
                    db.Users.create({
                        username: username, email: email, password: password
                    }).catch(function (err) {
                        // If an error occurs for any reason than the connection is terminated
                        if (err) {
                            return res.status(500).json({ response: "An error has occurred." });
                        }
                    }).then(function () {
                        // A status code of 200 is sent to signify a success
                        return res.status(200).json({ response: "This user has been created." });
                    })
                }
            });
        }
    });
};