import { useState, useEffect } from "react";

function About() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-light">
      {/* Hero Section */}
      <section className="bg-primary text-white text-center py-5 mb-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-2">Tentang Kami</h1>
          <p className="lead mb-3">Pengalaman Menginap yang Tak Terlupakan</p>
          <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#fff',borderRadius:'2px'}}></div>
        </div>
      </section>

      {/* Sejarah dan Visi Hotel */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <span className="text-primary fw-bold">SELAMAT DATANG DI</span>
            <h2 className="fw-bold">Hotel Cendana</h2>
            <p className="text-muted">
              Didirikan pada tahun 2010, Hotel Cendana telah menjadi simbol keanggunan dan keramahtamahan di jantung kota. Kami bangga dengan pelayanan premium dan pengalaman menginap yang tak tertandingi.
            </p>
            <p className="text-muted">
              Lokasi strategis kami memungkinkan para tamu untuk dengan mudah mengakses pusat bisnis, tempat wisata populer, dan transportasi umum, menjadikan Hotel Cendana pilihan ideal untuk wisatawan bisnis maupun liburan.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="/hero-bg.jpg"
              alt="Tampak Depan Hotel"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </section>

      {/* Nilai dan Prinsip */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold">NILAI KAMI</span>
            <h2 className="fw-bold">Komitmen Untuk Keunggulan</h2>
            <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#0d6efd',borderRadius:'2px'}}></div>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <i className="fas fa-award fa-2x text-primary mb-3"></i>
                  <h3 className="h5 fw-bold">Pelayanan Prima</h3>
                  <p className="text-muted small">Kami berkomitmen untuk memberikan pelayanan terbaik dengan standar tertinggi kepada setiap tamu yang datang.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <i className="fas fa-hands-helping fa-2x text-primary mb-3"></i>
                  <h3 className="h5 fw-bold">Keramahtamahan</h3>
                  <p className="text-muted small">Menyambut setiap tamu dengan kehangatan dan ketulusan, menciptakan atmosfer yang nyaman seperti di rumah sendiri.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 text-center border-0 shadow-sm">
                <div className="card-body">
                  <i className="fas fa-seedling fa-2x text-primary mb-3"></i>
                  <h3 className="h5 fw-bold">Keberlanjutan</h3>
                  <p className="text-muted small">Melakukan praktik ramah lingkungan dalam setiap aspek operasional untuk masa depan yang lebih baik.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi dan Misi */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-6">
              <div className="bg-white rounded shadow p-4 h-100">
                <h2 className="fw-bold mb-2">Visi</h2>
                <p className="text-muted mb-0">Menjadi destinasi penginapan terkemuka yang dikenal dengan keunggulan layanan, fasilitas modern, dan pengalaman menginap yang berkesan bagi setiap tamu.</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="bg-white rounded shadow p-4 h-100">
                <h2 className="fw-bold mb-2">Misi</h2>
                <ul className="mb-0 ps-3">
                  <li className="mb-1">Menyediakan layanan berkualitas tinggi dengan keramahan yang tulus</li>
                  <li className="mb-1">Menciptakan lingkungan yang nyaman dan mewah bagi setiap tamu</li>
                  <li className="mb-1">Berinvestasi dalam pengembangan staff untuk pelayanan terbaik</li>
                  <li className="mb-1">Menerapkan praktik bisnis yang berkelanjutan dan bertanggung jawab</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tim Kami */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary fw-bold">BERTEMU DENGAN</span>
            <h2 className="fw-bold">Tim Manajemen Kami</h2>
            <div className="mx-auto mb-2" style={{width:'60px',height:'4px',background:'#0d6efd',borderRadius:'2px'}}></div>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4 d-flex">
              <div className="card h-100 w-100 text-center border-0 shadow-sm">
                <img src="/manager1.jpeg" alt="General Manager" className={`card-img-top rounded-top ${isVisible ? "fade-in-img" : "opacity-0"}`} style={{height:320, objectFit:'cover', transition:'opacity 0.7s'}} />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h3 className="h5 fw-bold mb-1">Wawan Gunadi</h3>
                  <p className="text-primary mb-1">General Manager</p>
                  <p className="text-muted small mb-0">Memiliki pengalaman lebih dari 15 tahun dalam industri perhotelan.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card h-100 w-100 text-center border-0 shadow-sm">
                <img src="/manager2.jpeg" alt="Operations Manager" className={`card-img-top rounded-top ${isVisible ? "fade-in-img" : "opacity-0"}`} style={{height:320, objectFit:'cover', transition:'opacity 0.7s'}} />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h3 className="h5 fw-bold mb-1">Geta Octadela</h3>
                  <p className="text-primary mb-1">Operations Manager</p>
                  <p className="text-muted small mb-0">Ahli dalam manajemen operasional dan kepuasan pelanggan.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex">
              <div className="card h-100 w-100 text-center border-0 shadow-sm">
                <img src="/manager3.jpeg" alt="Chef Executive" className={`card-img-top rounded-top ${isVisible ? "fade-in-img" : "opacity-0"}`} style={{height:320, objectFit:'cover', transition:'opacity 0.7s'}} />
                <div className="card-body d-flex flex-column justify-content-end">
                  <h3 className="h5 fw-bold mb-1">Tesa Erlita</h3>
                  <p className="text-primary mb-1">Chef Executive</p>
                  <p className="text-muted small mb-0">Berpengalaman internasional dengan keahlian kuliner yang luar biasa.</p>
                </div>
              </div>
            </div>
          </div>
          <style>{`
            .fade-in-img {
              opacity: 1 !important;
              animation: fadeInImg 0.8s cubic-bezier(.77,0,.18,1) 0.1s both;
            }
            @keyframes fadeInImg {
              from { opacity: 0; transform: scale(0.97); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Jadikan Hotel Impian Sebagai Pilihan Anda</h2>
          <p className="lead mb-4">Rasakan pengalaman menginap yang tak terlupakan dalam balutan kemewahan dan kenyamanan.</p>
          <a href="/reservation" className="btn btn-light btn-lg fw-bold px-4">
            Pesan Sekarang
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;