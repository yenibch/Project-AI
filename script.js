/**
 * ============================================================
 *  FUNGSI UTAMA: cekKelayakan()
 *  Fungsi ini dijalankan setiap kali tombol "Cek Status Kelayakan"
 *  diklik. Alurnya:
 *    1. Ambil nilai input
 *    2. Validasi input
 *    3. Tentukan kelayakan dengan if-else
 *    4. Tampilkan hasil ke halaman
 * ============================================================
 */
function cekKelayakan() {

  // ── LANGKAH 1: Ambil nilai dari input ──────────────────────
  // Nilai input HTML selalu bertipe string, maka kita konversi:
  //   parseFloat → untuk IPK (bisa desimal, misal 3.50)
  //   parseInt   → untuk pendapatan (bilangan bulat Rupiah)
  var nilaiIPK        = parseFloat(document.getElementById('inputIPK').value);

  // Ambil nilai pendapatan dari input teks yang sudah diformat (misal: "2.500.000").
  // Sebelum dikonversi ke angka, hapus dulu semua titik ribuan menggunakan replace().
  //   replaceAll('.',  '') → menghapus semua karakter titik dari string
  //   parseInt(...)        → mengubah string angka murni menjadi bilangan bulat
  // Contoh alur: "2.500.000" → "2500000" → 2500000
  var nilaiPendapatan = parseInt(document.getElementById('inputPendapatan').value.replaceAll('.', ''));

  // Ambil referensi ke area hasil agar bisa dimanipulasi nanti
  var elHasil = document.getElementById('hasil');

  // Sembunyikan & bersihkan hasil sebelumnya setiap kali tombol diklik
  elHasil.style.display  = 'none';
  elHasil.className      = '';
  elHasil.innerHTML      = '';


  // ── LANGKAH 2: VALIDASI INPUT ──────────────────────────────
  /**
   * Validasi 1: Cek apakah salah satu atau kedua input kosong.
   * Jika input kosong, parseFloat/parseInt mengembalikan NaN (Not a Number).
   * isNaN() adalah fungsi bawaan JavaScript untuk mengecek hal ini.
   */
  if (isNaN(nilaiIPK) || isNaN(nilaiPendapatan)) {
    alert('Silakan isi semua data terlebih dahulu.');
    return; // Hentikan eksekusi fungsi di sini
  }

  /**
   * Validasi 2: IPK harus berada di rentang 0 sampai 4.
   * Nilai di luar rentang ini tidak masuk akal secara akademik.
   */
  if (nilaiIPK < 0 || nilaiIPK > 4) {
    alert('IPK tidak valid. Nilai IPK harus berada di antara 0.00 hingga 4.00.');
    return; // Hentikan eksekusi fungsi di sini
  }

  /**
   * Validasi 3: Pendapatan tidak boleh bernilai negatif.
   * Pendapatan minimal adalah 0 (tidak ada penghasilan).
   */
  if (nilaiPendapatan < 0) {
    alert('Pendapatan tidak valid. Nilai pendapatan tidak boleh negatif.');
    return; // Hentikan eksekusi fungsi di sini
  }


  // ── LANGKAH 3: LOGIKA PERCABANGAN IF-ELSE ─────────────────
  /**
   * Di sinilah inti dari program ini bekerja.
   *
   * Syarat LAYAK beasiswa (KEDUA kondisi harus terpenuhi):
   *   • IPK lebih dari atau sama dengan 3.25   (prestasi akademik cukup)
   *   • Pendapatan orang tua ≤ Rp 3.000.000    (membutuhkan bantuan finansial)
   *
   * Operator logika yang digunakan:
   *   &&  (AND) → KEDUA sisi harus bernilai true agar kondisi terpenuhi
   *   >=  → lebih dari atau sama dengan
   *   <=  → kurang dari atau sama dengan
   *
   * Jika kondisi di atas TIDAK terpenuhi, maka blok else dijalankan.
   */
  if (nilaiIPK >= 3.25 && nilaiPendapatan <= 3000000) {

    // ── Kondisi LAYAK ────────────────────────────────────────
    // Tambahkan kelas CSS "layak" agar warna berubah menjadi hijau
    elHasil.classList.add('layak');

    // ── FORMAT ANGKA UNTUK TAMPILAN ───────────────────────────
    // Penting: format angka di bawah HANYA untuk keperluan tampilan teks.
    // Perbandingan logika (>= 3.25 dan <= 3000000) di atas tetap menggunakan
    // nilai angka asli (nilaiIPK dan nilaiPendapatan), BUKAN string hasil format.
    //
    // • toFixed(2)          → memformat IPK menjadi 2 angka desimal
    //                         Contoh: 3.4 → "3.40"
    //                         (IPK bukan angka besar, tidak perlu pemisah ribuan)
    //
    // • toLocaleString('id-ID') → memformat angka pendapatan sesuai standar
    //                             bahasa Indonesia: titik (.) sebagai pemisah ribuan
    //                             Contoh: 2500000 → "2.500.000"

    // Isi konten HTML area hasil dengan ikon dan pesan
    elHasil.innerHTML =
      '<span style="font-size:1.4rem; line-height:1;">✅</span>' +
      '<div>' +
        '<div>Rekomendasi: Anda <strong>Layak Mendaftar</strong> via Telegram!</div>' +
        '<div class="detail-syarat">IPK ' + nilaiIPK.toFixed(2) + ' ≥ 3.25 &amp; Pendapatan Rp ' + nilaiPendapatan.toLocaleString('id-ID') + ' ≤ Rp 3.000.000</div>' +
      '</div>';

  } else {

    // ── Kondisi TIDAK LAYAK ──────────────────────────────────
    // Tambahkan kelas CSS "tidak-layak" agar warna berubah menjadi merah
    elHasil.classList.add('tidak-layak');

    // Tentukan pesan tambahan sesuai penyebab tidak layak
    var alasanTidakLayak = '';

    if (nilaiIPK < 3.25 && nilaiPendapatan > 3000000) {
      alasanTidakLayak = 'IPK kurang dari 3.25 dan pendapatan melebihi Rp 3.000.000.';
    } else if (nilaiIPK < 3.25) {
      // toFixed(2): tampilkan IPK dengan 2 desimal untuk kejelasan (misal 3.10, bukan 3.1)
      alasanTidakLayak = 'IPK ' + nilaiIPK.toFixed(2) + ' belum mencapai syarat minimum 3.25.';
    } else if (nilaiPendapatan > 3000000) {
      // toLocaleString('id-ID'): format angka pendapatan dengan titik ribuan (format Indonesia)
      // Contoh: 6000000 → "6.000.000" — lebih mudah dibaca daripada angka mentah
      alasanTidakLayak = 'Pendapatan Rp ' + nilaiPendapatan.toLocaleString('id-ID') + ' melebihi batas maksimum Rp 3.000.000.';
    }

    elHasil.innerHTML =
      '<span style="font-size:1.4rem; line-height:1;">❌</span>' +
      '<div>' +
        '<div>Rekomendasi: Anda <strong>Tidak Memenuhi Syarat</strong> Beasiswa.</div>' +
        '<div class="detail-syarat">' + alasanTidakLayak + '</div>' +
      '</div>';
  }

  // ── LANGKAH 4: Tampilkan area hasil ───────────────────────
  // Animasi fadeIn akan berjalan karena kita menyetel display melalui class CSS
  // Kita set display ke '' agar class CSS yang mengatur display flex bisa aktif
  elHasil.style.display = '';

  // Gulir halaman ke area hasil agar pengguna langsung melihatnya
  elHasil.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

} // ── akhir fungsi cekKelayakan() ──


