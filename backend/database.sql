-- Buat database hotel_db
CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

-- Buat tabel reservasi
CREATE TABLE IF NOT EXISTS reservasi (
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

-- Tambahkan index untuk optimasi query
CREATE INDEX idx_email ON reservasi(email);
CREATE INDEX idx_tanggal_checkin ON reservasi(tanggal_checkin);
CREATE INDEX idx_status ON reservasi(status); 