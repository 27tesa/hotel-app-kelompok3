<?php
include '../db.php';
$sql = "SELECT * FROM kamar";
$result = $conn->query($sql);

$kamar = [];
while ($row = $result->fetch_assoc()) {
    $kamar[] = $row;
}
echo json_encode($kamar);
?>
