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
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5 mb-5">
        <div className="container">
          <h1 className="display-2 fw-bold mb-3" style={{letterSpacing: '.02em'}}>Hotel Cendana</h1>
          <p className="lead mb-4 fs-3">Pengalaman Menginap yang Tak Terlupakan</p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
            <Link to="/reservation" className="btn btn-light btn-lg fw-bold px-4 py-2">
              Pesan Sekarang
            </Link>
            <a href="#about" className="btn btn-outline-light btn-lg px-4 py-2 scroll-link">
              Tentang Kami
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Selamat Datang di Hotel Cendana</h2>
            <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#0d6efd',borderRadius:'2px'}}></div>
            <p className="text-muted">Nikmati pengalaman menginap yang mewah dengan pelayanan terbaik</p>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-5 mb-4 mb-lg-0 d-flex justify-content-center">
              <img
                src="/about-hotel.jpg"
                alt="Hotel Impian"
                className={`img-fluid rounded shadow ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}
                style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'cover', transition: 'opacity 0.6s, transform 0.6s', opacity: isLoaded ? 1 : 0 }}
              />
            </div>
            <div className="col-lg-7">
              <h3 className="fw-bold mb-3">Kenyamanan & Kemewahan</h3>
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
              <div className="row g-2 mt-3 text-center text-lg-start">
                <div className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-wifi fs-2 text-primary mb-1"></i>
                    <span className="small">Wi-Fi Gratis</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-car-front fs-2 text-primary mb-1"></i>
                    <span className="small">Parkir Gratis</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-water fs-2 text-primary mb-1"></i>
                    <span className="small">Kolam Renang</span>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="d-flex flex-column align-items-center">
                    <i className="bi bi-heart-pulse fs-2 text-primary mb-1"></i>
                    <span className="small">Pusat Kebugaran</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Animasi slide-in-left untuk gambar */}
        <style>{`
          .animate-slide-in-left {
            animation: slideInLeft 0.8s cubic-bezier(.77,0,.18,1) 0.1s both;
          }
          @keyframes slideInLeft {
            from {
              opacity: 0;
              transform: translateX(-60px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </section>

      {/* Layanan/Fitur Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Layanan Unggulan</h2>
            <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#0d6efd',borderRadius:'2px'}}></div>
            <p className="text-muted">Memberikan pengalaman menginap yang terbaik untuk Anda</p>
          </div>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="p-3">
                  <img src="/icon-kamar.png" alt="Kamar Nyaman" className="mb-2" style={{height:'48px'}} />
                  <h4 className="fw-bold">Kamar Mewah</h4>
                  <p className="small">Kamar dengan desain elegan dan fasilitas lengkap untuk kenyamanan Anda.</p>
                  <Link to="/rooms" className="btn btn-link p-0">Lihat Kamar</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="p-3">
                  <img src="/icon-restoran.png" alt="Restoran" className="mb-2" style={{height:'48px'}} />
                  <h4 className="fw-bold">Restoran Premium</h4>
                  <p className="small">Sajian kuliner lokal dan internasional terbaik dari koki profesional kami.</p>
                  <Link to="/dining" className="btn btn-link p-0">Menu Kami</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="p-3">
                  <img src="/icon-pelayanan.png" alt="Pelayanan" className="mb-2" style={{height:'48px'}} />
                  <h4 className="fw-bold">Pelayanan 24 Jam</h4>
                  <p className="small">Staff kami siap melayani Anda kapan saja, setiap hari.</p>
                  <Link to="/services" className="btn btn-link p-0">Detail Layanan</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="p-3">
                  <img src="/icon-spa.png" alt="Spa & Wellness" className="mb-2" style={{height:'48px'}} />
                  <h4 className="fw-bold">Spa & Wellness</h4>
                  <p className="small">Nikmati perawatan spa mewah untuk relaksasi pikiran dan tubuh.</p>
                  <Link to="/spa" className="btn btn-link p-0">Perawatan Spa</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Kamar Unggulan Kami</h2>
            <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#0d6efd',borderRadius:'2px'}}></div>
            <p className="text-muted">Pilihan kamar mewah untuk pengalaman menginap terbaik</p>
          </div>
          <div className="row g-4">
            {/* Ganti dengan struktur Bootstrap yang rapi */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img src="/superior-room.jpg" alt="Superior Room" className="card-img-top" style={{ height: 220, objectFit: "cover" }} />
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">Mulai dari</span>
                    <span className="fw-bold text-primary">Rp 850.000</span>
                  </div>
                  <span className="text-muted small mb-2">per malam</span>
                  <h5 className="fw-bold mb-1">Superior Room</h5>
                  <div className="mb-2 text-muted small">
                    King Size Bed &nbsp; 32m² &nbsp; City View
                  </div>
                  <p className="mb-3 small">Kamar mewah dengan tempat tidur king size dan pemandangan kota yang menakjubkan.</p>
                  <a href="#" className="btn btn-outline-primary btn-sm mt-auto align-self-start">Lihat Detail</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img src="/deluxe-room.jpg" alt="Deluxe Room" className="card-img-top" style={{ height: 220, objectFit: "cover" }} />
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">Mulai dari</span>
                    <span className="fw-bold text-primary">Rp 1.250.000</span>
                  </div>
                  <span className="text-muted small mb-2">per malam</span>
                  <h5 className="fw-bold mb-1">Deluxe Room</h5>
                  <div className="mb-2 text-muted small">
                    Queen Size Bed &nbsp; 28m² &nbsp; City View
                  </div>
                  <p className="mb-3 small">Kamar luas dengan pemandangan kota, tempat tidur queen, AC, Wi-Fi, dan TV.</p>
                  <a href="#" className="btn btn-outline-primary btn-sm mt-auto align-self-start">Lihat Detail</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <img src="/suite-room.jpg" alt="Suite Room" className="card-img-top" style={{ height: 220, objectFit: "cover" }} />
                <div className="card-body d-flex flex-column text-start">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="fw-bold">Mulai dari</span>
                    <span className="fw-bold text-primary">Rp 2.100.000</span>
                  </div>
                  <span className="text-muted small mb-2">per malam</span>
                  <h5 className="fw-bold mb-1">Suite Room</h5>
                  <div className="mb-2 text-muted small">
                    King Size Bed &nbsp; 45m² &nbsp; City View
                  </div>
                  <p className="mb-3 small">Nikmati kemewahan dengan ruang tamu pribadi dan layanan ekstra.</p>
                  <a href="#" className="btn btn-outline-primary btn-sm mt-auto align-self-start">Lihat Detail</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Jadikan Hotel Cendana Pilihan Anda</h2>
          <p className="lead mb-4">Rasakan pengalaman menginap yang tak terlupakan dalam balutan kemewahan dan kenyamanan.</p>
          <Link to="/reservation" className="btn btn-light btn-lg fw-bold px-4">
            Pesan Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
