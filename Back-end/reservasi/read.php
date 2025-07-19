<?php
include '../db.php';
$sql = "SELECT * FROM reservasi";
$result = $conn->query($sql);

$reservasi = [];
while ($row = $result->fetch_assoc()) {
    $reservasi[] = $row;
}
echo json_encode($reservasi);
?> 