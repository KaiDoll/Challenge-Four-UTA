// Selects element by id
var timeEl = document.querySelector("#time");
var viewScoreLink = document.getElementById("#high-score-link");
var submitButton = document.getElementById("submit");
// Selects element by class
var mainEl = document.getElementById("main");
var quizEndContainer = document.getElementById("quiz-end");
var initialPage = document.getElementById("initial-page");
document.getElementById("start").addEventListener("click", beginQuiz);
var currentQuestion = 0;
{
  var score = 0;
  
  var secondsLeft = 0;
  var userAnswer = document.getElementsByClassName("userAnswer");
  var highscoresLink = document.getElementById("highscores-link");

  function setTime() {
    secondsLeft = 75;
    var timerInterval = setInterval(function () {
      secondsLeft--;
      timeEl.textContent = "Time: " + secondsLeft;

      if (secondsLeft === 0) {
        clearInterval(timerInterval);
      }

      if (secondsLeft < 1) {
        gameEnd();
        clearInterval(timerInterval);
      }

      if (currentQuestion === 4) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}

// clear timer if current question hits 5 (game is over)

// An array containing the question texts
var questionText = [
  "Commonly used data types DO NOT include:",
  "The condition in an if / else statement is enclosed within ____.",
  "Arrays in JavaScript can be used to store ____.",
  "String values must be enclosed within ____ when being assigned to variables.",
  "A very useful tool used during development and debugging for printing content to the debugger is:",
];

// Next I'll create four arrays representing the choices for each answer
var answerChoices1 = ["strings", "booleans", "alerts", "numbers"];

var answerChoices2 = ["quotes", "braces", "parentheses", "square brackets"];

var answerChoices3 = [
  "number and strings",
  "other arrays",
  "booleans",
  "all of the above",
];

var answerChoices4 = ["braces", "commas", "quotes", "parentheses"];

var answerChoices5 = [
  "JavaScript",
  "Terminal/Bash",
  "For loops",
  "console.log",
];
// This is an array containing the correct answers to each of the four questions.
var correctAnswers = [
  "alerts",
  "parentheses",
  "all of the above",
  "quotes",
  "console.log",
];

var beginQuiz = () => {
  start.style.display = "none";
  setTime(); //if cancelled the timer does not show up

  var openingText = document.getElementById("header");
  var paragraph = document.getElementById("p");
  openingText.style.display = "none"; //css
  paragraph.style.display = "none"; //css

  var questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "block";

  nextQuestion();
};
//this function asks the questions one by one till the user answers all.
var nextQuestion = () => {
  var questionTitle = document.getElementById("question-title");
  questionTitle.textContent = "Question " + (currentQuestion + 1);

  var questionTextElement = document.getElementById("question-text");
  questionTextElement.textContent = questionText[currentQuestion];

  // Populate the answer radio buttons.
  // Determine which set of answers we are going to use
  var answerSet;
  if (currentQuestion === 0) {
    answerSet = answerChoices1;
  }
  if (currentQuestion === 1) {
    answerSet = answerChoices2;
  }
  if (currentQuestion === 2) {
    answerSet = answerChoices3;
  }
  if (currentQuestion === 3) {
    answerSet = answerChoices4;
  }
  if (currentQuestion === 4) {
    answerSet = answerChoices5;
  }

  // Get the radio buttons.
  var radio1 = document.getElementById("choice1");
  var radio2 = document.getElementById("choice2");
  var radio3 = document.getElementById("choice3");
  var radio4 = document.getElementById("choice4");

  // We update the "value" property of the radio buttons
  // This is the actual string that will be checked against the correct answer.
  radio1.value = answerSet[0];
  radio2.value = answerSet[1];
  radio3.value = answerSet[2];
  radio4.value = answerSet[3];

  // Grab the html element and set it up for question choices.

  document.getElementById("label-choice1").textContent = answerSet[0];
  document.getElementById("label-choice2").textContent = answerSet[1];
  document.getElementById("label-choice3").textContent = answerSet[2];
  document.getElementById("label-choice4").textContent = answerSet[3];
};
//This function checks the answer.
var checkAnswer = () => {
  var buttons = document.getElementsByName("userAnswer");
  var selectedButton;
  // Loop through each of them until we find the one that is selected
  for (var i = 0; i < 4; i++) {
    if (buttons[i].checked) {
      selectedButton = buttons[i];

      break;
    }
  }
  var answerValue = selectedButton.value;
  // Check the answer
  if (answerValue === correctAnswers[currentQuestion]) {
    score++;
  } else {
    //   // ends game if user is on the last question
    if (currentQuestion === 4) {
      gameEnd();

      //   // else subtracts time from timer and moves onto next question
    } else {
      secondsLeft -= 10;
      nextQuestion();
    }
  }
  if (currentQuestion === questionText.length - 1 || secondsLeft === 0) {
    gameEnd();

    // else go to next question
  } else {
    goToNextQuestion();
  }
};
const goToNextQuestion = () => {
  // First, we increment currentQuestion
  currentQuestion++;

  // Next, check to see if we are at the end of the quiz.
  if (currentQuestion === 5) {
    // End of the quiz. Hide the question div and display the quiz end div
    let questionContainer = document.getElementById("question-container");
    questionContainer.style.display = "none";
    quizEndContainer.style.display = "block";

    return;
  }

  if (userAnswer == correctAnswers) incrementScore();

  incrementScore = (num) => {
    score += num;
  }; //Keeps track of the score

  nextQuestion();
};

function gameEnd() {
  let questionContainer = document.getElementById("question-container");
  questionContainer.style.display = "none";
  quizEndContainer.classList.remove("hide");
  var initialBox = document.getElementById("initial-box");
  initialPage.textContent = "Your final score is " + score + ".";

  if (secondsLeft <= 0) {
    initialPage.textContent = "You ran out of time!";
    initialBox.style.display = "none";
  }
  timesUp();
}
//Game ends when the time is up!
function timesUp() {
  var timerInterval = setInterval(function () {
    secondsLeft--;

    if (secondsLeft < 1) {
      timeEl.textContent = 0;
      gameEnd();
      clearInterval(timerInterval);
    }
    if (currentQuestion === 4) {
      timeEl.textContent = secondsLeft;
      clearInterval(timerInterval);
    }
  }, 1000);
} //stops the timer once the user finish taking the quiz or when the time is up.
var scoreArr = JSON.parse(localStorage.getItem("score")) || [];
//Save the score in local storage.
function saveHighScore() {
  var user = {
    initial: document.getElementById("initial").value,
    score: score,
  };

  scoreArr.push(user);

  localStorage.setItem("score", JSON.stringify(scoreArr)); //writes score to my local storage
  document.getElementById("high-score-page").classList.remove("hide");
  quizEndContainer.classList.add("hide");
  createHighscoresList();
}
//Gets the score from the local storage and displays it on the page.
function createHighscoresList() {
  scoreArr = JSON.parse(localStorage.getItem("score")) || []; //grabs all the latest score from the local storage and displays it.
  var olEl = document.createElement("ol");
  for (var i = 0; i < scoreArr.length; i++) {
    var liEl = document.createElement("li");
    liEl.textContent = scoreArr[i].initial + " " + scoreArr[i].score;

    olEl.append(liEl);
  }
  var h3El = document.createElement("h3");
  h3El.textContent = "High Scores";

  document.getElementById("high-score-page").append(h3El, olEl);
}

 //the cause 

submitButton.addEventListener("click", saveHighScore);

highscoresLink.addEventListener('click', createHighscoresList);
