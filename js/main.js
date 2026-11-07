//aliasing
let tampilkan = console.log
let table = console.table

// 1. Daftar keahlian (halaman Beranda)
let skills = [
  { nama: "JavaScript", level: "Menengah" },
  { nama: "Next.js", level: "Dasar" },
  { nama: "C", level: "Dasar" },
  { nama: "Linux", level: "Dasar" },
  { nama: "HTML dasar", level: "Sedang dipelajari" },
  { nama: "Mengetik cepat", level: "Mahir" },
]

table(skills)

const elDaftarSkill = document.getElementById("daftar-skill")
const elJumlahSkill = document.getElementById("jumlah-skill")

if (elDaftarSkill && elJumlahSkill) {
  skills.forEach((skill) => {
    const li = document.createElement("li")
    li.textContent = `${skill.nama} (${skill.level})`
    elDaftarSkill.appendChild(li)
  })
  elJumlahSkill.textContent = `Ada ${skills.length} keahlian yang sedang saya kembangkan.`
}

// 2. Tema gelap (theme.js)

// 3. Penghitung karakter (halaman Kontak)
const elPesan = document.getElementById("pesan")
const elHitungKarakter = document.getElementById("hitung-karakter")

if (elPesan && elHitungKarakter) {
  elPesan.addEventListener("input", () => {
    elHitungKarakter.textContent = `${elPesan.value.length}/300 karakter`
  })
}

// 4. Daftar proyek dan filter (halaman Proyek)
const buatKartu = (judul, kategori, gambar, alt, deskripsi) => {
  return { judul, kategori, gambar, alt, deskripsi }
}

let projects = []
projects.push(buatKartu(
  "Halaman Profil Pertama",
  "HTML",
  "img/proyek-profil.png",
  "Tangkapan layar halaman profil Andi Pratama",
  "Halaman web pertama saya, dibuat dengan HTML dasar."
))

projects.push(buatKartu(
  "Form Kontak",
  "HTML",
  "img/proyek-kontak.png",
  "Tangkapan layar form kontak berisi lima isian",
  "Form dengan label dan validasi bawaan browser."
))

projects.push(buatKartu(
  "Tabel Jadwal Belajar",
  "HTML",
  "img/proyek-jadwal.png",
  "Tangkapan layar tabel jadwal belajar mandiri",
  "Jadwal belajar mingguan dengan thead dan tbody."
))

projects.push(buatKartu(
  "Portofolio Responsif",
  "CSS",
  "img/proyek-responsif.png",
  "Tangkapan layar portofolio di ponsel dan laptop",
  "Rapi di ponsel, tablet, dan laptop dengan Flexbox."
))

projects.push(buatKartu(
  "Kalkulator Nilai Rapor",
  "JavaScript",
  "img/proyek-kalkulator.png",
  "Tangkapan layar hasil kalkulator nilai di Console",
  "Rata-rata dan predikat nilai dengan fungsi JavaScript."
))

projects.push(buatKartu(
  "Lima Soal Logika",
  "JavaScript",
  "img/proyek-logika.png",
  "Tangkapan layar hasil uji lima soal logika",
  "Lima fungsi logika yang masing-masing diuji 3 masukan."
))

table(projects)

const elListProjectFilter = document.getElementById("listprojectFilter")
const elJumlahProyek = document.getElementById("jumlah-proyek")

const kartuHTML = (project) => {
  return `
    <article class="kartu">
      <span class="label">${project.kategori}</span>
      <h3>${project.judul}</h3>
      <img src="${project.gambar}" alt="${project.alt}" width="280">
      <p>${project.deskripsi}</p>
    </article>
  `
}

function tampilkanProyek(daftar) {
  if (!elListProjectFilter || !elJumlahProyek) return
  elListProjectFilter.innerHTML = ""
  daftar.forEach((project) => {
    elListProjectFilter.innerHTML += kartuHTML(project)
  })
  elJumlahProyek.textContent = `Menampilkan ${daftar.length} dari ${projects.length} proyek`
}

function pasangFilter(idTombol, kategori) {
  const tombol = document.getElementById(idTombol)
  if (!tombol) return

  tombol.addEventListener("click", () => {
    const aktifLama = document.querySelector(".tombol-filter.aktif")
    if (aktifLama) {
      aktifLama.classList.remove("aktif")
    }
    tombol.classList.add("aktif")

    if (kategori === "Semua") {
      tampilkanProyek(projects)
    } else {
      tampilkanProyek(projects.filter((item) => item.kategori === kategori))
    }
  })
}

if (elListProjectFilter) {
  tampilkanProyek(projects)
  pasangFilter("filter-semua", "Semua")
  pasangFilter("filter-html", "HTML")
  pasangFilter("filter-css", "CSS")
  pasangFilter("filter-javascript", "JavaScript")
}

// 5. Search (bonus fitur)
const listProjectWBtn = document.getElementById("listprojectWBtn")
const listProject = document.getElementById("listproject")

if (listProjectWBtn && listProject) {
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
}

const searchwithbtn = document.querySelector("#searchwithbtn button")
const inputSearch = document.getElementById("inputsearchwbtn")
if (searchwithbtn != null && inputSearch && listProjectWBtn) {
  searchwithbtn.addEventListener("click", () => {
    const keyword = inputSearch.value.toLowerCase()
    listProjectWBtn.innerHTML = ""
    
    const hasil = projects.filter(item => 
      item.judul.toLowerCase().includes(keyword) || 
      item.deskripsi.toLowerCase().includes(keyword)
    )

    hasil.forEach(project => {
      listProjectWBtn.innerHTML += `
        <article class="kartu">
          <h3>${project.judul}</h3>
          <img src="${project.gambar}" alt="${project.alt}" width="280">
          <p>${project.deskripsi}</p>
        </article>
      `
    })
  })
}

const searchInput = document.getElementById("searchInput")
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const keyword = event.target.value
    searchProject(keyword)
  })
}

function searchProject(keyword) {
  if (!listProject) return
  keyword = keyword.toLowerCase()
  
  listProject.innerHTML = ""
  
  const hasil = projects.filter(item => 
    item.judul.toLowerCase().includes(keyword) || 
    item.deskripsi.toLowerCase().includes(keyword)
  )

  hasil.forEach(project => {
    listProject.innerHTML += `
      <article class="kartu">
        <h3>${project.judul}</h3>
        <img src="${project.gambar}" alt="${project.alt}" width="280">
        <p>${project.deskripsi}</p>
      </article>
    `
  })
}