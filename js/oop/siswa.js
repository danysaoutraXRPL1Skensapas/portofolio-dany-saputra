/**
 * @classdesc The 'Student' class. It contains a blueprint with methods that will be used to create student objects.
 * 
 * @property {string} nama - The full name of the student.
 * @property {string|number} kelas - The class/grade of the student (e.g., "10-A" or 12).
 * @property {number} kkm - The minimum passing grade criteria (Default: 75).
 * @property {number} nilaiTugas - The student's average assignment score.
 * @property {number} nilaiUts - The Midterm Exam score.
 * @property {number} nilaiUas - The Final Exam score.
 * @property {number} kehadiran - The attendance percentage (0-100).
 */
/**
 * @classdesc A blueprint for creating student objects.
 *
 * @property {string} nama          - Full name of the student.
 * @property {string|number} kelas  - Class/grade (e.g. "10-A" or 12).
 * @property {number} kkm           - Minimum passing grade. Default: 75.
 * @property {number} nilaiTugas    - Average assignment score.
 * @property {number} nilaiUts      - Midterm exam score.
 * @property {number} nilaiUas      - Final exam score.
 * @property {number} kehadiran     - Attendance percentage (0–100).
 */
export default class Student {
  /** @type {Set<string>} */
  static #IMMUTABLE_KEYS = new Set(['nama', 'kelas', 'kkm']);

  /**
   * @param {string} nama
   * @param {string|number} kelas
   * @param {number} [kkm=75]
   * @param {number} [nilaiTugas=0]
   * @param {number} [nilaiUts=0]
   * @param {number} [nilaiUas=0]
   * @param {number} [kehadiran=0]
   */
  constructor(nama, kelas, kkm = 75, nilaiTugas = [], nilaiUts = 0, nilaiUas = 0, kehadiran = 0) {
    Object.assign(this, { nama, kelas, kkm, nilaiTugas, nilaiUts, nilaiUas, kehadiran });
  }

  /**
   * @returns {{
   *   nama: string,
   *   kelas: string|number,
   *   kkm: number,
   *   nilaiTugas: number,
   *   nilaiUts: number,
   *   nilaiUas: number,
   *   kehadiran: number
   * }}
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
   * Update a mutable property of the student.
   *
   * @param {string} key
   * @param {*} newValue
   * @throws {RangeError} if `key` is not an own property of the instance.
   * @throws {TypeError}  if `key` is marked as immutable.
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

  sumAverage() {
    return this.nilaiTugas.reduce((accumulator, n) => accumulator + n) / this.nilaiTugas.length
  }

  lulus(avg) {
    return avg >= this.kkm ? "lulus" : "tidak lulus"
  }
} 