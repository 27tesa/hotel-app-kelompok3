<?php
include_once '../../db.php';
$id = $_GET['id'];
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $conn->query("DELETE FROM kamar WHERE id=$id");
    header('Location: read_view.php');
    exit;
}
$row = $conn->query("SELECT * FROM kamar WHERE id=$id")->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Hapus Kamar</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">
<div class="container py-5">
    <h2>Hapus Kamar</h2>
    <div class="alert alert-danger">
        <strong>Yakin ingin menghapus kamar berikut?</strong>
        <ul>
            <li>Nama: <?= htmlspecialchars($row['nama_kamar']) ?></li>
            <li>Harga: Rp <?= number_format($row['harga'],0,',','.') ?></li>
        </ul>
    </div>
    <form method="post">
        <button type="submit" class="btn btn-danger">Ya, Hapus</button>
        <a href="read_view.php" class="btn btn-secondary">Batal</a>
    </form>
</div>
</body>
</html> 