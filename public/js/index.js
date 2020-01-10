//function to validate the email address
function validateEmailAddress(input) {
  var regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  if (regex.test(input)) {
    return 1;
  } else {
    return -1;
  }
};

$("#signup-button").on("click", function () {
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
  } else {
    console.log("error with signup")
  }

  console.log(newUser)

  //sending new user to loginRoutes
  $.ajax("user/signup", {
    type: "POST",
    data: newUser
  }).then(function () {
    console.log("User Created")

  })
});

$("#login-button").on("click", function () {
  var email = $("#login-email");
  var password = $("#login-password");

  //creating an object for the login to check if it is a valid login
  if (password.length >= 6 && validateEmailAddress(email) === 1) {
    var loginUser = {
      email: email.val().trim(),
      password: password.val().trim()
    };
  } else {
    console.log("error with login")
  };
  console.log(loginUser)

  //sending loginUser to loginRoutes
  $.ajax("user/auth", {
    type: "POST",
    data: loginUser
  }).then(function () {
    console.log("User Logged In")

  })
});











