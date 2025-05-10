import "../style/About.css";
import { useState, useEffect } from "react";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section dengan Parallax Effect */}
      <section className="about-hero">
        <div className={`hero-content ${isVisible ? "fade-in" : ""}`}>
          <h1>Tentang Kami</h1>
          <p>Pengalaman Menginap yang Tak Terlupakan</p>
          <div className="hero-line"></div>
        </div>
      </section>

      {/* Sejarah dan Visi Hotel */}
      <section className="container section-spacing">
        <div className="row">
          <div className="col-md-6">
            <div className={`content-box ${isVisible ? "slide-in-left" : ""}`}>
              <span className="section-subtitle">SELAMAT DATANG DI</span>
              <h2 className="section-title">Hotel Cendana</h2>
              <p className="section-desc">
                Didirikan pada tahun 2010, Hotel Cendana telah menjadi simbol
                keanggunan dan keramahtamahan di jantung kota. Kami bangga
                dengan pelayanan premium dan pengalaman menginap yang tak
                tertandingi.
              </p>
              <p className="section-desc">
                Lokasi strategis kami memungkinkan para tamu untuk dengan mudah
                mengakses pusat bisnis, tempat wisata populer, dan transportasi
                umum, menjadikan Hotel Cendana pilihan ideal untuk wisatawan
                bisnis maupun liburan.
              </p>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className={`image-container ${isVisible ? "fade-in-delay" : ""}`}
            >
              <img
                src="/hero-bg.jpg"
                alt="Tampak Depan Hotel"
                className="img-fluid rounded-image shadow-effect"
              />
              <div className="image-accent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai dan Prinsip */}
      <section className="values-section">
        <div className="container section-spacing">
          <div className="text-center mb-5">
            <span className="section-subtitle">NILAI KAMI</span>
            <h2 className="section-title">Komitmen Untuk Keunggulan</h2>
            <div className="title-underline"></div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h3>Pelayanan Prima</h3>
                <p>
                  Kami berkomitmen untuk memberikan pelayanan terbaik dengan
                  standar tertinggi kepada setiap tamu yang datang.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h3>Keramahtamahan</h3>
                <p>
                  Menyambut setiap tamu dengan kehangatan dan ketulusan,
                  menciptakan atmosfer yang nyaman seperti di rumah sendiri.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="value-card">
                <div className="value-icon">
                  <i className="fas fa-seedling"></i>
                </div>
                <h3>Keberlanjutan</h3>
                <p>
                  Melakukan praktik ramah lingkungan dalam setiap aspek
                  operasional untuk masa depan yang lebih baik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi dan Misi */}
      <section className="vision-mission-section">
        <div className="container section-spacing">
          <div className="row">
            <div className="col-md-6">
              <div className="vision-box">
                <h2>Visi</h2>
                <p>
                  Menjadi destinasi penginapan terkemuka yang dikenal dengan
                  keunggulan layanan, fasilitas modern, dan pengalaman menginap
                  yang berkesan bagi setiap tamu.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mission-box">
                <h2>Misi</h2>
                <ul>
                  <li>
                    Menyediakan layanan berkualitas tinggi dengan keramahan yang
                    tulus
                  </li>
                  <li>
                    Menciptakan lingkungan yang nyaman dan mewah bagi setiap
                    tamu
                  </li>
                  <li>
                    Berinvestasi dalam pengembangan staff untuk pelayanan
                    terbaik
                  </li>
                  <li>
                    Menerapkan praktik bisnis yang berkelanjutan dan bertanggung
                    jawab
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Kami */}
      <section className="team-section">
        <div className="container section-spacing">
          <div className="text-center mb-5">
            <span className="section-subtitle">BERTEMU DENGAN</span>
            <h2 className="section-title">Tim Manajemen Kami</h2>
            <div className="title-underline"></div>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="team-member">
                <div className="member-image">
                  <img
                    src="/manager1.jpeg"
                    alt="General Manager"
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h3>Wawan Gunadi</h3>
                  <p className="position">General Manager</p>
                  <p className="member-desc">
                    Memiliki pengalaman lebih dari 15 tahun dalam industri
                    perhotelan.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="team-member">
                <div className="member-image">
                  <img
                    src="/manager2.jpeg"
                    alt="Operations Manager"
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h3>Geta Octadela</h3>
                  <p className="position">Operations Manager</p>
                  <p className="member-desc">
                    Ahli dalam manajemen operasional dan kepuasan pelanggan.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="team-member">
                <div className="member-image">
                  <img
                    src="/manager3.jpeg"
                    alt="Chef Executive"
                    className="img-fluid"
                  />
                </div>
                <div className="member-info">
                  <h3>Tesa Erlita</h3>
                  <p className="position">Chef Executive</p>
                  <p className="member-desc">
                    Berpengalaman internasional dengan keahlian kuliner yang
                    luar biasa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content text-center">
            <h2>Jadikan Hotel Impian Sebagai Pilihan Anda</h2>
            <p>
              Rasakan pengalaman menginap yang tak terlupakan dalam balutan
              kemewahan dan kenyamanan.
            </p>
            <a href="/reservation" className="btn-book">
                    Pesan Sekarang
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;