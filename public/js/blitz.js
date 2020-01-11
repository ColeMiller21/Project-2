var timeLeft = 11;
var counter = 0;

function startTime() {

    var timer = $("#timer");
    timer.text("10");

    function timeIt() {
        counter++;
        timer.text(timeLeft - counter);

        if (counter == timeLeft) {
            console.log("out of time")
            clearInterval();
            displayFinished();
        }
    }
    setInterval(timeIt, 1000)
}

$.ajax({
    url: "/api/examples",
    method: "GET"
}).then(function (questionResults) {
    //console.log(questionResults)

    console.log(questionResults[0])

    function next() {

        var questionObj = questionResults[counter];

        var currentQuestion = questionObj.question;
        var currentAnswer = questionObj.answer;
        var answers = questionObj.falseAnswers;

        answers.push(currentAnswer)
        console.log(answers)

    }


    next();
});




