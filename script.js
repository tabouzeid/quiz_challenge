var topRow = $("#top-row");
var middleRow = $("#middle-row");
var bottomRow = $("#bottom-row");

var score = 0;
var timeRemaining = 50;
var interval;
var highscores = JSON.parse(localStorage.getItem("QuizHighscores"));
if(highscores == undefined){
    highscores = [];
}

var questions = [
    {
        question: "Commonly used data types DO NOT include: ",
        answers: ["strings", "booleans", "alerts", "numbers"],
        answer: 2
    }, 
    {   
        question: "A very useful tool during development and debugging for printing content to the debugger is: ",
        answers: ["Javascript", "terminal / bash", "for keeps", "console.log"],
        answer: 3
    }, 
    {
        question: "String values must be enclosed within ______ when being assigned to a variable.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: 2
    },
    {
        question: "The condition in an if / else statement is enclosed within ______.",
        answers: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: 1
    }, 
    {
        question: "Arrays in Javascript can be used to store",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: 3
    }
];

function startGame(){
    score = 0;
    timeRemaining = 50;
}

function displayWelcomeScreen(){
    score = 0;
    timeRemaining = 50;
    var title  = $("<h5>").text("Coding Quiz Challenge");
    title.addClass("card-title");
    topRow.empty().append(title);

    var instructions = $("<p>").text("Try to answer the questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds");
    instructions.addClass("card-text");
    middleRow.empty().append(instructions);

    var startButton = $("<button>");
    startButton.text("Start Quiz");
    startButton.addClass("btn btn-primary mb-2");
    startButton.click(startGame);
    bottomRow.empty().append(startButton);
    $("#timerDiv").text(timeRemaining+"s");
}

displayWelcomeScreen();