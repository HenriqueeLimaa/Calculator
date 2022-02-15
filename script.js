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
function numberButtonsFunc(event){
    displayContent.textContent += event.target.textContent;
    num1 += event.target.textContent;
}
numberButtons.forEach(button => button.addEventListener("click", (event)=>{
    numberButtonsFunc(event);
}));
window.addEventListener('keypress', (event)=>{
    for(let button of numberButtons){
        if(event.key === button.textContent){
            Number(num1 += button.textContent)
        }
    }
})

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
//ClearButton function and listeners
function clearButtonFunc(){
    displayContent.textContent = "";
    operation = "";
    num1 = "";
    eternal1 = "";
    saveMe = false;
    lockDecimal = false;
}
clearButton.addEventListener('click', ()=>{
    clearButtonFunc();
})
window.addEventListener('keypress', (event)=>{
    if(event.key === "c" || "C") clearButtonFunc();
})
//Backspace function and listeners
function backspaceFunc(){
    if(num1.charAt(num1.length -1) === ".") lockDecimal = false;
    displayContent.textContent = displayContent.textContent.slice(0,-1);
    num1 = num1.slice(0,-1);
}
backspace.addEventListener('click', ()=>{
    backspaceFunc();
})
window.addEventListener('keydown', (event)=>{
    if (event.code === "Backspace") backspaceFunc();
})
//Display results once the user click on the = button.
function equalButtonFunc(){
    displayContent.textContent = operate(operation, +eternal1, +num1);
    operation = "";
    eternal1 = "";
    num1 = "";
    lockDecimal = false;
}
equalButton.addEventListener('click', ()=>{
    equalButtonFunc();
})
window.addEventListener('keypress', (event)=>{
    if(event.key === "=") equalButtonFunc();
})
//DecimalButton function and listeners
function decimalButtonFunc(){
    if(!lockDecimal){
        displayContent.textContent += ".";
        num1 += ".";
        lockDecimal = true;
    }
}
decimalButton.addEventListener('click', ()=>{
    decimalButtonFunc();
})
window.addEventListener('keypress', (event)=>{
    if(event.key === ".") decimalButtonFunc();  
})