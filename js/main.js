
//aliasing
let tampilkan = console.log
let table = console.table

let skills = ["JavaScript", "golang dasar", "git dasar"]
tampilkan(skills)

skills.push("C dasar")
tampilkan(skills)
tampilkan(skills.length)

for (const skill of skills) {
  tampilkan(skill)
}

skills = [
  {nama: "JavaScript", level: "menengah"},
  {nama: "golang", level: "dasar"},
  {nama: "git", level: "dasar"},
]
skills.push({nama: "C", level: "dasar"})
skills.push({nama: "linux", level: "dasar"})
table(skills)
const buatKartu = (judul, kategori, gambar, alt, deskripsi) => {
 return {judul, kategori, gambar, alt, deskripsi}
}

let projects = []
projects.push(buatKartu(
  "Halaman Profil Pertama",
  "HTML",
  "img/proyek-profil.png",
  "Tangkapan layar halaman profil Andi Pratama",
  "Halaman web pertama saya, dibuat dengan HTML dasar."
));

projects.push(buatKartu(
  "Form Kontak",
  "HTML",
  "img/proyek-kontak.png",
  "Tangkapan layar form kontak berisi lima isian",
  "Form dengan label dan validasi bawaan browser."
));

projects.push(buatKartu(
  "Tabel Jadwal Belajar",
  "HTML",
  "img/proyek-jadwal.png",
  "Tangkapan layar tabel jadwal belajar mandiri",
  "Jadwal belajar mingguan dengan thead dan tbody."
));

projects.push(buatKartu(
  "Portofolio Responsif",
  "CSS",
  "img/proyek-responsif.png",
  "Tangkapan layar portofolio di ponsel dan laptop",
  "Rapi di ponsel, tablet, dan laptop dengan Flexbox."
));

projects.push(buatKartu(
  "Kalkulator Nilai Rapor",
  "JavaScript",
  "img/proyek-kalkulator.png",
  "Tangkapan layar hasil kalkulator nilai di Console",
  "Rata-rata dan predikat nilai dengan fungsi JavaScript."
));

projects.push(buatKartu(
  "Lima Soal Logika",
  "JavaScript",
  "img/proyek-logika.png",
  "Tangkapan layar hasil uji lima soal logika",
  "Lima fungsi logika yang masing-masing diuji 3 masukan."
));


table(projects)

const listProjectWBtn = document.getElementById("listprojectWBtn")
const listProject = document.getElementById("listproject")

for (const project of projects) {
  listProjectWBtn.innerHTML += `
          <article class="kartu">
            <h3>${project.judul}</h3>
            <img src="${project.gambar}" alt="${project.alt}" width="280">
            <p>${project.deskripsi}</p>
          </article>
  `
  listProject.innerHTML += `
          <article class="kartu">
            <h3>${project.judul}</h3>
            <img src="${project.gambar}" alt="${project.alt}" width="280">
            <p>${project.deskripsi}</p>
          </article>
  `
}

const searchwithbtn = document.querySelector("#searchwithbtn button")
const inputSearch = document.getElementById("inputsearchwbtn");
if (searchwithbtn != null) {
  searchwithbtn.addEventListener("click",  (e) => {
    const inputTarget = e.target.previousElementSibling;
    const keyword = inputSearch.value.toLowerCase();
    listProjectWBtn.innerHTML = "";
    
    const hasil = projects.filter(item => 
      item.judul.toLowerCase().includes(keyword) || 
      item.deskripsi.toLowerCase().includes(keyword)
    ).map(project => {
      listProjectWBtn.innerHTML += `
          <article class="kartu">
            <h3>${project.judul}</h3>
            <img src="${project.gambar}" alt="${project.alt}" width="280">
            <p>${project.deskripsi}</p>
          </article>
  `
    })
  })
} else {tampilkan("error kaks")}



const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
     const keyword = event.target.value;
     searchProject(keyword);
  });
}

function searchProject(keyword) {
  keyword = keyword.toLowerCase();
  
  listProject.innerHTML = "";
  
  const hasil = projects.filter(item => 
    item.judul.toLowerCase().includes(keyword) || 
    item.deskripsi.toLowerCase().includes(keyword)
  );

  hasil.forEach(project => {
    listproject.innerHTML += `
        <article class="kartu">
          <h3>${project.judul}</h3>
          <img src="${project.gambar}" alt="${project.alt}" width="280">
          <p>${project.deskripsi}</p>
        </article>
    `;
  });
  console.log(hasil)
}