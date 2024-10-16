// get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

//Get DOM Elements for Hangman
const figureParts = document.querySelectorAll('.figure-part');

//This is the pool of words which will be used to select a random word 
const words = ["knew", "valley", "depend", "slight", "anyone", "fall", "crack", "tin", "desk", "broken", "cloth", "globe", "born", "using", "applied", "equipment", "total", "doctor", "uncle", "contrast", "arrow", "sleep", "energy", "moon", "share", "stranger", "feature", "slave", "sleep", "know", "industrial", "member", "realize", "lamp", "setting", "hospital", "grandfather", "work", "pole", "listen", "into", "idea"];

//Select a word at random form words array

let selectedWord = words[Math.floor(Math.random() * words.length)];

//Tracking arrays for correct and incorrect guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

//Function to diplay the selectedWrod in the DOM

function displayWord() {
    word.innerHTML = `${selectedWord.split('').map(letter => `<span class = "letter">${correctLettersArray.includes(letter) ? letter : ''}</span>`).join('')}`;
    //Replace new line charachter and form inner word
    const innerWord = word.innerText.replace(/\n/g, '');
    //Compare inner word to slected word if it is same then game over and user won 
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!'
        popup.style.display = 'flex';
    };
}

//Function to show the notificatio
function showNotification() {
    //add class show to the notification container
    notification.classList.add('show');
    //after 2 seconds hide the notification
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Function to update incorrect letters
function updateIncorrectLetters() {
    incorrectLetters.innerHTML = `
    ${incorrectLettersArray.length > 0 ? '<p>Incorrect letters </p>' : ''}
    ${incorrectLettersArray.map(letter => `<span>${letter}</span>`)}
    `;
    //Display the Hangman Part
    figureParts.forEach((part, index) => {
        //How many incorrect letters has the user guessed
        const errors = incorrectLettersArray.length;
        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none'
        }
    });
    //Check if user lost
    if (incorrectLettersArray.length === figureParts.length) {
        finalMessage.innerText = `You Lost! The correct answer was ${selectedWord}`
        popup.style.display = 'flex';
    }

}

//Event Listeners

//1. Listen for keyboard key press
window.addEventListener('keydown', e => {
    //Check if key pressed is a letter a = 65 z = 90
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        //Check if letter is in the selected word
        if (selectedWord.includes(letter)) {
            //Check if letter is already in correctLettersArray
            if (!correctLettersArray.includes(letter)) {
                //Add letter in to the correct letters array
                correctLettersArray.push(letter)
                //Run the display word function again
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!incorrectLettersArray.includes(letter)) {
                //Add letter into incorrect letteres array
                incorrectLettersArray.push(letter);
                //update the incorrect letters UI
                updateIncorrectLetters();
            } else {
                showNotification();
            }
        }
    }
})

//2. Listen for click on play again button

playBtn.addEventListener('click', () => {
    //Empty correctLettersArray & Incorrectlettersarray
    correctLettersArray.splice(0);
    incorrectLettersArray.splice(0);
    //Select a new random word
    selectedWord = words[Math.floor(Math.random() * words.length)];

    //Clear incorrect letters display
    updateIncorrectLetters();
    //Hide the popup
    popup.style.display = 'none';
    //refresh displayed word
    displayWord();
})

//Execute displayWord on pageload
displayWord();