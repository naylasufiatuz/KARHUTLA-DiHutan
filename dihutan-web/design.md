DESIGN SYSTEM & UI GUIDELINES --- DiHutan
Proyek: DiHutan --- Platform Informasi, Edukasi, dan Pemantauan
Pencegahan Kebakaran Hutan
Wilayah fokus: Hutan Kalimantan, khususnya kawasan Sungai Kapuas,
Kalimantan Barat
Dokumen: design.md
Fungsi: Acuan visual dan pengalaman antarmuka untuk website publik
dan dashboard setelah login
1. Arah Desain
DiHutan harus terlihat seperti platform teknologi lingkungan yang
profesional, terpercaya, dan dekat dengan alam. Desain menggabungkan dua
karakter:
1. Environmental technology platform untuk monitoring, perangkat
   IoT, peta, data sensor, dan laporan.
2. Editorial nature encyclopedia untuk artikel tentang hutan
   Kalimantan, flora, fauna, tanah gambut, Sungai Kapuas, dan
   konservasi.
Hasil akhir harus terasa dirancang secara sengaja, bukan seperti
template dashboard otomatis atau tampilan AI generik.
Kata kunci visual
- Natural
- Tenang
- Profesional
- Informatif
- Editorial
- Modern
- Terstruktur
- Mudah dibaca
- Berorientasi pada data dan dokumentasi
Prinsip utama
- Konten lebih penting daripada dekorasi.
- Foto asli lebih penting daripada ilustrasi dekoratif.
- Ikon konsisten lebih baik daripada emoji.
- Satu halaman memiliki satu tujuan utama yang jelas.
- Jangan mengubah semua informasi menjadi kartu.
- Ruang kosong digunakan untuk membantu pembacaan, bukan dianggap
  sebagai ruang yang harus selalu diisi.
- Hindari elemen visual yang memberi kesan fitur tersedia padahal
  belum diimplementasikan.
2. Identitas Visual
2.1 Palet warna
Gunakan palet warna yang terinspirasi dari hutan tropis, tanah, dan air
Sungai Kapuas.
  Token                   Warna                   Penggunaan
  Forest 950              #082F22               Sidebar gelap, header
gelap, teks pada area
terang tertentu

  Forest 900              #0B3B2B               Warna utama DiHutan

  Forest 800              #14543C               Hover dan elemen utama
sekunder

  Forest 700              #1D6A4B               Tombol utama dan link
penting

  Forest 100              #E5F0E9               Latar aksen lembut

  Leaf 500                #3D9567               Aksen positif dan
elemen alam

  River 600               #278A91               Aksen data
air/kelembapan

  Sand 100                #F4F3EC               Latar halaman
alternatif

  Surface                 #FFFFFF               Permukaan konten

  Canvas                  #F6F8F5               Latar utama dashboard

  Text 900                #17251E               Teks utama

  Text 700                #43564B               Teks sekunder

  Text 500                #75847A               Metadata dan bantuan

  Border                  #E1E8E2               Garis pembatas

  Success                 #248653               Status normal/berhasil

  Warning                 #B7791F               Peringatan/perlu
pemeriksaan

  Danger                  #C44545               Kondisi kritis/error
Neutral                 #7A8580               Tidak diketahui/tidak
tersedia
Aturan penggunaan: - Hijau gelap adalah identitas utama, bukan warna
untuk semua elemen. - Gunakan latar putih atau canvas terang untuk
sebagian besar konten. - Warna status hanya digunakan ketika benar-benar
menyampaikan status. - Jangan menggunakan merah hanya sebagai
dekorasi. - Pastikan teks dan latar memiliki kontras yang cukup. -
Jangan membuat seluruh halaman menjadi hijau gelap.
2.2 Tipografi
Gunakan tipografi yang konsisten dengan landing page: Inter untuk
heading, body, dan UI; Georgia digunakan hanya untuk aksen editorial
serif/italic. Sediakan fallback system yang setara jika font eksternal
gagal dimuat.

