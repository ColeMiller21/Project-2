// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");



// for (var i = 1; i < 50; i++) {
//   $.ajax({
//     url: "http://jservice.io/api/category?&id=" + i,
//     method: "GET"
//   }).then(function (data) {
//     console.log(data);
//   });
// };


// $.ajax({
//   url: "http://jservice.io/api/category?&id=1",
//   method: "GET"
// }).then(function (data) {
//   console.log(data);
// })


//getting the category with the ID

// $.ajax({
//   url: "http://jservice.io/api/category?&id=1",
//   method: "GET"
// }).then(function (data) {
//   console.log(data);
// })
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

function getFalse(id) {

  $.ajax({
    url: "http://jservice.io/api/category?&id=1",
    method: "GET"
  }).then(function (data) {
    console.log(data.clues[0])
    var answer = data.clues[0].answer
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
    // final three answers
    console.log(falseAnswers);
  })
};


getFalse();


// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getQuestions: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  getAnswers: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "GET"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
