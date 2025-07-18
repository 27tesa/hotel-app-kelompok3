<?php
include '../../db.php';
if (!isset($_GET['id'])) {
    header('Location: read_view.php');
    exit;
}
$id = intval($_GET['id']);
$result = $conn->query("SELECT * FROM pelanggan WHERE id = $id");
if (!$result) {
    echo "Terjadi kesalahan pada database: " . $conn->error;
    exit;
}
$pelanggan = $result->fetch_assoc();
if (!$pelanggan) {
    echo "Data pelanggan dengan ID tersebut tidak ditemukan.";
    exit;
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn->query("DELETE FROM pelanggan WHERE id = $id");
    header('Location: read_view.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Hapus Pelanggan</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
<div class="container mt-5">
    <h2>Hapus Pelanggan</h2>
    <p>Apakah Anda yakin ingin menghapus pelanggan <strong><?= htmlspecialchars($pelanggan['nama']) ?></strong>?</p>
    <form method="post">
        <button type="submit" class="btn btn-danger">Ya, Hapus</button>
        <a href="read_view.php" class="btn btn-secondary">Batal</a>
    </form>
</div>
</body>
</html> 