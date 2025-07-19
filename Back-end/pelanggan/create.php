<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);

$nama = $data['nama'];
$email = $data['email'];
$telepon = $data['telepon'];

$sql = "INSERT INTO pelanggan (nama, email, telepon) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nama, $email, $telepon);

if ($stmt->execute()) {
    echo json_encode(["message" => "Pelanggan berhasil ditambahkan"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?> 