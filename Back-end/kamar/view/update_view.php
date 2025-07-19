<?php
include '../../db.php';

if (!isset($_GET['id'])) {
    header('Location: read_view.php');
    exit;
}

$id = intval($_GET['id']);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nama_kamar = $_POST['nama_kamar'];
    $harga = $_POST['harga'];
    $deskripsi = $_POST['deskripsi'];
    $gambar = $_FILES['gambar']['name'] ?? $_POST['gambar_lama'] ?? '';

    if ($_FILES['gambar']['tmp_name']) {
        move_uploaded_file($_FILES['gambar']['tmp_name'], '../../public/' . $gambar);
    } else if (isset($_POST['gambar_lama'])) {
        $gambar = $_POST['gambar_lama'];
    }

    $conn->query("UPDATE kamar SET nama_kamar='$nama_kamar', harga='$harga', deskripsi='$deskripsi', gambar='$gambar' WHERE id=$id");
    header('Location: read_view.php');
    exit;
}

$result = $conn->query("SELECT * FROM kamar WHERE id = $id");
if (!$result) {
    echo "Terjadi kesalahan pada database: " . $conn->error;
    exit;
}
$kamar = $result->fetch_assoc();
if (!$kamar) {
    echo "Data kamar dengan ID tersebut tidak ditemukan.";
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edit Kamar</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Edit Kamar</h2>
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
                    <input type="text" name="nama_kamar" class="form-control" required value="<?= htmlspecialchars($kamar['nama_kamar']) ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Harga (Rp)</label>
                    <input type="number" name="harga" class="form-control" required value="<?= $kamar['harga'] ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Deskripsi</label>
                    <textarea name="deskripsi" class="form-control" rows="3" required><?= htmlspecialchars($kamar['deskripsi']) ?></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Gambar</label>
                    <?php if (!empty($kamar['gambar'])): ?>
                        <div class="mb-2">
                            <img src="../../public/<?= htmlspecialchars($kamar['gambar']) ?>" alt="Gambar Kamar" class="img-thumbnail" style="width: 100px;">
                        </div>
                        <input type="hidden" name="gambar_lama" value="<?= htmlspecialchars($kamar['gambar']) ?>">
                    <?php endif; ?>
                    <input type="file" name="gambar" class="form-control" accept="image/*">
                    <div class="form-text">Biarkan kosong jika tidak ingin mengubah gambar.</div>
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
