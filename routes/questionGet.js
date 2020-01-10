var axios = require("axios");

// Global Vars
var triviaQuestions = [];

// This is a function that runs the api call ten times and is called in another file
async function createQuestions() {

    // Looping through to get the questions and categories
    for (var i = 0; i < 10; i++) {
        var currentQuestion = await getQuestion();
        triviaQuestions.push(currentQuestion);
    }
    return triviaQuestions();
}


// This is the main meat of the app, accessess the api to get questions and stores it in a array as an object
async function getQuestion() {
    // Creating a random category
    var randomCategory = getRandomInt(1, 300);
    // New promise to solve async issues with pushing calls from the api to an array
    return new Promise(resolve => {
        axios.get("http://jservice.io/api/category?&id=" + randomCategory)
            .then(function (res) {

                // Saving variables for easier use
                var clueCount = res.data.clues_count;
                var randomQuestion = Math.round(Math.random() * (clueCount - 1));

                // Grabbing question information
                var answer = res.data.clues[randomQuestion].answer;
                var question = res.data.clues[randomQuestion].question;
                var question_id = res.data.clues[randomQuestion].id;
                var category_id = res.data.clues[randomQuestion].category_id;
                var value = res.data.clues[randomQuestion].value;

                var falseQuestions = [];

                // Recursion to get a new category and question if the question holds no substance
                if (question.length < 2) {
                    resolve(getQuestion());
                }
                // Loop through all answers and push to falseQuestions
                for (var i = 0; i < res.data.clues.length; i++) {
                    allAnswers = res.data.clues[i].answer;
                    falseQuestions.push(allAnswers);
                }
                // Filter the answer out of the array
                var filteredFalse = falseQuestions.filter(function (e) {
                    return e !== answer && e !== "" && e !== "=";
                });
                // Shuffle the remaining answers to get a random 3 at the beginning
                var shuffleFalse = arrShuffle(filteredFalse);
                // Slice the array to only grab the first 3 answers
                var falseAnswers = shuffleFalse.slice(0, 3);

                // If the answer is in the array reshuffle array to get a new 3 answers
                if (falseAnswers.includes(answer)) {
                    shuffleFalse = arrShuffle(filteredFalse);
                    return shuffleFalse.slice(0, 3);
                }

                // Create object with question, answer and false answers
                var triviaObj = {
                    question: question,
                    answer: answer,
                    falseAnswers: falseAnswers,
                    question_id: question_id,
                    category_id: category_id,
                    value: value
                };

                // Resolving the promise
                resolve(triviaObj);
            });
    });
};

////////NEEDS WORK//////////
// Function to replace all html tags and // in the answers and questions
async function removeFiller() {
    for (var i = 0; i < triviaQuestions.length; i++) {

        // Storing variables for easier use
        var currentQuestion = triviaQuestions[i].question;
        var currentAnswer = triviaQuestions[i].answer;
        // Replacing the unnecessary filler
        triviaQuestions[i].question = currentQuestion.replace(/<[^>]*>/g, "");
        triviaQuestions[i].question = currentQuestion.replace(/\/\//g, "");
        triviaQuestions[i].answer = currentAnswer.replace(/<[^>]*>/g, "");
        triviaQuestions[i].answer = currentAnswer.replace(/\/\//g, "");

        for (var j = 0; j < triviaQuestions[i].falseAnswers.length; j++) {
            // Storing a variable for easier use
            var currentFalseAnswer = triviaQuestions[i].falseAnswers[j];

            // Replacing the unnecessary filler
            triviaQuestions[i].falseAnswers[j] = currentFalseAnswer.replace(/<[^>]*>/g, "");
            triviaQuestions[i].falseAnswers[j] = currentFalseAnswer.replace(/\/\//g, "");
        }
    }


}


// Function that accepts a minimum val and a maximum val and creates a random int between the two
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

module.exports = createQuestions;