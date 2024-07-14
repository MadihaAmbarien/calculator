const calculatorScreen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetScreen = false;

keys.addEventListener('click', (event) => {
    const { target } = event;
    const value = target.value;

    if (target.classList.contains('operator')) {
        if (firstValue && operator && !secondValue) {
            operator = value;
            calculatorScreen.value = `${firstValue} ${operator} `;
        } else if (firstValue && operator && secondValue) {
            firstValue = calculate(firstValue, operator, secondValue);
            operator = value;
            secondValue = '';
            calculatorScreen.value = `${firstValue} ${operator} `;
        } else {
            operator = value;
            firstValue = calculatorScreen.value;
            calculatorScreen.value += ` ${operator} `;
        }
        shouldResetScreen = true;
    } else if (target.classList.contains('equal-sign')) {
        if (firstValue && operator && calculatorScreen.value) {
            secondValue = calculatorScreen.value.split(' ').pop();
            calculatorScreen.value = calculate(firstValue, operator, secondValue);
            firstValue = '';
            operator = '';
            secondValue = '';
            shouldResetScreen = true;
        }
    } else if (target.classList.contains('all-clear')) {
        calculatorScreen.value = '';
        firstValue = '';
        operator = '';
        secondValue = '';
    } else {
        if (shouldResetScreen) {
            calculatorScreen.value = value;
            shouldResetScreen = false;
        } else {
            calculatorScreen.value += value;
        }
    }
});

function calculate(first, operator, second) {
    const firstNum = parseFloat(first);
    const secondNum = parseFloat(second);

    if (operator === '+') return firstNum + secondNum;
    if (operator === '-') return firstNum - secondNum;
    if (operator === '*') return firstNum * secondNum;
    if (operator === '/') return firstNum / secondNum;
    return second;
}