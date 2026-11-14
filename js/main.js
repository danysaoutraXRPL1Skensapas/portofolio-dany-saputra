//aliasing
let tampilkan = console.log
let table = console.table

// 1. Daftar keahlian (halaman Beranda)
//import skills from "../data/keahlian.json" with { type: 'json' }; 
//I won't get any points if I use what I consider to be modern (I use ESM, by the way)

let skills = [];

fetch("data/keahlian.json")
  .then((res) => (res.ok ? res.json() : Promise.reject("Gagal mengambil data")))
  .then((data) => {
    skills = data;
    skills.push({ nama: "docker", level: "Dasar" });

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
    console.log(skills);
  })
  .catch((err) => console.error(err));


table(skills)


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

const elListProjectFilter = document.getElementById("daftar-proyek") || document.getElementById("listprojectFilter")
const elJumlahProyek = document.getElementById("jumlah-proyek")

const kartuHTML = (project) => {
  return `
    <article class="kartu">
      <span class="label">${project.kategori}</span>
      <h3>${project.judul}</h3>
      <img src="${project.gambar}" alt="${project.alt}" width="280" height="180">
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
    if (aktifLama) aktifLama.classList.remove("aktif")
    tombol.classList.add("aktif")

    if (kategori === "Semua") {
      tampilkanProyek(projects)
    } else {
      tampilkanProyek(projects.filter((item) => item.kategori === kategori))
    }
  })
}

function initProyek() {
  table(projects)

  if (!elListProjectFilter || !elJumlahProyek) return

  tampilkanProyek(projects)
  pasangFilter("filter-semua", "Semua")
  pasangFilter("filter-html", "HTML")
  pasangFilter("filter-css", "CSS")
  pasangFilter("filter-javascript", "JavaScript")
}

fetch("data/proyek.json")
  .then((res) => (res.ok ? res.json() : Promise.reject("Gagal memuat proyek")))
  .then((data) => {
    projects = data.map((item) =>
      buatKartu(item.judul, item.kategori, item.gambar, item.alt, item.deskripsi)
    )

    projects.push(buatKartu(
      "Lima Soal Logika",
      "JavaScript",
      "img/proyek-logika.png",
      "Tangkapan layar hasil uji lima soal logika",
      "Lima fungsi logika yang masing-masing diuji 3 masukan."
    ))

    console.log(projects)
    initProyek()
  })
  .catch((err) => console.error(err))



async function getDataGithub(api, mountNode) {
  if (!mountNode) return

  try {
    const res = await fetch(api)
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)
    const repos = await res.json()

    // 1) buang repo profil (opsional, seperti sebelumnya)
    const filtered = repos.filter((r) => r.full_name !== "danydevid/danydevid")

    // 2) sort: updated_at terbaru di atas
    filtered.sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    )

    // 3) ambil 6 teratas
    const top6 = filtered.slice(0, 6)

    // 4) render
    const frag = document.createDocumentFragment()

    for (const repo of top6) {
      const li = document.createElement("li")

      const a = document.createElement("a")
      a.href        = repo.html_url
      a.textContent = repo.full_name
      a.target      = "_blank"
      a.rel         = "noopener noreferrer"

      // bahasa — fallback kalau null
      const bahasa = repo.language ?? "—"

      // bintang
      const bintang = repo.stargazers_count

      const meta = document.createElement("span")
      meta.className   = "repo-meta"
      meta.textContent = ` (${bahasa} · ⭐ ${bintang})`

      li.append(a, meta)
      frag.appendChild(li)
    }

    mountNode.replaceChildren(frag)
  } catch (err) {
    console.error("Gagal mengambil data:", err.message)
  }
}

const listRepo = document.getElementById("list-repo")
if (listRepo) {
  getDataGithub(
    "https://api.github.com/users/danydevid/repos?per_page=100&sort=updated",
    listRepo
  )
}