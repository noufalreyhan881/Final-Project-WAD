# Information Architecture

## 1. Struktur Navigasi Utama
Navigasi ini akan menjadi menu utama yang dapat diakses dari halaman mana pun.
    - Beranda
    - Katalog Buku
    - Login
    - Daftar

## 2. Peta Halaman Berdasarkan Peran
Berikut adalah detail hierarki halaman yang menunjukkan alur pengguna dari setiap peran.
    
A. Halaman Umum (Akses Publik)
Halaman yang bisa dilihat oleh semua pengunjung, baik yang sudah login maupun belum.
    - Beranda 
    - Login 
    - Daftar 
    - Katalog Buku
        - Detail Buku

B. Halaman Anggota (Setelah Login)
Halaman yang hanya dapat diakses oleh anggota yang sudah login.
    - Dashboard Anggota
        - Riwayat Peminjaman
    - Katalog Buku
        - Detail Buku
    - Profil Anggota
        - Edit Profil
        - Ganti Password
    
C. Halaman Admin (Setelah Login)
Halaman yang hanya dapat diakses oleh admin.
    -  Dashboard Admin 
        - Statistik & Ringkasan
    - Manajemen Buku
        - Daftar Buku
            - Halaman Tambah Buku
            - Halaman Edit Buku
    - Manajemen Anggota
        - Daftar Anggota
            - Halaman Tambah Anggota
            - Halaman Edit Anggota
    - Manajemen Transaksi
        - Daftar Peminjaman
            - Halaman Catat Peminjaman
            - Halaman Catat Pengembalian 
