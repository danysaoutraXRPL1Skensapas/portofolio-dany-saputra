/**
 * @fileoverview Unit tests for calculator logic and UI interactions in mycalc.js.
 * Executed via Node.js native test runner (node:test, node:assert).
 */

import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import mycalc, {
  calculate,
  appendNumber,
  handleDelete,
  handleOperator,
  attachPadEvent
} from "./mycalc.js";

/**
 * Creates a mock display object simulating an HTMLInputElement.
 *
 * @param {string} [initialValue="0"] - The initial display value.
 * @returns {{ value: string }} A mock display element with a mutable value property.
 */
function createMockDisplay(initialValue = "0") {
  return { value: initialValue };
}

/**
 * Creates a fresh calculator state object for isolated testing.
 *
 * @returns {{
 *   firstOperand: string|null,
 *   operator: string|null,
 *   waitingForSecondOperand: boolean
 * }} Fresh state object.
 */
function createFreshState() {
  return {
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
  };
}

describe("Test Suite: mycalc.js", () => {
  /**
   * Tests for calculate(a, b, op) arithmetic function.
   */
  describe("calculate()", () => {
    it("should perform addition correctly", () => {
      assert.strictEqual(calculate("5", "3", "+"), "8");
      assert.strictEqual(calculate("-10", "4", "+"), "-6");
      assert.strictEqual(calculate("0", "0", "+"), "0");
    });

    it("should perform subtraction correctly", () => {
      assert.strictEqual(calculate("10", "4", "-"), "6");
      assert.strictEqual(calculate("4", "10", "-"), "-6");
      assert.strictEqual(calculate("-5", "-5", "-"), "0");
    });

    it("should perform multiplication correctly", () => {
      assert.strictEqual(calculate("6", "7", "*"), "42");
      assert.strictEqual(calculate("-3", "4", "*"), "-12");
      assert.strictEqual(calculate("5", "0", "*"), "0");
    });

    it("should perform division correctly", () => {
      assert.strictEqual(calculate("20", "4", "/"), "5");
      assert.strictEqual(calculate("7", "2", "/"), "3.5");
    });

    it("should return 'Error' when dividing by zero", () => {
      assert.strictEqual(calculate("10", "0", "/"), "Error");
      assert.strictEqual(calculate("10", "0.0", "/"), "Error");
    });

    it("should return the second operand 'b' if any operand is not a number", () => {
      assert.strictEqual(calculate("invalid", "5", "+"), "5");
      assert.strictEqual(calculate("5", "invalid", "+"), "invalid");
    });

    it("should return 'b' for unrecognized operators", () => {
      assert.strictEqual(calculate("5", "3", "%"), "3");
      assert.strictEqual(calculate("10", "2", "^"), "2");
    });
  });

  /**
   * Tests for appendNumber(display, numStr) function.
   */
  describe("appendNumber()", () => {
    it("should replace '0' with the pressed number", () => {
      const display = createMockDisplay("0");
      appendNumber(display, "7");
      assert.strictEqual(display.value, "7");
    });

    it("should replace 'Error' with the pressed number", () => {
      const display = createMockDisplay("Error");
      appendNumber(display, "9");
      assert.strictEqual(display.value, "9");
    });

    it("should append '0.' when pressing decimal point '.' on initial '0'", () => {
      const display = createMockDisplay("0");
      appendNumber(display, ".");
      assert.strictEqual(display.value, "0.");
    });

    it("should append '0.' when pressing decimal point '.' on 'Error'", () => {
      const display = createMockDisplay("Error");
      appendNumber(display, ".");
      assert.strictEqual(display.value, "0.");
    });

    it("should concatenate consecutive numbers", () => {
      const display = createMockDisplay("1");
      appendNumber(display, "2");
      appendNumber(display, "3");
      assert.strictEqual(display.value, "123");
    });

    it("should ignore duplicate decimal points", () => {
      const display = createMockDisplay("12.5");
      appendNumber(display, ".");
      assert.strictEqual(display.value, "12.5");
    });
  });

  /**
   * Tests for handleDelete(display) function.
   */
  describe("handleDelete()", () => {
    it("should reset display to '0' if display is currently 'Error'", () => {
      const display = createMockDisplay("Error");
      handleDelete(display);
      assert.strictEqual(display.value, "0");
    });

    it("should reset display to '0' if only a single character remains", () => {
      const display = createMockDisplay("8");
      handleDelete(display);
      assert.strictEqual(display.value, "0");
    });

    it("should remove only the last character when length > 1", () => {
      const display = createMockDisplay("1234");
      handleDelete(display);
      assert.strictEqual(display.value, "123");
      handleDelete(display);
      assert.strictEqual(display.value, "12");
    });
  });

  /**
   * Tests for handleOperator(state, display, op) function.
   */
  describe("handleOperator()", () => {
    let state;
    let display;

    beforeEach(() => {
      state = createFreshState();
      display = createMockDisplay("0");
    });

    it("should reset state and display when operator is 'C'", () => {
      state.firstOperand = "50";
      state.operator = "+";
      state.waitingForSecondOperand = true;
      display.value = "25";

      handleOperator(state, display, "C");

      assert.strictEqual(state.firstOperand, null);
      assert.strictEqual(state.operator, null);
      assert.strictEqual(state.waitingForSecondOperand, false);
      assert.strictEqual(display.value, "0");
    });

    it("should set first operand and operator when an arithmetic operator is pressed", () => {
      display.value = "42";
      handleOperator(state, display, "+");

      assert.strictEqual(state.firstOperand, "42");
      assert.strictEqual(state.operator, "+");
      assert.strictEqual(state.waitingForSecondOperand, true);
    });

    it("should chain multiple operations consecutively", () => {
      display.value = "10";
      handleOperator(state, display, "+"); // firstOperand = 10, operator = '+'

      display.value = "5";
      state.waitingForSecondOperand = false;
      handleOperator(state, display, "*"); // calculates 10 + 5 = 15, firstOperand = 15, operator = '*'

      assert.strictEqual(display.value, "15");
      assert.strictEqual(state.firstOperand, "15");
      assert.strictEqual(state.operator, "*");
      assert.strictEqual(state.waitingForSecondOperand, true);
    });

    it("should compute final result on equals '='", () => {
      state.firstOperand = "20";
      state.operator = "/";
      state.waitingForSecondOperand = false;
      display.value = "4";

      handleOperator(state, display, "=");

      assert.strictEqual(display.value, "5");
      assert.strictEqual(state.firstOperand, "5");
      assert.strictEqual(state.operator, null);
      assert.strictEqual(state.waitingForSecondOperand, true);
    });

    it("should ignore equals '=' if no operator is set", () => {
      display.value = "99";
      handleOperator(state, display, "=");

      assert.strictEqual(display.value, "99");
      assert.strictEqual(state.operator, null);
    });

    it("should ignore equals '=' if waiting for second operand", () => {
      state.firstOperand = "10";
      state.operator = "+";
      state.waitingForSecondOperand = true;
      display.value = "10";

      handleOperator(state, display, "=");

      assert.strictEqual(state.operator, "+");
      assert.strictEqual(display.value, "10");
    });
  });

  /**
   * Tests for attachPadEvent(state, padElement, displayElement) DOM interactions.
   */
  describe("attachPadEvent()", () => {
    /**
     * Creates a mock DOM event target for pad element.
     *
     * @returns {{
     *   listeners: Object<string, Function[]>,
     *   addEventListener: Function,
     *   triggerClick: Function
     * }} Mock event target.
     */
    function createMockPad() {
      const listeners = {};
      return {
        listeners,
        addEventListener(event, callback) {
          listeners[event] = listeners[event] || [];
          listeners[event].push(callback);
        },
        triggerClick(target) {
          if (listeners["click"]) {
            listeners["click"].forEach((cb) => cb({ target }));
          }
        }
      };
    }

    it("should handle number and operator clicks via event delegation", () => {
      const state = createFreshState();
      const display = createMockDisplay("0");
      const pad = createMockPad();

      attachPadEvent(state, pad, display);

      // Click number '7'
      pad.triggerClick({
        tagName: "BUTTON",
        dataset: { num: "7" },
        id: ""
      });
      assert.strictEqual(display.value, "7");

      // Click operator '+'
      pad.triggerClick({
        tagName: "BUTTON",
        dataset: { op: "+" },
        id: ""
      });
      assert.strictEqual(state.firstOperand, "7");
      assert.strictEqual(state.operator, "+");
      assert.strictEqual(state.waitingForSecondOperand, true);

      // Click number '3'
      pad.triggerClick({
        tagName: "BUTTON",
        dataset: { num: "3" },
        id: ""
      });
      assert.strictEqual(display.value, "3");
      assert.strictEqual(state.waitingForSecondOperand, false);

      // Click '='
      pad.triggerClick({
        tagName: "BUTTON",
        dataset: {},
        id: "btn-equals"
      });
      assert.strictEqual(display.value, "10");

      // Click 'DEL'
      pad.triggerClick({
        tagName: "BUTTON",
        dataset: {},
        id: "btn-del"
      });
      assert.strictEqual(display.value, "1");

      // Click 'C'
      pad.triggerClick({
        tagName: "BUTTON",
        dataset: {},
        id: "btn-clear"
      });
      assert.strictEqual(display.value, "0");
      assert.strictEqual(state.firstOperand, null);
    });

    it("should ignore non-button element clicks", () => {
      const state = createFreshState();
      const display = createMockDisplay("5");
      const pad = createMockPad();

      attachPadEvent(state, pad, display);

      // Click on a DIV inside keypad
      pad.triggerClick({
        tagName: "DIV",
        dataset: { num: "9" },
        id: ""
      });
      assert.strictEqual(display.value, "5");
    });

    it("should safely do nothing if padElement or displayElement is null", () => {
      assert.doesNotThrow(() => {
        attachPadEvent(createFreshState(), null, null);
      });
    });
  });
});
