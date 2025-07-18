<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$nama_kamar = $data['nama_kamar'];
$harga = $data['harga'];
$deskripsi = $data['deskripsi'];
$gambar = $data['gambar'];

$sql = "UPDATE kamar SET nama_kamar=?, harga=?, deskripsi=?, gambar=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sissi", $nama_kamar, $harga, $deskripsi, $gambar, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Kamar berhasil diupdate"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
