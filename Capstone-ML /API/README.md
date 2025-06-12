# Financial Classification & Forecasting API

API ini dibuat sebagai bagian dari Capstone Project *CUANQ Financial Transaction Processing*, yang mampu melakukan:

1. **Text Classification**: mengklasifikasikan kategori transaksi keuangan berdasarkan deskripsi teks.
2. **Time Series Forecasting**: memprediksi proyeksi pendapatan dan pengeluaran menggunakan Prophet.

---

## Prerequisites

* Python 3.11+
* pip
* virtual environment (opsional)

---

## Getting Started (Local Development)

### Step 1: Clone Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Step 2: Install Dependencies

Disarankan menggunakan virtual environment:

```bash
python3.11 -m venv env311
env311\Scripts\activate  # Windows
# source env311/bin/activate  # Linux/Mac


pip install --no-cache-dir -r requirements.txt
```

### Step 3: Siapkan Model dan Tokenizer

Pastikan direktori `model/` berisi:

* `nlp_model.h5` — file model deep learning untuk klasifikasi
* `tokenizer.pkl` — file tokenizer

Jika belum ada, tempatkan file tersebut ke dalam folder `model/`.

### Step 4: Jalankan Server API

```bash
uvicorn main:app --reload
```

Server akan berjalan di `http://127.0.0.1:8000/`

---

## API SPECIFICATION

### API URL


### 1. Health Check (Root)

* **Method**: `GET`
* **Endpoint**: `/`
* **Response:**

```json
{"server is running"}
```

### 2. Text Classification Endpoint

Mengklasifikasikan teks transaksi keuangan ke dalam kategori.

* **Method**: `POST`
* **Endpoint**: `/classified`
* **Request Body**:

```json
{
  "text": "Transfer uang makan siang Rp 75.000"
}
```

* **Response Success**:

```json
{
  "original_text": "Transfer uang makan siang Rp 75.000",
  "confidence": 0.8921,
  "predicted_category": "Food & Beverage",
  "predicted_type": "Expense",
  "amount": 75000,
  "timestamp": "2025-06-11T09:57:31.233Z"
}
```

* **Error Handling**:

  * 400: Jika teks kosong atau hasil pre-processing kosong
  * 500: Jika terjadi error internal

### 3. Forecasting Endpoint

Melakukan forecasting berdasarkan data transaksi pendapatan dan pengeluaran.

* **Method**: `POST`
* **Endpoint**: `/forecast/`
* **Request Body**:

```json
{
  "data_income": [
    {"ds": "01-01-2024", "y": 5000000},
    {"ds": "01-02-2024", "y": 5500000}
  ],
  "data_expenses": [
    {"ds": "01-01-2024", "y": 3000000},
    {"ds": "01-02-2024", "y": 3200000}
  ],
  "periods": 3
}
```

* **Response Success**:

```json
{
  "forecast": [
    {
      "ds": "2024-03-01",
      "yhat_income": 5600000.0,
      "yhat_expense": 3300000.0
    }
  ]
}
```

* **Error Handling**:

  * 400: Data income atau expense tidak diberikan
  * 422: Format tanggal salah (wajib DD-MM-YYYY)
  * 500: Internal server error

---

## Directory Structure

```bash
.
├── main.py
├── requirements.txt
├── model/
│   ├── nlp_model.h5
│   └── tokenizer.pkl
├── utils/
│   ├── text_preprocessing.py
│   └── prepare_forecasting.py
├── models/
│   └── schemas.py
└── __pycache__/
```

---

## Technologies Used

* **FastAPI** — backend framework
* **TensorFlow / Keras** — model NLP classifier
* **Prophet** — time series forecasting
* **Pydantic** — request validation
* **NumPy, Pandas** — data processing

---