Pilih satu kombinasi dan gunakan secara konsisten di seluruh website.
Jika font eksternal gagal dimuat, sediakan fallback sans-serif.

Skala tipografi desktop:

  Elemen              Ukuran     Weight Catatan
  Display hero     52--64 px   700--800 Hanya untuk hero halaman publik
H1 halaman       32--40 px        700 Judul halaman
H2 section       24--30 px   650--700 Judul bagian
H3               18--22 px   600--700 Subbagian
Body besar       17--18 px   400--500 Intro dan lead
Body             14--16 px        400 Teks utama
Label            12--13 px   500--600 Form dan metadata
Caption          12--13 px        400 Sumber foto dan keterangan

Aturan: - Jangan memakai terlalu banyak ukuran font dalam satu
halaman. - Hindari semua teks menggunakan bold. - Gunakan line-height
sekitar 1.5--1.7 untuk artikel. - Batasi lebar paragraf agar nyaman
dibaca. - Angka sensor boleh lebih besar, tetapi satuan dan konteks
harus tetap terlihat.
3. Layout dan Grid
3.1 Ukuran dasar
- Sistem spacing berbasis kelipatan 4 px.
- Konten utama desktop memiliki padding horizontal sekitar 32--48 px.
- Lebar maksimum konten halaman publik sekitar 1200--1320 px.
- Lebar maksimum teks artikel sekitar 720--780 px.
- Radius komponen standar 8--14 px.
- Radius panel besar maksimal sekitar 18--22 px.
- Gunakan border tipis; shadow hanya jika membantu memisahkan layer.
3.2 Dashboard layout
Desktop: - Sidebar tetap di kiri, lebar sekitar 248--272 px. - Topbar
setinggi sekitar 68--76 px. - Area konten mengisi sisa lebar. - Konten
tidak menempel ke tepi viewport. - Sidebar memiliki logo, navigasi, dan
area akun di bagian bawah.

Tablet: - Sidebar dapat diperkecil menjadi ikon dengan tooltip atau
menjadi drawer. - Topbar tetap menyediakan judul halaman dan akses
akun. - Grid konten berubah menjadi dua kolom atau satu kolom sesuai
lebar.

Mobile: - Gunakan navigasi drawer atau bottom navigation yang ringkas
sesuai jumlah menu. - Jangan memaksakan sidebar desktop ke layar
kecil. - Tabel lebar dapat menggunakan horizontal scroll atau tampilan
daftar. - Peta harus tetap dapat digunakan dengan kontrol yang mudah
dijangkau.
3.3 Spacing
Gunakan skala berikut secara konsisten:

  Token     Ukuran
  1           4 px
2           8 px
3          12 px
4          16 px
5          20 px
6          24 px
8          32 px
10         40 px
12         48 px
16         64 px

Jangan menggunakan jarak acak tanpa alasan. Jarak antarseksi harus lebih
besar daripada jarak antaritem dalam satu kelompok.
4. Komponen Navigasi
4.1 Sidebar dashboard
Logo: - Gunakan logo DiHutan yang sudah tersedia di repository jika
ada. - Jangan membuat logo baru jika aset resmi sudah tersedia. - Logo
memiliki ruang yang cukup dan tidak terlalu besar.

Menu utama: 1. Overview 2. Monitoring 3. Perangkat IoT 4. Edukasi Hutan
5. Laporan 6. Pengaturan

