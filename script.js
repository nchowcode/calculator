const display = document.querySelector(".display");
const keypad = document.querySelector(".keypad");
const buttons = document.querySelectorAll("button");

let currNum = "";
let prevNum = "";
let operator = "";
let displayValue = "";

let shouldReset = false;

function calculate(prevNum, currNum, operator){
    const num1 = parseFloat(prevNum);
    const num2 = parseFloat(currNum);

    switch (operator) {
        case "+" :
            return (num1 + num2).toString();
        case "-" :
            return (num1 - num2).toString();
        case "/":
            return (num2 != 0 ? (num1 / num2).toString() : "Error");
        case "*":
            return (num1 * num2);
    }
}
function storeValues() {

    buttons.forEach(key => {
        key.addEventListener('click', () => {
            console.log(key);
            if (key.value === "="){
                if (prevNum && currNum && operator){
                    currNum = calculate(prevNum, currNum, operator)
                    displayValue = currNum;
                    displayResult();
                    prevNum = "";
                    operator = "";
                    shouldReset = true;
                }
            } else if (key.className === "operand") {
                if (currNum){
                    operator = key.value;
                    prevNum = currNum;
                    currNum = "";
                    shouldReset = false;
                }
            } else if (key.className === "status") {
                clear();
                displayResult();
                shouldReset = true;
            } else if (key.className === "rounding"){
                currNum += key.value;
                shouldReset = false;
            } else {      
                if (key.className === "numeric") {
                    if (shouldReset){
                        currNum = key.value;
                } else {
                    currNum += key.value;
                };
            };
            displayValue = currNum;
            displayResult();
            }; 
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
    display.innerHTML = displayValue;
    display.style.color = "white";
}


storeValues();