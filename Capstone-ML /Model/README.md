# CuanQ

**Aplikasi Web Pencatat Keuangan dengan Kategorisasi Otomatis & Prediksi Pengeluaran/Pemasukan**

Mengelola keuangan pribadi sering kali terasa merepotkan, terutama saat harus mencatat dan mengelompokkan setiap transaksi secara manual. CuanQ hadir sebagai solusi berbasis web untuk mempermudah pencatatan keuangan dengan dua fitur utama:

- Kategorisasi transaksi otomatis berbasis NLP

- Prediksi income/expense berbasis time-series forecasting

Dengan CuanQ, pengguna cukup memasukkan satu baris deskripsi transaksi (misalnya: "Beli Ayam Goreng 15.000"), dan sistem akan secara otomatis mengenali bahwa transaksi tersebut termasuk kategori Food & Beverages. Selain itu, sistem juga dapat memprediksi pola keuangan mingguan atau bulanan pengguna menggunakan model forecasting Prophet.

## Fitur Unggulan
- 🧠 Kategorisasi Otomatis Transaksi (NLP)
Sistem memanfaatkan model NLP untuk mengklasifikasikan transaksi berdasarkan deskripsi teks yang dimasukkan oleh pengguna.

- 📈 Prediksi Pemasukan & Pengeluaran (Forecasting)
Dengan bantuan model Prophet dari Facebook, aplikasi dapat memproyeksikan pemasukan dan pengeluaran pengguna dalam rentang waktu mingguan atau bulanan yang disajikan dalam bentuk grafik.

## Tentang Dataset
1. Dataset Kategorisasi Transaksi (NLP)
Dataset dummy yang digunakan berisi 2 kolom utama:

- deskripsi: Kalimat transaksi (misalnya "Bayar kos bulan Juni")

- kategori: Salah satu dari kategori berikut:
  - Food & Beverages
  - Transportation
  - Lifestyle
  - Housing
  - Health
  - Others
  - Income

Semua kategori kecuali "Income" secara otomatis diklasifikasikan sebagai pengeluaran (Expense).

2. Dataset untuk Forecasting (Prophet)
Dataset ini merupakan hasil penggabungan dan preprocessing dari 3 dataset berbeda, dan digunakan untuk membangun model prediksi keuangan.

**📁 [Link ke dataset (Google Drive)](https://drive.google.com/drive/folders/1AKgXB1c8qVcFKfReBoUBHJsqs-rEdWYG?usp=sharing)**

## Cara Menjalankan
**Jika Ingin Menjalankan Notebook di Google Colab:**
1. Buka [Google Colab](https://colab.research.google.com/)
2. Unggah atau buka notebook dari repositori ini
3. Ikuti instruksi di dalam notebook dan jalankan setiap cell

**Cara Menjalankan Notebook di Lokal**
1. Pastikan Python dan pip sudah terpasang
Pastikan kamu sudah menginstall Python di komputermu. Kamu bisa cek dengan:

``python --version
pip --version``

Kalau belum terinstall, silakan unduh Python dari https://www.python.org/downloads/

2. Install Jupyter Notebook
Jika belum memiliki Jupyter, jalankan perintah berikut di terminal:

``pip install notebook``

3. Jalankan Jupyter Notebook
Arahkan terminal ke folder tempat file .ipynb kamu berada:

``cd path/ke/folder
jupyter notebook``

Setelah itu, browser akan terbuka secara otomatis dan menampilkan dashboard Jupyter. Klik file .ipynb kamu untuk mulai menjalankan.

4. Ikuti Instruksi di Notebook
Setelah terbuka, jalankan setiap cell dari atas ke bawah dengan menekan Shift + Enter atau tombol ▶️ di toolbar. Pastikan semua dependensi (seperti pandas, scikit-learn, prophet, dll) sudah terinstall.

## Model yang Digunakan
**- Model NLP (Text Classification)**
Untuk mengklasifikasikan deskripsi transaksi ke dalam kategori pengeluaran/pemasukan

**- Facebook Prophet**
Untuk melakukan prediksi (forecasting) pemasukan dan pengeluaran pengguna berdasarkan data historis

