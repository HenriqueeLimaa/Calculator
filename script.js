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
    switch (operator.toLowerCase()) {
        case '+':
            if(num2 === 1 && alright) {num2-=1, alright = true}
            return add(num1, num2);
        case '-':
            if(num2 === 1 && alright) {num2-=1, alright = true}
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            if(num2 === 0) return displayContent.textContent = "Error!";
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
let operation="",num1="",eternal1="",saveMe,lockDecimal;

//Detect when the user click on a number button, makes it appear on the display and stores it on num1
function numberButtonsFunc(event){
    displayContent.textContent += event.target.textContent;
    num1 += event.target.textContent;
}
numberButtons.forEach(button => button.addEventListener("click", (event)=>{
    numberButtonsFunc(event);
}));
//Detect when the user click on an operation button.

function operationButtonsFunc(event){
    if(operation){
        eternal1 = operate(operation, +eternal1, +num1);
        operation = "";
        num1 = 1;
        saveMe = false;
        console.log(num1);
        displayContent.textContent = eternal1 + operation;
    }else{
        if(!saveMe){
            num1 = displayContent.textContent;
            parseInt(eternal1 = num1);
            num1 = "";
        }
        operation = event.key;
        displayContent.textContent += operation;
        saveMe = true;
        lockDecimal = false;
    }
}
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
//Backspace function and listeners
function backspaceFunc(){
    if(num1.charAt(num1.length -1) === ".") lockDecimal = false;
    displayContent.textContent = displayContent.textContent.slice(0,-1);
    num1 = num1.slice(0,-1);
}
backspace.addEventListener('click', ()=>{
    backspaceFunc();
})
//Display results once the user click on the = button.
function equalButtonFunc(){
    displayContent.textContent = operate(operation, +eternal1, +num1);
    eternal1 = operate(operation, +eternal1, +num1);
    operation = ""; 
    num1 = "";
    lockDecimal = false;
}
equalButton.addEventListener('click', ()=>{
    equalButtonFunc();
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

//KEYBOARD SUPPORT
window.addEventListener('keydown', (event)=>{
    switch(event.key.toLowerCase()){
        case ".":
            return decimalButtonFunc(); 
        case "=":
            return equalButtonFunc();
        case "backspace":
            return backspaceFunc();
        case "c":
            return clearButtonFunc();
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return displayContent.textContent += event.key,
            num1 += event.key;
        case "+":
        case "-":
        case "x":
        case "/":
            return operationButtonsFunc(event);
    }
})