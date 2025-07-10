# Backend Hotel App (PHP + MySQL)

## Struktur Folder
- db.php (koneksi database)
- kamar/ (CRUD kamar)
  - create.php
  - read.php
  - get.php
  - update.php
  - delete.php

## Setup
1. Import SQL berikut di phpMyAdmin:

```sql
CREATE DATABASE hotel_app;
USE hotel_app;
CREATE TABLE kamar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  tipe VARCHAR(50) NOT NULL,
  harga DECIMAL(12,2) NOT NULL,
  deskripsi TEXT,
  gambar VARCHAR(255)
);
```

2. Letakkan folder `backend` di `htdocs` (XAMPP) atau `www` (Laragon).
3. Edit `db.php` jika password MySQL Anda berbeda.

## Testing API
- GET semua kamar: `GET /backend/kamar/read.php`
- GET kamar by id: `GET /backend/kamar/get.php?id=1`
- Tambah kamar: `POST /backend/kamar/create.php` (body JSON)
- Update kamar: `PUT /backend/kamar/update.php` (body JSON)
- Hapus kamar: `DELETE /backend/kamar/delete.php?id=1`

Gunakan Postman untuk testing.

## Tambahan
- Setiap anggota tim buat folder & file CRUD sendiri sesuai tabel masing-masing (copy dari folder kamar). 