Ketentuan: - Gunakan ikon outline dari lucide-react. - Ukuran ikon
sekitar 18--21 px. - Label menu harus jelas. - Menu aktif menggunakan
latar hijau yang sedikit lebih terang dan indikator visual yang tidak
berlebihan. - Hover cukup menggunakan perubahan latar/warna. - Jangan
menggunakan emoji. - Jangan menambahkan menu Peta Pemantauan terpisah. -
Jangan menambahkan menu Kontrol Pompa terpisah.
4.2 Topbar
Elemen yang diperbolehkan: - Breadcrumb atau nama halaman. - Pencarian
jika pencarian benar-benar berfungsi. - Indikator status sistem jika
didukung data aktual. - Notifikasi jika sistem notifikasi sudah
tersedia. - Profil pengguna dan menu akun.

Jangan menampilkan tombol pencarian, lonceng, atau indikator sistem yang
hanya menjadi dekorasi dan tidak memiliki fungsi.
5. Tombol, Form, dan Interaksi
5.1 Tombol
Primary: - Latar Forest 700/800. - Teks putih. - Digunakan untuk aksi
utama, misalnya Simpan, Kirim Laporan, atau Masuk.

Secondary: - Latar putih atau transparan. - Border Border. - Teks Forest
900.

Text button: - Tanpa latar. - Untuk aksi sekunder seperti Lihat detail.

Danger: - Digunakan untuk aksi yang berisiko seperti hapus. - Harus
disertai konfirmasi jika tindakan tidak dapat dibatalkan.

Ketentuan: - Label tombol berupa kata kerja yang jelas. - Hindari
terlalu banyak tombol utama dalam satu area. - Tombol disabled harus
terlihat berbeda dan tidak dapat diklik. - Semua tombol harus memiliki
state hover, focus, active, dan disabled.
5.2 Form
- Setiap input memiliki label yang terlihat.
- Placeholder bukan pengganti label.
- Tampilkan validasi dekat dengan input terkait.
- Jelaskan alasan jika input tidak valid.
- Gunakan konfirmasi untuk tindakan penting.
- Jangan meminta data yang tidak diperlukan.
5.3 Feedback
Sediakan: - Loading state. - Empty state. - Error state. - Success
feedback. - Confirmation dialog untuk aksi penting.

Pesan harus menjelaskan apa yang terjadi dan apa langkah berikutnya.
Hindari pesan generik seperti "Oops!" tanpa penjelasan.
6. Desain Halaman Publik
6.1 Beranda
Karakter: editorial, kuat secara visual, tetapi tetap informatif.

Susunan: 1. Navbar sederhana. 2. Hero dengan foto hutan berkualitas dari
aset proyek atau foto yang memang memiliki izin penggunaan. 3. Judul
yang menjelaskan tujuan DiHutan. 4. Deskripsi singkat dan CTA. 5. Bagian
masalah dan konteks kebakaran hutan. 6. Bagian solusi DiHutan. 7.
Diagram cara kerja. 8. Foto dan ringkasan perangkat IoT. 9. Bagian
wilayah Sungai Kapuas. 10. Artikel edukasi pilihan. 11. Footer
informatif.

Hero: - Gunakan satu visual utama yang kuat. - Jangan menumpuk banyak
badge, label, atau kartu mengambang. - CTA utama harus jelas. - Pastikan
teks terbaca di atas foto; gunakan overlay secukupnya jika diperlukan.
6.2 Tentang DiHutan
- Gunakan layout editorial dengan judul, lead paragraph, dan section
  yang terstruktur.
- Ceritakan latar belakang, tujuan, ruang lingkup, dan keterbatasan
  sistem.
- Gunakan foto pendukung jika tersedia.
- Hindari paragraf panjang tanpa subjudul.
6.3 Cara Kerja Sistem
- Tampilkan diagram proses dengan urutan yang mudah diikuti.
- Setiap tahap memiliki nomor, ikon, judul, dan penjelasan.
- Gunakan garis penghubung sederhana.
- Jangan menggunakan ilustrasi yang membingungkan atau menunjukkan
  koneksi yang tidak sesuai perangkat nyata.
- Bedakan proses otomatis oleh sistem dan tindakan yang harus
  dilakukan petugas.
