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
  var nilaiPendapatan = parseInt(document.getElementById('inputPendapatan').value);

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
      alasanTidakLayak = 'IPK ' + nilaiIPK.toFixed(2) + ' belum mencapai syarat minimum 3.25.';
    } else if (nilaiPendapatan > 3000000) {
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
