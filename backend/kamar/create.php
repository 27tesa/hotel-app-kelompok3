<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"));
if (!$data) { http_response_code(400); echo "Invalid input"; exit; }
$stmt = $conn->prepare("INSERT INTO kamar (nama, tipe, harga, deskripsi, gambar) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("ssdss", $data->nama, $data->tipe, $data->harga, $data->deskripsi, $data->gambar);
if ($stmt->execute()) { echo json_encode(["message" => "Kamar ditambahkan"]); }
else { http_response_code(500); echo json_encode(["error" => $stmt->error]); }
$stmt->close();
$conn->close();
?> 