// Get DOM Elements
const balance = document.getElementById('balance');
const moneyCredit = document.getElementById('money-credit');
const moneyDebit = document.getElementById('money-debit');
const list = document.getElementById('list');
const form = document.getElementById('add-form');
const reason = document.getElementById('reason');
const amount = document.getElementById('amount');

// Get transaction data from storage
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to display transactions in DOM - History Section
function displayTransaction(transaction) {
    // // Calculate if transaction is Credit or Debit
    // const type = transaction.amount > 0 ? '+' : '-';
    // Create a list item for the transaction
    const transactionLi= document.createElement('li');
    // Determine class based on transaction type. If positive, then credit, otherwise debit
    transactionLi.classList.add(transaction.amount > 0 ? 'credit' : 'debit');
    // Assign the inner HTML for the transaction Li
    transactionLi.innerHTML = `
        ${transaction.reason} <span> ${transaction.amount}</span>
        <button class="delete-btn" onclick = "deleteTransaction(${transaction.id})">X</button>
    `; 
    // Add the list item in DOM under the transaction history list
    list.appendChild(transactionLi);
}

// Function to update all balances
function updateBalance() {
    // Create a new arry with just the amounts from the transactions array
    const transactionAmounts = transactions.map(transaction => transaction.amount);
    // Calculate balance values
    const totalBalance = transactionAmounts.reduce( (acc, amount) => (acc += amount), 0 );
    // Calculate total credit balance value
    const creditBalance = transactionAmounts
                            .filter (amount => amount > 0)
                            .reduce((acc, amount) => (acc += amount), 0)
    // Calculate total debit balance values
    const debitBalance = transactionAmounts
                            .filter (amount => amount < 0)
                            .reduce((acc, amount) => (acc += amount), 0)
    // Update the values in DOM for overall balance, credit balance and debit balance
    balance.innerText = `$${totalBalance}`;
    moneyCredit.innerText = `$${creditBalance}`;
    moneyDebit.innerText = `$${debitBalance}`;
}

// Function to create a random ID
function createID() {
    return Math.floor(Math.random() * 1000000000);
}

// Function to add a transaction from the form
function addTransaction(e) {
    // Stop the page reload
    e.preventDefault();
    // Check if the form has valid data
    if(reason.value.trim() === '' || amount.value.trim() === '') {
        // Display the error message if form is not complete
        alert('Please provide a valid reason and transaction amount')
    } else {
        // Create an object for the transaction containing id,
        // text for the reason and the transaction amount
        const transaction = {
            id: createID(),
            reason: reason.value,
            amount: +amount.value
        }
        // Push the new transaction into the transactions array
        transactions.push(transaction);
        // Save transactions to Local Storage
        localStorage.setItem('transactions', JSON.stringify(transactions))
        // Display the new transactions is the DOM
        displayTransaction(transaction);
        // Update All balances
        updateBalance();
        // Clear form fields
        reason.value = '';
        amount.value = '';

    }
}

// Function to delete a transaction from the history
function deleteTransaction(id) {
    // Filter out the transaction with the provided id
    transactions = transactions.filter ( transaction => transaction.id !== id);
    // Initialize the app again to update the DOM
    init();
    //Update local storage when the item is deleted
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

// Function to initialize Application
function init() {
    // Clear all transaction history
    list.innerHTML = '';
    // Display all transaction is db in the DOM
    transactions.forEach(displayTransaction);
    // Update all balance values
    updateBalance();
}

// Event Listeners
// 1. Listen for form submit to add a transaction
form.addEventListener('submit', addTransaction);


// Initialize the application
init();
