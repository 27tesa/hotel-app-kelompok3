<?php
include '../../db.php';
if (!isset($_GET['id'])) {
    header('Location: read_view.php');
    exit;
}
$id = intval($_GET['id']);
$sql = "SELECT r.*, p.nama AS nama_pelanggan, k.nama_kamar FROM reservasi r JOIN pelanggan p ON r.pelanggan_id = p.id JOIN kamar k ON r.kamar_id = k.id WHERE r.id = $id";
$result = $conn->query($sql);
if (!$result) {
    echo "Terjadi kesalahan pada database: " . $conn->error;
    exit;
}
$reservasi = $result->fetch_assoc();
if (!$reservasi) {
    echo "Data reservasi dengan ID tersebut tidak ditemukan.";
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn->query("DELETE FROM reservasi WHERE id = $id");
    header('Location: read_view.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Hapus Reservasi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2>Hapus Reservasi</h2>
    <p>Apakah Anda yakin ingin menghapus reservasi untuk <strong><?= htmlspecialchars($reservasi['nama_pelanggan']) ?></strong> di kamar <strong><?= htmlspecialchars($reservasi['nama_kamar']) ?></strong>?</p>
    <form method="post">
        <button type="submit" class="btn btn-danger">Ya, Hapus</button>
        <a href="read_view.php" class="btn btn-secondary">Batal</a>
    </form>
</div>
</body>
</html> 