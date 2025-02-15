// Here I am getting the display element so I can use it later 
const display = document.getElementById("display");

// Here I am adding values to the display when a button is clicked
function appendValue(value) {
    let lastChar = display.value.slice(-1);

    // Here I am preventing two operators from being added in a row
    if (isOperator(value) && isOperator(lastChar)) {
        return;
    }

    display.value += value;
    scrollToEnd(); // Here I am making sure the latest input is always visible
}

// Here I am calculating the result when "=" is pressed
function calculate() {
    try {
        let result = eval(display.value);

        // Here I am checking if the result is valid (no division by zero, no infinity)
        if (!isFinite(result) || result === undefined) {
            display.value = "Error"; // Here I am showing an error for invalid calculations
        } else {
            display.value = result; // Here I am updating the display with the result
        }
    } catch (error) {
        display.value = "Error"; // Here I am handling cases where the input is invalid
    }
}

// Here I am calculating the square root of the displayed number
function calculateSquareRoot() {
    let currentValue = parseFloat(display.value);

    // Here I am making sure the number is not negative or empty
    if (currentValue < 0 || isNaN(currentValue)) {
        display.value = "Error"; // Here I am showing an error for invalid values
    } else {
        display.value = Math.sqrt(currentValue).toFixed(6); // Here I am calculating the square root and limiting it to 6 decimals
    }
}

// Here I am calculating the percentage
function calculatePercentage() {
    let expression = display.value;

    // Here I am making sure the display is not empty or just an operator
    if (expression === "" || isOperator(expression.slice(-1))) {
        return;
    }

    // Here I am checking if the expression contains an operator
    let operators = ["+", "-", "*", "/"];
    let lastOperatorIndex = -1;

    for (let operator of operators) {
        let index = expression.lastIndexOf(operator);
        if (index > lastOperatorIndex) {
            lastOperatorIndex = index;
        }
    }

    if (lastOperatorIndex !== -1) {
        // Here I am getting the number before the last operator
        let baseValue = parseFloat(expression.slice(0, lastOperatorIndex));
        let percentageValue = parseFloat(expression.slice(lastOperatorIndex + 1));

        // Here I am making sure both numbers are valid
        if (!isNaN(baseValue) && !isNaN(percentageValue)) {
            let percentageResult = baseValue * (percentageValue / 100);
            display.value = expression.slice(0, lastOperatorIndex + 1) + percentageResult;
            return;
        }
    }

    // If there's no operator, just convert the number to a percentage
    display.value = parseFloat(expression) / 100;
}

// Here I am clearing the display when "C" is pressed
function clearDisplay() {
    display.value = "";
}

// Here I am deleting the last character from the display
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Here I am checking if the given character is an operator
function isOperator(char) {
    return ["+", "-", "*", "/", "%"].includes(char);
}

// Here I am making sure the latest input is always visible by scrolling to the right
function scrollToEnd() {
    display.scrollLeft = display.scrollWidth;
}
