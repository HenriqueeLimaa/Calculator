function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}

function operate(operator, num1, num2){
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'X':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

let displayContent = document.querySelector('.display-text');
let numberButtons = document.querySelectorAll('.number-buttons');
let operationButtons = document.querySelectorAll('.operation-buttons');
let clearButton = document.querySelector('.clear-button');
let backspace = document.querySelector('.backspace');
let equalButton = document.querySelector('.equal-button');

let operation,num1,num2,eternal1;

numberButtons.forEach(button => button.addEventListener("click", (event)=>{
    displayContent.textContent += event.target.textContent;
    num1 += event.target.textContent;
  }))

operationButtons.forEach(button => button.addEventListener('click', (event)=>{
    num1 = displayContent.textContent;
    const cu = num1;
    num1 = "";
    parseInt(eternal1 = cu);
    displayContent.textContent += event.target.textContent;
    operation = `${event.target.textContent}`;
} ))

clearButton.addEventListener('click', ()=>{
    displayContent.textContent = "";
    operation = "";
    num1 = "";
    num2 = "";
})

equalButton.addEventListener('click', (event)=>{
    displayContent.textContent += event.target.textContent;
    displayContent.textContent = operate(operation, +eternal1, +num1);
})
