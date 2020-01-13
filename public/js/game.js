var ans = $(".answer");
var waiting = document.querySelector("#waiting");
var loadAnim = document.querySelector("#waitanim");
var counter = 0;
var correct = 0;
var wrong = 0;
var userScore = 1;
var userChoice = "";
var questions = [];




$.ajax({
    url: "/api/quiz",
    method: "GET"
}).then(function (data) {
    // console.log(data)
    questions = data;
    nextQuestion();
})


function nextQuestion() {
    var currentObj = questions[counter];
    currentQuestion = currentObj.question;
    currentAnswer = currentObj.answer;
    // console.log(currentAnswer)
    answers = currentObj.falseAnswers;
    questionValue = currentObj.value;
    emptyAnswers();
    $("#question").text(currentQuestion);
    if (questionValue === null) {
        questionValue = 100;
    }
    $("#scoreValue").text(questionValue);
    showAnswers();
    $("#userScore").text(userScore)

};

$("body").on("click", ".answer", function () {
    console.log("firing")
    $("#userScore").text(userScore)
    userChoice = $(this).text();
    questionChosen($(this));
    console.log("-------" + counter)
    if (counter < 10) {
        nextQuestion();
    } else {
        console.log("counter reached");
        $("#results").css({ "display": "block", "visibility": "visible" });
        console.log(userScore)
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

function showAnswers() {
    arrShuffle(answers);
    for (var i = 0; i < answers.length; i++) {
        $(".optnContainer").append("<p id='optn1' class='answer'>" + answers[i] + "</p>");

    }
}

function emptyAnswers() {
    $(".optnContainer").empty();
}



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
