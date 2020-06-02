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
    generateAnswerList(0);
    interval = setInterval(decrementTimer, 1000);
}

function generateAnswerList(questionNumber){
    var questionDetails = questions[questionNumber];
    var answerList = $("<ol>");
    answerList.click(pickedAnswer);
    answerList.attr("question-index", questionNumber);
    topRow.empty().append($("<h1>").text(questionDetails.question));
    for(var i = 0; i < questionDetails.answers.length; i++) {
        var li = $("<li>")
        li.attr("answer-index", i);
        li.addClass("btn btn-primary btn-lg btn-block");
        li.text(questionDetails.answers[i]);
        answerList.append(li);
    }
    middleRow.empty().append(answerList);
    bottomRow.empty();
}

function pickedAnswer(event){
    var question = parseInt(event.currentTarget.getAttribute("question-index"));
    var pick = parseInt(event.target.getAttribute("answer-index"));
    var isCorrect = pick == questions[question].answer;
    
    var rightOrWrong = "Correct!";
    if(isCorrect){
        score++;
    } else {
        score--;
        timeRemaining-=10;
        rightOrWrong = "Wrong!"
    }
    bottomRow.text(rightOrWrong);
    
    setTimeout(function() {
        if(question == questions.length-1){
            showGameScores();
        } else {
            generateAnswerList(question+1);
        }
    }, 500);
}

function showGameScores(){
    if(interval  != undefined){
        clearInterval(interval);
        interval = undefined;    
    }

    var allDone = $("<h5>").text("All Done!");
    allDone.addClass("card-title");
    topRow.empty().append(allDone);

    var scoreTxt = $("<p>").text("Your final Score is: "+score);
    scoreTxt.addClass("card-text");
    middleRow.empty().append(scoreTxt);

    var label = $("<label>");
    label.text("Please enter your name:");
    label.addClass("col-form-label");
    bottomRow.empty().append(label);
    var input = $("<input>");
    input.attr('type', 'text');
    input.addClass("form-control");
    input.attr('id', 'hScorerName');
    bottomRow.append(input);
    var button = $('<button>');
    button.text('Add');
    button.addClass("btn btn-primary mb-2");
    button.click(addHighScorer);
    bottomRow.append(button);
}

function addHighScorer(event){
    var name = $("#hScorerName").val();
    highscores.push(name+": "+score);
    localStorage.setItem("QuizHighscores", JSON.stringify(highscores));
    showHighScores();
}

function showHighScores(){
    var title = $("<h5>");
    title.text("Highscores:");
    title.addClass("card-title");
    topRow.empty().append(title);

    var list = $("<ul>");
    middleRow.empty().append(list);
    highscores.forEach(score => {
        var item = $("<li>");
        item.addClass("btn btn-light btn-lg btn-block");
        item.text(score);
        list.append(item);
    });

    var newGame = $("<button>");
    newGame.text("New Game");
    newGame.addClass("btn btn-primary mb-2");
    newGame.click(displayWelcomeScreen);
    bottomRow.empty().append(newGame);

    var clearHighScoresBtn = $("<button>");
    clearHighScoresBtn.text("Clear High Scores");
    clearHighScoresBtn.addClass("btn btn-primary mb-2");
    clearHighScoresBtn.click(clearHighScores);
    bottomRow.append(clearHighScoresBtn);
}

function clearHighScores(){
    highscores = [];
    localStorage.setItem("QuizHighscores", JSON.stringify(highscores));
    displayWelcomeScreen();
}

function decrementTimer(){
    timeRemaining--;
    if(timeRemaining <= 0) {
        timeRemaining = 0;
        showGameScores();
    }
    $("#timerDiv").text(timeRemaining+"s");
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