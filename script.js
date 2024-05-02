//scroll-up button

const scrollButton = document.getElementById('scroll-button');

window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        scrollButton.classList.add('show');
    } else {
        scrollButton.classList.remove('show');
    }
});

scrollButton.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});



//slideshow

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

const showSlide = (n) => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

const nextSlide = () => showSlide(currentSlide + 1);

const prevSlide = () => showSlide(currentSlide - 1);

const startSlideShow = () => slideInterval = setInterval(nextSlide, 8000); // Change slide every 8 seconds

const stopSlideShow = () => clearInterval(slideInterval);

document.querySelector('.slider-container').addEventListener('mouseenter', stopSlideShow);

document.querySelector('.slider-container').addEventListener('mouseleave', startSlideShow);

showSlide(currentSlide);
startSlideShow();


//quiz

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex]
}

Quiz.prototype.isEnded = function () {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer) {

    if (this.getQuestionIndex().correctAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
    return choice === this.answer;
}


function populate() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        var element = document.getElementById('question');
        element.innerHTML = quiz.getQuestionIndex().text;

        //show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById('choice' + i);
            element.innerHTML = choices[i];

            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}


function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
}


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Spørgsmål " + currentQuestionNumber + " of " + quiz.questions.length;
}


function showScores() {
    var gameOverHTML = "<h1>Resultat</h1>";
    gameOverHTML += "<h2 id='score'> Din Score: " + quiz.score + "</h2>";
    gameOverHTML += "<button class='retry-quiz-btn' type='button' onclick='location.reload()'>Prøv igen?</button>"
    var element = document.getElementById('quiz');
    element.innerHTML = gameOverHTML;
}


var questions = [
    new Question("Hvad er den anbefalede minimums længde til et stærkt adgangskode?", ["4 karakterer", "8 karakterer", "12 karakterer", "16 karakterer"], "8 karakterer"),
    new Question("Hvilket af følgende er IKKE en anbefalet praksis til at skabe stærke adgangskoder?", ["Brug af let gættelige sætninger", "Inkorporerer en blanding af store og små bogstaver", "Inkludere tal og specialtegn", "Undgå almindelige ordbogsord"], "Brug af let gættelige sætninger"),
    new Question("Hvad er formålet med multifaktorautentificering (MFA)?", ["Til at øge kompleksiteten af adgangskoder", "At kræve, at brugerne leverer flere former for verifikation", "At kryptere følsomme data", "At blokere adgang for uautoriserede brugere"], "At kræve, at brugerne leverer flere former for verifikation"),
    new Question("Hvilket af følgende er et eksempel på et phishing-angreb?", ["Brute force password cracking", "Spoofing af et legitimt websted for at stjæle loginoplysninger", "Opsnappe netværkstrafik for at fange adgangskoder", "Udnyttelse af softwaresårbarheder for at få adgang til et system"], "Spoofing af et legitimt websted for at stjæle loginoplysninger"),
    new Question("Hvad står CAPTCHA for?", ["Completely Automated Personal Turing test to tell Computers and Humans Apart", "Completely Automated Public Turing test to tell Computers and Humans Apart", "Complex Authentication Procedure to Thwart Computer Attacks", "Computer-Assisted Program to Help Achieve Total Access"], "Completely Automated Public Turing test to tell Computers and Humans Apart"),
    new Question("Hvilket af følgende kendetegner en stærk adgangskode?", ["Indeholder brugerens navn eller fødselsdato", "Er det samme som kontobrugernavnet", "Er let at huske", "Indeholder en kombination af bogstaver, tal og specialtegn"], "Indeholder en kombination af bogstaver, tal og specialtegn"),
    new Question("Hvad er det primære formål med adgangskode administratorer?", ["At generere og gemme komplekse adgangskoder til flere konti", "For at gendanne mistede adgangskoder", "For at omgå adgangskode godkendelse", "At kryptere følsomme filer"], "At generere og gemme komplekse adgangskoder til flere konti"),
    new Question("Hvilket af følgende er IKKE en anbefalet fremgangsmåde til at beskytte dine adgangskoder?", ["Deling af adgangskoder med venner eller familie", "Ændring af adgangskoder regelmæssigt", "Brug af forskellige adgangskoder til hver online konto", "Aktivering af to-faktor-godkendelse"], "Deling af adgangskoder med venner eller familie"),
];

var quiz = new Quiz(questions);

populate();
