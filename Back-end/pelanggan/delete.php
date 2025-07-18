<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$sql = "DELETE FROM pelanggan WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Pelanggan berhasil dihapus"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?> 