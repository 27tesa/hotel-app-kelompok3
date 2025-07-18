<?php
include 'db.php';

echo "<h1>Perbaikan Field Mapping</h1>";

// Cek apakah ada perbedaan nama field
echo "<h2>1. Analisis Field Mapping</h2>";

// Cek field di tabel reservasi
$reservasi_fields = $conn->query("DESCRIBE reservasi");
$field_names = [];
while ($row = $reservasi_fields->fetch_assoc()) {
    $field_names[] = $row['Field'];
}

echo "<p><strong>Field yang ada di tabel reservasi:</strong></p>";
echo "<ul>";
foreach ($field_names as $field) {
    echo "<li>$field</li>";
}
echo "</ul>";

// Cek apakah ada field yang tidak sesuai
$expected_fields = ['id', 'pelanggan_id', 'kamar_id', 'tanggal_checkin', 'tanggal_checkout', 'status'];
$missing_fields = array_diff($expected_fields, $field_names);
$extra_fields = array_diff($field_names, $expected_fields);

if (!empty($missing_fields)) {
    echo "<div style='background: #fff3cd; color: #856404; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>⚠️ Field yang hilang:</strong><br>";
    foreach ($missing_fields as $field) {
        echo "- $field<br>";
    }
    echo "</div>";
}

if (!empty($extra_fields)) {
    echo "<div style='background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>ℹ️ Field tambahan:</strong><br>";
    foreach ($extra_fields as $field) {
        echo "- $field<br>";
    }
    echo "</div>";
}

// Cek apakah perlu rename field
if (in_array('id_pelanggan', $field_names) && !in_array('pelanggan_id', $field_names)) {
    echo "<h2>2. Perbaikan Field Mapping</h2>";
    echo "<p>Ditemukan field 'id_pelanggan' tapi front-end menggunakan 'pelanggan_id'.</p>";
    
    if (isset($_POST['fix_mapping'])) {
        // Rename field
        $conn->query("ALTER TABLE reservasi CHANGE id_pelanggan pelanggan_id INT");
        $conn->query("ALTER TABLE reservasi CHANGE id_kamar kamar_id INT");
        
        echo "<div style='background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
        echo "<strong>✅ Berhasil:</strong> Field mapping telah diperbaiki!";
        echo "</div>";
        
        // Refresh halaman setelah 2 detik
        echo "<script>setTimeout(function(){ window.location.reload(); }, 2000);</script>";
    } else {
        echo "<form method='post'>";
        echo "<button type='submit' name='fix_mapping' style='background: #dc3545; color: white; padding: 10px 20px; border: none; border-radius: 5px;'>Perbaiki Field Mapping</button>";
        echo "</form>";
    }
} elseif (in_array('pelanggan_id', $field_names) && in_array('kamar_id', $field_names)) {
    echo "<div style='background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin-bottom: 20px;'>";
    echo "<strong>✅ Field mapping sudah benar!</strong> Tidak perlu perbaikan.";
    echo "</div>";
}

// Test API endpoints
echo "<h2>3. Test API Endpoints</h2>";

$endpoints = [
    'kamar/read.php' => 'GET Kamar',
    'pelanggan/read.php' => 'GET Pelanggan', 
    'reservasi/read.php' => 'GET Reservasi'
];

foreach ($endpoints as $endpoint => $description) {
    echo "<h3>$description</h3>";
    echo "<p>URL: <code>http://localhost:8000/$endpoint</code></p>";
    
    $url = "http://localhost:8000/$endpoint";
    $context = stream_context_create([
        'http' => [
            'timeout' => 5
        ]
    ]);
    
    $response = @file_get_contents($url, false, $context);
    
    if ($response !== false) {
        echo "<div style='background: #d4edda; color: #155724; padding: 10px; border-radius: 5px; margin-bottom: 10px;'>";
        echo "<strong>✅ Berhasil:</strong> API berfungsi";
        echo "</div>";
        
        // Tampilkan sample response
        $data = json_decode($response, true);
        if (is_array($data) && count($data) > 0) {
            echo "<details>";
            echo "<summary>Sample Response (klik untuk lihat)</summary>";
            echo "<pre style='background: #f8f9fa; padding: 10px; border-radius: 5px; margin-top: 10px;'>";
            print_r(array_slice($data, 0, 2)); // Tampilkan 2 item pertama
            echo "</pre>";
            echo "</details>";
        }
    } else {
        echo "<div style='background: #f8d7da; color: #721c24; padding: 10px; border-radius: 5px; margin-bottom: 10px;'>";
        echo "<strong>❌ Error:</strong> API tidak berfungsi";
        echo "</div>";
    }
}

echo "<br>";
echo "<a href='index.php' style='background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;'>Kembali ke Dashboard</a>";
echo "<a href='init_data.php' style='background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;'>Inisialisasi Data</a>";
?> 