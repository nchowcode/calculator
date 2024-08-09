const display = document.querySelector(".display");
const buttonpad = document.querySelector(".buttonpad");
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
    buttons.forEach(button => {
        button.addEventListener('mouseover' , () => {
            button.style.opacity = "0.8";
        });

        button.addEventListener('mouseout' , () => {
            button.style.opacity = "1.0";
        });
        button.addEventListener('click', () => {
            button.style.backgroundColor = "orange";
            if (button.value === "="){
                if (prevNum && currNum && operator){
                    currNum = calculate(prevNum, currNum, operator)
                    displayResult();
                    prevNum = "";
                    operator = "";
                    shouldReset = true;
                };
            } else if (button.className === "operator") {
                if (currNum){
                    operator = button.value;
                    prevNum = currNum;
                    currNum = "";
                    shouldReset = false;
                }
            } else if (button.className === "status") {
                clear();
                displayResult();
            } else if (button.className === "rounding"){
                if (!currNum.toString().includes(".")){
                    currNum += button.value;
                } 
                shouldReset = false;
                displayResult();
            } else if (button.className === "percent"){
                currNum *= button.value;
                shouldReset = false;
                displayResult();
            } else if (button.className === "sign"){
                currNum = currNum * -1;
                displayResult();
            } else {      
                if (button.className === "numeric") {
                    if (shouldReset){
                        currNum = button.value;
                    } else if (currNum.length <= MAX_LENGTH) {
                        currNum += button.value;
                    }
                };
                shouldReset = false;
                displayResult();
            }; 
        setTimeout(() => {
            button.style.backgroundColor = "";
        }, 600);
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

window.addEventListener('keydown', (keybind) => {
    const keyval = document.querySelector(`button[keyboard='${keybind.key}']`);

    if (keyval) {
        keyval.click();
    }
});

displayResult();
storeValues();