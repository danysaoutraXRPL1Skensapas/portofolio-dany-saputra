/**
 * @fileoverview Handles form submission for the simple summation calculator.
 */

/**
 * The HTML form element for input numbers.
 * @type {HTMLFormElement}
 */
let form = document.getElementById("form")

/**
 * The DOM element displaying the calculation result.
 * @type {HTMLElement}
 */
let resultElement = document.getElementById("result")

/**
 * Event listener triggered when the user submits the calculator form.
 * Calculates the sum of input numbers (n1, n2, n3) and displays the result.
 *
 * @param {SubmitEvent} e - The form submission event.
 */
form.addEventListener('submit', (e) => {
  // Prevent default page reload behavior
  e.preventDefault()

  // Retrieve input values from the form inputs
  const n1 = Number(this.n1.value)
  const n2 = Number(this.n2.value)
  const n3 = Number(this.n3.value)

  // Calculate sum and store in result variable
  let result = n1 + n2 + n3;

  // Output result to console and DOM
  console.log("total:", n1 + n2 + n3)
  resultElement.innerText = result
})