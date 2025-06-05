const questions = [
  {
    question: "What does CSS stand for?",
    answers: ["Creative Style System", "Cascading Style Sheets", "Colorful Style Sheets", "Code Styling System"],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What is 5 + 7?",
    answers: ["11", "12", "13", "14"],
    correct: "12"
  },
  {
    question: "Which company developed JavaScript?",
    answers: ["Google", "Microsoft", "Netscape", "IBM"],
    correct: "Netscape"
  },
  {
    question: "Which HTML tag is used to define an image?",
    answers: ["<img>", "<image>", "<pic>", "<src>"],
    correct: "<img>"
  },
  {
    question: "What does HTTP stand for?",
    answers: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Text Protocol", "HyperText Transfer Page"],
    correct: "HyperText Transfer Protocol"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: ["var", "int", "let", "Both var and let"],
    correct: "Both var and let"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "/* */", "#", "<!-- -->"],
    correct: "//"
  },
  {
    question: "What is the output of 3 + '3' in JavaScript?",
    answers: ["6", "'6'", "'33'", "Error"],
    correct: "'33'"
  },
  {
    question: "Which language is used to style web pages?",
    answers: ["HTML", "JavaScript", "CSS", "Python"],
    correct: "CSS"
  },
  {
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
    answers: ["msg('Hello World')", "alert('Hello World')", "alertBox('Hello World')", "msgBox('Hello World')"],
    correct: "alert('Hello World')"
  },
  {
    question: "Which method adds a new item to the end of an array?",
    answers: ["push()", "pop()", "add()", "append()"],
    correct: "push()"
  },
  {
    question: "What color is the sky?",
    answers: ["Red", "Blue", "Green", "Yellow"],
    correct: "Blue"
  },
  {
    question: "Who is the CEO of Tesla?",
    answers: ["Bill Gates", "Jeff Bezos", "Elon Musk", "Mark Zuckerberg"],
    correct: "Elon Musk"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    answers: ["<link>", "<a>", "<href>", "<url>"],
    correct: "<a>"
  },
  {
    question: "Which operator is used for strict equality in JavaScript?",
    answers: ["==", "===", "=", "!="],
    correct: "==="
  },
  {
    question: "How do you define a function in JavaScript?",
    answers: ["function myFunc()", "def myFunc()", "fun myFunc()", "func myFunc()"],
    correct: "function myFunc()"
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: ["{1, 2, 3}", "[1, 2, 3]", "(1, 2, 3)", "<1, 2, 3>"],
    correct: "[1, 2, 3]"
  },
  {
    question: "Which HTML element is used for the largest heading?",
    answers: ["<h1>", "<heading>", "<head>", "<h6>"],
    correct: "<h1>"
  }
];


let currentQuestion = 0, score = 0, timer, timeLeft = 10;
const usernameInput = document.getElementById("username");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const scoreBox = document.getElementById("scoreBox");
const questionBox = document.getElementById("question-box");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");

function startQuiz() {
  const username = usernameInput.value.trim();
  if (!username) return alert("Please enter your name");
  document.getElementById("startBox").classList.add("hidden");
  questionBox.classList.remove("hidden");
  document.getElementById("playerName").textContent = username;
  document.getElementById("lastScore").textContent = localStorage.getItem("lastScore") || "None";
  showQuestion();
}

function showQuestion() {
  resetTimer();
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";
  q.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(btn, answer === q.correct);
    answersEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
  startTimer();
}

function checkAnswer(btn, isCorrect) {
  clearInterval(timer);
  disableButtons();
  if (isCorrect) {
    btn.classList.add("correct");
    document.getElementById("correctSound").play();
    score++;
  } else {
    btn.classList.add("wrong");
    document.getElementById("wrongSound").play();
    const correctBtn = [...answersEl.children].find(b => b.textContent === questions[currentQuestion].correct);
    correctBtn.classList.add("correct");
  }
  nextBtn.style.display = "block";
}

function disableButtons() {
  [...answersEl.children].forEach(b => b.disabled = true);
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
};

function endQuiz() {
  questionBox.classList.add("hidden");
  scoreBox.classList.remove("hidden");
  scoreEl.textContent = score;
  localStorage.setItem("lastScore", score);
}

function startTimer() {
  timeLeft = 10;
  timerEl.textContent = `⏳ ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ ${timeLeft}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(document.createElement("button"), false); // auto wrong
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timerEl.textContent = "";
}

// Dark mode toggle
document.getElementById("themeToggle").addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
