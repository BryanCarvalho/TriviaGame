/* Pseudo Code

Trivial Trivia Game
 
Click to Start

Timer begins at 30 seconds and counts down for each question

Player goes through quest
player can only guess one answer per question

Once completed, player submit's answers
HTML is updated with users score
Score includes: time spent, answers correct, and answers wrong */

let trivia = {
    Q1: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_1.png"
    },
    Q2: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_2.png"
    },
    Q3: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_3.png"
    },
    Q4: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_4.png"
    },
    Q5: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "All of the Above",
        picture: "assets/images/answer_5.png"
    },
    Q6: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_6.png"
    },
    Q7: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_7.png"
    },
    Q8: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_8.png"
    },
    Q9: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "Answer1",
        picture: "assets/images/answer_9.png"
    },
    Q10: {
        question: "This is a question?",
        choice: ["Answer1", "Answer2", "Answer3", "Answer4"],
        answer: "All of the Above",
        picture: "assets/images/answer_10.png"
    }
};

let stats = {
    correct: 0,
    incorrect: 0
};

let timer = {
    intervalId: 0,
    time: 31,
    timeReset: 0
};

let quizCount = 1;

$("button").on("click", function run() {

    $("#beforeStart").css("display", "none");
    $("#afterStart").css("display", "block");

    //This sets up the initial timer
    function start() {
        timer.intervalId = setInterval(decrement, 1000);
    }

    //Running decrement function and what to do if time is up
    function decrement() {
        timer.time--;
        $("#timeLeft").html(timer.time);
        if (timer.time === 0) {
            clearInterval(timer.intervalId);
            timer.time = 31;

            let result = $("<div>");
            $(result).addClass("mb-4");

            setTimeout(nextQuestion, 3000);
            $(".question").html(
                "<img src=" +
                trivia[count].picture +
                ' alt="' +
                trivia[count].answer +
                '" width="375px" />'
            );
            $(result).html(
                "Time's up! The correct answer is: " + trivia[count].answer
            );
            stats.incorrect++;
            $(".answers").html(result);
        }
    }

    start();

    //Runs through the array of questions and dynamically generates the question and choices
    let count = "Q" + quizCount;

    if (quizCount === 6) {
        endResult();
    }

    console.log(count);
    console.log(trivia[count].question);
    $(".question").text(trivia[count].question);

    let i = 0;
    $.each(trivia[count].choice, function () {
        let choice = $("<div>");
        $(choice).addClass("mt-4 choice");
        $(choice).text(trivia[count].choice[i]);
        $(".answers").append(choice);
        i++;
    });

    //Evaluates the user's choice and listens for a button click to reset for next question
    $(".answers").on("click", ".choice", function () {
        clearInterval(timer.intervalId);
        timer.time = 16;

        let result = $("<div>");
        $(result).addClass("mb-4");

        setTimeout(nextQuestion, 3000);
        $(".question").html(
            "<img src=" +
            trivia[count].picture +
            ' alt="' +
            trivia[count].answer +
            '" width="375px" />'
        );
        if ($(this).text() === trivia[count].answer) {
            $(result).html("Awesome! You're right!");
            stats.correct++;
            $(".answers").html(result);
        } else {
            $(result).html(
                "Mistakes were made. The correct answer is: " + trivia[count].answer
            );
            stats.incorrect++;
            $(".answers").html(result);
        }
    });

    //Resets the quiz and increases quizCount by one for next question
    function nextQuestion() {
        quizCount++;
        $(".question").empty();
        $(".answers").off("click", ".choice");
        $(".answers").empty();
        run();
    }

    function endResult() {
        clearInterval(timer.intervalId);

        $(".question").append(
            "<div>Questions answered correctly: " + stats.correct + "</div>"
        );
        $(".question").append(
            "<div>Questions answered incorrectly: " + stats.incorrect + "</div>"
        );
        $(".answers").html("<button>Click to try again</button>");

        $("button").on("click", function () {
            quizCount = 1;
            stats.correct = 0;
            stats.incorrect = 0;
            $(".question").empty();
            $(".answers").empty();
            run();
        });
    }
});