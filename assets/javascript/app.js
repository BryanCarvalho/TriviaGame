

let trivia = {
    Q1: {
        question: "What are the four houses at Hogwarts School of Witchcraft and Wizardry?",
        choice: ["Gryffindor, Ravenclaw, Hufflepuff, & Slytherin", "House 1, House 2, House 3, House 4", "Gryfflyff, Ravencraw, Huffleduff, & Slytheryne", "Monkey House, Animal House, Ghost House, Cool House"],
        answer: "Gryffindor, Ravenclaw, Hufflepuff, & Slytherin",
        picture: "assets/images/answer_1.png"
    },
    Q2: {
        question: "Who was the first woman pilot to fly solo across the Atlantic?",
        choice: ["Linda Hamilton", "Hillary Clinton", "Amelia Earhart", "Ginny Eckstein"],
        answer: "Amelia Earhart",
        picture: "assets/images/answer_2.png"
    },
    Q3: {
        question: "What city is the capital of China?",
        choice: ["Chengdu", "Shanghai", "Hong Kong", "Beijing"],
        answer: "Beijing",
        picture: "assets/images/answer_3.png"
    },
    Q4: {
        question: "Who was the author of the children’s fantasy novel The Lion, the Witch and the Wardrobe?",
        choice: ["Phil Spector", "Ernest Hemmingway", "C.S. Lewis", "Michael Crichton"],
        answer: "C.S. Lewis",
        picture: "assets/images/answer_4.png"
    },
    Q5: {
        question: "Polar bears feed mainly on what animal?",
        choice: ["Seals", "Narwhals", "Walruses", "Sharks"],
        answer: "Seals",
        picture: "assets/images/answer_5.png"
    },
    Q6: {
        question: "On the Apollo 11 moon mission, which astronaut stayed aloft in the command module while Neil Armstrong and Buzz Aldrin walked on the moon?",
        choice: ["Buzz Aldrin Jr", "Michael Collins", "Vincent Chestly", "Michael Collogne"],
        answer: "Michael Collins",
        picture: "assets/images/answer_6.png"
    },
    Q7: {
        question: "What famous actor became Governor of California in 2003?",
        choice: ["Tom Cruise", "Danny Devito", "Arnold Schwarzenegger", "Alyssa Milano"],
        answer: "Arnold Schwarzenegger",
        picture: "assets/images/answer_7.png"
    },
    Q8: {
        question: "In what year was Alfred Hitchcock’s psychological thriller “Psycho” released?",
        choice: ["1958", "1971", "1963", "1960"],
        answer: "Answer1",
        picture: "assets/images/answer_8.png"
    },
    Q9: {
        question: "What is the smallest island country?",
        choice: ["Nauru", "Palau", "Tuvalu", "Malta"],
        answer: "Nauru",
        picture: "assets/images/answer_9.png"
    },
    Q10: {
        question: "The Shining was written by which author?",
        choice: ["Stephen King", "R. L. Stein", "J. K. Rowling", "J. R. R. Tolkien"],
        answer: "Stephen King",
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

    function start() {
        timer.intervalId = setInterval(decrement, 1000);
    }

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
                '" width="400px" />'
            );
            $(result).html(
                "Time's up! The correct answer is: " + trivia[count].answer
            );
            stats.incorrect++;
            $(".answers").html(result);
        }
    }

    start();

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