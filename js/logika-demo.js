import {
  ganjilGenap,
  celsiusKeFahrenheit,
  nilaiTerbesarBanyak,
  tahunKabisat,
  hargaSetelahDiskon,
  nilaiTerbesar
} from './logika.js';

const fmt = (v) => Array.isArray(v) ? `[${v.join(', ')}]` : String(v);
const log = (nama, input, hasil) => {
  console.log(`${nama}(${fmt(input)}) = ${fmt(hasil)}`);
};

// Soal 1: Ganjil/Genap
log('ganjilGenap', 4, ganjilGenap(4));
log('ganjilGenap', 7, ganjilGenap(7));
log('ganjilGenap', 0, ganjilGenap(0));

// Soal 2: Celsius ke Fahrenheit (arrow function)
log('celsiusKeFahrenheit', 0, celsiusKeFahrenheit(0));
log('celsiusKeFahrenheit', 100, celsiusKeFahrenheit(100));
log('celsiusKeFahrenheit', -40, celsiusKeFahrenheit(-40));

// Soal 3: Nilai terbesar dari banyak angka
log('nilaiTerbesarBanyak', [1, 5, 3], nilaiTerbesarBanyak(1, 5, 3));
log('nilaiTerbesarBanyak', [10, 20, 99, 45], nilaiTerbesarBanyak(10, 20, 99, 45));
log('nilaiTerbesarBanyak', [-10, -2, -50], nilaiTerbesarBanyak(-10, -2, -50));

// Soal 4: Tahun kabisat — termasuk batas 1900 dan 2000
log('tahunKabisat', 2024, tahunKabisat(2024));
log('tahunKabisat', 1900, tahunKabisat(1900));
log('tahunKabisat', 2000, tahunKabisat(2000));

// Soal 5: Harga setelah diskon — termasuk batas 100000 dan 200000
log('hargaSetelahDiskon', 99999, hargaSetelahDiskon(99999));
log('hargaSetelahDiskon', 100000, hargaSetelahDiskon(100000));
log('hargaSetelahDiskon', 200000, hargaSetelahDiskon(200000));

// Tantangan: nilai terbesar dari 3 angka
log('nilaiTerbesar', [10, 5, 2], nilaiTerbesar(10, 5, 2));
log('nilaiTerbesar', [3, 8, 4], nilaiTerbesar(3, 8, 4));
log('nilaiTerbesar', [1, 4, 9], nilaiTerbesar(1, 4, 9));