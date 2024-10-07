// Get DOM Elements
const filter = document.getElementById('filter-container');
const newsFeed = document.getElementById('news-feed-container');
const loader = document.getElementById('loader');

// Global variables for number of posts to fetch per API call and current page
let limit = 5;
let page = 1;

//Function to asynchronously fetch posts from API
async function fetchPosts() {
    // Fetch posts from the JSON Placeholder API
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    const data = await res.json();
    return data;
}

//  Function to render the posts fetched from API
async function renderPosts() {
    // Fetch the data from the API that we want to render
    const posts = await fetchPosts();
    // For each object in the posts array, render the post
    posts.forEach(post => {
        const postDiv = document.createElement('div');
        // Assign the post class to this div
        postDiv.classList.add('post');
        // Create the inner content for the main post div
        postDiv.innerHTML = `
                <div class="post-id">${post.id}</div>
                <div class="post-content"></div>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body"> ${post.body}</p>
            </div>
        `;
        // Render the post div in DOM
        newsFeed.appendChild(postDiv);
    })
}

// Function to render the CSS Loader Animation
function showLoader() {
    // Display the CSS Loader Animation
    loader.classList.add('show');
    // Increment the page global variable by 1
    page++;
    // Render the posts from the new page
    renderPosts();
    // Remove the loader
    loader.classList.remove('show');
}

// Function to filter posts
function filterPosts(e) {
    // Save the input text as filter keyword
    const filterKeyword = e.target.value.toLowerCase();
    // Get all post data from DOM
    const posts = document.querySelectorAll('.post');
    // Process all posts in the posts node list
    posts.forEach(post => {
        // Get the title text
        const title = post.querySelector('.post-title').innerText;
        // Get the body text
        const body = post.querySelector('.post-body').innerText;
        // Check if filterKeyword exists in title or body
        if (title.indexOf(filterKeyword) >= 0 || body.indexOf(filterKeyword) >= 0) {
            // Display the post if the filterKeyword exists in title or body of post
            post.style.display = 'block';
        } else {
            // Hide the post if the filter kwyword does not exist in title or body of post
            post.style.display = 'none';
        }
    })

}

// Event Listener
// Listen for scroll in the browser window
window.addEventListener('scroll', () => {
    // Destructuring properties from DOM
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
        // Display the loader animation
        showLoader();
    }
})

// Listen for input in the filter input
filter.addEventListener('input', filterPosts);

renderPosts();