/**
 * ============================================================
 *  FITUR TAMBAHAN: Tekan Enter untuk menjalankan cek
 *  Saat pengguna menekan tombol Enter di salah satu input,
 *  fungsi cekKelayakan() langsung dipanggil (UX lebih nyaman).
 * ============================================================
 */
document.getElementById('inputIPK').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    cekKelayakan();
  }
});

document.getElementById('inputPendapatan').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    cekKelayakan();
  }
});


/**
 * ============================================================
 *  FORMAT DESIMAL REAL-TIME: Event listener 'input' pada field IPK
 *
 *  Cara kerja:
 *    1. User mengetik angka → event 'input' terpicu.
 *    2. Ambil teks dan hapus semua karakter selain angka (termasuk titik yang diketik manual).
 *    3. Batasi maksimal 3 digit (karena IPK max 4.00, format maksimal X.XX yaitu 3 angka).
 *    4. Jika angka <= 2 digit, tampilkan angka murni apa adanya (misal "3" atau "34").
 *    5. Jika angka > 2 digit, sisipkan titik desimal di depan 2 digit terakhir
 *       (misal "340" menjadi "3.40").
 *    6. Tulis kembali string terformat ke dalam input layar.
 *
 *  PENTING: Variabel ini hanya untuk tampilan. Saat divalidasi, parseFloat()
 *  pada string "3.40" otomatis menghasilkan angka float murni 3.4
 * ============================================================
 */
