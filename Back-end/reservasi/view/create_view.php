<?php
include '../../db.php';

$pelanggan = $conn->query("SELECT id, nama FROM pelanggan");
$kamar = $conn->query("SELECT id, nama_kamar FROM kamar");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pelanggan_id = $_POST['id_pelanggan'];
    $kamar_id = $_POST['id_kamar'];
    $tanggal_checkin = $_POST['tanggal_checkin'];
    $tanggal_checkout = $_POST['tanggal_checkout'];

    $conn->query("INSERT INTO reservasi (pelanggan_id, kamar_id, tanggal_checkin, tanggal_checkout) 
                  VALUES ('$pelanggan_id', '$kamar_id', '$tanggal_checkin', '$tanggal_checkout')");
    
    header('Location: read_view.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Tambah Reservasi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Tambah Reservasi</h2>
        <div>
            <a href="../../index.php" class="btn btn-outline-dark me-2">Dashboard</a>
            <a href="read_view.php" class="btn btn-secondary">Kembali</a>
        </div>
    </div>

    <div class="card shadow-sm">
        <div class="card-body">
            <form method="post">
                <div class="mb-3">
                    <label class="form-label">Pelanggan</label>
                    <select name="id_pelanggan" class="form-select" required>
                        <option value="">Pilih Pelanggan</option>
                        <?php while ($p = $pelanggan->fetch_assoc()): ?>
                            <option value="<?= $p['id'] ?>"><?= htmlspecialchars($p['nama']) ?></option>
                        <?php endwhile; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Kamar</label>
                    <select name="id_kamar" class="form-select" required>
                        <option value="">Pilih Kamar</option>
                        <?php while ($k = $kamar->fetch_assoc()): ?>
                            <option value="<?= $k['id'] ?>"><?= htmlspecialchars($k['nama_kamar']) ?></option>
                        <?php endwhile; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tanggal Check-in</label>
                    <input type="date" name="tanggal_checkin" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tanggal Check-out</label>
                    <input type="date" name="tanggal_checkout" class="form-control" required>
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
