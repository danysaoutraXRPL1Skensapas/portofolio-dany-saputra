# TODO Kode P1-W07 — Semua Ide Dipertahankan + 100% Rubrik

---

## 1. Fix bug **tanpa** hapus fitur
- [x] `main.js`: bungkus loop `for (const project of projects) { listProjectWBtn.innerHTML += ...; listProject.innerHTML += ... }` dengan `if (listProjectWBtn && listProject) { ... }` — **jangan hapus loop-nya**, hanya beri guard agar tidak crash di `index.html` dan `kontak.html`
- [x] `main.js`: di fungsi `searchProject`, perbaiki typo `listproject.innerHTML` (p kecil) → `listProject.innerHTML` (P besar) — **1 baris saja**
- [x] `main.js`: di handler `searchwithbtn`, ganti `.map(project => { listProjectWBtn.innerHTML += ... })` → `.forEach(project => { ... })` — **fitur tetap sama, method diperbaiki**
- [x] **Jangan hapus** search input, search btn, `#listprojectWBtn`, `#listproject`, `#searchwithbtn`, `#searchInput`, atau fungsi `searchProject` — semuanya tetap ada

---

## 2. Rubrik 1 — Keahlian dari array *(15 poin)*
- [x] `main.js`: ubah isi array `skills` supaya **sama dengan 6 keahlian yang sekarang tampil di HTML** (javascript, nextjs, C, Linux, HTML dasar, Mengetik cepat) dengan level masing-masing — jadi idenya tetap, cuma dipindahkan ke array
- [x] `main.js`: tambah `const elDaftarSkill = document.getElementById("daftar-skill")` dan `const elJumlahSkill = document.getElementById("jumlah-skill")`
- [x] `main.js`: tambah blok `if (elDaftarSkill && elJumlahSkill) { ... }` — isi: `skills.forEach` → `document.createElement("li")` → `li.textContent = nama + level` → `elDaftarSkill.appendChild(li)` → `elJumlahSkill.textContent = "Ada N keahlian..."`
- [x] `index.html`: ganti `<ul><li>...</li></ul>` di kartu Keahlian → `<ul id="daftar-skill"></ul>` + `<p id="jumlah-skill"></p>`

---

## 3. Rubrik 3 — Filter 4 tombol *(30 poin)*
- [x] `proyek.html`: tambahkan **section baru** di antara "Proyek Saya" dan "search with btn" — berisi 4 tombol filter (`#filter-semua`, `#filter-html`, `#filter-css`, `#filter-javascript`) + `<p id="jumlah-proyek">` + `<div id="listprojectFilter" class="daftar-kartu">`
- [x] **Jangan hapus** 3 article manual di "Proyek Saya" — itu tetap "featured projects"
- [x] **Jangan hapus** section "search with btn" dan "search input" — dua-duanya tetap ada
- [x] `main.js`: tambah `const elListProjectFilter = document.getElementById("listprojectFilter")`
- [x] `main.js`: tambah `const elJumlahProyek = document.getElementById("jumlah-proyek")`
- [x] `main.js`: tambah helper `kartuHTML(project)` — return HTML string kartu dengan `<span class="label">`
- [x] `main.js`: tambah `function tampilkanProyek(daftar)` — kosongkan `elListProjectFilter.innerHTML`, `forEach` tambah `kartuHTML`, update `elJumlahProyek`
- [x] `main.js`: tambah `function pasangFilter(idTombol, kategori)` — `getElementById` + `addEventListener("click")` + `filter` + panggil `tampilkanProyek`
- [x] `main.js`: tambah `if (elListProjectFilter) { tampilkanProyek(projects); pasangFilter("filter-semua", "Semua"); pasangFilter("filter-html", "HTML"); pasangFilter("filter-css", "CSS"); pasangFilter("filter-javascript", "JavaScript") }`

---

## 4. Rubrik 4 — Tombol aktif + jumlah *(15 poin)*
- [x] `proyek.html`: tombol `#filter-semua` di HTML **diberi class `tombol-filter aktif`** dari awal
- [x] `main.js`: di dalam handler `pasangFilter`, sebelum filter dijalankan: `const aktifLama = document.querySelector(".tombol-filter.aktif"); if (aktifLama) aktifLama.classList.remove("aktif")`
- [x] `main.js`: di handler yang sama, setelah itu: `tombol.classList.add("aktif")`
- [x] `main.js`: di `tampilkanProyek`, set `elJumlahProyek.textContent = "Menampilkan X dari 6 proyek"`

---

## 5. Rubrik 2 — Mode gelap lengkap *(20 poin)*
- [x] `theme.js`: ganti `var t = ...` → `const t = ...`
- [x] `theme.js`: hapus `console.log("Theme.js executed")` (opsional, biar Console bersih)
- [x] `theme.js`: **jangan** ubah mekanisme `data-theme` + `localStorage` — tetap gaya kamu, sah untuk rubrik
- [x] `style.css`: di aturan `input, select, textarea`, **tambahkan** `background-color: var(--bg-surface)` dan `color: var(--text-primary)` — supaya form ikut gelap

