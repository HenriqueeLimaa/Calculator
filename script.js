function add(num1, num2){
    let result = (num1 + num2);
    return (Number.isInteger(result)) ? result:result.toFixed(1);
}
function subtract(num1, num2){
    let result = num1 - num2;
    return (Number.isInteger(result)) ? result:result.toFixed(1);
}
function multiply(num1, num2){
    let result = num1 * num2;
    return (Number.isInteger(result)) ? result:result.toFixed(1);
}
function divide(num1, num2){
    let result = num1 / num2;
    return (Number.isInteger(result)) ? result:result.toFixed(1);
}

function operate(operator, num1, num2){
    let alright;
    switch (operator) {
        case '+':
            if(num2 === 1 && alright) {num2-=1, alright = true}
            return add(num1, num2);
        case '-':
            if(num2 === 1 && alright) {num2-=1, alright = true}
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
let decimalButton = document.querySelector('.decimal-button');

//Store the numbers used as arguments in the operate function
let operation,num1,eternal1,saveMe,lockDecimal;

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
        eternal1 = operate(operation, +eternal1, +num1);
        operation = "";
        num1 = 1;
        saveMe = false;
        console.log(num1);
        displayContent.textContent = eternal1 + operation;
    }//If the user didnt chose an operation yet, saves the first number in the eternal1 variable, cleans
    //num1 variable so it can be used again as the second value in the operate function, and display the
    //numbers. 
    else{
        if(!saveMe){
            num1 = displayContent.textContent;
            parseInt(eternal1 = num1);
            num1 = "";
        }
        operation = event.target.textContent;
        displayContent.textContent += operation;
        saveMe = true;
        lockDecimal = false;
    }
} ))

clearButton.addEventListener('click', ()=>{
    displayContent.textContent = "";
    operation = "";
    num1 = "";
    eternal1 = "";
    saveMe = false;
    lockDecimal = false;
})

backspace.addEventListener('click', ()=>{
    displayContent.textContent = displayContent.textContent.slice(0,-1);
    num1 = num1.slice(0,-1);
})

//Display results once the user click on the = button.
equalButton.addEventListener('click', ()=>{
    displayContent.textContent = operate(operation, +eternal1, +num1);
    operation = "";
    eternal1 = "";
    num1 = "";
    lockDecimal = false;
})

// if i do 7x7 and click in the X button again and then change to - it shows a bug
decimalButton.addEventListener('click', (event)=>{
    if(!lockDecimal){
        displayContent.textContent += event.target.textContent;
        num1 += event.target.textContent;
        lockDecimal = true;
    }
})