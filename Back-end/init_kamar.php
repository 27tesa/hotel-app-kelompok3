<?php
include 'db.php';

// Hapus data kamar yang ada (opsional)
$conn->query("DELETE FROM kamar");

// Reset auto increment
$conn->query("ALTER TABLE kamar AUTO_INCREMENT = 1");

// Data kamar yang akan ditambahkan
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

// Insert data kamar
$success_count = 0;
$error_count = 0;

foreach ($kamar_data as $kamar) {
    $nama_kamar = $kamar[0];
    $tipe_kamar = $kamar[1];
    $harga = $kamar[2];
    $status = $kamar[3];
    
    $sql = "INSERT INTO kamar (nama_kamar, tipe_kamar, harga, status) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssds", $nama_kamar, $tipe_kamar, $harga, $status);
    
    if ($stmt->execute()) {
        $success_count++;
    } else {
        $error_count++;
    }
}

// Tampilkan hasil
echo "<h2>Inisialisasi Data Kamar</h2>";
echo "<p>Berhasil menambahkan: <strong>$success_count</strong> kamar</p>";
echo "<p>Gagal menambahkan: <strong>$error_count</strong> kamar</p>";

// Tampilkan data kamar yang ada
echo "<h3>Data Kamar Saat Ini:</h3>";
$result = $conn->query("SELECT * FROM kamar ORDER BY id");
if ($result->num_rows > 0) {
    echo "<table border='1' style='border-collapse: collapse; width: 100%;'>";
    echo "<tr><th>ID</th><th>Nama Kamar</th><th>Tipe</th><th>Harga</th><th>Status</th></tr>";
    while ($row = $result->fetch_assoc()) {
        echo "<tr>";
        echo "<td>" . $row['id'] . "</td>";
        echo "<td>" . htmlspecialchars($row['nama_kamar']) . "</td>";
        echo "<td>" . htmlspecialchars($row['tipe_kamar']) . "</td>";
        echo "<td>Rp " . number_format($row['harga'], 0, ',', '.') . "</td>";
        echo "<td style='color: green; font-weight: bold;'>" . htmlspecialchars($row['status']) . "</td>";
        echo "</tr>";
    }
    echo "</table>";
} else {
    echo "<p style='color: red;'>Tidak ada data kamar!</p>";
}

echo "<br><a href='index.php'>Kembali ke Dashboard</a>";
?> 