// Archiving because I did this with hardcoded HTML
// Get DOM Elements
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const imagesContainer = document.getElementById('imagesContainer');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');

function nextImage() {
     // Store the content of box1 temporarily
     const tempImg = box1.querySelector('img').src;
     const tempText = box1.querySelector('p').innerText;
 
     // Move the content from box2 to box1
     box1.querySelector('img').src = box2.querySelector('img').src;
     box1.querySelector('p').innerText = box2.querySelector('p').innerText;
 
     // Move the content from box3 to box2
     box2.querySelector('img').src = box3.querySelector('img').src;
     box2.querySelector('p').innerText = box3.querySelector('p').innerText;
 
     // Move the temporarily stored content (original box1) to box3
     box3.querySelector('img').src = tempImg;
     box3.querySelector('p').innerText = tempText;
}

function prevImage() {
    // Store the content of box1 temporarily
    const tempImg = box3.querySelector('img').src;
    const tempText = box3.querySelector('p').innerText;

    // Move the content from box1 to box 3
    box3.querySelector('img').src = box2.querySelector('img').src;
    box3.querySelector('p').src = box2.querySelector('p');

    // Move the content from box1 to box 3
    box2.querySelector('img').src = box1.querySelector('img').src;
    box2.querySelector('p').src = box1.querySelector('p');

    // Move the content from box1 to box 3
    box1.querySelector('img').src = tempImg;
    box1.querySelector('p').src = tempText;

}


prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);
