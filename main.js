class Calculator {
  // Initialize screen(output)
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clearAll(); // When start a computer, it should be clear all as default
  }

  // Initialize all-clear function
  clearAll() {
    this.previousOperandNumber = " ";
    this.currentOperandNumber = " ";
    this.operation = " ";
  }

  // Initialize delete function
  delete() {
    this.currentOperandNumber = this.currentOperandNumber.slice(0, -1);
  }

  // Initialize operation
  chooseOperation(operation) {
    if (this.currentOperandNumber === " ") return;
    if (this.previousOperandNumber !== " ") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperandNumber = this.currentOperandNumber; // Sau khi click operation, the current and op move to previous
    this.currentOperandNumber = " "; // and current = " "
  }

  // Initialize append number to screen
  appendNumber(number) {
    if (number === "." && this.currentOperandNumber.includes(".")) return;
    this.currentOperandNumber = this.currentOperandNumber + number;
  }

  // Initialize compute
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperandNumber);
    const current = parseFloat(this.currentOperandNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case ":":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOperandNumber = computation;
    this.operation = " ";
    this.previousOperandNumber = " ";
  }

  // Function to put comma (ex: 1,000,000)
  displayNum(targetNum) {
    const floatNum = parseFloat(targetNum);
    if (isNaN(floatNum)) return " ";
    return floatNum.toLocaleString("en");
  }
  // Initialize updateDisplay
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.displayNum(
      this.currentOperandNumber
    );
    this.previousOperandTextElement.innerText = `${this.displayNum(
      this.previousOperandNumber
    )} ${this.operation}`;
  }
}

const numberOfButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]"
);

// Initialize a calculator

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

// Loop all number buttons (0-9 & '.')
numberOfButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// Loop all operationg (+ - x :)
operationButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// Equal button
equalsButton.addEventListener("click", function () {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", function () {
  calculator.clearAll();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});
