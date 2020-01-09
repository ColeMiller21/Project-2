
var triviaQuestions = [];

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }


  return array;
}


var questionIds = [];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loopQuestions() {

  for (var i = 1; i < 11; i++) {
    getQuestion(getRandomInt(1, 300))
  }

}

loopQuestions();

function getQuestion(id) {

  $.ajax({
    url: "http://jservice.io/api/category?&id=" + id,
    method: "GET"
  }).then(function (data) {
    // console.log(data.clues[0].question)
    var answer = data.clues[0].answer
    var question = data.clues[0].question
    console.log(data)
    // console.log(question)
    // console.log(answer)
    falseQuestions = [];
    //loop through all answers and push to falseQuestions
    for (var i = 0; i < data.clues.length; i++) {

      allAnswers = data.clues[i].answer;
      falseQuestions.push(allAnswers)
    }
    // filter the answer out of the array
    var filteredFalse = falseQuestions.filter(function (e) {
      return e !== answer
    });
    // shuffle the remaining answers to get a random 3 at the beginning
    var shuffleFalse = shuffle(filteredFalse);
    // slice the array to only grab the first 3 answers
    var falseAnswers = shuffleFalse.slice(0, 3)
    // if the answer is in the array reshuffle array to get a new 3 answers
    if (falseAnswers.includes(answer)) {
      shuffleFalse = shuffle(filteredFalse);
      return shuffleFalse.slice(0, 3)
    }

    // create object with question, answer and false answers
    var triviaObj = {
      question: question,
      answer: answer,
      falseAnswers: falseAnswers
    };
    // push 10 trivia objects into triviaquestions array
    triviaQuestions.push(triviaObj)
    console.log(triviaQuestions)

  })
}






// sumbit button on sign up page
$("#signup-submit").on("click", function () {
  var username = $("#username-input");
  var email = $("email-input");
  var password = $("#password-input");

  var newUser = {
    username: username.val().trim(),
    email: email.val().trim(),
    password: password.val().trim()
  }


  $.ajax("api/user", {
    type: "POST",
    data: newUser
  }).then(function () {
    console.log("User Created")

  })
})









