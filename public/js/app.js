var axios = require("axios")


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

// function to get random numbers
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var questionIds = [];

function createIds() {
    //looping to get 10 random numbers which will be used to generate question ids
    for (var i = 1; i < 11; i++) {
        //getQuestion(getRandomInt(1, 300))
        var randomNum = getRandomInt(1, 300)
        questionIds.push(randomNum)
    }
}

createIds();


function createQuestions() {
    questionIds.forEach(function (element) {
        console.log(element)
        // triviaQuestions.push(getQuestion(element));

    })

}


createQuestions();
function getQuestion(id) {
    axios.get("http://jservice.io/api/category?&id=" + id)
        .then(function (data) {
            // console.log(data)
            var answer = data.data.clues[0].answer
            var question = data.data.clues[0].question

            falseQuestions = [];
            //loop through all answers and push to falseQuestions
            for (var i = 0; i < data.data.clues.length; i++) {

                allAnswers = data.data.clues[i].answer;
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
            console.log(triviaObj)

            triviaQuestions.push(triviaObj);
            console.log(triviaQuestions)


        })
};




