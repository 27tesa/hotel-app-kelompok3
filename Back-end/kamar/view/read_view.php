<?php
include '../../db.php';
$result = $conn->query("SELECT * FROM kamar");
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Data Kamar</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <!-- Header dan tombol -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold">Data Kamar</h2>
        <div>
            <a href="../../index.php" class="btn btn-secondary me-2">Kembali ke Dashboard</a>
            <a href="create_view.php" class="btn btn-success">+ Tambah Kamar</a>
        </div>
    </div>

    <!-- Tabel Kamar -->
    <div class="card">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-bordered table-hover mb-0 align-middle">
                    <thead class="table-dark text-center">
                        <tr>
                            <th style="width: 40px;">#</th>
                            <th>Nama Kamar</th>
                            <th>Harga</th>
                            <th>Deskripsi</th>
                            <th>Gambar</th>
                            <th style="width: 160px;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $no = 1; while ($row = $result->fetch_assoc()): ?>
                        <tr>
                            <td class="text-center"><?= $no++ ?></td>
                            <td><?= htmlspecialchars($row['nama_kamar']) ?></td>
                            <td>Rp <?= number_format($row['harga'], 0, ',', '.') ?></td>
                            <td><?= htmlspecialchars($row['deskripsi']) ?></td>
                            <td class="text-center">
                                <?php if (!empty($row['gambar'])): ?>
                                    <img src="../../public/<?= htmlspecialchars($row['gambar']) ?>" alt="Gambar Kamar" class="img-thumbnail" style="width: 70px;">
                                <?php else: ?>
                                    <span class="text-muted">Tidak ada gambar</span>
                                <?php endif; ?>
                            </td>
                            <td class="text-center">
                                <a href="update_view.php?id=<?= $row['id'] ?>" class="btn btn-warning btn-sm mb-1">Edit</a>
                                <a href="delete_view.php?id=<?= $row['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Yakin ingin menghapus kamar ini?')">Hapus</a>
                            </td>
                        </tr>
                        <?php endwhile; ?>
                        <?php if ($result->num_rows === 0): ?>
                        <tr>
                            <td colspan="6" class="text-center text-muted">Belum ada data kamar.</td>
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