---

## 6. CSS untuk elemen baru
- [x] `style.css`: tambah `.filter { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }`
- [x] `style.css`: tambah `.tombol-filter { padding: 0.5rem 1rem; border: 2px solid var(--border-strong); background-color: var(--bg-surface); color: var(--text-heading); border-radius: 6px; font-weight: 600; cursor: pointer; }`
- [x] `style.css`: tambah `.tombol-filter.aktif { background-color: var(--color-accent); color: var(--text-inverse); border-color: var(--color-accent); }`
- [x] `style.css`: tambah `.label { display: inline-block; padding: 0.1rem 0.6rem; margin-bottom: 0.5rem; border-radius: 999px; background-color: var(--bg-primary); color: var(--text-heading); font-size: 0.85rem; font-weight: 600; }`
- [x] `style.css`: tambah `.keterangan { font-size: 0.875rem; }`

---

## 7. Bonus — Penghitung karakter *(sudah jadi ide kamu, tinggal diaktifkan)*
- [x] `kontak.html`: tambahkan `maxlength="300"` pada `<textarea id="pesan">`
- [x] `kontak.html`: tambahkan `<span id="hitung-karakter" class="keterangan">0/300 karakter</span>` tepat setelah textarea
- [x] `main.js`: tambah `const elPesan = document.getElementById("pesan")` dan `const elHitungKarakter = document.getElementById("hitung-karakter")`
- [x] `main.js`: tambah `if (elPesan && elHitungKarakter) { elPesan.addEventListener("input", () => { elHitungKarakter.textContent = elPesan.value.length + "/300 karakter" }) }`

---

## 8. Rubrik 5 — Kerapian
- [x] `main.js`: tambahkan komentar bagian — `// 1. Daftar keahlian`, `// 2. Tema gelap (theme.js)`, `// 3. Penghitung karakter`, `// 4. Daftar proyek dan filter`, `// 5. Search (bonus fitur)`
- [x] Buka `index.html` → pastikan Console **tidak ada error merah**
- [x] Buka `proyek.html` → pastikan Console **tidak ada error merah**
- [x] Buka `kontak.html` → pastikan Console **tidak ada error merah**
- [x] Pastikan ketiga halaman **tetap memuat `theme.js`** dan tombol `#togleTheme` ada di HTML ketiganya

---

## 9. Commit & push
- [x] `git add .`
- [x] `git commit -m "feat: keahlian dinamis, mode gelap, filter proyek"`
- [ ] `git push`
- [ ] Buka Vercel, `Ctrl+F5`, cek filter + mode gelap di live

---

## Yang **tidak boleh** dihapus (ide kamu, tetap dipertahankan)

| Fitur | Lokasi | Status |
|---|---|---|
| Search pakai tombol | `#searchwithbtn` + `#listprojectWBtn` di `proyek.html`, handler di `main.js` | tetap, hanya fix `.map()` → `.forEach()` |
| Search pakai input | `#searchInput` + `#listproject` di `proyek.html`, `searchProject` di `main.js` | tetap, hanya fix typo `listproject` → `listProject` |
| 3 artikel manual di "Proyek Saya" | `proyek.html` | tetap — jadi "featured projects" |
| Tombol tema floating | `#togleTheme` di ketiga HTML | tetap, posisi fixed di kanan bawah |
| Aliasing `tampilkan` / `table` | `main.js` | tetap |
| `let skills` / `let projects` | `main.js` | tetap |
| Factory `buatKartu(...)` | `main.js` | tetap |
| `data-theme` + `localStorage` | `theme.js` | tetap |
| `getElementById` untuk elemen | `main.js` | tetap (hanya `querySelector(".tombol-filter.aktif")` yang perlu ada, karena rubrik minta class `aktif` dicari) |
| Tombol C, DEL, `=`, operasi `/×-+` | `mycalc.html` + `mycalc.js` | tetap, tidak berubah |
| OOP `Student`, unit test `logika.test.js`, `mycalc.test.js` | folder `js/` | tetap, tidak berubah |

---

## Cek akhir: rubrik terpenuhi tanpa hapus ide

| # | Rubrik | Poin | Dicek oleh |
|---|---|---|---|
| 1 | Keahlian dari array | 15 | Todo 2 |
| 2 | Mode gelap | 20 | Todo 5 |
| 3 | Filter proyek | 30 | Todo 3 |
| 4 | Tombol aktif + jumlah | 15 | Todo 4 |
| 5 | Kerapian + GitHub | 10 | Todo 1, 5, 8, 9 |
| 6 | Tantangan localStorage | 10 | Todo 5 (tetap dipertahankan) |
| | **Total** | **100** | |