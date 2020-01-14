var ans = $(".answer");
var counter = 0;
var correct = 0;
var wrong = 0;
var userScore = 1;
var userChoice = "";
var questions = [];



// ajax call to get the questions from backend
$.ajax({
    url: "/api/quiz",
    method: "GET"
}).then(function (data) {
    // console.log(data)
    questions = data;
    nextQuestion();
});


// function to generate the next series of questions
function nextQuestion() {
    var currentObj = questions[counter];
    currentQuestion = currentObj.question;
    currentAnswer = currentObj.answer;
    answers = currentObj.falseAnswers;
    questionValue = currentObj.value;
    // will empty the answers div
    emptyAnswers();
    startTime();
    $("#question").text(currentQuestion);
    if (questionValue === null) {
        questionValue = 100;
    }
    $("#scoreValue").text(questionValue);
    //this will show the answers
    showAnswers();
    $("#userScore").text(userScore)

};

$("body").on("click", ".answer", function () {
    $("#userScore").text(userScore)
    // decides which answer the user chooses and uses the text to match with answer
    userChoice = $(this).text();
    questionChosen($(this));
    // if the score counter is less than 10 continue running next question
    if (counter < 10) {
        nextQuestion();
    }
    //if the counter is 10 this will run
    else {
        console.log("counter reached");
        $("#results").css({ "display": "block", "visibility": "visible" });
        console.log(userScore);
        // question div will go away and will display the results div
        displayResults();
        // api call to send the userScore to the backend
        $.post("/api/submit", { score: userScore }, function (res, data) {
            console.log(res);
            if (data) {
                console.log("data sent")
            } else {
                console.log("no data sent")
            }
        })
    }

});

// function that tells if the answer is right or wrong
function questionChosen() {
    console.log(userChoice)
    if (userChoice === currentAnswer) {
        correct++;
        userScore = userScore + questionValue
        counter++;

    }
    else if (userChoice !== currentAnswer) {
        wrong++;
        counter++;

    }
};
// function to show the answers in the div
function showAnswers() {
    arrShuffle(answers);
    for (var i = 0; i < answers.length; i++) {
        $(".optnContainer").append("<p id='optn1' class='answer'>" + answers[i] + "</p>");

    }
}
// function to empty the answer div
function emptyAnswers() {
    $(".optnContainer").empty();
}


// function to display the results div after the game
function displayResults() {
    var resultsDiv = $(".resultContainer");
    $("#finalScore").text(userScore);
    resultsDiv.show();
    $(".questionContainer").hide()
}

// Function that shuffles an array
function arrShuffle(array) {

    // This is for shuffling the false questions chosen
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


var timeLeft = 10;
var timeCounter = 0;

function startTime() {
    var timeLeft = 10;
    var timeCounter = 0;
    var timer = $("#timer");
    timer.text(10);
    // console.log(timeLeft - timeCounter);
    function timeIt() {
        timeCounter++;
        // console.log(timeLeft - timeCounter);
        $("#timer").text(timeLeft - timeCounter);
        if (timeCounter === timeLeft) {
            // console.log("out of time")
            clearInterval(timer);
            nextQuestion();
        }
    }
    var timer = setInterval(timeIt, 1000)
}
startTime();