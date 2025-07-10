<?php
include '../db.php';
$id = $_GET['id'] ?? 0;
$stmt = $conn->prepare("DELETE FROM pelanggan WHERE id=?");
$stmt->bind_param("i", $id);
if ($stmt->execute()) { echo json_encode(["message" => "Pelanggan dihapus"]); }
else { http_response_code(500); echo json_encode(["error" => $stmt->error]); }
$stmt->close();
$conn->close();
?> 