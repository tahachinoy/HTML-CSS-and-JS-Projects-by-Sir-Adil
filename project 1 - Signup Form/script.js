//Retrieving HTML elements from the DOM
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//All Functions
//function to update class of form control and message for errors
function showError(input, message) {
    //Get the parent element of the input field i.e form control
    const formControl = input.parentElement;
    //Overwrite the class, add error
    formControl.className = 'form-control error';
    //get the small element for the error message
    const small = formControl.querySelector('small');
    //Overwrite the text for small element using input message
    small.innerText = message;
}

//function to update class of form control and message for success

function showSuccess(input) {
    //Get the parent element of the input field i.e form control
    const formControl = input.parentElement;
    //Overwrite the class, add error
    formControl.className = 'form-control success';
}

//Function to check if email is valid

function isValidEmail (email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Event listeneres are usually added at the end of the page
//Create event listener for submit button
form.addEventListener('submit', function (e) {
    //Stop page from reloading on submit
    e.preventDefault();

    //Check to see if fields meet required field requirement
    //Check if username input is empty
    if (username.value === '') {
        showError(username, 'Username is required');
    } else {
        showSuccess(username);
    }
    //Check if email input is empty
    if (email.value === '') {
        showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
        showError(email, 'Email is invalid')
    }
     else {
        showSuccess(email);
    }
    //Check if password input is empty
    if (password.value === '') {
        showError(password, 'Password is required');
    } else {
        showSuccess(password);
    }
    //Check if password2 input is empty
    if (password2.value === '') {
        showError(password2, 'Password2 is required');
    } else {
        showSuccess(password2);
    }
});