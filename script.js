const questions = [
  {
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
    correctAnswer: "Delhi"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    correctAnswer: "JavaScript"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyper Tool Multi Language"
    ],
    correctAnswer: "Hyper Text Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionEl = document.getElementById("question");
  const optionsEl = document.getElementById("options");
  const feedbackEl = document.getElementById("feedback");

  feedbackEl.innerText = "";
  questionEl.innerText = questions[currentQuestion].question;
  optionsEl.innerHTML = "";

  questions[currentQuestion].options.forEach(option => {
    const label = document.createElement("label");
    label.classList.add("option");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "option";
    radio.value = option;

    label.appendChild(radio);
    label.appendChild(document.createTextNode(option));

    optionsEl.appendChild(label);
  });

  updateScore();
}

document.getElementById("submitBtn").addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  const feedbackEl = document.getElementById("feedback");

  if (!selectedOption) {
    feedbackEl.innerText = "Please select an option!";
    return;
  }

  const selected = selectedOption.value;
  const correct = questions[currentQuestion].correctAnswer;

  if (selected === correct) {
    feedbackEl.innerText = "Correct!";
    score++;
  } else {
    feedbackEl.innerText = `Incorrect. The correct answer was ${correct}.`;
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion >= questions.length) {
      showFinalScore();
    } else {
      loadQuestion();
    }
  }, 1000);
});

function updateScore() {
  const scoreDisplay = document.getElementById("scoreDisplay");
  scoreDisplay.innerText = `Score: ${score} / ${questions.length}`;
}

function showFinalScore() {
  document.getElementById("quizContainer").style.display = "none";
  document.getElementById("resultContainer").style.display = "block";
  document.getElementById("finalScore").innerText = `Quiz Complete! Your score is ${score} out of ${questions.length}`;
}

function restartQuiz() {
  score = 0;
  currentQuestion = 0;
  document.getElementById("resultContainer").style.display = "none";
  document.getElementById("quizContainer").style.display = "block";
  loadQuestion();
}
  
// Start quiz on page load
loadQuestion();
