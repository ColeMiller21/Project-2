// // Global Vars
// var timeLeft = 11;
// var counter = 0;

// $.ajax({
//     url: "/api/quiz",
//     method: "GET"
// }).then(function (questionResults) {
//     //console.log(questionResults)

//     console.log(questionResults[0])

//     function next() {

//         var questionObj = questionResults[counter];

//         var currentQuestion = questionObj.question;
//         var currentAnswer = questionObj.answer;
//         var answers = questionObj.falseAnswers;

//         answers.push(currentAnswer)
//         console.log(answers)

//     }
//     next();
// });


// function startTime() {

//     var timer = $("#timer");
//     timer.text("10");

//     function timeIt() {
//         counter++;
//         timer.text(timeLeft - counter);

//         if (counter == timeLeft) {
//             console.log("out of time")
//             clearInterval();
//             displayFinished();
//         }
//     }
//     setInterval(timeIt, 1000)
// }




// var questions = [
//     {
//         question: "This is the question 1",
//         answer: "answer",
//         falseAnswers: ["answer", "false", "false", "false"],
//         score: 400
//     },
//     {
//         question: "This is question 2",
//         answer: "answer2",
//         falseAnswers: ["answer2", "false2", "false2", "false2"],
//         score: 500
//     },
//     {
//         question: "This is the question 3",
//         answer: "answer",
//         falseAnswers: ["answer", "false", "false", "false"],
//         score: 400
//     }];


// var correct = 0;
// var wrong = 0;
// var counter = 0;
// var currentQuestion = "";
// var currentAnswer = "";
// var userScore = 0;
// var userChoice = "";
// var currentAnswer = "";
// var answers = [];


// function arrShuffle(array) {

//     // This is for shuffling the false questions chosen
//     var currentIndex = array.length, temporaryValue, randomIndex;

//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {

//         // Pick a remaining element...
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex -= 1;

//         // And swap it with the current element.
//         temporaryValue = array[currentIndex];
//         array[currentIndex] = array[randomIndex];
//         array[randomIndex] = temporaryValue;
//     }
//     return array;
// };

// function clearButtons() {
//     $(".menu").empty();
// }

// function showAnswers() {

//     arrShuffle(answers);
//     for (var i = 0; i < answers.length; i++) {

//         $(".menu").append("<a class='btn btn-dark button' type='button' data-answer=" + answers[i] + "><h4>" +
//             answers[i] + "</h4></a>");

//     }
// }



// function nextQuestion() {

//     var currentObj = questions[counter];
//     currentQuestion = currentObj.question;
//     currentAnswer = currentObj.answer;
//     answers = currentObj.falseAnswers;
//     clearButtons();
//     $("#question-text").text(currentQuestion);

//     showAnswers();
//     counter++;
//     console.log(counter)
// }

// nextQuestion();

// function questionChosen() {
//     if (userChoice === currentAnswer) {
//         correct++;

//     }
//     else if (userChoice !== currentAnswer) {
//         wrong++;

//     }
// }
// // This is checking which answer was chosen
// $(".button").on("click", function () {
//     userChoice = $(this).text();
//     console.log(userChoice);
//     questionChosen();
//     nextQuestion();
// })




