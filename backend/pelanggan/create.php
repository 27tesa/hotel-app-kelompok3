<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"));
if (!$data) { http_response_code(400); echo "Invalid input"; exit; }
$stmt = $conn->prepare("INSERT INTO pelanggan (nama, email, telepon, alamat) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $data->nama, $data->email, $data->telepon, $data->alamat);
if ($stmt->execute()) { echo json_encode(["message" => "Pelanggan ditambahkan"]); }
else { http_response_code(500); echo json_encode(["error" => $stmt->error]); }
$stmt->close();
$conn->close();
?> 