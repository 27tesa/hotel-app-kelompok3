import { useState } from "react";
// Hapus import custom CSS

const rooms = [
  {
    name: "Deluxe Room",
    image: "/deluxe-room.jpg",
    price: "Rp 1.250.000",
    perNight: "/ malam",
    description:
      "Kamar luas dengan pemandangan kota, tempat tidur queen, AC, Wi-Fi, dan TV.",
    features: [
      "King Size Bed",
      "Pemandangan Kota",
      "Wi-Fi Gratis",
      'Smart TV 42"',
      "Breakfast",
    ],
  },
  {
    name: "Superior Room",
    image: "/superior-room.jpg",
    price: "Rp 850.000",
    perNight: "/ malam",
    description:
      "Kenyamanan modern dengan fasilitas lengkap dan desain elegan.",
    features: [
      "Queen Size Bed",
      "Mini Bar",
      "Wi-Fi Gratis",
      'TV 32"',
      "Breakfast",
    ],
  },
  {
    name: "Suite Room",
    image: "/suite-room.jpg",
    price: "Rp 2.100.000",
    perNight: "/ malam",
    description:
      "Nikmati kemewahan dengan ruang tamu pribadi dan layanan ekstra.",
    features: [
      "King Size Bed",
      "Ruang Tamu Terpisah",
      "Jacuzzi",
      'Smart TV 55"',
      "Breakfast & Dinner",
    ],
  },
];

function Rooms() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleViewDetails = (index) => {
    setSelectedRoom(selectedRoom === index ? null : index);
  };

  return (
    <div className="bg-light pb-4">
      <div className="bg-primary text-white text-center py-5 mb-4">
        <h1 className="display-4 fw-bold">Kamar & Harga</h1>
        <p className="lead">Pilihan akomodasi terbaik untuk kenyamanan Anda</p>
      </div>

      <div className="container">
        <div className="row g-4 justify-content-center">
          {rooms.map((room, index) => (
            <div
              key={index}
              className={`col-12 col-md-10 col-lg-8`}
            >
              <div className={`card shadow-sm ${selectedRoom === index ? "border-primary" : ""}`}>
                <div className="row g-0 align-items-stretch">
                  <div className="col-md-5 position-relative">
                    <span className="badge bg-success position-absolute top-0 start-0 m-3">Available</span>
                    <img src={room.image} alt={room.name} className="img-fluid rounded-start w-100 h-100 object-fit-cover" style={{minHeight:200, maxHeight:250}} />
                  </div>
                  <div className="col-md-7">
                    <div className="card-body d-flex flex-column h-100">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h2 className="h5 fw-bold mb-0">{room.name}</h2>
                        <div className="text-end">
                          <span className="text-primary fw-bold fs-5">{room.price}</span>
                          <span className="text-muted ms-1">{room.perNight}</span>
                        </div>
                      </div>
                      <p className="mb-2">{room.description}</p>

                      {selectedRoom === index && (
                        <div className="mb-2">
                          <h6 className="fw-bold">Fasilitas Kamar</h6>
                          <ul className="list-group list-group-flush mb-2">
                            {room.features.map((feature, i) => (
                              <li key={i} className="list-group-item px-0 py-1 border-0">
                                <i className="bi bi-check-circle text-success me-2"></i>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-auto d-flex gap-2">
                        <button
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => handleViewDetails(index)}
                        >
                          {selectedRoom === index
                            ? "Sembunyikan Detail"
                            : "Lihat Detail"}
                        </button>
                        <a href="/reservation" className="btn btn-primary btn-sm">
                          Pesan Sekarang
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;