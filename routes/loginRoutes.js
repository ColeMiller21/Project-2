var db = require("../models");

module.exports = function (app) {

    // This is for a user logging in 
    app.post("/user/auth", function (req, res) {
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
                    req.session.loggedin = true;
                    req.session.username = data[0].dataValues.username;
                    req.session.email = email;
                    return res.status(200).end();
                } else {
                    // If the data returned has nothing than a status code of 400 is sent to signify a failure
                    return res.status(401).end();
                }
            });

        } else {
            return res.status(401).end();
        }
    });

    // This is for a user signing up for the first time
    app.post("/user/signup", function (req, res) {
        console.log(req.body);
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

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
                    res.status(401).end();
                } else {
                    // If no user was returned with from the previous query
                    // Then a new user is created with the credentials from the user
                    db.Users.create({
                        username: username, email: email, password: password
                    }).catch(function (err) {
                        // If an error occurs for any reason than the connection is terminated
                        if (err) {
                            res.status(401).end();
                        }
                    }).then(function () {
                        // A status code of 200 is sent to signify a success
                        res.status(200).end();
                    })
                }
            });


        }
    });

};





    // // This is for the user logging in
    // app.post("/user/auth", function (req, res) {

    //     var email = req.body.email;
    //     var password = req.body.password;

    //     db.Users.findAll({
    //         where: {
    //             email: email,
    //             password: password
    //         }
    //     }).then(function (data) {
    //         console.log(data);
    //         // Saving the returned user from the query in a var for easier use
    //         var user = data[0].dataValues;
    //         // GOOD A user with the given crendentials exists
    //         if (data.length > 0) {

    //             var token = jwt.sign({ id: user.id, email: user.email },
    //                 // this needs to be replaced with an env
    //                 'keyboard cat 4 ever',
    //                 { expiresIn: 129600 });

    //             return res.status(200)
    //                 .json({
    //                     success: true,
    //                     err: null,
    //                     token
    //                 });

    //         }
    //         // BAD A user does not exist
    //         else {
    //             return res.status(401)
    //                 .json({
    //                     success: false,
    //                     token: null, err:
    //                         "Username or password is incorrect."
    //                 });
    //         }
    //     }).catch(function (err) {
    //         return res.status(401).send("The given credentials are incorrect.");
    //     });
    // });


    // // This is for a user signing up for the first time
    // app.post("/user/signup", function (req, res) {
    //     var username = req.body.username;
    //     var email = req.body.email;
    //     var password = req.body.password;

    //     // Checking to see if all the required data is present
    //     if (email && password && username) {
    //         // Querying the DB to check if a user with the given credentials already exists
    //         db.Users.findAll({
    //             where: {
    //                 email: email,
    //             }
    //         }).then(function (data) {
    //             // This is checking to see if the query returned a user with the credentials given
    //             if (data.length > 0) {
    //                 res.status(401).send("The given email is already registered to an account.");
    //             } else {
    //                 // If no user is returned then a user with the given credentials is made
    //                 db.Users.create({
    //                     username: username, email: email, password: password
    //                 }).catch(function (err) {
    //                     // If any error occurs the connection is terminated
    //                     if (err) {
    //                         res.status(500).send("Error creating account.");
    //                     }
    //                 }).then(function () {
    //                     // If the user is successfully created than a success code is sent
    //                     res.status(200).send("An account has been created.");
    //                 })
    //             }
    //         });


    //     }
    // });