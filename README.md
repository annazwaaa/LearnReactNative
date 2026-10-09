# LearnReactNative

**Aplikasi mobile pembelajaran React Native untuk mengelola daftar post.**

LearnReactNative merupakan project pembelajaran pengembangan aplikasi mobile menggunakan React Native. Project ini dibuat untuk mempelajari pembuatan antarmuka, navigasi antarhalaman, pengelolaan state, dan pemilihan gambar dari galeri perangkat Android.

## Fitur

* **Posts Index** — menampilkan daftar post.
* **Create Post** — menambahkan post dengan judul, konten, dan gambar.
* **Edit Post** — mengubah informasi post.
* **Delete Post** — menghapus post dari daftar.
* **Image Picker** — memilih gambar dari galeri perangkat.
* **Navigation** — berpindah antarhalaman aplikasi.

## Teknologi yang Digunakan

* React Native
* JavaScript
* React Navigation
* React Native Image Picker
* Android

## Tampilan Aplikasi

*Screenshot aplikasi akan ditambahkan di bagian ini.*

## Cara Menjalankan Project

### Prasyarat

Pastikan sudah tersedia Node.js, Android Studio, Android SDK, dan Android Emulator atau perangkat Android yang terhubung.

### Instalasi

1. Clone repository:

   ```bash
   git clone https://github.com/USERNAME/LearnReactNative.git
   ```

   Ganti `USERNAME` dengan username GitHub pemilik repository.

2. Masuk ke folder project:

   ```bash
   cd LearnReactNative
   ```

3. Install dependency:

   ```bash
   npm install
   ```

4. Jalankan Metro di terminal pertama:

   ```bash
   npx react-native start
   ```

5. Buka terminal kedua di folder project dan jalankan:

   ```bash
   npm run android
   ```

## Catatan Pengembangan

Saat ini fitur pengelolaan post menggunakan data dummy atau lokal untuk demonstrasi antarmuka. Data yang dibuat, diubah, atau dihapus belum tersimpan secara permanen ke database backend.

## Pengembang

Project ini dibuat sebagai bagian dari proses pembelajaran pengembangan aplikasi mobile menggunakan React Native.
