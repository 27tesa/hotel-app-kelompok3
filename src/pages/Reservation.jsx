import { useState, useEffect, useRef } from "react";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // nomor telepon
    checkin: "",
    checkout: "",
    guests: 1,
    roomType: "", // sekarang menyimpan id kamar
  });
  const [rooms, setRooms] = useState([]); // data kamar dari backend
  const [roomDescriptions, setRoomDescriptions] = useState({});
  const [roomPrices, setRoomPrices] = useState({});
  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  // Tambahkan state untuk data reservasi dan loading
  const [reservations, setReservations] = useState([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  // Tambahkan state untuk filter, edit, dan modal
  const [filter, setFilter] = useState({ nama: '', kamar: '', status: '' });
  const [editModal, setEditModal] = useState({ show: false, data: null });

  // Fetch data kamar dari backend
  useEffect(() => {
    fetch('http://localhost:8000/kamar/read.php')
      .then(res => res.json())
      .then(data => {
        console.log('Data kamar:', data); // Debug log
        setRooms(data);
        // Buat mapping harga dan deskripsi
        const priceMap = {};
        const descMap = {};
        data.forEach(room => {
          priceMap[room.id] = parseInt(room.harga);
          descMap[room.id] = room.deskripsi || room.nama_kamar; // Fallback ke nama_kamar jika tidak ada deskripsi
        });
        setRoomPrices(priceMap);
        setRoomDescriptions(descMap);
        // Set default roomType ke id kamar pertama jika ada
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, roomType: data[0].id }));
        }
      })
      .catch(err => {
        console.error('Gagal fetch kamar:', err);
        setErrorMessage('Gagal memuat data kamar. Pastikan server backend berjalan di port 8000.');
      });
  }, []);

  // Hitung total malam dan harga
  useEffect(() => {
    const { checkin, checkout, roomType } = formData;
    if (checkin && checkout && roomPrices[roomType]) {
      const checkinDate = new Date(checkin);
      const checkoutDate = new Date(checkout);
      if (checkoutDate > checkinDate) {
        const diffTime = checkoutDate - checkinDate;
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setTotalNights(nights);
        setTotalPrice(nights * roomPrices[roomType]);
        setErrorMessage("");
      } else if (checkoutDate <= checkinDate) {
        setTotalNights(0);
        setTotalPrice(0);
        setErrorMessage("Tanggal check-out harus setelah tanggal check-in.");
      }
    } else {
      setTotalNights(0);
      setTotalPrice(0);
      setErrorMessage("");
    }
  }, [formData.checkin, formData.checkout, formData.roomType, roomPrices]);

  // Fetch reservasi dari backend
  const fetchReservations = async () => {
    setIsLoadingReservations(true);
    try {
      const res = await fetch('http://localhost:8000/reservasi/read.php');
      const data = await res.json();
      // Ambil data pelanggan dan kamar untuk mapping
      const pelangganRes = await fetch('http://localhost:8000/pelanggan/read.php');
      const pelangganList = await pelangganRes.json();
      const kamarRes = await fetch('http://localhost:8000/kamar/read.php');
      const kamarList = await kamarRes.json();
      // Gabungkan data
      const reservationsWithDetail = data.reverse().map(r => ({
        ...r,
        pelanggan: pelangganList.find(p => p.id === r.pelanggan_id),
        kamar: kamarList.find(k => k.id === r.kamar_id)
      }));
      setReservations(reservationsWithDetail);
    } catch (err) {
      setReservations([]);
    } finally {
      setIsLoadingReservations(false);
    }
  };

  // Fetch reservasi saat mount dan setiap submit sukses
  useEffect(() => {
    fetchReservations();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (submitStatus === 'success') fetchReservations();
    // eslint-disable-next-line
  }, [submitStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit: 1) Buat pelanggan, 2) Buat reservasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) {
      alert("Mohon periksa data Anda terlebih dahulu.");
      return;
    }
    setIsLoading(true);
    setSubmitStatus(null);
    try {
      // 1. Buat pelanggan baru
      const pelangganRes = await fetch('http://localhost:8000/pelanggan/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: formData.name,
          email: formData.email,
          telepon: formData.phone
        })
      });
      const pelangganResult = await pelangganRes.json();
      if (!pelangganRes.ok) throw new Error(pelangganResult.error || 'Gagal membuat pelanggan');
      // 2. Ambil id pelanggan terakhir (asumsi auto increment, ambil id terbesar)
      const pelangganListRes = await fetch('http://localhost:8000/pelanggan/read.php');
      const pelangganList = await pelangganListRes.json();
      const pelangganBaru = pelangganList.reverse().find(p => p.email === formData.email && p.nama === formData.name);
      if (!pelangganBaru) throw new Error('Gagal mendapatkan id pelanggan');
      // 3. Buat reservasi
      const reservationData = {
        pelanggan_id: pelangganBaru.id,
        kamar_id: formData.roomType,
        tanggal_checkin: formData.checkin,
        tanggal_checkout: formData.checkout,
        status: "pending"
      };
      const reservasiRes = await fetch('http://localhost:8000/reservasi/create.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      const reservasiResult = await reservasiRes.json();
      if (reservasiRes.ok && reservasiResult.message) {
        setSubmitStatus('success');
        setFormData({
          name: "",
          email: "",
          phone: "",
          checkin: "",
          checkout: "",
          guests: 1,
          roomType: rooms.length > 0 ? rooms[0].id : ""
        });
        setTotalNights(0);
        setTotalPrice(0);
      } else {
        setSubmitStatus('error');
        console.error('Error:', reservasiResult.error || 'Terjadi kesalahan saat menyimpan reservasi');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Network error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  // Fungsi filter data
  const filteredReservations = reservations.filter(r => {
    const nama = r.pelanggan?.nama?.toLowerCase() || '';
    const kamar = r.kamar?.nama_kamar?.toLowerCase() || '';
    const status = r.status?.toLowerCase() || '';
    return (
      nama.includes(filter.nama.toLowerCase()) &&
      kamar.includes(filter.kamar.toLowerCase()) &&
      status.includes(filter.status.toLowerCase())
    );
  });

  // Fungsi hapus reservasi
  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus reservasi ini?')) return;
    try {
      const res = await fetch('http://localhost:8000/reservasi/delete.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      const result = await res.json();
      if (res.ok && result.message) {
        fetchReservations();
      } else {
        alert('Gagal menghapus reservasi!');
      }
    } catch {
      alert('Gagal menghapus reservasi!');
    }
  };

  // Fungsi buka modal edit
  const openEditModal = (data) => setEditModal({ show: true, data });
  const closeEditModal = () => setEditModal({ show: false, data: null });

  // Fungsi submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const d = editModal.data;
    try {
      const res = await fetch('http://localhost:8000/reservasi/update.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: d.id,
          pelanggan_id: d.pelanggan_id,
          kamar_id: d.kamar_id,
          tanggal_checkin: d.tanggal_checkin,
          tanggal_checkout: d.tanggal_checkout,
          status: d.status
        })
      });
      const result = await res.json();
      if (res.ok && result.message) {
        closeEditModal();
        fetchReservations();
      } else {
        alert('Gagal update reservasi!');
      }
    } catch {
      alert('Gagal update reservasi!');
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">Reservasi Hotel</h1>
          <p className="lead text-muted">Pesan kamar impian Anda dengan mudah dan cepat</p>
        </div>
        <div className="row">
          {/* Form Section */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm">
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Informasi Pemesanan</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Personal Info */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-person me-2"></i>Nama Lengkap
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Masukkan nama lengkap"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-envelope me-2"></i>Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="email@example.com"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-telephone me-2"></i>Nomor Telepon
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="08xxxxxxxxxx"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-people me-2"></i>Jumlah Tamu
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="guests"
                          min="1"
                          required
                          value={formData.guests}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* Stay Details */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-calendar-event me-2"></i>Tanggal Check-in
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="checkin"
                          required
                          value={formData.checkin}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-calendar-check me-2"></i>Tanggal Check-out
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="checkout"
                          required
                          value={formData.checkout}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-house me-2"></i>Tipe Kamar
                        </label>
                        <select
                          className="form-select"
                          name="roomType"
                          value={formData.roomType}
                          onChange={handleChange}
                          required
                        >
                          <option value="" disabled>-- Pilih Tipe Kamar --</option>
                          {rooms.length === 0 ? (
                            <option value="" disabled>Tidak ada kamar tersedia</option>
                          ) : (
                            rooms.map(room => (
                              <option key={room.id} value={String(room.id)}>
                                {room.nama_kamar} - {formatToRupiah(room.harga)}/malam
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Room Description */}
                  {formData.roomType && roomDescriptions[formData.roomType] && (
                    <div className="alert alert-info mt-3">
                      <h5 className="mb-1">
                        {rooms.find(r => r.id === formData.roomType)?.nama_kamar}
                      </h5>
                      <p className="mb-0">{roomDescriptions[formData.roomType]}</p>
                    </div>
                  )}
                  {/* Error Message */}
                  {errorMessage && (
                    <div className="alert alert-danger d-flex align-items-center mt-3" role="alert">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      <div>{errorMessage}</div>
                    </div>
                  )}
                  {/* Submit Status */}
                  {submitStatus === 'success' && (
                    <div className="alert alert-success mt-3">Reservasi berhasil dikirim!</div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="alert alert-danger mt-3">Terjadi kesalahan saat mengirim reservasi.</div>
                  )}
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <div>
                      <strong>Total Malam:</strong> {totalNights} <br />
                      <strong>Total Harga:</strong> {formatToRupiah(totalPrice)}
                    </div>
                    <button type="submit" className="btn btn-primary px-4" disabled={isLoading}>
                      {isLoading ? 'Memproses...' : 'Pesan Sekarang'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "2rem" }}>
              <div className="card-header bg-primary text-white">
                <h3 className="mb-0">Ringkasan Pesanan</h3>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Tipe Kamar</span>
                    <span className="fw-bold">{rooms.find(r => r.id === formData.roomType)?.nama_kamar}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Check-in</span>
                    <span>{formData.checkin || '-'}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Check-out</span>
                    <span>{formData.checkout || '-'}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-bold">Jumlah Tamu</span>
                    <span>{formData.guests}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="fw-bold">Jumlah Malam</span>
                    <span>{totalNights || 0}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center border-top pt-3">
                    <span className="fw-bold fs-5">Total Harga</span>
                    <span className="fw-bold text-primary fs-5">{formatToRupiah(totalPrice)}</span>
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="card-body">
                    <h5 className="card-title">Yang Anda Dapatkan:</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><i className="bi bi-wifi me-2"></i>Free Wi-Fi kecepatan tinggi</li>
                      <li className="list-group-item"><i className="bi bi-cup-hot me-2"></i>Sarapan gratis</li>
                      <li className="list-group-item"><i className="bi bi-water me-2"></i>Akses kolam renang</li>
                      <li className="list-group-item"><i className="bi bi-shield-check me-2"></i>Pembatalan gratis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Setelah form, tampilkan tabel data reservasi */}
        <div className="card mt-5">
          <div className="card-header bg-secondary text-white">
            <h5 className="mb-0">Data Reservasi Terbaru</h5>
          </div>
          <div className="card-body p-0">
            <div className="p-3 border-bottom bg-light">
              <div className="row g-2">
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Cari Nama" value={filter.nama} onChange={e => setFilter(f => ({ ...f, nama: e.target.value }))} />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Cari Kamar" value={filter.kamar} onChange={e => setFilter(f => ({ ...f, kamar: e.target.value }))} />
                </div>
                <div className="col-md-4">
                  <input type="text" className="form-control" placeholder="Cari Status" value={filter.status} onChange={e => setFilter(f => ({ ...f, status: e.target.value }))} />
                </div>
              </div>
            </div>
            {isLoadingReservations ? (
              <div className="p-3">Memuat data reservasi...</div>
            ) : filteredReservations.length === 0 ? (
              <div className="p-3">Belum ada data reservasi.</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Telepon</th>
                      <th>Tipe Kamar</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Status</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredReservations.map((r, idx) => (
                      <tr key={r.id}>
                        <td>{idx + 1}</td>
                        <td>{r.pelanggan?.nama || '-'}</td>
                        <td>{r.pelanggan?.email || '-'}</td>
                        <td>{r.pelanggan?.telepon || '-'}</td>
                        <td>{r.kamar?.nama_kamar || '-'}</td>
                        <td>{r.tanggal_checkin}</td>
                        <td>{r.tanggal_checkout}</td>
                        <td>{r.status}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(r)}>
                            Edit
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {/* Modal Edit Reservasi */}
        {editModal.show && (
          <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.3)' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleEditSubmit}>
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Reservasi</h5>
                    <button type="button" className="btn-close" onClick={closeEditModal}></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Tipe Kamar</label>
                      <select className="form-select" value={editModal.data.kamar_id} onChange={e => setEditModal(m => ({ ...m, data: { ...m.data, kamar_id: e.target.value } }))} required>
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>{room.nama_kamar}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tanggal Check-in</label>
                      <input type="date" className="form-control" value={editModal.data.tanggal_checkin} onChange={e => setEditModal(m => ({ ...m, data: { ...m.data, tanggal_checkin: e.target.value } }))} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Tanggal Check-out</label>
                      <input type="date" className="form-control" value={editModal.data.tanggal_checkout} onChange={e => setEditModal(m => ({ ...m, data: { ...m.data, tanggal_checkout: e.target.value } }))} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select className="form-select" value={editModal.data.status} onChange={e => setEditModal(m => ({ ...m, data: { ...m.data, status: e.target.value } }))} required>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Batal</button>
                    <button type="submit" className="btn btn-primary">Simpan Perubahan</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reservation;
