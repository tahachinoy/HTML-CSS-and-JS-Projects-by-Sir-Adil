// Get DOM Elements
// HTML5 Main elements for the grid
const main = document.getElementById('main');
// Select box for changing voices
const voiceSelect = document.getElementById('voices');
// Toggle Button to display the custom text input
const toggleBtn = document.getElementById('toggle');
// cButton to close the custom text div
const closeBtn = document.getElementById('close');
// Text area for the custom text input
const customText = document.getElementById('text');
// Button to read the custom text input
const readBtn = document.getElementById('read');
// Custom TExt Div
const customTextDiv = document.getElementById('custom-text');

// Array for holding all images and text to be read
const data = [
    {
        image: './images/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './images/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './images/food.jpg',
        text: "I'm hungry"
    },
    {
        image: './images/grandma.jpg',
        text: "I want to go to Grandma's House"
    },
    {
        image: './images/happy.jpg',
        text: "I'm happy"
    },
    {
        image: './images/home.jpg',
        text: "I want to go home"
    },
    {
        image: './images/hurt.jpg',
        text: "I'm hurt"
    },
    {
        image: './images/outside.jpg',
        text: "I want to go outside"
    },
    {
        image: './images/sad.jpg',
        text: "I'm sad"
    },
    {
        image: './images/scared.jpg',
        text: "I'm scared"
    },
    {
        image: './images/school.jpg',
        text: "I want to go to School"
    },
    {
        image: './images/tired.jpg',
        text: "I'm tired"
    }
];

// Array for all web speech api voices
let voicesArray = [];


// Create a box for each object in the data array
data.forEach(createBox);

// Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    // Create empty div for the image to be added to the main grid later
    const box = document.createElement('div');
    // Get the image url and text from the data array
    const { image, text } = imageObj;
    // Apply a css class to new div
    box.classList.add('box');
    // Add the image inside the box
    box.innerHTML = `
        <img src = "${image}" alt = "${text}" />    
        <p class = "imageInfo">${text}</p>
    `;
    // Add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();

    })
    // Add the new box to the DOM
    main.appendChild(box);
}

// 2. Function to get voices from web speech api and put into the slect box
function fetchVoices(){
    let voices = speechSynthesis.getVoices();
    if (voices.length !==0) {
        populateVoiceList();
    } else {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }
};

function populateVoiceList() {
    const voices = speechSynthesis.getVoices(); //now should have an array of all voices
    // Get voices from speech synthesis get voices method
    voicesArray = voices;
    voiceSelect.innerHTML = '';
    // Render voices in the drop down
    voicesArray.forEach((voice) => {
        let option = document.createElement('option');
        option.textContent = `${voice.name} ${voice.lang}`;
        if (voice.default) {
            option.textContent += ' -- DEFAULT' ;
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
};

// Fetch voices on initial page load
fetchVoices();

// Initialize speech synthesis
const message = new SpeechSynthesisUtterance();

// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. Function to speak the text
function speakText() {
    speechSynthesis.speak(message);
}

// 5. Function to set the new voice
function setVoice (e) {
    message.voice = voicesArray.find(voice => voice.name === e.target.selectedOptions[0].getAttribute('data-name'));
}

// Event Listeners
// 1. Toggle Button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
});

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
});

// 4.Eventlistener on voice select
voiceSelect.addEventListener('change', setVoice);

// 5. Event Listener for cutom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})