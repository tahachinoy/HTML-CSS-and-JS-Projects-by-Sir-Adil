// Get DOM Elements
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const imagesContainer = document.getElementById('imagesContainer');
const circlesDiv = document.querySelector('.circles-div');

// Set the current index to any number within the images length
let currentIndex = 1;

const images = [
    { src: './images/food.jpg', alt: 'Pizza', text: 'Pizza' },
    { src: './images/drink.jpg', alt: 'Water', text: 'Water' },
    { src: './images/home.jpg', alt: 'Home', text: 'Home' },
    { src: './images/angry.jpg', alt: 'Angry', text: 'Angry' },
    { src: './images/grandma.jpg', alt: 'Grandma', text: 'Grandma' },
    { src: './images/happy.jpg', alt: 'Happy', text: 'Happy' },
    { src: './images/hurt.jpg', alt: 'Hurt', text: 'Hurt' },
];

// 1. Function to create a box element
function createBox(imageObj, classList, id) {
    const box = document.createElement('div');
    box.classList = classList;
    box.id = id;
    const img = document.createElement('img');
    img.src = imageObj.src;
    img.alt = imageObj.alt;
    const p = document.createElement('p');
    p.innerText = imageObj.text;
    box.appendChild(img);
    box.appendChild(p);
    return box;
}

// 2. Function to create circles based on the number of images
function createCircles() {
    // Clear existing circles if any
    circlesDiv.innerHTML = '';
    images.forEach((_, index) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        // Add click event listener to the circle
        circle.addEventListener('click', () => {
            // Set currentIndex to the circle's index
            currentIndex = index;
            // Rebuild the carousel
            createCarousel();
            // Update active circle styling
            updateActiveCircle();
        });
        // Append the circle to circlesDiv
        circlesDiv.appendChild(circle);
    });
    // Set the initial active circle
    updateActiveCircle();
};

// 3. Function to create carousel with left, active, right boxes
function createCarousel() {
    // Clear the container
    imagesContainer.innerHTML = '';
    // Calculate indices for left, active, right
    const leftIndex = (currentIndex - 1 + images.length) % images.length;
    const rightIndex = (currentIndex + 1) % images.length;
    // Create the three boxes for left, active, right
    const leftBox = createBox(images[leftIndex], 'box left', 'box1');
    const activeBox = createBox(images[currentIndex], 'box active', 'box2');
    const rightBox = createBox(images[rightIndex], 'box right', 'box3');
    // Append the boxes to the container
    imagesContainer.appendChild(leftBox);
    imagesContainer.appendChild(activeBox);
    imagesContainer.appendChild(rightBox);
}

// 4. Function to update the active circle based on currentIndex
function updateActiveCircle() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        // Remove active class from all circles
        circle.classList.remove('active');
        if (index === currentIndex) {
            // Add active class to the current circle
            circle.classList.add('active');
        }
    });
}

// Event Listeners

// 1. Event Listener for next button
nextBtn.addEventListener('click', function () {
    currentIndex = (currentIndex + 1) % images.length;
    createCarousel();
    // Update active circle styling
    updateActiveCircle();
});

// 2. Event Listener for previous button
prevBtn.addEventListener('click', function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    createCarousel();
    // Update active circle styling
    updateActiveCircle();
});

// Call functions to setup carousel and circles
createCarousel();
createCircles(); 
