const questions = [
  {
    question: "Who is first Prime Minister of India?",
    answers: [
      { text: "Sardar Vallabhbhai Patel", correct: false },
      { text: "Pandit Jawaharlal Nehru", correct: true },
      { text: "Narendra Modi", correct: false },
      { text: "Bhimrao Ambedkar", correct: false },
    ],
  },
  {
    question: "Which is largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Lion", correct: false },
      { text: "Elepthant", correct: false },
      { text: "Blue Whale", correct: true },
    ],
  },
  {
    question: "In which year India win its first ICC trophy?",
    answers: [
      { text: "1983", correct: true },
      { text: "1996", correct: false },
      { text: "2007", correct: false },
      { text: "2011", correct: false },
    ],
  },
  {
    question: "Who is the Cheif Justic of Supreme Court?",
    answers: [
      { text: "Sanjiv Khanna", correct: false },
      { text: "Uday Lalit", correct: false },
      { text: "Dhananjaya Y. Chandrachud", correct: true },
      { text: "Kapil Sibal", correct: false },
    ],
  },
  {
    question: `Which planet is known as the "Red Planet"?`,
    answers: [
      { text: "Venus", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: false },
      { text: "Mars", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("btn-next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const iscorrect = selectBtn.dataset.correct === "true";
  if (iscorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
