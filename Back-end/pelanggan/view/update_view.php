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
    $nama = $_POST['nama'];
    $email = $_POST['email'];
    $telepon = $_POST['telepon'];

    $conn->query("UPDATE pelanggan SET nama='$nama', email='$email', telepon='$telepon' WHERE id=$id");
    header('Location: read_view.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edit Pelanggan</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <!-- Header dan tombol navigasi -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Edit Pelanggan</h2>
        <div>
            <a href="../../index.php" class="btn btn-outline-dark me-2">Dashboard</a>
            <a href="read_view.php" class="btn btn-secondary">Kembali</a>
        </div>
    </div>

    <!-- Form edit -->
    <div class="card shadow-sm">
        <div class="card-body">
            <form method="post">
                <div class="mb-3">
                    <label class="form-label">Nama</label>
                    <input type="text" name="nama" class="form-control" required value="<?= htmlspecialchars($pelanggan['nama']) ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" name="email" class="form-control" required value="<?= htmlspecialchars($pelanggan['email']) ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Telepon</label>
                    <input type="text" name="telepon" class="form-control" required value="<?= htmlspecialchars($pelanggan['telepon']) ?>">
                </div>
                <div class="d-flex justify-content-between">
                    <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                    <a href="read_view.php" class="btn btn-outline-secondary">Batal</a>
                </div>
            </form>
        </div>
    </div>
</div>
</body>
</html>
