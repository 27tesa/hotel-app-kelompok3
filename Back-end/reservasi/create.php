<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);

$pelanggan_id = $data['pelanggan_id'];
$kamar_id = $data['kamar_id'];
$tanggal_checkin = $data['tanggal_checkin'];
$tanggal_checkout = $data['tanggal_checkout'];
$status = $data['status'];

$sql = "INSERT INTO reservasi (pelanggan_id, kamar_id, tanggal_checkin, tanggal_checkout, status) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisss", $pelanggan_id, $kamar_id, $tanggal_checkin, $tanggal_checkout, $status);

if ($stmt->execute()) {
    echo json_encode(["message" => "Reservasi berhasil ditambahkan"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?> 