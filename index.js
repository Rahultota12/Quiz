const questions = [
  {
    question: "Which type of JavaScript language is ___",
    answers: [
      { text: "Object-Oriented", correct: false },
      { text: "Assembly-language", correct: false },
      { text: "Object-Based", correct: true },
      { text: "High-level", correct: false },
    ],
  },
  {
    question: " The function and  var are known as:",
    answers: [
      { text: "Data types", correct: false },
      { text: "Declaration statements", correct: true },
      { text: "Prototypes", correct: false },
      { text: "Keywords", correct: false },
    ],
  },
  {
    question: " Which one of the following is an ternary operator",
    answers: [
      { text: "?", correct: true },
      { text: ":", correct: false },
      { text: "-", correct: false },
      { text: "+", correct: false },
    ],
  },
  {
    question: " Which one of the following operator returns false if both values are equal?",
    answers: [
      { text: "!=", correct: true },
      { text: "!==", correct: false },
      { text: "!", correct: false },
      { text: "All of the above", correct: false },
    ],
  },
  {
    question: "Which one of the following is not a keyword:",
    answers: [
      { text: "with", correct: false },
      { text: "debugger", correct: false },
      { text: "use strict", correct: true },
      { text: "if", correct: false },
    ],
  },
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "Both A and B", correct: true },
      { text: "None of the above", correct: false },
    ],
  },
  {
    question: ` Which of the following syntax can be used to write "Hello World" in an alert box?`,
    answers: [
      { text: `alertBox("Hello World")`, correct: false },
      { text: `alert("Hello World")`, correct: true },
      { text: `msgBox("Hello World")`, correct: false },
      { text: `msg("Hello World")`, correct: false },
    ],
  },
  {
    question: "What was the original name of JavaScript when it discovered?",
    answers: [
      { text: "LiveScript", correct: false},
      { text: "JScript", correct: false },
      { text: "Mocha", correct: true },
      { text: "EScript", correct: false },
    ],
  },
  {
    question: "Which of the following is the correct way to write a comment in JavaScript code?",
    answers: [
      { text: "/*This is a comment*/", correct: false },
      { text: "$This is a comment$", correct: false },
      { text: "**This is a comment**", correct: false },
      { text: "//This is a comment", correct: true },
    ],
  },
  
];

const quesElement = document.getElementById("question");
const ansElement = document.getElementById("answer-button");
const nestElement = document.getElementById("next-btn");

let currentQuestInd = 0;
let score = 0;

function startQuiz() {
  currentQuestInd = 0;
  score = 0;
  nestElement.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestInd];
  let questionNo = currentQuestInd + 1;
  quesElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    ansElement.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nestElement.style.display = "none";
  while (ansElement.firstChild) {
    ansElement.removeChild(ansElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(ansElement.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nestElement.style.display = "block";
}

nestElement.addEventListener("click", nextQuestion);

function showscore() {
  resetState();
  quesElement.innerHTML = `Your score: ${score} out of ${questions.length}`;
  nestElement.innerHTML = "Play again";
  nestElement.style.display = "block";
}

function handaleNextButton() {
  currentQuestInd++;
  if (currentQuestInd < questions.length) {
    showQuestion();
  } else {
    showscore();
  }
}

function nextQuestion() {
  if (nestElement.innerHTML === "play again") {
    startQuiz();
  } else {
    handaleNextButton();
  }
}

startQuiz();
