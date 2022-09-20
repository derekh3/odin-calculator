let whichNumber = 1;
let operator = '';
let firstNumber = 0;
let refreshDisplay = false;
let bottomDisplayValue = 0;
let maxLength = 9;
let previousIsOperator = false;

function truncate(number) {
    let numberStr = number.toString();
    if (numberStr.length > maxLength) {
        let beforeDecimal = numberStr.indexOf(".");
        if (beforeDecimal === -1) {
            beforeDecimal = numberStr.length;
        }
        let roomToSpare = maxLength - beforeDecimal;
        console.log(roomToSpare);
        if (roomToSpare < 0 && number > 0) {
            return 999999999;
        } else if (roomToSpare < 0 && number < 0) {
            return -999999999;
        }
        return number.toFixed(roomToSpare);
    } else {
        return number;
    }
}

function getResult(a, b, operator) {
    if (operator === "*") {
        return a * b;
    } else if (operator === "/") {
        return a / b;
    } else if (operator === "+") {
        return a + b;
    } else if (operator === "-") {
        return a - b;
    }
}

function clearAll() {
    bottomDisplay.innerText = "0";
    bottomDisplayValue = 0;
    topDisplay.innerText = "";
    whichNumber = 1;
    operator = "";
    previousIsOperator = false;
}

const topDisplay = document.querySelector(".top-display");
const bottomDisplay = document.querySelector(".bottom-display");
const numbers = document.querySelectorAll(".number");
const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");

const divide = document.querySelector("#divide");
const multiply = document.querySelector("#multiply");
const add = document.querySelector("#add");
const subtract = document.querySelector("#subtract");

const equals = document.querySelector("#equals");
const decimal = document.querySelector("#decimal");

for (let number of numbers) {
    number.addEventListener("click", (e) => {
        if (bottomDisplay.innerText.length < maxLength) {
            if (refreshDisplay || (Number(bottomDisplay.innerText) === 0 && !bottomDisplay.innerText.includes("."))) {
                bottomDisplay.innerText = e.target.innerText;
                refreshDisplay = false;
                decimal.disabled = false;
            }
            else {
                bottomDisplay.innerText = bottomDisplay.innerText + e.target.innerText;
            }
            previousIsOperator = false;
        } else if (refreshDisplay) {
            bottomDisplay.innerText = e.target.innerText;
            refreshDisplay = false;
            previousIsOperator = false;
            decimal.disabled = false;
        }
    });
}

del.addEventListener("click", (e) => {
    const text = bottomDisplay.innerText;
    bottomDisplay.innerText = text.slice(0, text.length - 1);
    bottomDisplayValue = bottomDisplay.innerText;
    previousIsOperator = false;
});

clear.addEventListener("click", (e) => {
    clearAll();
});

function updateWithOperator(newOperator) {
    if (!previousIsOperator) {
        if (whichNumber === 1) {
            firstNumber = Number(bottomDisplay.innerText);
            topDisplay.innerText = bottomDisplay.innerText + " " + newOperator;
            whichNumber = 2;
        } else {
            bottomDisplayValue = Number(bottomDisplay.innerText);
            if (bottomDisplayValue === 0 && operator === "/") {
                alert("Can't divide by 0!")
                clearAll();
            } else {
                let result = getResult(firstNumber, bottomDisplayValue, operator);
                topDisplay.innerText = `${result} ${newOperator}`;
                bottomDisplay.innerText = `${truncate(result)}`;
                bottomDisplayValue = result;
                firstNumber = result;
            }
        }
    } else {
        topDisplay.innerText = topDisplay.innerText.slice(0, -1) + " " + newOperator;
    }
    operator = newOperator;
    refreshDisplay = true;
    previousIsOperator = true;
    if (!bottomDisplay.innerText.includes(".")) {
        decimal.disabled = false;
    }
}

divide.addEventListener("click", () => {
    updateWithOperator("/");
});

multiply.addEventListener("click", () => {
    updateWithOperator("*");
});

add.addEventListener("click", () => {
    updateWithOperator("+");
});

subtract.addEventListener("click", () => {
    if (bottomDisplay.innerText === "0" || previousIsOperator) {
        bottomDisplay.innerText = "-";
        refreshDisplay = false;
    }
    else {
        updateWithOperator("-");
    }
});


equals.addEventListener("click", () => {
    if (whichNumber === 2 && !refreshDisplay) {
        bottomDisplayValue = Number(bottomDisplay.innerText);
        if (bottomDisplayValue === 0 && operator === "/") {
            alert("Can't divide by 0!")
            clearAll();
        } else {

            let result = getResult(firstNumber, bottomDisplayValue, operator);
            topDisplay.innerText = topDisplay.innerText + " " + bottomDisplayValue + " = ";
            bottomDisplay.innerText = `${truncate(result)}`;
            bottomDisplayValue = result;
            whichNumber = 1;
            firstNumber = result;
            refreshDisplay = true;
            previousIsOperator = false;
            decimal.disabled = false;
        }
    }
});

decimal.addEventListener("click", () => {
    if (refreshDisplay === true) {
        bottomDisplay.innerText = "0.";
        refreshDisplay = false;
    } else {
        if (bottomDisplay.innerText.includes(".")) {
            return;
        } else {
            bottomDisplay.innerText = bottomDisplay.innerText + ".";
            decimal.disabled = true;
        }
    }
});