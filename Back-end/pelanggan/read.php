<?php
include '../db.php';
$sql = "SELECT * FROM pelanggan";
$result = $conn->query($sql);

$pelanggan = [];
while ($row = $result->fetch_assoc()) {
    $pelanggan[] = $row;
}
echo json_encode($pelanggan);
?> 