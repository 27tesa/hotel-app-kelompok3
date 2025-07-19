<?php
include 'db.php';

echo "<h1>Status Database Hotel</h1>";

// Cek koneksi database
if ($conn->connect_error) {
    echo "<div style='background: #f8d7da; color: #721c24; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>❌ Error:</strong> Koneksi database gagal: " . $conn->connect_error;
    echo "</div>";
    exit;
} else {
    echo "<div style='background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>✅ Berhasil:</strong> Koneksi database berhasil";
    echo "</div>";
}

// Cek tabel yang ada
echo "<h2>1. Tabel yang Tersedia</h2>";
$tables = $conn->query("SHOW TABLES");
if ($tables->num_rows > 0) {
    echo "<ul>";
    while ($table = $tables->fetch_array()) {
        echo "<li><strong>" . $table[0] . "</strong></li>";
    }
    echo "</ul>";
} else {
    echo "<p style='color: red;'>Tidak ada tabel di database!</p>";
}

// Cek data kamar
echo "<h2>2. Data Kamar</h2>";
$kamar_result = $conn->query("SELECT COUNT(*) as total FROM kamar");
$total_kamar = $kamar_result->fetch_assoc()['total'];

$kamar_tersedia = $conn->query("SELECT COUNT(*) as total FROM kamar WHERE status = 'Tersedia'")->fetch_assoc()['total'];
$kamar_tidak_tersedia = $conn->query("SELECT COUNT(*) as total FROM kamar WHERE status = 'Tidak Tersedia'")->fetch_assoc()['total'];

echo "<div style='background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
echo "<p><strong>Total Kamar:</strong> $total_kamar</p>";
echo "<p><strong>Kamar Tersedia:</strong> <span style='color: green; font-weight: bold;'>$kamar_tersedia</span></p>";
echo "<p><strong>Kamar Tidak Tersedia:</strong> <span style='color: red; font-weight: bold;'>$kamar_tidak_tersedia</span></p>";
echo "</div>";

if ($total_kamar > 0) {
    echo "<h3>Daftar Kamar:</h3>";
    $kamar_list = $conn->query("SELECT * FROM kamar ORDER BY id");
    echo "<table border='1' style='border-collapse: collapse; width: 100%; margin-bottom: 20px;'>";
    echo "<tr style='background: #e9ecef;'><th>ID</th><th>Nama Kamar</th><th>Tipe</th><th>Harga</th><th>Status</th></tr>";
    while ($kamar = $kamar_list->fetch_assoc()) {
        $status_color = $kamar['status'] == 'Tersedia' ? 'green' : 'red';
        echo "<tr>";
        echo "<td>" . $kamar['id'] . "</td>";
        echo "<td>" . htmlspecialchars($kamar['nama_kamar']) . "</td>";
        echo "<td>" . htmlspecialchars($kamar['tipe_kamar']) . "</td>";
        echo "<td>Rp " . number_format($kamar['harga'], 0, ',', '.') . "</td>";
        echo "<td style='color: $status_color; font-weight: bold;'>" . htmlspecialchars($kamar['status']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p style='color: orange;'>⚠️ Tidak ada data kamar. <a href='init_data.php'>Klik di sini untuk menambah data</a></p>";
}

// Cek data pelanggan
echo "<h2>3. Data Pelanggan</h2>";
$pelanggan_result = $conn->query("SELECT COUNT(*) as total FROM pelanggan");
$total_pelanggan = $pelanggan_result->fetch_assoc()['total'];

echo "<div style='background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
echo "<p><strong>Total Pelanggan:</strong> $total_pelanggan</p>";
echo "</div>";

// Cek data reservasi
echo "<h2>4. Data Reservasi</h2>";
$reservasi_result = $conn->query("SELECT COUNT(*) as total FROM reservasi");
$total_reservasi = $reservasi_result->fetch_assoc()['total'];

echo "<div style='background: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
echo "<p><strong>Total Reservasi:</strong> $total_reservasi</p>";
echo "</div>";

// Rekomendasi
echo "<h2>5. Rekomendasi</h2>";
if ($total_kamar == 0) {
    echo "<div style='background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>⚠️ Rekomendasi:</strong> Database kosong. Silakan <a href='init_data.php' style='color: #856404; font-weight: bold;'>inisialisasi data</a> terlebih dahulu.";
    echo "</div>";
} elseif ($kamar_tersedia == 0) {
    echo "<div style='background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>⚠️ Rekomendasi:</strong> Semua kamar tidak tersedia. Periksa status reservasi.";
    echo "</div>";
} else {
    echo "<div style='background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>✅ Status:</strong> Database siap digunakan. Ada $kamar_tersedia kamar tersedia.";
    echo "</div>";
}

echo "<br>";
echo "<a href='index.php' style='background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;'>Kembali ke Dashboard</a>";
echo "<a href='init_data.php' style='background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Inisialisasi Data</a>";
?> 