<?php // Dashboard Admin Hotel ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin Hotel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    <style>
        body { background-color: #f8fafc; }
        .dashboard-header {
            background: linear-gradient(90deg, #0d6efd 60%, #0dcaf0 100%);
            color: #fff;
            padding: 2rem 1rem;
            margin-bottom: 2rem;
            border-radius: 0 0 2rem 2rem;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.2);
        }
        .dashboard-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .dashboard-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .dashboard-icon {
            font-size: 3.5rem;
            color: #0d6efd;
        }
        .card-title {
            font-weight: 600;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="dashboard-header text-center">
        <h1 class="fw-bold mb-2">Dashboard Admin Hotel</h1>
        <p class="lead mb-0">Kelola data kamar, pelanggan, dan reservasi hotel dengan mudah dan cepat.</p>
    </div>

    <!-- Konten Utama -->
    <div class="container">
        <!-- Alert untuk inisialisasi data -->
        <div class="alert alert-info text-center mb-4" role="alert">
            <i class="bi bi-info-circle me-2"></i>
            <strong>Pertama kali menggunakan aplikasi?</strong> 
            <a href="init_data.php" class="alert-link">Klik di sini untuk mengisi data awal</a>
            <br>
            <small class="mt-2 d-block">
                <a href="check_db.php" class="alert-link">Cek status database</a> | 
                <a href="check_structure.php" class="alert-link">Cek struktur database</a> | 
                <a href="fix_field_mapping.php" class="alert-link">Perbaiki field mapping</a> | 
                <a href="kamar/read.php" class="alert-link">Test API Kamar</a>
            </small>
        </div>
        
        <div class="row justify-content-center g-4">
            <!-- Kamar -->
            <div class="col-md-4">
                <a href="kamar/view/read_view.php" class="text-decoration-none text-dark">
                    <div class="card dashboard-card shadow-sm h-100">
                        <div class="card-body text-center">
                            <i class="bi bi-door-open dashboard-icon"></i>
                            <h5 class="card-title mt-3">Kelola Kamar</h5>
                            <p class="card-text">Tambah, edit, dan hapus data kamar hotel.</p>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Pelanggan -->
            <div class="col-md-4">
                <a href="pelanggan/view/read_view.php" class="text-decoration-none text-dark">
                    <div class="card dashboard-card shadow-sm h-100">
                        <div class="card-body text-center">
                            <i class="bi bi-people dashboard-icon"></i>
                            <h5 class="card-title mt-3">Kelola Pelanggan</h5>
                            <p class="card-text">Kelola data pelanggan hotel secara efisien.</p>
                        </div>
                    </div>
                </a>
            </div>

            <!-- Reservasi -->
            <div class="col-md-4">
                <a href="reservasi/view/read_view.php" class="text-decoration-none text-dark">
                    <div class="card dashboard-card shadow-sm h-100">
                        <div class="card-body text-center">
                            <i class="bi bi-calendar-check dashboard-icon"></i>
                            <h5 class="card-title mt-3">Kelola Reservasi</h5>
                            <p class="card-text">Pantau dan atur reservasi kamar hotel.</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</body>
</html>
