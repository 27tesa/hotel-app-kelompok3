<?php
// Set CORS headers untuk mengizinkan request dari React frontend
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Hanya terima POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Include database connection
require_once '../db.php';

try {
    // Ambil data JSON dari request body
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validasi data yang diperlukan
    $required_fields = ['nama', 'email', 'tanggal_checkin', 'tanggal_checkout', 'jumlah_tamu', 'tipe_kamar', 'jumlah_malam', 'total_harga'];
    
    foreach ($required_fields as $field) {
        if (!isset($input[$field]) || empty($input[$field])) {
            throw new Exception("Field $field is required");
        }
    }
    
    // Validasi email
    if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format");
    }
    
    // Validasi tanggal
    $checkin_date = new DateTime($input['tanggal_checkin']);
    $checkout_date = new DateTime($input['tanggal_checkout']);
    
    if ($checkout_date <= $checkin_date) {
        throw new Exception("Checkout date must be after checkin date");
    }
    
    // Validasi jumlah tamu
    if (!is_numeric($input['jumlah_tamu']) || $input['jumlah_tamu'] < 1) {
        throw new Exception("Invalid number of guests");
    }
    
    // Validasi total harga
    if (!is_numeric($input['total_harga']) || $input['total_harga'] <= 0) {
        throw new Exception("Invalid total price");
    }
    
    // Siapkan query untuk insert data
    $sql = "INSERT INTO reservasi (nama, email, tanggal_checkin, tanggal_checkout, jumlah_tamu, tipe_kamar, jumlah_malam, total_harga, status, created_at) 
            VALUES (:nama, :email, :tanggal_checkin, :tanggal_checkout, :jumlah_tamu, :tipe_kamar, :jumlah_malam, :total_harga, :status, NOW())";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $params = [
        ':nama' => $input['nama'],
        ':email' => $input['email'],
        ':tanggal_checkin' => $input['tanggal_checkin'],
        ':tanggal_checkout' => $input['tanggal_checkout'],
        ':jumlah_tamu' => $input['jumlah_tamu'],
        ':tipe_kamar' => $input['tipe_kamar'],
        ':jumlah_malam' => $input['jumlah_malam'],
        ':total_harga' => $input['total_harga'],
        ':status' => $input['status'] ?? 'pending'
    ];
    
    // Eksekusi query
    $stmt->execute($params);
    
    // Ambil ID yang baru dibuat
    $reservation_id = $pdo->lastInsertId();
    
    // Response sukses
    http_response_code(201);
    echo json_encode([
        'success' => true,
        'message' => 'Reservasi berhasil dibuat',
        'data' => [
            'id' => $reservation_id,
            'nama' => $input['nama'],
            'email' => $input['email'],
            'tanggal_checkin' => $input['tanggal_checkin'],
            'tanggal_checkout' => $input['tanggal_checkout'],
            'jumlah_tamu' => $input['jumlah_tamu'],
            'tipe_kamar' => $input['tipe_kamar'],
            'jumlah_malam' => $input['jumlah_malam'],
            'total_harga' => $input['total_harga'],
            'status' => $input['status'] ?? 'pending'
        ]
    ]);
    
} catch (PDOException $e) {
    // Database error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    // Validation error
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?> 