document.getElementById('inputIPK').addEventListener('input', function() {
  // Ambil nilai teks dan hapus semua karakter SELAIN angka 0-9
  var angkaMurni = this.value.replace(/[^0-9]/g, '');

  // Jika field kosong, biarkan kosong
  if (angkaMurni === '') {
    this.value = '';
    return;
  }

  // Batasi maksimal 3 digit
  if (angkaMurni.length > 3) {
    angkaMurni = angkaMurni.substring(0, 3);
  }

  var hasilFormat = angkaMurni;

  // Jika jumlah angka lebih dari 2 (yaitu 3 angka), sisipkan titik desimal
  if (angkaMurni.length > 2) {
    var bagianDepan = angkaMurni.substring(0, angkaMurni.length - 2);
    var bagianBelakang = angkaMurni.substring(angkaMurni.length - 2);
    hasilFormat = bagianDepan + '.' + bagianBelakang;
  }

  // Perbarui nilai pada layar
  this.value = hasilFormat;
});


/**
 * ============================================================
 *  FORMAT RIBUAN REAL-TIME: Event listener 'input' pada field Pendapatan
 *
 *  Cara kerja:
 *    1. User mengetik angka → event 'input' terpicu setiap ada perubahan.
 *    2. Ambil nilai teks yang ada di input saat itu.
 *    3. Bersihkan semua karakter selain angka (hapus titik, huruf, dsb)
 *       agar didapat string angka murni.
 *    4. Ubah string angka murni ke tipe Number, lalu format dengan
 *       toLocaleString('id-ID') → menghasilkan string bertitik ribuan.
 *    5. Tulis kembali string terformat ke dalam kotak input.
 *
 *  Contoh alur:
 *    User ketik "2500000"
 *    → replace(/[^0-9]/g, '') → "2500000"    (angka murni)
 *    → Number("2500000")      → 2500000      (tipe Number)
 *    → toLocaleString('id-ID') → "2.500.000" (tampilan berformat)
 *    → input.value = "2.500.000"              (diperbarui ke layar)
 *
 *  PENTING: Variabel ini hanya mengatur TAMPILAN.
 *  Nilai yang digunakan untuk perhitungan kelayakan adalah
 *  nilaiPendapatan di dalam fungsi cekKelayakan(), yang sudah
 *  melepas titik lebih dulu sebelum dikonversi ke angka.
 * ============================================================
 */
document.getElementById('inputPendapatan').addEventListener('input', function() {

  // Langkah 1: Ambil nilai teks saat ini dari input
  var teksInput = this.value;

  // Langkah 2: Hapus semua karakter SELAIN digit 0-9
  // Regex /[^0-9]/g berarti: "temukan semua karakter yang bukan angka"
  var angkaMurni = teksInput.replace(/[^0-9]/g, '');

  // Langkah 3: Jika input kosong (user menghapus semua), kosongkan field dan selesai
  if (angkaMurni === '') {
    this.value = '';
    return;
  }

  // Langkah 4: Format angka murni dengan toLocaleString('id-ID')
  // Number(...) mengubah string ke tipe angka agar toLocaleString bisa dipakai
  // 'id-ID' = lokal Indonesia → titik (.) sebagai pemisah ribuan
  var angkaBerformat = Number(angkaMurni).toLocaleString('id-ID');

  // Langkah 5: Tulis kembali nilai berformat ke dalam kotak input
  this.value = angkaBerformat;
});
