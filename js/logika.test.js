/**
 * @fileoverview Unit tests for mathematical and logic utilities in logika.js.
 * Executed via Node.js native test runner (node:test, node:assert).
 */

import test, { describe, it } from "node:test";
import assert from "node:assert";
import logika, {
  ganjilGenap,
  celsiusKeFahrenheit,
  BestNilaiTerbesar,
  tahunKabisat,
  hargaSetelahDiskon,
  nilaiTerbesar
} from "./logika.js";

describe("Test Suite: logika.js", () => {
  /**
   * Tests for ganjilGenap function.
   * Checks odd and even determination for positive, zero, and negative values.
   */
  describe("ganjilGenap()", () => {
    it("should return 'genap' for even numbers", () => {
      assert.strictEqual(ganjilGenap(4), "genap");
      assert.strictEqual(ganjilGenap(0), "genap");
      assert.strictEqual(ganjilGenap(-2), "genap");
      assert.strictEqual(logika.ganjilGenap(100), "genap");
    });

    it("should return 'ganjil' for odd numbers", () => {
      assert.strictEqual(ganjilGenap(7), "ganjil");
      assert.strictEqual(ganjilGenap(1), "ganjil");
      assert.strictEqual(ganjilGenap(-3), "ganjil");
      assert.strictEqual(logika.ganjilGenap(99), "ganjil");
    });
  });

  /**
   * Tests for celsiusKeFahrenheit function.
   * Checks temperature conversion from Celsius to Fahrenheit.
   */
  describe("celsiusKeFahrenheit()", () => {
    it("[ SUCCESS TEST ] [ LOGIKA ] test celciusKeFarenheit(5)", () => {
      assert.strictEqual(logika.celsiusKeFahrenheit(5), 41);
    });

    it("should correctly convert standard benchmark temperatures", () => {
      assert.strictEqual(celsiusKeFahrenheit(0), 32);     // Freezing point of water
      assert.strictEqual(celsiusKeFahrenheit(100), 212);  // Boiling point of water
      assert.strictEqual(celsiusKeFahrenheit(-40), -40);  // Parity point
      assert.strictEqual(celsiusKeFahrenheit(37), 98.6);  // Normal body temperature
    });
  });

  /**
   * Tests for BestNilaiTerbesar function.
   * Checks maximum value detection with variable arguments.
   */
  describe("BestNilaiTerbesar()", () => {
    it("should return the largest number among arguments", () => {
      assert.strictEqual(BestNilaiTerbesar(1, 5, 3), 5);
      assert.strictEqual(BestNilaiTerbesar(10, 20, 99, 45, 12), 99);
      assert.strictEqual(BestNilaiTerbesar(42), 42);
    });

    it("should handle negative numbers correctly", () => {
      assert.strictEqual(BestNilaiTerbesar(-10, -2, -50), -2);
      assert.strictEqual(BestNilaiTerbesar(-5, -9, 0), 0);
    });
  });

  /**
   * Tests for tahunKabisat function.
   * Checks leap year logic according to Gregorian calendar rules.
   */
  describe("tahunKabisat()", () => {
    it("should return true for years divisible by 4 but not by 100", () => {
      assert.strictEqual(tahunKabisat(2024), true);
      assert.strictEqual(tahunKabisat(2020), true);
    });

    it("should return true for century years divisible by 400", () => {
      assert.strictEqual(tahunKabisat(2000), true);
      assert.strictEqual(tahunKabisat(1600), true);
    });

    it("should return false for century years not divisible by 400", () => {
      assert.strictEqual(tahunKabisat(1900), false);
      assert.strictEqual(tahunKabisat(2100), false);
    });

    it("should return false for regular non-leap years", () => {
      assert.strictEqual(tahunKabisat(2023), false);
      assert.strictEqual(tahunKabisat(2019), false);
    });
  });

  /**
   * Tests for hargaSetelahDiskon function.
   * Checks tiered discount rates: 20% for >= 200k, 10% for >= 100k, 0% otherwise.
   */
  describe("hargaSetelahDiskon()", () => {
    it("should apply 20% discount for totals >= 200,000", () => {
      assert.strictEqual(hargaSetelahDiskon(200_000), 160_000);
      assert.strictEqual(hargaSetelahDiskon(300_000), 240_000);
    });

    it("should apply 10% discount for totals between 100,000 and 199,999", () => {
      assert.strictEqual(hargaSetelahDiskon(100_000), 90_000);
      assert.strictEqual(hargaSetelahDiskon(150_000), 135_000);
    });

    it("should apply no discount for totals below 100,000", () => {
      assert.strictEqual(hargaSetelahDiskon(99_999), 99_999);
      assert.strictEqual(hargaSetelahDiskon(50_000), 50_000);
      assert.strictEqual(hargaSetelahDiskon(0), 0);
    });
  });

  /**
   * Tests for nilaiTerbesar function.
   * Checks 3-argument comparison, string casting, signed zero handling, and NaN validation.
   */
  describe("nilaiTerbesar()", () => {
    it("should return the largest number when 'a' is highest", () => {
      assert.strictEqual(nilaiTerbesar(10, 5, 2), 10);
    });

    it("should return the largest number when 'b' is highest", () => {
      assert.strictEqual(nilaiTerbesar(3, 8, 4), 8);
    });

    it("should return the largest number when 'c' is highest", () => {
      assert.strictEqual(nilaiTerbesar(1, 4, 9), 9);
    });

    it("should return the value when numbers are equal", () => {
      assert.strictEqual(nilaiTerbesar(7, 7, 7), 7);
      assert.strictEqual(nilaiTerbesar(7, 7, 2), 7);
      assert.strictEqual(nilaiTerbesar(2, 7, 7), 7);
    });

    it("should handle numeric string inputs via coercion", () => {
      assert.strictEqual(nilaiTerbesar("10", "20", "5"), 20);
      assert.strictEqual(nilaiTerbesar("30", "15", "10"), 30);
    });

    it("should handle signed zeros (+0 and -0) correctly", () => {
      const result = nilaiTerbesar(-0, 0, -5);
      assert.strictEqual(Object.is(result, 0), true);
    });

    it("should return NaN when any input cannot be parsed as a number", () => {
      assert.strictEqual(Number.isNaN(nilaiTerbesar("abc", 5, 2)), true);
      assert.strictEqual(Number.isNaN(nilaiTerbesar(undefined, 1, 2)), true);
      assert.strictEqual(Number.isNaN(nilaiTerbesar(NaN, 1, 2)), true);
    });
  });
});