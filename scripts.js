const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".buttons button");
buttons.forEach(button => button.addEventListener("click", updateCalc));

let operandA = null;
let operandB = null;
let storedOperator = null;
let isNewOperand = true;

function operate(a, b, operator) {
  [a, b] = [+a, +b];

  switch (operator) {
    case "divide": return a / b;
    case "multiply": return a * b;
    case "subtract": return a - b;
    case "add": return a + b;
  }
}

function updateCalc(event) {
  if (this.id === "clear") {
    display.textContent = 0;

    operandA = null;
    operandB = null;
    storedOperator = null;
    isNewOperand = true;
  }
  
  if (this.id === "equals") {
    if (isNewOperand) {
      operandA = display.textContent;
    } else {
      operandB = display.textContent;
    }

    if (!operandB) operandB = operandA;
    
    let result = operate(operandA, operandB, storedOperator);
    if (result) display.textContent = result;

    isNewOperand = true;
  }

  if (this.classList.contains("digit")) {
    if (isNewOperand) {
      display.textContent = this.textContent;
      isNewOperand = false;
    } else {
      display.textContent += this.textContent;
    }
  }

  if (this.id === "decimal") {
    if (isNewOperand) {
      display.textContent = "0.";
      isNewOperand = false;
    } else {
      let containsDecimal = display.textContent.includes(".");

      if (!containsDecimal) {
        display.textContent += this.textContent;
      }
    }
  }

  if (this.classList.contains("operator")) {
    if (storedOperator && !isNewOperand) {
      let result = operate(operandA, display.textContent, storedOperator);
      if (result) display.textContent = result;
    }

    operandA = display.textContent;
    storedOperator = this.id;
    isNewOperand = true;
  }
}