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