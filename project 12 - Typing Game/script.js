// Get DOM Elements
const word = document.getElementById('word');
const userWord = document.getElementById('user-word');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const settingsBtn = document.getElementById('settings-btn');
const settingsContainer = document.getElementById('settings');
const settingForm = document.getElementById('form');
const difficultyDropDown = document.getElementById('difficulty');
const gameover = document.getElementById('gameover');

const words = ['hello', 'world', 'thousand', 'proper', 'bar', 'offer', 'segment', 'slave', 'duck', 'instant', 'market', 'degree', 'populate', 'chick', 'dear', 'enemy', 'reply', 'drink', 'occur', 'support', 'speech', 'nature', 'range', 'steam', 'motion', 'path', 'liquid', 'log', 'meant', 'quotient', 'teeth', 'shell', 'neck']

// Placeholder for selected word
let randomWord;

// Initialize score
let score = 0;

// Initialize time
let time = 10;

// Initialize difficulty
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

// Render the difficulty value in the difficulty dropdown
difficultyDropDown.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'easy';

// When page loads, automatically focus on the user input field
userWord.focus();

// Function to generate a random word from the word array
function generateWord() {
    const generatedWord = words[Math.floor(Math.random() * words.length)];
    return generatedWord;
}

// Function to render the new word
function renderWord() {
    // Generate a new random word
    randomWord = generateWord();
    // Update the DOM word element's inner HTML
    word.innerHTML = randomWord;
}

// Function to increment the score by 1
function incrementScore() {
    // Increment by 1
    score++;
    // Render the new score in DOM 
    scoreElement.innerHTML = score;
}

// Start Time Countdown
const timerInterval = setInterval(decrementTimer, 1000);

// Function to decrement the timer by 1 second
function decrementTimer() {
    // Decrement time by 1 second
    time--;
    // Render new time in DOM
    timeElement.innerHTML = time;
    // Check if timer reaches 0
    if (time === 0) {
        clearInterval(timerInterval)
        // Display the gameover container
        gameOver();
    }
}

function gameOver() {
    // Display the gamover container
    gameover.style.display = 'flex';
    // Update the content to display in the gameover container
    gameover.innerHTML = `
        <h1>Time Up! </h1>
        <p>Well Played! Your score was: ${score}</p>
        <button onclick = "location.reload()">Play Again</button>
    `
}

// Event Listeners
// Listen for input in the userWord input element
userWord.addEventListener('input', e => {
    const userInput = e.target.value;
    // Check to see if user input matches the random word
    if (userInput === randomWord) {
        // If the user has typed the correct word, generate a new word
        renderWord();
        // Increment score by 1
        incrementScore();
        // Clear the user input field
        e.target.value = '';
        // Check the difficulty setting
        if (difficulty === 'easy') {
            // if the difficulty is easy, increment timer by 3
            time += 3;
        } else if (difficulty === 'medium') {
            // if the difficulty is medium, increment timer by 2
            time += 2
        } else {
            // if the difficulty is hard, increment timer by 1
            time += 1
        }
        // Render new time in DOM
        timeElement.innerHTML = time;
    }
})

// Listen for click on settings button
settingsBtn.addEventListener('click', () => settingsContainer.classList.toggle('hide'));

// Listen for change in difficulty
difficultyDropDown.addEventListener('change', e => {
    // Updating the difficulty using the newly selected value from dropdown in settings
    difficulty = e.target.value;
    // Use local storage to save the difficulty setting
    localStorage.setItem('difficulty', difficulty)
})

renderWord();