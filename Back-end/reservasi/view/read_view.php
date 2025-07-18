<?php
include '../../db.php';

$sql = "SELECT r.id, p.nama AS nama_pelanggan, k.nama_kamar, r.tanggal_checkin, r.tanggal_checkout 
        FROM reservasi r 
        JOIN pelanggan p ON r.pelanggan_id = p.id 
        JOIN kamar k ON r.kamar_id = k.id";

$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Reservasi</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Data Reservasi</h2>
        <div>
            <a href="../../index.php" class="btn btn-outline-dark me-2">Dashboard</a>
            <a href="create_view.php" class="btn btn-success">+ Tambah Reservasi</a>
        </div>
    </div>

    <!-- Tabel Reservasi -->
    <div class="card shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-bordered table-hover mb-0 align-middle">
                    <thead class="table-dark text-center">
                        <tr>
                            <th>ID</th>
                            <th>Pelanggan</th>
                            <th>Kamar</th>
                            <th>Check-in</th>
                            <th>Check-out</th>
                            <th style="width: 160px;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if ($result->num_rows > 0): ?>
                            <?php while ($row = $result->fetch_assoc()): ?>
                            <tr>
                                <td class="text-center"><?= $row['id'] ?></td>
                                <td><?= htmlspecialchars($row['nama_pelanggan']) ?></td>
                                <td><?= htmlspecialchars($row['nama_kamar']) ?></td>
                                <td><?= $row['tanggal_checkin'] ?></td>
                                <td><?= $row['tanggal_checkout'] ?></td>
                                <td class="text-center">
                                    <a href="update_view.php?id=<?= $row['id'] ?>" class="btn btn-warning btn-sm mb-1">Edit</a>
                                    <a href="delete_view.php?id=<?= $row['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Yakin ingin menghapus reservasi ini?')">Hapus</a>
                                </td>
                            </tr>
                            <?php endwhile; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="6" class="text-center text-muted">Belum ada data reservasi.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>
