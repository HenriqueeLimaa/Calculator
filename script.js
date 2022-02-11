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

//Store the numbers used as arguments in the operate function
let operation,num1,eternal1;

//Detect when the user click on a number button, makes it appear on the display and stores it on num1
numberButtons.forEach(button => button.addEventListener("click", (event)=>{
    displayContent.textContent += event.target.textContent;
    num1 += event.target.textContent;
  }))

//Detect when the user click on an operation button.
operationButtons.forEach(button => button.addEventListener('click', (event)=>{
    //If the user already chose an operation(eg 10 + 4)and clicks in an operation again, the display
    //will return the result of the last operation.
    if(operation){
        operation = event.target.textContent;
        displayContent.textContent += event.target.textContent;
        displayContent.textContent = operate(operation, +eternal1, +num1);
    }
    //If the user didnt chose an operation yet, saves the first number in the eternal1 variable, cleans
    //num1 variable so it can be used again as the second value in the operate function, and display the
    //numbers. 
    num1 = displayContent.textContent;
    const holdNum1 = num1;
    num1 = "";
    parseInt(eternal1 = holdNum1);
    displayContent.textContent += event.target.textContent;
    operation = event.target.textContent;
} ))

clearButton.addEventListener('click', ()=>{
    displayContent.textContent = "";
    operation = "";
    num1 = "";
})

backspace.addEventListener('click', ()=>{
    displayContent.textContent.splice(-1,1);
})

//Display results once the user click on the = button.
equalButton.addEventListener('click', (event)=>{
    displayContent.textContent += event.target.textContent;
    displayContent.textContent = operate(operation, +eternal1, +num1);
})

// if i do 7x7 and click in the X button again and then change to - it shows a bug