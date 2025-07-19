<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$nama = $data['nama'];
$email = $data['email'];
$telepon = $data['telepon'];

$sql = "UPDATE pelanggan SET nama=?, email=?, telepon=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $nama, $email, $telepon, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Pelanggan berhasil diupdate"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?> 