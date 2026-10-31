// mengambil DOM element form
let form = document.getElementById("form")
let resultElement = document.getElementById("result")

// menambahkan custom event yang akan ter-triger ketika user memencet tombol "jumlah"
form.addEventListener('submit', (e) => {
  
  //menghapus event default yang membuat halaman reload
  e.preventDefault()

  //mengambil isi dari input input yang ada pada form langsung menggunakna property
  const n1 = Number(this.n1.value)
  const n2 = Number(this.n2.value)
  const n3 = Number(this.n3.value)

  //menjumlahkan dan menyimpanya pada variable
  let result = n1 + n2 + n3;

  // menampilkan hasilnya pada console dan ui web
  console.log("total:", n1 + n2 + n3)
  resultElement.innerText = result
})