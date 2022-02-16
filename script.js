let operation="",num1="",eternal1="",saveMe,lockDecimal;

const displayContent = document.querySelector('.display-text');
const numberButtons = document.querySelectorAll('.number-buttons');
const operationButtons = document.querySelectorAll('.operation-buttons');
const clearButton = document.querySelector('.clear-button');
const backspace = document.querySelector('.backspace');
const equalButton = document.querySelector('.equal-button');
const decimalButton = document.querySelector('.decimal-button');

numberButtons.forEach(button => button.addEventListener("click", (event)=>{
    numberButtonsFunc(event);
}));
operationButtons.forEach(button => button.addEventListener('click', (event)=>{
    operationButtonsFunc(event);
 } ))
clearButton.addEventListener('click', ()=>{
    clearButtonFunc();
})
backspace.addEventListener('click', ()=>{
    backspaceFunc();
})
equalButton.addEventListener('click', ()=>{
    equalButtonFunc();
})
decimalButton.addEventListener('click', ()=>{
    decimalButtonFunc();
})
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

function numberButtonsFunc(event){
    displayContent.textContent += event.target.textContent;
    num1 += event.target.textContent;
}

function operationButtonsFunc(event){
     //If the user already chose an operation(eg 10 + 4)and clicks in an operation again, display
    //the result of the last operation.
    if(operation){
        eternal1 = operate(operation, +eternal1, +num1);
        operation = "";
        num1 = 1;
        saveMe = false;
        displayContent.textContent = eternal1 + operation;
    }//If the user didnt chose an operation, save the first number in the eternal1 variable, clean
    //num1 variable so it can be used again as the second value in the operate function, and display the
    //numbers. 
    else{
        if(!saveMe){
            num1 = displayContent.textContent;
            parseInt(eternal1 = num1);
            num1 = "";
        }
        operation = event.key || event.target.textContent;
        displayContent.textContent += operation;
        saveMe = true;
        lockDecimal = false;
    }
}

function clearButtonFunc(){
    displayContent.textContent = "";
    operation = "";
    num1 = "";
    eternal1 = "";
    saveMe = false;
    lockDecimal = false;
}

function backspaceFunc(){
    if(num1.charAt(num1.length -1) === ".") lockDecimal = false;
    displayContent.textContent = displayContent.textContent.slice(0,-1);
    num1 = num1.slice(0,-1);
}

function equalButtonFunc(){
    displayContent.textContent = operate(operation, +eternal1, +num1);
    eternal1 = operate(operation, +eternal1, +num1);
    operation = ""; 
    num1 = "";
    lockDecimal = false;
}

function decimalButtonFunc(){
    if(!lockDecimal){
        displayContent.textContent += ".";
        num1 += ".";
        lockDecimal = true;
    }
}