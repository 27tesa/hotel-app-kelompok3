<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);

$nama_kamar = $data['nama_kamar'];
$harga = $data['harga'];
$deskripsi = $data['deskripsi'];
$gambar = $data['gambar'];

$sql = "INSERT INTO kamar (nama_kamar, harga, deskripsi, gambar) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("siss", $nama_kamar, $harga, $deskripsi, $gambar);

if ($stmt->execute()) {
    echo json_encode(["message" => "Kamar berhasil ditambahkan"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
