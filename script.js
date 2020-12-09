// //question database
import { STORE, great, good, bad } from './store.js';

let score = 0;
let questionNumber = 0;

function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(5);
  }
}

function updateScore() {
  score++;
  $('.score').text(score);
}

function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

function startQuiz() {
  $('.altBox').hide();
  $('.startButton').on('click', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

function submitAnswer() {
  $('.q-a-container').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

function createThing(questionIndex) {
  let formMaker = $(`<form>
        <fieldset>
            <legend class="questionText">${STORE[questionIndex].question}
            </legend>
        </fieldset>
    </form>`);

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="quizBox" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
  });
  $(
    `<button type="submit" class="startButton button">Submit</button>`
  ).appendTo(fieldSelector);
  return formMaker;
}

function correctAnswer() {
  $('.response').html(
    `<div class="startBox">
        <h3>Your answer is correct!</h3>
        <img src="images/michael-scott-yes.png" class="resultImg">
        <p>That's what she said</p>
        <button type="submit" class="button nextButton">Next question</button>
        </div>
        `
  );
  updateScore();
}

function wrongAnswer() {
  $('.response').html(
    `<div class="startBox">
        <h3>NOOOOOOOO!</h3>
        <img class="resultImg" src="images/michael-scott-no.png">
        <p>GOD, NO!</p>
        <button type="button" class="button nextButton">Next question</button>
        <div class="startBox">
        `
  );
}

function nextQuestion() {
  $('.q-a-container').on('click', '.nextButton', function () {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

function finalScore() {
  $('.final').show();
  let array;
  if (score >= 4) {
    array = great;
  } else if (score < 4 && score >= 2) {
    array = good;
  } else {
    array = bad;
  }

  return $('.final').html(
    `<h3>${array[0]}</h3>
    <img src="${array[1]}" alt="${array[2]}" class="gif">
    <h3>Your score is ${score} / 5</h3>
    <p class="">${array[3]}</p>
    <button type="submit" class="restartButton button">Restart</button>
    `
  );
}

function restartQuiz() {
  $('.q-a-container').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

function makeQuiz() {
  startQuiz();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
