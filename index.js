const questions = [
  {
    question: "What is 2 + 2?",
    answers: [
      { text: "3", correct: false },
      { text: "6", correct: false },
      { text: "4", correct: true },
      { text: "5", correct: false },
    ],
  },
  {
    question: "What is 2 * 2?",
    answers: [
      { text: "2", correct: false },
      { text: "4", correct: true },
      { text: "8", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "What is 3 + 3?",
    answers: [
      { text: "6", correct: true },
      { text: "12", correct: false },
      { text: "5", correct: false },
      { text: "9", correct: false },
    ],
  },
  {
    question: "What is 5 - 2?",
    answers: [
      { text: "3", correct: true },
      { text: "2", correct: false },
      { text: "4", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "What is 4 * 3?",
    answers: [
      { text: "8", correct: false },
      { text: "16", correct: false },
      { text: "12", correct: true },
      { text: "10", correct: false },
    ],
  },
  {
    question: "What is 10 / 2?",
    answers: [
      { text: "3", correct: false },
      { text: "5", correct: true },
      { text: "8", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "What is 7 + 4?",
    answers: [
      { text: "9", correct: false },
      { text: "11", correct: true },
      { text: "13", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "What is 6 / 2?",
    answers: [
      { text: "3", correct: true },
      { text: "2", correct: false},
      { text: "4", correct: false },
      { text: "5", correct: false },
    ],
  },
  {
    question: "What is 8 - 5?",
    answers: [
      { text: "2", correct: false },
      { text: "4", correct: false },
      { text: "1", correct: false },
      { text: "3", correct: true },
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
