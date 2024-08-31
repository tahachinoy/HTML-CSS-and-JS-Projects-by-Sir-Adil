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

//Function to check if required fields have data

function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if ( input.value === '') {
            //showError(input, input.id + 'is required'); ye ek tareeqa hai
            //showError(input, `${input.id} is required`); ye bhi ek tareeqa hai lekin is main username email sab ka first letter capital nahi ho raha, ek teesra tareeqa hai jis ke liye we will create a small function of getfieldid
            showError(input, `${getFieldId(input)} is required`)
        } else {
            showSuccess(input);
        }
    })

}
//Function to get the id of the input field

function getFieldId(input) {
   //return input.id.toUpperCase(); is se sab uppercase ho jaayein ge humain sab uppercase main nahi karnay
   return input.id.charAt(0).toUpperCase() + input.id.slice(1); //input id slice 1 se basically hum first letter ko baaki letters se concatenate kar rahay hain 
}

//Event listeneres are usually added at the end of the page
//Event listener for the form on submit button
form.addEventListener('submit', function (e) {
    //Stop page from reloading on submit
    e.preventDefault();

    checkRequired([username, email, password, password2]);

});