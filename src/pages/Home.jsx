import "../style/Home.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Animasi scroll untuk smooth scrolling
    const scrollLinks = document.querySelectorAll("a.scroll-link");
    scrollLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  return (
    <div className={`home-container ${isLoaded ? "loaded" : ""}`}>
      {/* Hero Section dengan Parallax Effect */}
      <section className="hero-section text-white">
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto text-center">
                <h1 className="hero-title">Hotel Cendana</h1>
                <p className="hero-subtitle">
                  Pengalaman Menginap yang Tak Terlupakan
                </p>
                <div className="hero-buttons">
                  <Link
                    to="/reservation"
                    className="btn btn-primary btn-lg hero-btn"
                  >
                    Pesan Sekarang
                  </Link>
                  <a
                    href="#about"
                    className="btn btn-outline-light btn-lg hero-btn scroll-link"
                  >
                    Tentang Kami
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Selamat Datang di Hotel Cendana</h2>
            <div className="divider">
              <span></span>
            </div>
            <p className="section-subtitle">
              Nikmati pengalaman menginap yang mewah dengan pelayanan terbaik
            </p>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-img">
                <img
                  src="/about-hotel.jpg"
                  alt="Hotel Impian"
                  className="img-fluid rounded"
                  style={{ width: '318px', height: '159px', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content">
                <h3>Kenyamanan & Kemewahan</h3>
                <p>
                  Hotel Cendana menawarkan akomodasi mewah dan nyaman dengan
                  pemandangan indah di pusat kota. Dengan lokasi strategis, Anda
                  dapat dengan mudah menjelajahi tempat-tempat wisata populer,
                  pusat perbelanjaan, dan atraksi budaya.
                </p>
                <p>
                  Didirikan sejak tahun 2010, Hotel Impian telah menjadi pilihan
                  utama para wisatawan dan pebisnis yang mencari pengalaman
                  menginap premium dengan pelayanan terbaik.
                </p>
                <div className="about-features">
                  <div className="feature">
                    <i className="feature-icon wi-fi"></i>
                    <span>Wi-Fi Gratis</span>
                  </div>
                  <div className="feature">
                    <i className="feature-icon parking"></i>
                    <span>Parkir Gratis</span>
                  </div>
                  <div className="feature">
                    <i className="feature-icon pool"></i>
                    <span>Kolam Renang</span>
                  </div>
                  <div className="feature">
                    <i className="feature-icon gym"></i>
                    <span>Pusat Kebugaran</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layanan/Fitur Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header text-center">
            <h2>Layanan Unggulan</h2>
            <div className="divider">
              <span></span>
            </div>
            <p className="section-subtitle">
              Memberikan pengalaman menginap yang terbaik untuk Anda
            </p>
          </div>

          <div className="row service-cards">
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icon-kamar.png" alt="Kamar Nyaman" />
                </div>
                <h4>Kamar Mewah</h4>
                <p>
                  Kamar dengan desain elegan dan fasilitas lengkap untuk
                  kenyamanan Anda.
                </p>
                <Link to="/rooms" className="service-link">
                  Lihat Kamar
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icon-restoran.png" alt="Restoran" />
                </div>
                <h4>Restoran Premium</h4>
                <p>
                  Sajian kuliner lokal dan internasional terbaik dari koki
                  profesional kami.
                </p>
                <Link to="/dining" className="service-link">
                  Menu Kami
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icon-pelayanan.png" alt="Pelayanan" />
                </div>
                <h4>Pelayanan 24 Jam</h4>
                <p>Staff kami siap melayani Anda kapan saja, setiap hari.</p>
                <Link to="/services" className="service-link">
                  Detail Layanan
                </Link>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="service-icon">
                  <img src="/icon-spa.png" alt="Spa & Wellness" />
                </div>
                <h4>Spa & Wellness</h4>
                <p>
                  Nikmati perawatan spa mewah untuk relaksasi pikiran dan tubuh.
                </p>
                <Link to="/spa" className="service-link">
                  Perawatan Spa
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase */}
      <section className="rooms-showcase">
        <div className="container">
          <div className="section-header text-center">
            <h2>Kamar Unggulan Kami</h2>
            <div className="divider">
              <span></span>
            </div>
            <p className="section-subtitle">
              Pilihan kamar mewah untuk pengalaman menginap terbaik
            </p>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="room-card">
                <div className="room-img">
                  <img
                    src="/superior-room.jpg"
                    alt="Superior Room"
                    className="img-fluid"
                  />
                  <div className="room-price">
                    <span>Mulai dari</span>
                    <h4>Rp 850.000</h4>
                    <span>per malam</span>
                  </div>
                </div>
                <div className="room-info">
                  <h3>Superior Room</h3>
                  <div className="room-features">
                    <span>
                      <i className="feature-icon bed"></i> King Size Bed
                    </span>
                    <span>
                      <i className="feature-icon size"></i> 32m²
                    </span>
                    <span>
                      <i className="feature-icon mountain"></i> City View
                    </span>
                  </div>
                  <p>
                    Kamar mewah dengan tempat tidur king size dan pemandangan
                    kota yang menakjubkan.
                  </p>
                  <Link
                    to="/rooms/superior"
                    className="btn btn-outline-primary room-btn"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="room-card">
                <div className="room-img">
                  <img
                    src="/deluxe-room.jpg"
                    alt="Deluxe Room"
                    className="img-fluid"
                  />
                  <div className="room-price">
                    <span>Mulai dari</span>
                    <h4>Rp 1.250.000</h4>
                    <span>per malam</span>
                  </div>
                </div>
                <div className="room-info">
                  <h3>Deluxe Room</h3>
                  <div className="room-features">
                    <span>
                      <i className="feature-icon bed"></i> King Size Bed
                    </span>
                    <span>
                      <i className="feature-icon size"></i> 45m²
                    </span>
                    <span>
                      <i className="feature-icon mountain"></i> Mountain View
                    </span>
                  </div>
                  <p>
                    Kamar eksekutif dengan area ruang tamu terpisah dan
                    pemandangan gunung yang indah.
                  </p>
                  <Link
                    to="/rooms/deluxe"
                    className="btn btn-outline-primary room-btn"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6">
              <div className="room-card">
                <div className="room-img">
                  <img
                    src="/suite-room.jpg"
                    alt="Suite Room"
                    className="img-fluid"
                  />
                  <div className="room-price">
                    <span>Mulai dari</span>
                    <h4>Rp 2.100.000</h4>
                    <span>per malam</span>
                  </div>
                </div>
                <div className="room-info">
                  <h3>Suite Room</h3>
                  <div className="room-features">
                    <span>
                      <i className="feature-icon bed"></i> King Size Bed
                    </span>
                    <span>
                      <i className="feature-icon size"></i> 78m²
                    </span>
                    <span>
                      <i className="feature-icon mountain"></i> Ocean View
                    </span>
                  </div>
                  <p>
                    Suite mewah dengan ruang tamu luas, jacuzzi pribadi, dan
                    pemandangan laut yang spektakuler.
                  </p>
                  <Link
                    to="/rooms/suite"
                    className="btn btn-outline-primary room-btn"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-5">
            <Link to="/rooms" className="btn btn-primary btn-lg">
              Lihat Semua Kamar
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-7">
              <div className="cta-content">
                <h2>Pesan Kamar Sekarang</h2>
                <p>
                  Nikmati diskon khusus 15% untuk pemesanan online. Penawaran
                  terbatas!
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-5 text-md-end">
              <Link to="/reservation" className="btn btn-light btn-lg cta-btn">
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
