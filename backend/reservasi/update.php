<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) { http_response_code(400); echo "Invalid input"; exit; }
$stmt = $conn->prepare("UPDATE reservasi SET id_pelanggan=?, id_kamar=?, tanggal_checkin=?, tanggal_checkout=?, jumlah_orang=?, status=? WHERE id=?");
$stmt->bind_param("iissisi", $data->id_pelanggan, $data->id_kamar, $data->tanggal_checkin, $data->tanggal_checkout, $data->jumlah_orang, $data->status, $data->id);
if ($stmt->execute()) { echo json_encode(["message" => "Reservasi diupdate"]); }
else { http_response_code(500); echo json_encode(["error" => $stmt->error]); }
$stmt->close();
$conn->close();
?> 