6.4 Perangkat IoT publik
- Gunakan foto asli perangkat.
- Tampilkan satu perangkat per bagian/kartu editorial, bukan kumpulan
  ikon generik.
- Sertakan fungsi, peran dalam sistem, dan hubungan dengan perangkat
  lain.
- Berikan tautan menuju penjelasan lebih lengkap jika dibutuhkan.
6.5 Edukasi publik
- Tampilkan kategori dan artikel pilihan seperti halaman perpustakaan.
- Gunakan foto thumbnail yang sesuai dengan isi artikel.
- Judul dan ringkasan harus mudah dipindai.
- Jangan menggunakan desain level, badge XP, misi, atau kuis.
7. Desain Dashboard Setelah Login
7.1 Overview
Tujuan: memberi pemahaman cepat mengenai sistem DiHutan dan kondisi data
yang tersedia.

Susunan: 1. Judul "Overview" dan deskripsi. 2. Ringkasan fungsi DiHutan
dalam paragraf singkat. 3. Diagram mini alur sistem. 4. Ringkasan lokasi
dan perangkat yang benar-benar terdaftar. 5. Ringkasan pembacaan sensor
terbaru jika tersedia. 6. Peringatan terbaru. 7. Cuplikan Monitoring. 8.
Perangkat IoT. 9. Artikel edukasi terbaru.

Aturan: - Jangan membuat hero dashboard besar yang hanya berisi
sapaan. - Jangan mengisi halaman dengan angka simulasi yang tidak diberi
label. - Jangan menampilkan semua data dari Monitoring sekaligus. -
Gunakan section yang jelas dengan judul dan deskripsi singkat. - Tautan
"Lihat monitoring", "Lihat perangkat", dan "Baca artikel" harus menuju
halaman yang benar.
7.2 Monitoring
Tujuan: membantu pengguna memahami kondisi lingkungan dan memeriksa
lokasi pemantauan.

Layout desktop yang disarankan: - Bagian atas: judul, deskripsi, waktu
data terakhir. - Area utama: peta sebagai elemen penting, bukan
thumbnail kecil. - Panel samping atau panel bawah: detail lokasi
terpilih. - Di bawah peta: pembacaan sensor dan grafik historis. -
Bagian akhir: daftar peringatan dan tindak lanjut.

Peta: - Fokus geografis di kawasan Sungai Kapuas, Kalimantan Barat. -
Gunakan MapLibre GL JS dan penyedia tile yang sesuai. - Cantumkan
atribusi penyedia peta. - Marker perangkat harus berasal dari koordinat
valid di database. - Marker demo harus diberi label DEMO. - Sediakan
legenda dan filter yang sederhana. - Popup marker menampilkan nama
lokasi, status data, dan tautan detail. - Jangan membuat peta palsu
sebagai gambar statis.

Pembacaan sensor: - Tampilkan nama parameter, nilai, satuan, waktu
pembacaan, dan sumber perangkat. - Contoh parameter: suhu udara (°C),
kelembapan udara (%RH), pembacaan gas (ADC atau satuan yang benar-benar
didukung), dan kelembapan tanah (% atau raw ADC sesuai implementasi). -
Jangan mengubah raw ADC menjadi persentase jika belum ada kalibrasi yang
benar. - Grafik memiliki rentang waktu yang jelas dan tidak mencampur
data simulasi dengan data nyata tanpa penanda.

Peringatan: - Gunakan warna status dengan makna konsisten. - Tampilkan
waktu, lokasi, alasan peringatan, dan status verifikasi. - Jangan
menggunakan animasi berkedip atau efek dramatis untuk membuat peringatan
terlihat penting.
7.3 Perangkat IoT
Tujuan: menjelaskan perangkat fisik dan kondisi perangkat yang dapat
diketahui.

Tampilan: - Bagian pengantar tentang arsitektur perangkat DiHutan. -
Diagram hubungan perangkat. - Daftar perangkat dengan foto asli. -
Detail setiap perangkat. - Status dan data yang benar-benar tersedia.

