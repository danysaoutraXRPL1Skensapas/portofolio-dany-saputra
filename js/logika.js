const ganjilGenap = (n) => n % 2 === 0 ? "genap" : "ganjil";

const celsiusKeFahrenheit = (c) => c*9/5+32;

const BestnilaiTerbesar = (...n) => Math.max(...n);

const tahunKabisat = (tahun) => {
  return tahun % 4 === 0 && tahun % 100 !== 0 || tahun % 400 === 0; 
}


function hargaSetelahDiskon(total) {
  if (total >= 200_000) return total * 0.8;
  if (total >= 100_000) return total * 0.9;
  return total;
}

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