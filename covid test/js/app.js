const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

function getNewQuestion() {
  questionNumber.innerHTML =
    "Question " + (questionCounter + 1) + " of " + quiz.length;

  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;
  const index1 = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(index1, 1);
  //console.log(questionIndex)
  const optionLen = currentQuestion.options.length;

  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.innerHTML = "";
  let animationDelay = 0.15;

  for (let i = 0; i < optionLen; i++) {
    const optonIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    const index2 = availableOptions.indexOf(optonIndex);
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.15;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }
  questionCounter++;
}

function getResult(element) {
  const id = parseInt(element.id);
  if (id === currentQuestion.answer) {
    element.classList.add("correct");
    updateAnswerIndicator("correct");
    correctAnswers++;
    console.log("correct:" + correctAnswers);
  } else {
    element.classList.add("wrong");
    updateAnswerIndicator("wrong");
  }
  attempt++;
  unclickableOptions();
}

function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    markType
  );
}

function next() {
  if (questionCounter === quiz.length) {
    //console.log("quiz over");
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  quizBox.classList.add("hide");
  resultBox.classList.remove("hide");
  quizResult();
}
/////////////////
function quizResult() {
  if (correctAnswers === 5) {
    document.querySelector("#res-text").innerHTML =
      "No worries, you are totally fine!";
  } else if (correctAnswers === 4 ) {
    document.querySelector("#res-text").innerHTML =
      "Don't worry, exercise everyday and eat heathly food!";
  } else if (correctAnswers === 3) {
    document.querySelector("#res-text").innerHTML =
      "You have a mild risk of infection. Observe your health carefully, if any symtoms occure consult a doctor";
  } else if (correctAnswers === 2) {
    document.querySelector("#res-text").innerHTML =
      "It is very likely that your symptoms suggest that you are not very well. Please see a doctor as soon as possible.";
  }else if (correctAnswers === 1) {
    document.querySelector("#res-text").innerHTML =
      "You have a high risk of infection. Keep yourself isolated and consult a doctor immediately";
  }else if (correctAnswers === 0) {
    document.querySelector("#res-text").innerHTML =
      "You have a severe risk of infection, get corona test done ASAP";
  }
}
/////////////////
function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}

function tryAgainquiz() {
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}

function startQuiz() {
  homeBox.classList.add("hide");
  quizBox.classList.remove("hide");
  setAvailableQuestions();
  getNewQuestion();
  answersIndicator();
}