Setiap detail perangkat menampilkan: - Foto perangkat. - Nama. -
Fungsi. - Cara kerja. - Koneksi ke sistem. - Status jika dapat
diverifikasi. - Data terakhir jika tersedia. - Catatan batasan
perangkat.

Status: - ONLINE/OFFLINE untuk konektivitas perangkat ke backend. -
ACTIVE/INACTIVE untuk aktuator jika statusnya memang dikirim. -
NORMAL/ERROR/NO DATA untuk status pembacaan sensor jika didukung. -
UNKNOWN untuk kondisi yang tidak dapat diverifikasi.

Jangan memberi status aktif/nonaktif pada adaptor atau expansion board
jika tidak ada sensor/telemetri yang membuktikannya.
7.4 Edukasi Hutan
Karakter: membaca buku/ensiklopedia digital.

Halaman indeks: - Judul dan pengantar. - Kategori konten. - Artikel
unggulan. - Daftar artikel. - Pencarian/filter jika berfungsi.

Halaman kategori: - Nama kategori dan penjelasan. - Artikel yang
relevan. - Foto dan ringkasan. - Navigasi kembali ke semua kategori.

Halaman artikel: - Breadcrumb. - Kategori dan metadata. - Judul besar. -
Ringkasan/lead. - Foto utama dengan caption dan sumber. - Daftar isi
untuk artikel panjang. - Isi artikel dengan heading yang terstruktur. -
Foto pendukung. - Referensi. - Artikel terkait. - Navigasi artikel
sebelumnya/berikutnya.

Tipografi artikel: - Lebar kolom bacaan sekitar 680--780 px. - Body text
sekitar 16--18 px. - Line-height sekitar 1.65--1.8. - Jarak antarapagraf
cukup. - Heading memiliki hierarki konsisten.

Tidak boleh ada: - XP. - Level. - Poin. - Misi. - Leaderboard. - Kuis. -
Gameplay. - Animasi hadiah.
7.5 Laporan
- Tampilkan daftar laporan dengan filter status dan waktu.
- Informasi penting: judul/kategori, lokasi, waktu, pelapor sesuai hak
  akses, dan status.
- Detail laporan memiliki deskripsi, bukti foto jika ada, catatan
  pemeriksaan, dan riwayat perubahan status.
- Form laporan dibuat sederhana dan mudah dipahami.
- Role USER hanya dapat melihat laporan miliknya kecuali ada kebijakan
  akses lain.
- Admin/petugas hanya dapat mengelola laporan sesuai kewenangan.
7.6 Pengaturan
- Gunakan form sederhana.
- Kelompokkan profil, keamanan akun, notifikasi, dan informasi
  aplikasi.
- Jangan membuat opsi pengaturan yang belum didukung sistem.
8. Foto dan Aset Visual
8.1 Prioritas sumber gambar
Urutan prioritas: 1. Foto asli yang sudah disediakan pemilik proyek di
folder repository. 2. Foto dokumentasi tim yang memang boleh digunakan.
3. Foto dari sumber eksternal dengan lisensi yang sesuai dan atribusi
jika diwajibkan.

Jangan mengganti foto perangkat asli dengan: - Emoji. - Ikon generik. -
Ilustrasi AI. - Foto perangkat yang berbeda model.
8.2 Proses pemeriksaan aset
Sebelum implementasi: 1. Periksa seluruh folder aset yang relevan
(public, assets, images, atau folder lain yang benar-benar ada).
2. Catat daftar file gambar dan dimensinya. 3. Buka/inspeksi gambar
untuk mengenali objeknya. 4. Cocokkan foto dengan nama perangkat yang
benar. 5. Gunakan path file yang benar-benar ditemukan. 6. Jika foto
perangkat belum tersedia, tampilkan placeholder yang secara eksplisit
menyatakan gambar belum tersedia. Jangan mengarang path.
8.3 Perlakuan gambar
- Gunakan object-fit: contain untuk foto perangkat agar bentuk
  perangkat tidak terpotong.
