<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];
$pelanggan_id = $data['pelanggan_id'];
$kamar_id = $data['kamar_id'];
$tanggal_checkin = $data['tanggal_checkin'];
$tanggal_checkout = $data['tanggal_checkout'];
$status = $data['status'];

$sql = "UPDATE reservasi SET pelanggan_id=?, kamar_id=?, tanggal_checkin=?, tanggal_checkout=?, status=? WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iisssi", $pelanggan_id, $kamar_id, $tanggal_checkin, $tanggal_checkout, $status, $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Reservasi berhasil diupdate"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?> 