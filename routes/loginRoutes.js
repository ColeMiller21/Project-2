var db = require("../models");

module.exports = function (app) {

    app.post("/user/auth", function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

        //checking if the request sent contained non null variables
        if (email && password) {
            //checking to see if the user has sent credentials that are currently in the db
            db.Users.findAll({
                where: {
                    email: email,
                    password: password
                }
            }).then(function (data) {
                // console.log(data);
                //if the data returned has returned more than one entry than the user is considered logged in
                if (data.length > 0) {
                    req.session.loggedin = true;
                    req.session.username = email;
                    console.log("hs");
                    return res.status(200).end();
                } else {
                    //if the data returned has nothing than a status code of 400 is sent to signify a failure
                    console.log("hf");
                    return res.status(400).end();
                }
            });

        } else {
            return res.send("Please enter a username/password").status(400).end();
        }
    });

    app.post("/user/signup", function (req, res) {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        if (email && password && username) {
            //checking if the email is already used for an account
            db.Users.findAll({
                where: {
                    email: email,
                }
            }).then(function (data) {
                //checking if the response from the query returned anything
                //if something is returned then the response is ended
                if (data.length > 0) {
                    res.status(400).end();
                } else {
                    //if no user was returned with from the previous query
                    //then a new user is created with the credentials from the user
                    db.Users.create({
                        username: username, email: email, password: password
                    }).catch(function (err) {
                        //if an error occurs for any reason than the connection is terminated
                        if (err) {
                            res.status(400).end();
                        }
                    }).then(function () {
                        //a status code of 200 is sent to signify a success
                        res.status(200).end();
                    })
                }
            });


        }
    });

};