- Gunakan object-fit: cover untuk foto suasana hutan atau thumbnail
  artikel jika komposisinya sesuai.
- Jangan memotong label/komponen penting.
- Gunakan rasio gambar yang konsisten dalam satu kelompok.
- Berikan alt text yang menjelaskan isi gambar.
- Tambahkan caption/sumber pada foto artikel.
9. Ikon dan Ilustrasi
Gunakan lucide-react sebagai pustaka ikon utama.

Aturan: - Gunakan ikon outline dengan gaya dan ukuran konsisten. - Ikon
navigasi sekitar 18--21 px. - Ikon pendamping sekitar 16--20 px. - Ikon
besar hanya untuk empty state atau ilustrasi fungsional. - Gunakan ikon
hanya untuk memperjelas fungsi. - Beri label teks pada aksi penting;
jangan mengandalkan ikon saja. - Jangan gunakan emoji sebagai pengganti
ikon. - Jangan mencampur banyak pustaka ikon dengan gaya yang berbeda.
10. Grafik, Data, dan Status
10.1 Grafik
- Grafik harus memiliki judul dan satuan.
- Sumbu waktu harus terbaca.
- Rentang waktu harus disebutkan.
- Tooltip menampilkan waktu dan nilai.
- Jangan menampilkan grafik tanpa data.
- Empty state harus menjelaskan bahwa data belum tersedia.
- Gunakan warna seri yang konsisten antarhalaman.
10.2 Status
Status harus memiliki: - Label teks. - Warna. - Arti yang jelas. -
Sumber data.

Jangan mengandalkan warna saja untuk menyampaikan status. Sertakan label
seperti "Online", "Offline", "Menunggu verifikasi", atau "Data tidak
tersedia".
10.3 Timestamp
- Tampilkan kapan data terakhir diterima.
- Gunakan zona waktu yang konsisten, misalnya WIB untuk konteks
  Kalimantan Barat.
- Bedakan waktu perangkat membaca sensor dan waktu server menerima
  data jika keduanya tersedia.
- Jangan menampilkan "diperbarui 2 menit lalu" jika timestamp tidak
  valid.
11. Motion dan Animasi
Gunakan animasi secukupnya untuk membantu orientasi pengguna.

Boleh: - Transisi hover. - Perubahan state menu. - Fade/slide ringan
saat panel muncul. - Animasi loading yang sederhana. - Transisi halaman
yang singkat.

Hindari: - Parallax berlebihan di dashboard. - Animasi yang terus
berjalan. - Floating cards dekoratif. - Glow/neon. - Efek teks
berlebihan. - Animasi yang mengganggu pembacaan artikel atau pemeriksaan
data.

Hormati preferensi prefers-reduced-motion.
12. Responsivitas dan Aksesibilitas
- Semua halaman harus dapat digunakan pada desktop, tablet, dan
  ponsel.
- Kontras teks dan latar harus memadai.
- Semua kontrol dapat diakses menggunakan keyboard.
- Focus state harus terlihat.
- Form memiliki label yang jelas.
- Gambar memiliki alt text.
- Jangan menyampaikan status hanya melalui warna.
- Area klik tombol dan ikon cukup besar untuk layar sentuh.
- Jangan mengunci orientasi layar.
- Peta tetap dapat digunakan dengan kontrol sentuh.
13. Konsistensi Teknis
Acuan implementasi: - Next.js App Router. - TypeScript. - Plain CSS atau
CSS Modules; jangan menambahkan Tailwind jika proyek tidak
menggunakannya. - lucide-react untuk ikon. - MapLibre GL JS untuk peta
interaktif. - Supabase untuk Auth, database, dan Storage sesuai
integrasi proyek. - Gunakan komponen reusable untuk navigasi, tombol,
form, status, tabel, artikel, dan panel data.

