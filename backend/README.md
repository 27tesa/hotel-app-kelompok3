# Backend Hotel App - Setup Guide

## Persyaratan
- XAMPP (Apache + MySQL + PHP)
- phpMyAdmin

## Setup Database

1. **Buka XAMPP Control Panel**
   - Start Apache dan MySQL

2. **Buka phpMyAdmin**
   - Buka browser, ketik: `http://localhost/phpmyadmin`

3. **Import Database**
   - Klik tab "Import"
   - Pilih file `database.sql`
   - Klik "Go" untuk menjalankan script

4. **Verifikasi Database**
   - Database `hotel_db` akan dibuat
   - Tabel `reservasi` akan dibuat dengan struktur yang sesuai

## Setup Backend Files

1. **Copy folder backend ke htdocs**
   - Copy seluruh folder `backend/` ke `C:\xampp\htdocs\`
   - Struktur: `C:\xampp\htdocs\backend\`

2. **Test API Endpoint**
   - URL: `http://localhost/backend/reservasi/create.php`
   - Method: POST
   - Content-Type: application/json

## Testing dengan Postman

### Test Create Reservation
- **URL**: `http://localhost/backend/reservasi/create.php`
- **Method**: POST
- **Headers**: 
  - Content-Type: application/json
- **Body** (raw JSON):
```json
{
  "nama": "John Doe",
  "email": "john@example.com",
  "tanggal_checkin": "2024-01-15",
  "tanggal_checkout": "2024-01-17",
  "jumlah_tamu": 2,
  "tipe_kamar": "Deluxe Room",
  "jumlah_malam": 2,
  "total_harga": 1700000,
  "status": "pending"
}
```

### Expected Response (Success)
```json
{
  "success": true,
  "message": "Reservasi berhasil dibuat",
  "data": {
    "id": 1,
    "nama": "John Doe",
    "email": "john@example.com",
    "tanggal_checkin": "2024-01-15",
    "tanggal_checkout": "2024-01-17",
    "jumlah_tamu": 2,
    "tipe_kamar": "Deluxe Room",
    "jumlah_malam": 2,
    "total_harga": "1700000.00",
    "status": "pending"
  }
}
```

## Troubleshooting

### Error: "Database connection failed"
- Pastikan MySQL sudah running di XAMPP
- Cek konfigurasi di `db.php`

### Error: "Table doesn't exist"
- Pastikan sudah import `database.sql` ke phpMyAdmin
- Cek nama database di `db.php` sesuai dengan yang dibuat

### Error: "Access-Control-Allow-Origin"
- CORS sudah dikonfigurasi di `create.php`
- Pastikan frontend dan backend berjalan di port yang benar

### Error: "Method not allowed"
- Pastikan menggunakan method POST
- Cek URL endpoint yang benar

## Struktur File
```
backend/
├── db.php                 # Koneksi database
├── database.sql           # Script pembuatan database
├── admin.html             # Halaman admin untuk melihat data reservasi
├── README.md             # File ini
└── reservasi/
    ├── create.php        # API untuk membuat reservasi
    └── read.php          # API untuk membaca semua reservasi
```

## Halaman Admin

Setelah setup selesai, Anda bisa mengakses halaman admin untuk melihat data reservasi:

- **URL**: `http://localhost/backend/admin.html`
- **Fitur**: 
  - Melihat semua data reservasi dalam tabel
  - Refresh data secara real-time
  - Format data yang rapi dengan status berwarna 