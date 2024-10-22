// Get DOM Elements
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const imagesContainer = document.getElementById('imagesContainer');
const circlesDiv = document.querySelector('.circles-div');

// Set the current index to any number within the images length
let currentIndex = 2;

const images = [
    { src: './images/food.jpg', alt: 'pizza', text: 'pizza' },
    { src: './images/drink.jpg', alt: 'water', text: 'water' },
    { src: './images/home.jpg', alt: 'Home', text: 'Home' },
    { src: './images/angry.jpg', alt: 'Angry', text: 'Angry' },
    { src: './images/grandma.jpg', alt: 'Grandma', text: 'Grandma' },
    { src: './images/happy.jpg', alt: 'Happy', text: 'Happy' },
    { src: './images/hurt.jpg', alt: 'Hurt', text: 'Hurt' }
];

// Functions

// 1. Function to create a box
function createBox(image, classList, id) {
    const box = document.createElement('div');
    box.classList = classList;
    box.id = id;
    box.innerHTML = `
        <img src='${image.src}' alt='${image.alt}' />
        <p>${image.text}</p>
    `;
    return box;
}

//  2. Function to create a carousel of boxes by adding classes of left right and active
function createCarousel () {
    imagesContainer.innerHTML = '';
    const leftIndex = (currentIndex - 1 + images.length) % images.length;
    const activeIndex = currentIndex;
    const rightIndex = (currentIndex + 1) % images.length;
    // Create three boxes
    const leftBox = createBox(images[leftIndex], 'box left', 'box 1');
    const activeBox = createBox(images[activeIndex], 'box active', 'box 2');
    const rightBox = createBox(images[rightIndex], 'box right', 'box 3');
    // Append the boxes to container
    imagesContainer.appendChild(leftBox);
    imagesContainer.appendChild(activeBox);
    imagesContainer.appendChild(rightBox);
};

// 3. Function to create circles based on the number of images
function createCircles () {
    circlesDiv.innerHTML = '';
    
    images.forEach((image, index) => {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    
    circle.addEventListener('click', () => {
        currentIndex = index
        createCarousel();
        updateActiveCircle();
    }) 
    circlesDiv.appendChild(circle);
    });
    updateActiveCircle();
}

// 4. Function to update the class of circle when the picture changes
function updateActiveCircle() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.classList.remove('active');
        if (index === currentIndex) {
            circle.classList.add('active');
        };
    });  
};

// Add Event Listeners for the next and previous button using the same modulus logic
// 1. Event Listener for prevBtn
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex-1 + images.length) % images.length;
    createCarousel();
    updateActiveCircle();
})

// 1. Event Listener for nextBtn
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    createCarousel();
    updateActiveCircle();
})


createCarousel();
createCircles();

