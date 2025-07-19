<?php
include 'db.php';

echo "<h1>Inisialisasi Data Hotel</h1>";

// 1. Inisialisasi Data Kamar
echo "<h2>1. Inisialisasi Data Kamar</h2>";
$conn->query("DELETE FROM kamar");
$conn->query("ALTER TABLE kamar AUTO_INCREMENT = 1");

$kamar_data = [
    ['Superior Room 101', 'Superior', 500000, 'Tersedia'],
    ['Superior Room 102', 'Superior', 500000, 'Tersedia'],
    ['Superior Room 103', 'Superior', 500000, 'Tersedia'],
    ['Deluxe Room 201', 'Deluxe', 750000, 'Tersedia'],
    ['Deluxe Room 202', 'Deluxe', 750000, 'Tersedia'],
    ['Deluxe Room 203', 'Deluxe', 750000, 'Tersedia'],
    ['Suite Room 301', 'Suite', 1200000, 'Tersedia'],
    ['Suite Room 302', 'Suite', 1200000, 'Tersedia'],
    ['Presidential Suite 401', 'Presidential', 2500000, 'Tersedia']
];

$kamar_success = 0;
foreach ($kamar_data as $kamar) {
    $sql = "INSERT INTO kamar (nama_kamar, tipe_kamar, harga, status) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssds", $kamar[0], $kamar[1], $kamar[2], $kamar[3]);
    if ($stmt->execute()) $kamar_success++;
}
echo "<p>✅ Berhasil menambahkan <strong>$kamar_success</strong> kamar</p>";

// 2. Inisialisasi Data Pelanggan
echo "<h2>2. Inisialisasi Data Pelanggan</h2>";
$conn->query("DELETE FROM pelanggan");
$conn->query("ALTER TABLE pelanggan AUTO_INCREMENT = 1");

$pelanggan_data = [
    ['Budi Santoso', 'Jakarta Selatan', '08123456789', 'budi@email.com'],
    ['Siti Aminah', 'Surabaya', '08234567890', 'siti@email.com'],
    ['Ahmad Rahman', 'Bandung', '08345678901', 'ahmad@email.com'],
    ['Dewi Sartika', 'Medan', '08456789012', 'dewi@email.com'],
    ['Rudi Hartono', 'Semarang', '08567890123', 'rudi@email.com']
];

$pelanggan_success = 0;
foreach ($pelanggan_data as $pelanggan) {
    $sql = "INSERT INTO pelanggan (nama, alamat, no_telepon, email) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $pelanggan[0], $pelanggan[1], $pelanggan[2], $pelanggan[3]);
    if ($stmt->execute()) $pelanggan_success++;
}
echo "<p>✅ Berhasil menambahkan <strong>$pelanggan_success</strong> pelanggan</p>";

// 3. Inisialisasi Data Reservasi (opsional)
echo "<h2>3. Inisialisasi Data Reservasi</h2>";
$conn->query("DELETE FROM reservasi");
$conn->query("ALTER TABLE reservasi AUTO_INCREMENT = 1");

$reservasi_data = [
    [1, 1, '2025-07-15', '2025-07-17', 'Confirmed'],
    [2, 4, '2025-07-20', '2025-07-22', 'Confirmed']
];

$reservasi_success = 0;
foreach ($reservasi_data as $reservasi) {
    $sql = "INSERT INTO reservasi (id_pelanggan, id_kamar, tanggal_checkin, tanggal_checkout, status) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("iisss", $reservasi[0], $reservasi[1], $reservasi[2], $reservasi[3], $reservasi[4]);
    if ($stmt->execute()) $reservasi_success++;
}
echo "<p>✅ Berhasil menambahkan <strong>$reservasi_success</strong> reservasi</p>";

// 4. Update status kamar yang sudah direservasi
$conn->query("UPDATE kamar SET status = 'Tidak Tersedia' WHERE id IN (1, 4)");

echo "<h2>4. Ringkasan Data</h2>";
echo "<div style='background: #f8f9fa; padding: 15px; border-radius: 5px;'>";
echo "<p><strong>Total Kamar:</strong> " . $conn->query("SELECT COUNT(*) as total FROM kamar")->fetch_assoc()['total'] . "</p>";
echo "<p><strong>Kamar Tersedia:</strong> " . $conn->query("SELECT COUNT(*) as total FROM kamar WHERE status = 'Tersedia'")->fetch_assoc()['total'] . "</p>";
echo "<p><strong>Total Pelanggan:</strong> " . $conn->query("SELECT COUNT(*) as total FROM pelanggan")->fetch_assoc()['total'] . "</p>";
echo "<p><strong>Total Reservasi:</strong> " . $conn->query("SELECT COUNT(*) as total FROM reservasi")->fetch_assoc()['total'] . "</p>";
echo "</div>";

echo "<h2>5. Test API</h2>";
echo "<p>Silakan test API berikut:</p>";
echo "<ul>";
echo "<li><a href='kamar/read.php' target='_blank'>GET Semua Kamar</a></li>";
echo "<li><a href='pelanggan/read.php' target='_blank'>GET Semua Pelanggan</a></li>";
echo "<li><a href='reservasi/read.php' target='_blank'>GET Semua Reservasi</a></li>";
echo "</ul>";

echo "<br><a href='index.php' style='background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Kembali ke Dashboard</a>";
?> 