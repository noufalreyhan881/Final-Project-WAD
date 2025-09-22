# Final-Project-WAD
## Information Architecture 

### 1. Struktur Navigasi Utama
Navigasi ini akan menjadi menu utama yang dapat diakses dari halaman mana pun.
- Beranda
- Katalog Buku
- Login
- Daftar

### 2. Peta Halaman Berdasarkan Peran
Berikut adalah detail hierarki halaman yang menunjukkan alur pengguna dari setiap peran.

  #### A. Halaman Umum (Akses Publik)
  Halaman yang bisa dilihat oleh semua pengunjung, baik yang sudah login maupun belum.
  - Beranda (/)
  - Login (/login)
  - Daftar (/register)
  - Katalog Buku (/books)
  - Detail Buku (/books/:id)

  #### B. Halaman Anggota (Setelah Login)
  Halaman yang hanya dapat diakses oleh anggota yang sudah login.
  - Dashboard Anggota (/dashboard)
  - Riwayat Peminjaman (/my-borrowings)
  - Katalog Buku (/books)
  - Detail Buku (/books/:id)
  - Profil Anggota (/profile)
  - Edit Profil (/profile/edit)
  - Ganti Password (/profile/password)
  
  #### C. Halaman Admin (Setelah Login)
  Halaman yang hanya dapat diakses oleh admin.
  - Dashboard Admin (/admin/dashboard)
  - Statistik & Ringkasan
  - Manajemen Buku (/admin/books)
  - Daftar Buku (/admin/books)
  - Halaman Tambah Buku (/admin/books/add)
  - Halaman Edit Buku (/admin/books/:id/edit)
  - Manajemen Anggota (/admin/members)
  - Daftar Anggota (/admin/members)
  - Halaman Tambah Anggota (/admin/members/add)
  - Halaman Edit Anggota (/admin/members/:id/edit)
  - Manajemen Transaksi (/admin/borrowings
  - Daftar Peminjaman (/admin/borrowings)
  - Halaman Catat Peminjaman (/admin/borrowings/add)

Halaman Catat Pengembalian (/admin/borrowings/return/:id)
