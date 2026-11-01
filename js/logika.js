/**
 * Checks whether a given integer is even ("genap") or odd ("ganjil").
 *
 * @param {number} n - The integer to check.
 * @returns {"genap" | "ganjil"} "genap" if even, "ganjil" if odd.
 */
const ganjilGenap = (n) => n % 2 === 0 ? "genap" : "ganjil";

/**
 * Converts a temperature value from Celsius to Fahrenheit.
 *
 * @param {number} c - Temperature in degrees Celsius.
 * @returns {number} Converted temperature in degrees Fahrenheit.
 */
const celsiusKeFahrenheit = (c) => c*9/5+32;

/**
 * Returns the maximum value from a list of numbers using Math.max.
 *
 * @param {...number} n - Numbers to compare.
 * @returns {number} The greatest number among the provided arguments.
 */
const BestnilaiTerbesar = (...n) => Math.max(...n);

/**
 * Determines whether a given year is a leap year (tahun kabisat).
 * A year is a leap year if it is divisible by 4 and not divisible by 100,
 * or if it is divisible by 400.
 *
 * @param {number} tahun - The year to evaluate.
 * @returns {boolean} True if the year is a leap year, false otherwise.
 */
const tahunKabisat = (tahun) => {
  return tahun % 4 === 0 && tahun % 100 !== 0 || tahun % 400 === 0; 
}

/**
 * Calculates the final price after applying a tiered discount based on the total purchase amount.
 * - Totals >= 200,000 receive a 20% discount (pays 80%).
 * - Totals >= 100,000 receive a 10% discount (pays 90%).
 * - Totals < 100,000 receive no discount (pays 100%).
 *
 * @param {number} total - The total original purchase amount.
 * @returns {number} The final amount to be paid after discount.
 */
function hargaSetelahDiskon(total) {
  if (total >= 200_000) return total * 0.8;
  if (total >= 100_000) return total * 0.9;
  return total;
}

/**
 * Finds the largest among three numeric inputs with normalization and signed zero handling.
 *
 * @param {number|string} a - The first value.
 * @param {number|string} b - The second value.
 * @param {number|string} c - The third value.
 * @returns {number} The largest number, or NaN if any value cannot be converted to a valid number.
 */
function nilaiTerbesar(a, b, c) {
  a = +a; b = +b; c = +c;

  if (a === a && b === b && c === c) {

    const adaPos0 = Object.is(a, 0) || Object.is(b, 0) || Object.is(c, 0);
    if (adaPos0 && Object.is(a, -0)) a = 0;
    if (adaPos0 && Object.is(b, -0)) b = 0;
    if (adaPos0 && Object.is(c, -0)) c = 0;

    if (a >= b && a >= c) {
      return a;
    } else if (b >= a && b >= c) {
      return b;
    } else {
      return c;
    }

  } else {
    return NaN;
  }
}