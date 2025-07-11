# Panduan Testing Hotel Reservation System

## Setup Awal

### 1. Setup Database
1. Buka XAMPP Control Panel
2. Start Apache dan MySQL
3. Buka phpMyAdmin: `http://localhost/phpmyadmin`
4. Import file `backend/database.sql`
5. Verifikasi database `hotel_db` dan tabel `reservasi` sudah dibuat

### 2. Setup Backend
1. Copy folder `backend/` ke `C:\xampp\htdocs\`
2. Pastikan struktur: `C:\xampp\htdocs\backend\`

### 3. Setup Frontend
1. Di terminal, masuk ke folder project
2. Jalankan: `npm run dev`
3. Buka browser: `http://localhost:5173`

## Testing Flow

### Step 1: Test Form Reservasi (Frontend)
1. Buka halaman Reservasi di React app
2. Isi form dengan data lengkap:
   - Nama: "John Doe"
   - Email: "john@example.com"
   - Check-in: "2024-01-15"
   - Check-out: "2024-01-17"
   - Jumlah Tamu: 2
   - Tipe Kamar: "Deluxe Room"
3. Klik "Lanjutkan Pemesanan"
4. **Expected Result**: 
   - Loading spinner muncul
   - Success message: "Reservasi berhasil! Data telah disimpan ke database"
   - Form ter-reset

### Step 2: Verifikasi Data di Database
1. Buka phpMyAdmin: `http://localhost/phpmyadmin`
2. Pilih database `hotel_db`
3. Klik tabel `reservasi`
4. **Expected Result**: Data reservasi muncul dengan ID, nama, email, dll.

### Step 3: Test Halaman Admin
1. Buka: `http://localhost/backend/admin.html`
2. **Expected Result**: 
   - Tabel menampilkan data reservasi yang baru dibuat
   - Status "pending" dengan badge kuning
   - Total harga terformat dalam Rupiah

### Step 4: Test API dengan Postman
1. Buka Postman
2. Buat request baru:
   - **URL**: `http://localhost/backend/reservasi/create.php`
   - **Method**: POST
   - **Headers**: Content-Type: application/json
   - **Body** (raw JSON):
   ```json
   {
     "nama": "Jane Smith",
     "email": "jane@example.com",
     "tanggal_checkin": "2024-01-20",
     "tanggal_checkout": "2024-01-22",
     "jumlah_tamu": 1,
     "tipe_kamar": "Superior Room",
     "jumlah_malam": 2,
     "total_harga": 1300000,
     "status": "pending"
   }
   ```
3. **Expected Result**: Response 201 dengan data yang berhasil disimpan

### Step 5: Test Read API
1. Di Postman, buat request baru:
   - **URL**: `http://localhost/backend/reservasi/read.php`
   - **Method**: GET
2. **Expected Result**: Response 200 dengan array data semua reservasi

## Troubleshooting

### Error: "Failed to fetch" di React
- **Cause**: Backend tidak running atau CORS error
- **Solution**: 
  - Pastikan XAMPP Apache running
  - Cek URL di `Reservation.jsx` sudah benar
  - Pastikan folder backend sudah di `htdocs`

### Error: "Database connection failed"
- **Cause**: MySQL tidak running atau konfigurasi salah
- **Solution**:
  - Start MySQL di XAMPP
  - Cek konfigurasi di `backend/db.php`

### Error: "Table doesn't exist"
- **Cause**: Database belum diimport
- **Solution**: Import `database.sql` di phpMyAdmin

### Error: "Method not allowed"
- **Cause**: Menggunakan method yang salah
- **Solution**: Pastikan menggunakan POST untuk create, GET untuk read

### Data tidak muncul di admin.html
- **Cause**: API read.php error atau CORS issue
- **Solution**:
  - Cek browser console untuk error
  - Test API read.php langsung di Postman
  - Pastikan file `read.php` ada dan benar

## Expected Database Structure

Setelah import `database.sql`, struktur tabel `reservasi`:

```sql
CREATE TABLE reservasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    tanggal_checkin DATE NOT NULL,
    tanggal_checkout DATE NOT NULL,
    jumlah_tamu INT NOT NULL,
    tipe_kamar VARCHAR(50) NOT NULL,
    jumlah_malam INT NOT NULL,
    total_harga DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Success Criteria

✅ **Sistem berfungsi dengan baik jika:**
1. Form reservasi React bisa mengirim data ke backend
2. Data tersimpan di database MySQL
3. Halaman admin menampilkan data dengan benar
4. API endpoints berfungsi (create & read)
5. Error handling berfungsi dengan baik
6. UI/UX responsif dan user-friendly

## Next Steps

Setelah testing berhasil, Anda bisa:
1. Menambahkan fitur update dan delete reservasi
2. Menambahkan autentikasi untuk admin
3. Menambahkan validasi lebih kompleks
4. Mengintegrasikan dengan sistem pembayaran
5. Menambahkan notifikasi email 