Ketentuan: - Periksa teknologi dan struktur yang sudah ada sebelum
mengubah konfigurasi. - Jangan mengganti stack proyek tanpa alasan dan
persetujuan. - Jangan membuat komponen duplikat dengan fungsi yang
sama. - Jangan menaruh secret key di frontend. - Terapkan otorisasi
berdasarkan role di backend/RLS, bukan hanya menyembunyikan tombol. -
Pertahankan kompatibilitas dengan aplikasi Android yang memakai Supabase
yang sama.
14. Do & Don't
DO
- Gunakan foto asli perangkat.
- Gunakan ikon Lucide yang konsisten.
- Buat hierarki konten yang jelas.
- Jelaskan konteks angka sensor.
- Tampilkan sumber dan timestamp data.
- Gunakan diagram untuk menjelaskan alur sistem.
- Buat artikel nyaman dibaca.
- Sediakan empty/loading/error state.
- Gunakan layout yang responsif.
- Pertahankan kesederhanaan dan konsistensi.
DON'T
- Jangan memakai emoji sebagai ikon UI.
- Jangan membuat semua konten menjadi kartu.
- Jangan menggunakan gradien di hampir semua elemen.
- Jangan menambahkan angka atau status palsu.
- Jangan membuat marker lokasi perangkat tanpa koordinat valid.
- Jangan menggunakan foto perangkat yang tidak sesuai.
- Jangan membuat edukasi menjadi game.
- Jangan menampilkan kontrol perangkat yang belum tersedia.
- Jangan menampilkan tombol yang tidak berfungsi.
- Jangan membuat dashboard hanya berupa sapaan dan angka.
- Jangan meniru tampilan referensi secara mentah; gunakan prinsip
  visualnya dan sesuaikan dengan identitas DiHutan.
15. Definition of Done --- Design
Desain dianggap memenuhi dokumen ini apabila:
- [ ] Identitas visual DiHutan konsisten di seluruh halaman.
- [ ] Dashboard terasa profesional dan tidak seperti template generik.
- [ ] Tidak ada emoji yang digunakan sebagai ikon UI.
- [ ] Ikon berasal dari satu sistem utama, yaitu Lucide.
- [ ] Foto perangkat menggunakan aset asli yang tersedia.
- [ ] Halaman Overview menjelaskan konteks sistem.
- [ ] Halaman Monitoring menempatkan peta sebagai bagian utama
  halaman.
- [ ] Halaman Perangkat IoT menjelaskan fungsi dan hubungan perangkat.
- [ ] Halaman Edukasi nyaman dibaca seperti buku digital.
- [ ] Grafik, status, dan angka memiliki konteks serta satuan.
- [ ] Empty state, loading state, dan error state tersedia.
- [ ] Tidak ada elemen dekoratif yang menyiratkan fitur palsu.
- [ ] Semua halaman responsif.
- [ ] Focus state dan aksesibilitas dasar tersedia.
- [ ] Komponen dan spacing konsisten.
16. Hubungan dengan Dokumen Lain
Dokumen ini harus digunakan bersama: - user-flow.md --- menjelaskan
siapa pengguna, tujuan halaman, dan alur antarfitur. - design.md ---
menjelaskan identitas visual, layout, komponen, dan aturan UI.

Jika ada konflik: 1. Kebenaran fungsi dan alur sistem mengikuti
implementasi yang telah diverifikasi serta user-flow.md. 2. Aturan
visual mengikuti design.md. 3. Jangan mengorbankan kebenaran data atau
alur sistem demi membuat tampilan terlihat penuh. 4. Jika fitur belum
tersedia, tampilkan keadaan belum tersedia dengan jelas daripada membuat
simulasi yang tidak diberi label.