/**
 * Represents a student with academic records, grades, and evaluation methods.
 *
 * @class
 * @property {string} nama - Full name of the student.
 * @property {string|number} kelas - Class or grade level (e.g., "X RPL 3" or 10).
 * @property {number} kkm - Minimum passing grade criteria (default: 75).
 * @property {number[]} nilaiTugas - Array of assignment scores.
 * @property {number} nilaiUts - Midterm exam score (UTS).
 * @property {number} nilaiUas - Final exam score (UAS).
 * @property {number} kehadiran - Attendance percentage (0–100).
 */
export default class Student {
  /**
   * Set of property keys that cannot be modified via `setDetail`.
   * @type {Set<string>}
   */
  static #IMMUTABLE_KEYS = new Set(['nama', 'kelas', 'kkm']);

  /**
   * Creates an instance of the Student class.
   *
   * @param {string} nama - Full name of the student.
   * @param {string|number} kelas - Class or grade level.
   * @param {number} [kkm=75] - Minimum passing grade criteria.
   * @param {number[]} [nilaiTugas=[]] - Array of assignment scores.
   * @param {number} [nilaiUts=0] - Midterm exam score.
   * @param {number} [nilaiUas=0] - Final exam score.
   * @param {number} [kehadiran=0] - Attendance percentage (0–100).
   */
  constructor(nama, kelas, kkm = 75, nilaiTugas = [], nilaiUts = 0, nilaiUas = 0, kehadiran = 0) {
    Object.assign(this, { nama, kelas, kkm, nilaiTugas, nilaiUts, nilaiUas, kehadiran });
  }

  /**
   * Retrieves a snapshot of the student's details.
   *
   * @returns {{
   *   nama: string,
   *   kelas: string|number,
   *   kkm: number,
   *   nilaiTugas: number[],
   *   nilaiUts: number,
   *   nilaiUas: number,
   *   kehadiran: number
   * }} Object containing the student's attributes.
   */
  getDetail() {
    return {
      nama: this.nama,
      kelas: this.kelas,
      kkm: this.kkm,
      nilaiTugas: this.nilaiTugas,
      nilaiUts: this.nilaiUts,
      nilaiUas: this.nilaiUas,
      kehadiran: this.kehadiran,
    };
  }

  /**
   * Updates a mutable property of the student instance.
   *
   * @param {string} key - Property name to update.
   * @param {*} newValue - New value to assign to the property.
   * @throws {RangeError} If `key` is not an own property of the instance.
   * @throws {TypeError} If `key` is marked as immutable.
   */
  setDetail(key, newValue) {
    if (!Object.hasOwn(this, key)) {
      throw new RangeError(`Unknown property: "${key}"`);
    }

    if (Student.#IMMUTABLE_KEYS.has(key)) {
      throw new TypeError(`Property "${key}" is read-only`);
    }

    this[key] = newValue;
  }

  /**
   * Calculates the average score from the assignment scores array (`nilaiTugas`).
   *
   * @returns {number} The calculated average assignment score.
   */
  sumAverage() {
    return this.nilaiTugas.reduce((accumulator, n) => accumulator + n) / this.nilaiTugas.length
  }

  /**
   * Determines whether the student has passed based on the given average score and KKM.
   *
   * @param {number} [avg] - The average score to compare against KKM.
   * @returns {"lulus" | "tidak lulus"} Returns "lulus" if passed, "tidak lulus" otherwise.
   */
  lulus(avg) {
    return avg >= this.kkm ? "lulus" : "tidak lulus"
  }
} 