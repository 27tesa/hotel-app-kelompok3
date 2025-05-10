import { useState } from "react";
import "../style/Rooms.css";

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
    <div className="rooms-page">
      <div className="rooms-header">
        <h1>Kamar & Harga</h1>
        <p className="rooms-subtitle">
          Pilihan akomodasi terbaik untuk kenyamanan Anda
        </p>
      </div>

      <div className="container">
        <div className="rooms-container">
          {rooms.map((room, index) => (
            <div
              key={index}
              className={`room-card ${
                selectedRoom === index ? "expanded" : ""
              }`}
            >
              <div className="room-image-container">
                <div className="room-badge">Available</div>
                <img src={room.image} alt={room.name} className="room-image" />
              </div>
              <div className="room-info">
                <div className="room-header">
                  <h2 className="room-name">{room.name}</h2>
                  <div className="room-price">
                    <span className="price">{room.price}</span>
                    <span className="per-night">{room.perNight}</span>
                  </div>
                </div>
                <p className="room-description">{room.description}</p>

                {selectedRoom === index && (
                  <div className="room-features">
                    <h3>Fasilitas Kamar</h3>
                    <ul>
                      {room.features.map((feature, i) => (
                        <li key={i}>
                          <i className="feature-icon"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="room-actions">
                  <button
                    className="btn-details"
                    onClick={() => handleViewDetails(index)}
                  >
                    {selectedRoom === index
                      ? "Sembunyikan Detail"
                      : "Lihat Detail"}
                  </button>
                  <a href="/reservation" className="btn-book">
                    Pesan Sekarang
                  </a>
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