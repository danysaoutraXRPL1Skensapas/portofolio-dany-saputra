/**
 * @fileoverview Demonstration and testing script for the Student class instance and its methods.
 */
import Student from './oop/siswa.js';

/**
 * Menampilkan pesan pembuka ke Console.
 */
console.log("Halo, sayaDany Saputra");
console.log("Ini latihan JavaScript pertamaku.");

/**
 * Instansiasi objek Student untuk Andi dengan data nilai lengkap.
 * @type {Student}
 */
let andi = new Student("Dany Saputra", "X PPLG 1", 75, 85, 78, 89, 90);

/**
 * Mengambil dan menampilkan detail informasi siswa Andi.
 */
const detailAndi = andi.getDetail();
console.log(`Nama: ${detailAndi.nama}, kelas ${detailAndi.kelas}`);
console.log(`Nilai tugas ${detailAndi.nilaiTugas}, UTS ${detailAndi.nilaiUts}, UAS ${detailAndi.nilaiUas}`);

/**
 * Menghitung dan menampilkan evaluasi hasil belajar Andi 
 * (rata-rata, predikat, kelulusan, dan sertifikat).
 */
const rataRataAndi = andi.sumAverage();
console.log(`Rata-rata nilai: ${rataRataAndi}`);
console.log(`Predikat: ${andi.predikat()}`);
console.log(`Lulus KKM: ${andi.lulus(rataRataAndi) === "lulus"}`);
console.log(`Dapat sertifikat: ${andi.dapatSertifikat()}`);

/**
 * Percabangan untuk menampilkan pesan kelulusan berdasarkan nilai KKM.
 */
if (andi.lulus(rataRataAndi) === "lulus") {
  console.log("Selamat, kamu lulus KKM!");
} else {
  console.log("Tetap semangat, ikuti remedial ya.");
}

/**
 * Instansiasi objek Student untuk Djack sebagai bahan pengujian tambahan.
 * @type {Student}
 */
let djack = new Student("Djack Subroto", "X RPL 3", 75, 55, 34, 23, 5);

/**
 * Menampilkan hasil evaluasi untuk objek Djack.
 */
console.log(djack.getDetail());
console.log(djack.sumAverage());
console.log(djack.lulus(djack.sumAverage()));

// Kode percobaan error (sengaja di-comment agar Console bersih dari error merah)
// console.log(djack.setDetail("nama", "jordan"))
// console.log(djack.setDetail("test", "nama saya")) // err test