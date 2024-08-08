const display = document.querySelector(".display");
const keypad = document.querySelector(".keypad");
const buttons = document.querySelectorAll("button");

let currNum = "";
let prevNum = "";
let operator = "";
let displayValue = "0";
let shouldReset = false;

const MAX_LENGTH = 10;

function calculate(prevNum, currNum, operator){
    const num1 = parseFloat(prevNum);
    const num2 = parseFloat(currNum);

    switch (operator) {
        case "+" :
            result = (num1 + num2);
            break;
        case "-" :
            result = (num1 - num2);
            break;
        case "/":
            result = (num2 != 0 ? (num1 / num2) : "Error");
            break;
        case "*":
            result = (num1 * num2);
            break;
    }
    return formatResult(result);
}

function storeValues() {
    
    buttons.forEach(key => {
        key.addEventListener('click', () => {
            console.log(key);
            key.style.backgroundColor = "orange";
            if (key.value === "="){
                if (prevNum && currNum && operator){
                    currNum = calculate(prevNum, currNum, operator)
                    displayResult();
                    prevNum = "";
                    operator = "";
                    shouldReset = true;
                };
            } else if (key.className === "operator") {
                if (currNum){
                    operator = key.value;
                    prevNum = currNum;
                    currNum = "";
                    shouldReset = false;
                }
            } else if (key.className === "status") {
                clear();
                displayResult();
            } else if (key.className === "rounding"){
                if (!currNum.includes(".")){
                    currNum += key.value;
                } 
                shouldReset = false;
                displayResult();
            } else if (key.className === "percent"){
                currNum *= key.value;
                shouldReset = false;
                displayResult();
            } else if (key.className === "sign"){
                currNum = currNum * -1;
                displayResult();
            } else {      
                if (key.className === "numeric") {
                    if (shouldReset){
                        currNum = key.value;
                    } else if (currNum.length <= MAX_LENGTH) {
                        currNum += key.value;
                    }
                };
                shouldReset = false;
                displayResult();
            }; 
        setTimeout(() => {
            key.style.backgroundColor = "";
        }, 300);
    });
    });
};

function clear(){
    currNum = "";
    prevNum = "";
    operator = "";
    displayValue = ""
}

function displayResult(){
    if (currNum) {
        displayValue = currNum;
    } else{
        displayValue = "0";
    }
    display.innerHTML = displayValue;
    display.style.color = "white";
}

function formatResult(result){
    if (result === "Error"){
        return result;
    };
    
    if (Math.round(result) > 1e8){
        return result.toExponential(1);
    } else if (result.toString().includes(".") && result.toString().length > MAX_LENGTH){
        const numSize = Math.round(result).toString().length;
        return result.toFixed(MAX_LENGTH - numSize);
    } else {
        return result;
    }
};

displayResult()
storeValues();