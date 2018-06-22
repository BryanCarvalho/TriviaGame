/* Pseudo Code

Trivial Trivia Game
 
Click to Start

Timer begins at xx seconds and countdown

Player goes through all 10 questions
player can only guess one answer per question

Once completed, player submit's answers
HTML is updated with users score
Score includes: time spent, answers correct, and answers wrong */

let count = 30;

function timer() {
    count--;
    $('.timer').html(count);
    console.log(count);
}

function start() {
    setInterval(timer, 1000);
}

start();
