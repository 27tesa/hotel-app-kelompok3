<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"));
if (!$data || !isset($data->id)) { http_response_code(400); echo "Invalid input"; exit; }
$stmt = $conn->prepare("UPDATE pelanggan SET nama=?, email=?, telepon=?, alamat=? WHERE id=?");
$stmt->bind_param("ssssi", $data->nama, $data->email, $data->telepon, $data->alamat, $data->id);
if ($stmt->execute()) { echo json_encode(["message" => "Pelanggan diupdate"]); }
else { http_response_code(500); echo json_encode(["error" => $stmt->error]); }
$stmt->close();
$conn->close();
?> 