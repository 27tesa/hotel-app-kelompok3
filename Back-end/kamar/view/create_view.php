<?php
include_once '../../db.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_kamar = $_POST['nama_kamar'];
    $harga = $_POST['harga'];
    $deskripsi = $_POST['deskripsi'];
    $gambar = $_FILES['gambar']['name'] ?? '';

    if ($_FILES['gambar']['tmp_name']) {
        move_uploaded_file($_FILES['gambar']['tmp_name'], '../../public/' . $gambar);
    }

    $conn->query("INSERT INTO kamar (nama_kamar, harga, deskripsi, gambar) VALUES ('$nama_kamar', '$harga', '$deskripsi', '$gambar')");
    header('Location: read_view.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah Kamar</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Tambah Kamar</h2>
        <div>
            <a href="../../index.php" class="btn btn-outline-dark me-2">Dashboard</a>
            <a href="read_view.php" class="btn btn-secondary">Kembali</a>
        </div>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <form method="post" enctype="multipart/form-data">
                <div class="mb-3">
                    <label class="form-label">Nama Kamar</label>
                    <input type="text" name="nama_kamar" class="form-control" placeholder="Contoh: Deluxe Room" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Harga (Rp)</label>
                    <input type="number" name="harga" class="form-control" placeholder="Contoh: 850000" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Deskripsi</label>
                    <textarea name="deskripsi" class="form-control" rows="3" placeholder="Contoh: Kamar luas dengan fasilitas lengkap" required></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Gambar</label>
                    <input type="file" name="gambar" class="form-control" accept="image/*">
                    <div class="form-text">Opsional. Unggah gambar kamar (jpg, png, webp).</div>
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Simpan</button>
                    <a href="read_view.php" class="btn btn-outline-secondary">Batal</a>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
