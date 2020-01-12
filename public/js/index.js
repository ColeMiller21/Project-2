//function to validate the email address
function validateEmailAddress(input) {
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
};

$("#signup-button").on("click", function (event) {
  event.preventDefault();
  var username = $("#username-input").val();
  var email = $("#email-input").val();
  var password = $("#password-input").val();


  //checking to make sure that password is at least 6 in length, there is a username, and there is an email and creating new user object
  if (password.length >= 6 && username.length > 0 && validateEmailAddress(email) === 1) {
    var newUser = {
      username: username,
      email: email,
      password: password
    }
    console.log("sign up successfull")
    //sending the user back to index screen
    window.location.href = "/";
    $("#signup-button").attr("href", "../views/index")
  } else {
    console.log("error with signup");
    $("#loginerror").css({ "display": "block" });
  }

  console.log(newUser)

  // sending new user to loginRoutes
  $.ajax("/user/signup", {
    type: "POST",
    data: newUser
  }).then(function (data) {
    console.log("User Created")


  })
});

$("#login-button").on("click", function (event) {
  event.preventDefault();
  console.log("clicked")
  var email = $("#login-email").val().trim();
  var password = $("#login-password").val().trim();

  //creating an object for the login to check if it is a valid login
  if (password.length >= 6 && validateEmailAddress(email) === 1) {
    var loginUser = {
      email: email,
      password: password
    };
    console.log("Log in successful");
    //sending user to home after log in successful
    window.location.href = "/home";
  } else {
    console.log("error with login");
  };
  console.log(loginUser)

  //sending loginUser to loginRoutes
  $.ajax("/user/auth", {
    type: "POST",
    data: loginUser
  }).then(function () {
    console.log("User Logged In")

  })
});











