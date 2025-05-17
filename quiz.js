const quizData = [
    {
        question: "What is the main goal of SDG 1?",
        choices: ["Zero Hunger", "No Poverty", "Clean Water", "Quality Education"],
        answer: "No Poverty"
    },
    {
        question: "What percentage of the world lived in extreme poverty in 2021?",
        choices: ["10%", "25%", "35%", "50%"],
        answer: "10%"
    },
    {
        question: "Which region has the highest poverty rate?",
        choices: ["North America", "Europe", "Sub-Saharan Africa", "Australia"],
        answer: "Sub-Saharan Africa"
    },
    {
        question: "Which of these is a key strategy to reduce poverty?",
        choices: ["Lowering education funding", "Job creation", "Increasing military spending", "Raising prices of basic goods"],
        answer: "Job creation"
    },
    {
        question: "Which organization leads global efforts to fight poverty?",
        choices: ["World Bank", "NASA", "WHO", "FIFA"],
        answer: "World Bank"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const nextButton = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const quizBox = document.getElementById("quiz-box");

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesList.innerHTML = "";
    nextButton.style.display = "none"; // Hide Next button initially

    currentQuestion.choices.forEach(choice => {
        const li = document.createElement("li");
        li.textContent = choice;
        li.addEventListener("click", () => checkAnswer(choice, li));
        choicesList.appendChild(li);
    });
}

function checkAnswer(selectedAnswer, liElement) {
    const correctAnswer = quizData[currentQuestionIndex].answer;

    // Prevent multiple clicks
    if (document.querySelector(".selected")) return;

    liElement.classList.add("selected");

    if (selectedAnswer === correctAnswer) {
        liElement.classList.add("correct");
        score++;
    } else {
        liElement.classList.add("wrong");
    }

    // Disable all choices after one is selected
    document.querySelectorAll("#choices-list li").forEach(li => li.style.pointerEvents = "none");
    nextButton.style.display = "block"; // Show Next button after answering
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizBox.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizBox.classList.remove("hidden");
    resultBox.classList.add("hidden");
    loadQuestion();
}

loadQuestion();
