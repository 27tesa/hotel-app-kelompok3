<?php
include '../db.php';
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

// Ambil pelanggan_id dari reservasi yang akan dihapus
$getPelanggan = $conn->prepare("SELECT pelanggan_id FROM reservasi WHERE id=?");
$getPelanggan->bind_param("i", $id);
$getPelanggan->execute();
$getPelanggan->bind_result($pelanggan_id);
$getPelanggan->fetch();
$getPelanggan->close();

$sql = "DELETE FROM reservasi WHERE id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    // Cek apakah pelanggan masih punya reservasi lain
    $cek = $conn->prepare("SELECT COUNT(*) FROM reservasi WHERE pelanggan_id=?");
    $cek->bind_param("i", $pelanggan_id);
    $cek->execute();
    $cek->bind_result($jumlah);
    $cek->fetch();
    $cek->close();
    if ($jumlah == 0) {
        $hapusPelanggan = $conn->prepare("DELETE FROM pelanggan WHERE id=?");
        $hapusPelanggan->bind_param("i", $pelanggan_id);
        $hapusPelanggan->execute();
        $hapusPelanggan->close();
    }
    echo json_encode(["message" => "Reservasi berhasil dihapus"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?> 