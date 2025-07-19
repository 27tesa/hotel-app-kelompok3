<?php
include '../../db.php';

if (!isset($_GET['id'])) {
    header('Location: read_view.php');
    exit;
}

$id = intval($_GET['id']);
$res = $conn->query("SELECT * FROM reservasi WHERE id = $id");

if (!$res) {
    echo "Terjadi kesalahan pada database: " . $conn->error;
    exit;
}

$reservasi = $res->fetch_assoc();
if (!$reservasi) {
    echo "Data reservasi dengan ID tersebut tidak ditemukan.";
    exit;
}

$pelanggan = $conn->query("SELECT id, nama FROM pelanggan");
$kamar = $conn->query("SELECT id, nama_kamar FROM kamar");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pelanggan_id = $_POST['pelanggan_id'] ?? null;
    $kamar_id = $_POST['kamar_id'] ?? null;
    $tanggal_checkin = $_POST['tanggal_checkin'] ?? null;
    $tanggal_checkout = $_POST['tanggal_checkout'] ?? null;

    // Validasi sederhana
    if ($pelanggan_id && $kamar_id && $tanggal_checkin && $tanggal_checkout) {
        $conn->query("UPDATE reservasi SET pelanggan_id='$pelanggan_id', kamar_id='$kamar_id', tanggal_checkin='$tanggal_checkin', tanggal_checkout='$tanggal_checkout' WHERE id=$id");
        header('Location: read_view.php');
        exit;
    } else {
        echo "<div class='alert alert-danger'>Semua field harus diisi!</div>";
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Edit Reservasi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Edit Reservasi</h2>
        <div>
            <a href="../../index.php" class="btn btn-outline-dark me-2">Dashboard</a>
            <a href="read_view.php" class="btn btn-secondary">Kembali</a>
        </div>
    </div>

    <!-- Form -->
    <div class="card shadow-sm">
        <div class="card-body">
            <form method="post">
                <div class="mb-3">
                    <label class="form-label">Pelanggan</label>
                    <select name="pelanggan_id" class="form-select" required>
                        <option value="">Pilih Pelanggan</option>
                        <?php while ($p = $pelanggan->fetch_assoc()): ?>
                            <option value="<?= $p['id'] ?>" <?= (isset($reservasi['pelanggan_id']) && $p['id'] == $reservasi['pelanggan_id']) ? 'selected' : '' ?>>
                                <?= htmlspecialchars($p['nama']) ?>
                            </option>
                        <?php endwhile; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Kamar</label>
                    <select name="kamar_id" class="form-select" required>
                        <option value="">Pilih Kamar</option>
                        <?php while ($k = $kamar->fetch_assoc()): ?>
                            <option value="<?= $k['id'] ?>" <?= (isset($reservasi['kamar_id']) && $k['id'] == $reservasi['kamar_id']) ? 'selected' : '' ?> >
                                <?= htmlspecialchars($k['nama_kamar']) ?>
                            </option>
                        <?php endwhile; ?>
                    </select>
                </div>
                <div class="mb-3">
                    <label class="form-label">Tanggal Check-in</label>
                    <input type="date" name="tanggal_checkin" class="form-control" required value="<?= $reservasi['tanggal_checkin'] ?>">
                </div>
                <div class="mb-3">
                    <label class="form-label">Tanggal Check-out</label>
                    <input type="date" name="tanggal_checkout" class="form-control" required value="<?= $reservasi['tanggal_checkout'] ?>">
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
