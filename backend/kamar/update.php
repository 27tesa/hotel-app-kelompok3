<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) { http_response_code(400); echo "Invalid input"; exit; }
$stmt = $conn->prepare("UPDATE kamar SET nama=?, tipe=?, harga=?, deskripsi=?, gambar=? WHERE id=?");
$stmt->bind_param("ssdssi", $data->nama, $data->tipe, $data->harga, $data->deskripsi, $data->gambar, $data->id);
if ($stmt->execute()) { echo json_encode(["message" => "Kamar diupdate"]); }
else { http_response_code(500); echo json_encode(["error" => $stmt->error]); }
$stmt->close();
$conn->close();
?> 