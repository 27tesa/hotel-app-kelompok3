<?php
include '../db.php';
$id = $_GET['id'] ?? 0;
$stmt = $conn->prepare("SELECT * FROM pelanggan WHERE id=?");
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();
echo json_encode($res->fetch_assoc());
$stmt->close();
$conn->close();
?> 