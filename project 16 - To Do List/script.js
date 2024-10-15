// Get DOM Elements
const form = document.getElementById('form');
const input = document.getElementById('text');
const container = document.getElementById('container');

// Initialize tasks array by checking localStorage
let tasks = JSON.parse(localStorage.getItem('task')) || [];

// Functions

// 1. Function to creatd ID for tasks
function createID() {
    return Math.floor(Math.random() * 1000000000);
}

// 2. Function to add task into an array
function addTask(e) {
    e.preventDefault();
    const toDo = input.value.trim();

    if (toDo !== '') {
        // Generate unique ID for each task
        const taskID = createID();
        const newTask = { id: taskID, task: toDo };
        // Add task to tasks array
        tasks.push(newTask);
        // Update localStorage
        localStorage.setItem('task', JSON.stringify(tasks));
        // Add task to UI
        addTaskToUI(newTask);
        // Clear input field  
        input.value = '';
    } else {
        alert('Please enter some task');
    }
}

// 3. Function to add task to UI
function addTaskToUI(task) {
    // Create a div to add task
    const toDoList = document.createElement('div');
    // Add class list to the div
    toDoList.classList.add('to-do-list-container');
    // assign id to to-do-list container
    toDoList.id = task.id;
    // update the inner html 
    toDoList.innerHTML = `
        <h2>${task.task}</h2>
        <div class="icon-container">
            <button class="edit">
                <i class="fas fa-edit" onclick = "editTask(${task.id})"></i>
            </button>
            <button class="remove" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    // append child to the container
    container.appendChild(toDoList);
}

// 4. Function to delele task
function deleteTask(id) {
    // Remove the task with the matching ID
    tasks = tasks.filter(task => task.id !== id);
    // Update localStorage
    localStorage.setItem('task', JSON.stringify(tasks));
    // Re-display tasks without reloading the page
    displayTasks();
}

// 5.Function to edit task
function editTask(id) {
    const taskToEdit = document.getElementById(id);
    // Only get the h2 content
    const taskText = taskToEdit.querySelector('h2').innerText;
    // Replace only the h2 with the input field for editing
    taskToEdit.querySelector('h2').innerHTML = `
         <input type="text" class="edit-input" value="${taskText}">
    `;
    // Add save button and leave other buttons untouched
    taskToEdit.querySelector('.icon-container').innerHTML = `
         <button class="save" onclick="saveTask(${id})">
             <i class="fas fa-save"></i>
         </button>
         <button class="remove" onclick="deleteTask(${id})">
             <i class="fas fa-trash"></i>
         </button>
    `;
    // Listen for "Enter" key press to save the task
    //   const editInput = taskToEdit.querySelector('.edit-input');
    //   editInput.addEventListener('keydown', function (e) {
    //       if (e.key === 'Enter') {
    //           saveTask(id);
    //       }
    //   });
}

// 6. function to save task
function saveTask(id) {
    // Access the div that has the task through id
    const updatedToDoListContainer = document.getElementById(id);
    // Access the task using query selector and then accessing the class
    const savedTask = updatedToDoListContainer.querySelector('.edit-input').value.trim();
    // Check if saved task has any value
    if (savedTask !== '') {
        // Update the task in the tasks array
        tasks = tasks.map(task => task.id === id ? { ...task, task: savedTask } : task);
        // Set the item in local storage
        localStorage.setItem('task', JSON.stringify(tasks));
        // Re-display tasks
        displayTasks();
    } else {
        alert('Please enter some task');
    }
};

// 7. Function to display tasks from localStorage
function displayTasks() {
    // Clear container
    container.innerHTML = '';
    tasks.forEach(task => {
        addTaskToUI(task);
    });
}

// Event Listeners
// 1. Event Listener for submit on form
form.addEventListener('submit', addTask);
// 2. Event listenr to load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', displayTasks);