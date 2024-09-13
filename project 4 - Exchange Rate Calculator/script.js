//Get DOM Elements

const currencyOne = document.getElementById('currency-one');
const amountCurrencyOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountCurrencyTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

//Fetch Exchange Rates & Update the DOM
function calculate(){
    const currencyOneCode = currencyOne.value;
    const currencyTwoCode = currencyTwo.value;
    //Send request to ExchangeRate-API for conversion rates for currency one
    fetch(`https://v6.exchangerate-api.com/v6/66578676e39552ac74600479/pair/${currencyOneCode}/${currencyTwoCode}`)
    .then (res => res.json())
    .then (data => {
    //Get the conversion rate from currency one to currency two
    const conversionRate = data.conversion_rate;
    //Update the DOM to display the conversion rate
    rate.innerText = `1 ${currencyOneCode} = ${conversionRate}${currencyTwoCode}`;
    //Formatting currency two amount
    const amount2 = new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyTwoCode}).format((amountCurrencyOne.value*conversionRate).toFixed(2));
    //Update the Currency Two Amount 
    amountCurrencyTwo.value = amount2;
});
}


//Event Listeners
//Recalculate exchange rate when currency one changes
currencyOne.addEventListener('change', calculate);
//Recalculate exchange rate when amount one changes
amountCurrencyOne.addEventListener('input', calculate);
//Recalculate exchange rate when currency two changes
currencyTwo.addEventListener('change', calculate);
//Recalculate exchange rate when amount two changes
amountCurrencyTwo.addEventListener('input', calculate);
//Event Listener for swap button
swap.addEventListener('click', () => {
    //Save value of currency one code to temp variable
    const temp = currencyOne.value;
    //copy currrency two code to currency one
    currencyOne.value = currencyTwo.value;
    ////copy currrency one code from temp varianle to currency two
    currencyTwo.value = temp;
    //Recalculate Exchange Rate after swap
    calculate();
})


//Execute calculate function on page load
calculate();