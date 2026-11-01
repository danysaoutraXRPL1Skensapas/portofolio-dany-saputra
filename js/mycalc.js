/**
 * @fileoverview Calculator core logic and UI event handlers.
 */

/**
 * Container element for the calculator keypad.
 * @type {HTMLElement|null}
 */
const pad = typeof document !== 'undefined' ? document.getElementById("pad") : null;

/**
 * Display input element showing current operand and calculation results.
 * @type {HTMLInputElement|null}
 */
const display = typeof document !== 'undefined' ? document.getElementById("display") : null;

/**
 * Calculator state storing operands and active operator.
 * @type {{
 *   firstOperand: string|null,
 *   operator: string|null,
 *   waitingForSecondOperand: boolean
 * }}
 */
const state = {
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false
};

/**
 * Performs a basic arithmetic calculation on two operands based on the operator.
 *
 * @param {string|number} a - First operand.
 * @param {string|number} b - Second operand.
 * @param {string} op - Arithmetic operator ('+', '-', '*', '/').
 * @returns {string} The calculation result as a string, "Error" if dividing by 0, or `b` if inputs are invalid.
 */
function calculate(a, b, op) {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA) || isNaN(numB)) {
    return b;
  }

  if (op === '+') return String(numA + numB);
  if (op === '-') return String(numA - numB);
  if (op === '*') return String(numA * numB);
  
  if (op === '/') {
    if (numB === 0) return "Error";
    return String(numA / numB);
  }

  return b;
}

/**
 * Appends a digit or decimal point to the calculator display.
 *
 * @param {HTMLInputElement|{ value: string }} display - The display element whose value will be updated.
 * @param {string} numStr - The number or decimal point string to append.
 * @returns {void}
 */
function appendNumber(display, numStr) {
  if (numStr === '.' && display.value.includes('.')) {
    return;
  }

  if (display.value === "0" || display.value === "Error") {
    display.value = numStr === '.' ? "0." : numStr;
    return;
  }
  
  display.value += numStr;
}

/**
 * Deletes the last character from the calculator display, resetting to "0" if empty or in Error state.
 *
 * @param {HTMLInputElement|{ value: string }} display - The display element whose value will be updated.
 * @returns {void}
 */
function handleDelete(display) {
  if (display.value === "Error") {
    display.value = "0";
    return;
  }

  if (display.value.length === 1) {
    display.value = "0";
    return;
  }

  display.value = display.value.slice(0, -1);
}

/**
 * Handles arithmetic operator and action buttons ('C', '=', '+', '-', '*', '/').
 *
 * @param {{
 *   firstOperand: string|null,
 *   operator: string|null,
 *   waitingForSecondOperand: boolean
 * }} state - The calculator state object.
 * @param {HTMLInputElement|{ value: string }} display - The display element whose value will be read and updated.
 * @param {string} op - The operator triggered ('C', '=', '+', '-', '*', '/').
 * @returns {void}
 */
function handleOperator(state, display, op) {
  if (op === 'C') {
    state.firstOperand = null;
    state.operator = null;
    state.waitingForSecondOperand = false;
    display.value = "0";
    return;
  }

  if (op === '=') {
    if (!state.operator) return;
    if (state.waitingForSecondOperand) return;

    display.value = calculate(state.firstOperand, display.value, state.operator);
    state.firstOperand = display.value;
    state.operator = null;
    state.waitingForSecondOperand = true;
    return;
  }

  if (state.operator && !state.waitingForSecondOperand) {
    display.value = calculate(state.firstOperand, display.value, state.operator);
  }

  state.firstOperand = display.value;
  state.operator = op;
  state.waitingForSecondOperand = true;
}

/**
 * Attaches click event listeners to the keypad container to handle user inputs.
 *
 * @param {{
 *   firstOperand: string|null,
 *   operator: string|null,
 *   waitingForSecondOperand: boolean
 * }} state - The calculator state object.
 * @param {HTMLElement|null} padElement - The keypad container element.
 * @param {HTMLInputElement|null} displayElement - The calculator display element.
 * @returns {void}
 */
function attachPadEvent(state, padElement, displayElement) {
  if (!padElement || !displayElement) {
    return;
  }

  padElement.addEventListener('click', (e) => {
    const target = e.target;
    const dataset = target.dataset;
    const id = target.id;

    if (target.tagName !== 'BUTTON') {
      return; 
    }

    if (id === 'btn-clear') {
      handleOperator(state, displayElement, 'C');
      return;
    }

    if (id === 'btn-del') {
      handleDelete(displayElement);
      return;
    }

    if (id === 'btn-equals') {
      handleOperator(state, displayElement, '=');
      return;
    }

    if (dataset.num) {
      if (state.waitingForSecondOperand) {
        displayElement.value = "0";
        state.waitingForSecondOperand = false;
      }
      appendNumber(displayElement, dataset.num);
      return; 
    }

    if (dataset.op) {
      handleOperator(state, displayElement, dataset.op);
      return; 
    }
  });
}

if (typeof document !== 'undefined' && pad && display) {
  attachPadEvent(state, pad, display);
}

export {
  state,
  calculate,
  appendNumber,
  handleDelete,
  handleOperator,
  attachPadEvent
};

export default {
  state,
  calculate,
  appendNumber,
  handleDelete,
  handleOperator,
  attachPadEvent
};