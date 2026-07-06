const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let previousInput = "";
let operator = null;

function updateDisplay(value) {
  display.textContent = value || "0";
}

function handleNumber(num) {
  if (num === "." && currentInput.includes(".")) return;
  currentInput += num;
  updateDisplay(currentInput);
}

function handleOperator(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operator) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      if (current === 0) {
        updateDisplay("Error");
        resetState();
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = String(result);
  operator = null;
  previousInput = "";
  updateDisplay(currentInput);
}

function resetState() {
  currentInput = "";
  previousInput = "";
  operator = null;
  updateDisplay("0");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("btn-number")) {
      handleNumber(button.textContent);
    } else if (button.classList.contains("btn-operator")) {
      handleOperator(button.dataset.action);
    } else if (button.id === "equals") {
      calculate();
    } else if (button.id === "clear") {
      resetState();
    }
  });
});

document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    handleNumber(e.key);
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    handleOperator(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    e.preventDefault();
    calculate();
  } else if (e.key === "Escape" || e.key === "Backspace") {
    resetState();
  }
});
