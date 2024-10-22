// Get DOM Elements
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const imagesContainer = document.getElementById('imagesContainer');
const circlesDiv = document.querySelector('.circles-div');

// Set the current index
let currentIndex = 1;
let images = [];

// Functions
// 1. Function to get images from API
async function getUserImages() {
    const res = await fetch('https://randomuser.me/api/?results=3');
    const data = await res.json();
    images = data.results.map(user => ({
        image: user.picture.large,
        name: user.name.first
    }));
    createCarousel();
    createCircles();
}

// 2. Function to create a box
function createBox(newUser, classList) {
    const box = document.createElement('div');
    box.classList = classList;
    box.innerHTML = `
        <img src='${newUser.image}' alt='${newUser.name}' />
        <p>${newUser.name}</p>
    `;
    return box;
}

// 3. Function to create a carousel of boxes
function createCarousel() {
    imagesContainer.innerHTML = '';

    const leftIndex = (currentIndex - 1 + images.length) % images.length;
    const rightIndex = (currentIndex + 1) % images.length;

    const leftBox = createBox(images[leftIndex], 'box left');
    const activeBox = createBox(images[currentIndex], 'box active');
    const rightBox = createBox(images[rightIndex], 'box right');
    
    imagesContainer.appendChild(leftBox);
    imagesContainer.appendChild(activeBox);
    imagesContainer.appendChild(rightBox);
}

// 4. Function to create circles based on the number of images
function createCircles() {
    circlesDiv.innerHTML = '';
    images.forEach((_, index) => {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        circle.addEventListener('click', async () => {
            if (index === 0) {
                // Fetch a new image if the first circle is clicked
                await addImageToStart();
                currentIndex = 1; // Keep the new image at index 1 after adding it at the start
            } else if (index === images.length - 1) {
                // Fetch a new image if the last circle is clicked
                await addImageToEnd();
                currentIndex = images.length - 2; // Keep the current index one before the last
            } else {
                currentIndex = index;
            }
            createCarousel();
            updateActiveCircle();
        });
        circlesDiv.appendChild(circle);
    });
    updateActiveCircle();
}

// 5. Function to update the class of the active circle
function updateActiveCircle() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.classList.remove('active');
        if (index === currentIndex) {
            circle.classList.add('active');
        }
    });
}

// 6. Function to add a new image to the end of the array
async function addImageToEnd() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const newUser = {
        image: data.results[0].picture.large,
        name: data.results[0].name.first
    };
    // Add the new image to the end of the array
    images.push(newUser);
    createCircles();
}

// 7. Function to add a new image to the start of the array
async function addImageToStart() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const newUser = {
        image: data.results[0].picture.large,
        name: data.results[0].name.first
    };
    // Add the new image to the beginning of the array
    images.unshift(newUser);
    createCircles();
}

// Event Listeners
// 1. Event Listener for nextBtn
nextBtn.addEventListener('click', async () => {
    if (currentIndex === images.length - 2) {
        // Fetch a new image from API if we're at the secondlast image
        await addImageToEnd();
    }
    // Move to the next image
    currentIndex = (currentIndex + 1) % images.length;
    createCarousel();
    createCircles();
});

// 2. Event Listener for prevBtn
prevBtn.addEventListener('click', async () => {
    if (currentIndex === 1) {
        // Fetch a new image from API if we're at the second image
        await addImageToStart();
        // Keep it at the new first image
        currentIndex = 1; 
    } else {
        // Move to the previous image
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
    createCarousel();
    createCircles();
});

// Initial call to load images
getUserImages();
