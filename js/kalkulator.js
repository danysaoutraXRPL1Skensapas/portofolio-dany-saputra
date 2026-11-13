/**
 * @fileoverview Interactive grade calculator for kalkulator.html.
 * Reuses hitungRataRata() and predikat() from logika.js.
 */
import { hitungRataRata, predikat } from './logika.js';

const form = document.getElementById("form");
const resultElement = document.getElementById("result");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const { tugas, uts, uas } = e.target.elements;
  const nTugas = Number(tugas.value);
  const nUts = Number(uts.value);
  const nUas = Number(uas.value);

  const rataRata = hitungRataRata(nTugas, nUts, nUas);
  const pred = predikat(rataRata);

  resultElement.innerText =
    `Rata-rata: ${rataRata.toFixed(2)} | Predikat: ${pred}`;

  console.log(
    `tugas=${nTugas}, uts=${nUts}, uas=${nUas} → rata-rata=${rataRata.toFixed(2)}, predikat=${pred}`
  );
});