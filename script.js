//question database
const STORE = [
    {
        question: 'What did Kevin buy for himself when he drew himself for secret santa?',
        answers: [
            'Foot massager',
            'M&Ms',
            'Foot bath',
            'Toaster'
        ],
        correctAnswer:
        'Foot bath',
    },
    {
        question: 'During the episode, Prince Family Paper, what is the secret signal that Dwight and Michael agree on using?',
        answers: [
            'Raising your eyebrows',
            'Licking your lips',
            'Coughing loudly',
            'Birdcall'
        ],
        correctAnswer:
        'Licking your lips'
    },
    {
        question: 'What does Angela use as a rape deterrent instead of a whistle?',
        answers: [
            'Pepper spray',
            'Rape flute',
            'Blow horn',
            'Yankee Doodle Dandy'
        ],
        correctAnswer:
        'Rape flute'
    },
    {
        question: 'What was Ryan trying to heat up in the toaster when he started the fire?',
        answers: [
            'Pizza bites',
            'Cheesy pita',
            'Bagel',
            'Toast'
        ],
        correctAnswer:
        'Cheesy pita'
    },
    {
        question: 'On what social media site does Creed say that Michaels nephew is trashing them relentlessly?',
        answers: [
            'Facebook',
            'Twitter',
            'Instagram',
            'Woof'
        ],
        correctAnswer: 
        'Twitter'
    }
];

let score = 0;
let questionNumber = 0;

function generateQuestion() {
    if (questionNumber < STORE.length) {
        return createThing(questionNumber);
    } else {
        $('.questionBox').hide();
        finalScore();
        $('.questionNumber').text(5)
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
    $('.startButton').on('click', function(event) {
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
    </form>`)

    let fieldSelector = $(formMaker).find('fieldset');

    STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
        $(`<label class="quizBox" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="startButton button">Submit</button>`).appendTo(fieldSelector);
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
    $('.q-a-container').on('click', '.nextButton', function() {
        // console.log('nextQ');
        $('.altBox').hide();
        $('.questionBox').show();
        updateQuestionNumber();
        $('.questionBox form').replaceWith(generateQuestion());
    });
}

function finalScore() {
    $('.final').show();
    
    const great = [
        'Great job!',
        'images/party-gif.gif',
        'alt',
        'You are a superfan!'
    ]

    const good = [
        'Good, not great',
        'images/stanley-unimpressed.gif',
        'stanley is unimpressed',
        'Watch The Office. Right now. Start to finish.'
    ]

    const bad = [
        'Do you even own a TV...',
        'images/michael-angry.gif',
        'michael scott dramatic zoom in',
        '...or are you even a human?'
    ];

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
    // generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
 }

$(makeQuiz)


