/**
 * @fileoverview Demonstration and testing script for the Student class instance and its methods.
 */
import Student from './oop/siswa.js';

/**
 * Menampilkan pesan pembuka ke Console.
 */
console.log("Halo, saya Dany Saputra");
console.log("Ini latihan JavaScript pertamaku.");

/**
 * Instansiasi objek Student untuk Dany dengan data nilai lengkap.
 * @type {Student}
 */
let dany = new Student("Dany Saputra", "X PPLG 1", 75, 85, 78, 89, 90);

/**
 * Mengambil dan menampilkan detail informasi siswa Dany.
 */
const detailDany = dany.getDetail();
console.log(`Nama: ${detailDany.nama}, kelas ${detailDany.kelas}`);
console.log(`Nilai tugas ${detailDany.nilaiTugas}, UTS ${detailDany.nilaiUts}, UAS ${detailDany.nilaiUas}`);

/**
 * Menghitung dan menampilkan evaluasi hasil belajar Dany 
 * (rata-rata, predikat, kelulusan, dan sertifikat).
 */
const rataRataDany = dany.sumAverage();
console.log(`Rata-rata nilai: ${rataRataDany}`);
console.log(`Predikat: ${dany.predikat()}`);
console.log(`Lulus KKM: ${dany.lulus(rataRataDany) === "lulus"}`);
console.log(`Dapat sertifikat: ${dany.dapatSertifikat()}`);

/**
 * Percabangan untuk menampilkan pesan kelulusan berdasarkan nilai KKM.
 */
if (dany.lulus(rataRataDany) === "lulus") {
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