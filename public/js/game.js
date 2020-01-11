var ans = $(".answer");
var waiting = document.querySelector("#waiting");
var loadAnim = document.querySelector("#waitanim");
var counter = 0;
var correct = 0;
var wrong = 0;
var userScore = 0;
var userChoice = "";
var questions = [];

var data;



$.ajax({
    url: "/api/quiz",
    method: "GET"
}).then(function (data) {
    console.log(data)
    questions = data;
    nextQuestion();
})


function nextQuestion() {
    console.log(questions)
    var currentObj = questions[counter];
    currentQuestion = currentObj.question;
    currentAnswer = currentObj.answer;
    console.log(currentAnswer)
    answers = currentObj.falseAnswers;
    questionValue = currentObj.value;
    emptyAnswers();
    $("#question").text(currentQuestion);
    showAnswers();

    console.log(counter)

};

$("body").on("click", ".answer", function () {
    console.log("firing")
    userChoice = $(this).text();

    questionChosen($(this));

    setTimeout(function () {
        nextQuestion(), 1000
    })
    // nextQuestion()

});

function questionChosen(ele) {
    console.log("this is the ele" + JSON.stringify(ele))
    console.log(userChoice)
    if (userChoice === currentAnswer) {
        correct++;
        userScore = userScore + questionValue
        ele.addClass("correct");
        counter++;

    }
    else if (userChoice !== currentAnswer) {
        wrong++;
        counter++;
        console.log("isthisworking")
    }
}
function showAnswers() {
    arrShuffle(answers);
    for (var i = 0; i < answers.length; i++) {
        $(".optnContainer").append("<p id='optn1' class='answer'>" + answers[i] + "</p>");

    }
}

function emptyAnswers() {
    $(".optnContainer").empty();
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
