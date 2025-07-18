<?php
include 'db.php';

echo "<h1>Struktur Database Hotel</h1>";

// Cek struktur tabel kamar
echo "<h2>1. Struktur Tabel Kamar</h2>";
$kamar_structure = $conn->query("DESCRIBE kamar");
echo "<table border='1' style='border-collapse: collapse; width: 100%; margin-bottom: 20px;'>";
echo "<tr style='background: #e9ecef;'><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
while ($row = $kamar_structure->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['Field'] . "</td>";
    echo "<td>" . $row['Type'] . "</td>";
    echo "<td>" . $row['Null'] . "</td>";
    echo "<td>" . $row['Key'] . "</td>";
    echo "<td>" . $row['Default'] . "</td>";
    echo "<td>" . $row['Extra'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cek struktur tabel pelanggan
echo "<h2>2. Struktur Tabel Pelanggan</h2>";
$pelanggan_structure = $conn->query("DESCRIBE pelanggan");
echo "<table border='1' style='border-collapse: collapse; width: 100%; margin-bottom: 20px;'>";
echo "<tr style='background: #e9ecef;'><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
while ($row = $pelanggan_structure->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['Field'] . "</td>";
    echo "<td>" . $row['Type'] . "</td>";
    echo "<td>" . $row['Null'] . "</td>";
    echo "<td>" . $row['Key'] . "</td>";
    echo "<td>" . $row['Default'] . "</td>";
    echo "<td>" . $row['Extra'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cek struktur tabel reservasi
echo "<h2>3. Struktur Tabel Reservasi</h2>";
$reservasi_structure = $conn->query("DESCRIBE reservasi");
echo "<table border='1' style='border-collapse: collapse; width: 100%; margin-bottom: 20px;'>";
echo "<tr style='background: #e9ecef;'><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th></tr>";
while ($row = $reservasi_structure->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $row['Field'] . "</td>";
    echo "<td>" . $row['Type'] . "</td>";
    echo "<td>" . $row['Null'] . "</td>";
    echo "<td>" . $row['Key'] . "</td>";
    echo "<td>" . $row['Default'] . "</td>";
    echo "<td>" . $row['Extra'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cek sample data
echo "<h2>4. Sample Data</h2>";

echo "<h3>Sample Data Kamar:</h3>";
$kamar_sample = $conn->query("SELECT * FROM kamar LIMIT 3");
if ($kamar_sample->num_rows > 0) {
    echo "<pre>";
    while ($row = $kamar_sample->fetch_assoc()) {
        print_r($row);
    }
    echo "</pre>";
} else {
    echo "<p style='color: red;'>Tidak ada data kamar!</p>";
}

echo "<h3>Sample Data Pelanggan:</h3>";
$pelanggan_sample = $conn->query("SELECT * FROM pelanggan LIMIT 3");
if ($pelanggan_sample->num_rows > 0) {
    echo "<pre>";
    while ($row = $pelanggan_sample->fetch_assoc()) {
        print_r($row);
    }
    echo "</pre>";
} else {
    echo "<p style='color: red;'>Tidak ada data pelanggan!</p>";
}

echo "<h3>Sample Data Reservasi:</h3>";
$reservasi_sample = $conn->query("SELECT * FROM reservasi LIMIT 3");
if ($reservasi_sample->num_rows > 0) {
    echo "<pre>";
    while ($row = $reservasi_sample->fetch_assoc()) {
        print_r($row);
    }
    echo "</pre>";
} else {
    echo "<p style='color: red;'>Tidak ada data reservasi!</p>";
}

echo "<br>";
echo "<a href='index.php' style='background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Kembali ke Dashboard</a>";
?> 