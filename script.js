const display = document.querySelector(".display");
const keypad = document.querySelector(".keypad");
const buttons = document.querySelectorAll("button");

let currNum = "";
let prevNum = "";
let operator = "";
let displayValue = "";

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
        key.addEventListener('click', (event) => {
            console.log(key);
            if (key.value === "="){
                if (prevNum && currNum && operator){
                    const solution = calculate(prevNum, currNum, operator)
                    displayValue = solution;
                    displayResult();
                }
            };
            if (key.className === "numeric"){
                currNum += key.value;
                displayValue = currNum;
                displayResult();
            };
            if (key.className === "operand"){
                console.log("operand clicked");
                operator = key.value;
                if (key.className === "numeric"){
                    secondNum += key.value;
                    displayValue = secondNum;
                    displayResult();
                }

            } 

            
    });
    });
}

function displayResult(){
    display.innerHTML = displayValue;
    display.style.color = "white";
}


storeValues();