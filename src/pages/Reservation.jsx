import { useState, useEffect } from "react";
import "../style/Reservation.css";

function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    checkin: "",
    checkout: "",
    guests: 1,
    roomType: "Deluxe Room",
  });

  const [totalNights, setTotalNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const roomPrices = {
    "Deluxe Room": 850000,
    "Superior Room": 650000,
    "Suite Room": 1200000,
  };

  const roomDescriptions = {
    "Deluxe Room":
      "Kamar luas dengan pemandangan kota, king bed, dan fasilitas premium",
    "Superior Room": "Kamar nyaman dengan twin bed dan semua fasilitas dasar",
    "Suite Room":
      "Pengalaman mewah dengan ruang tamu terpisah dan jacuzzi pribadi",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
  }, [formData.checkin, formData.checkout, formData.roomType]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errorMessage) {
      alert("Mohon periksa data Anda terlebih dahulu.");
      return;
    }

    alert(
      `Reservasi berhasil!\n\nNama: ${formData.name}\nEmail: ${
        formData.email
      }\nCheck-in: ${formData.checkin}\nCheck-out: ${
        formData.checkout
      }\nJumlah Malam: ${totalNights}\nTotal Harga: Rp ${totalPrice.toLocaleString(
        "id-ID"
      )}`
    );
  };

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="reservation-container">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold reservation-title">
            Reservasi Hotel
          </h1>
          <p className="lead text-muted">
            Pesan kamar impian Anda dengan mudah dan cepat
          </p>
        </div>

        <div className="row">
          {/* Form Section */}
          <div className="col-lg-8 mb-4">
            <div className="card reservation-card">
              <div className="card-header reservation-card-header">
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
                          onChange={handleChange}
                          placeholder="email@example.com"
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
                          defaultValue={1}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Stay Details */}
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-calendar-event me-2"></i>Tanggal
                          Check-in
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="checkin"
                          required
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-calendar-check me-2"></i>Tanggal
                          Check-out
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          name="checkout"
                          required
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
                          onChange={handleChange}
                          defaultValue="Deluxe Room"
                        >
                          <option value="Deluxe Room">
                            Deluxe Room - Rp 850.000/malam
                          </option>
                          <option value="Superior Room">
                            Superior Room - Rp 650.000/malam
                          </option>
                          <option value="Suite Room">
                            Suite Room - Rp 1.200.000/malam
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Room Description */}
                  <div className="alert alert-info room-info mt-3">
                    <h5 className="mb-1">{formData.roomType}</h5>
                    <p className="mb-0">
                      {roomDescriptions[formData.roomType]}
                    </p>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div
                      className="alert alert-danger d-flex align-items-center mt-3"
                      role="alert"
                    >
                      <i className="bi bi-exclamation-triangle-fill me-2"></i>
                      <div>{errorMessage}</div>
                    </div>
                  )}

                  <div className="d-grid mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg reservation-btn"
                    >
                      <i className="bi bi-check2-circle me-2"></i>Lanjutkan
                      Pemesanan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="col-lg-4">
            <div
              className="card reservation-summary-card sticky-top"
              style={{ top: "2rem" }}
            >
              <div className="card-header reservation-card-header">
                <h3 className="mb-0">Ringkasan Pesanan</h3>
              </div>
              <div className="card-body">
                <div className="summary-details">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tipe Kamar:</span>
                    <span className="fw-bold">{formData.roomType}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Harga per malam:</span>
                    <span className="fw-bold">
                      {formatToRupiah(roomPrices[formData.roomType])}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Jumlah malam:</span>
                    <span className="fw-bold">{totalNights || 0}</span>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between total-price">
                    <span>Total:</span>
                    <span className="fw-bold fs-5">
                      {formatToRupiah(totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="card mt-4 benefits-card">
                  <div className="card-body">
                    <h5 className="card-title">Yang Anda Dapatkan:</h5>
                    <ul className="list-group list-group-flush benefits-list">
                      <li className="list-group-item">
                        <i className="bi bi-wifi me-2"></i>Free Wi-Fi kecepatan
                        tinggi
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-cup-hot me-2"></i>Sarapan gratis
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-water me-2"></i>Akses kolam renang
                        dan gym
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-shield-check me-2"></i>Pembatalan
                        gratis 24 jam
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
