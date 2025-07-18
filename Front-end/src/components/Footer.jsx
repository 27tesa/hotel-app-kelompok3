function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4 align-items-center">
          <div className="col-md-4 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2 gap-2">
              <img src="/logo.png" alt="Hotel Cendana Logo" style={{height:36, width:36, objectFit:'contain'}} />
              <h3 className="fw-bold mb-0">Hotel Cendana</h3>
            </div>
            <p className="small text-muted mb-0">Pengalaman menginap yang nyaman dan berkesan</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-2 text-center text-md-start">Tautan</h5>
            <ul className="list-unstyled d-flex flex-wrap justify-content-center justify-content-md-start gap-3 mb-0">
              <li><a href="/" className="link-light text-decoration-none">Beranda</a></li>
              <li><a href="/about" className="link-light text-decoration-none">Tentang</a></li>
              <li><a href="/rooms" className="link-light text-decoration-none">Kamar</a></li>
              <li><a href="/contact" className="link-light text-decoration-none">Kontak</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-2 text-center text-md-start">Hubungi</h5>
            <address className="mb-2 small text-center text-md-start">
              Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153<br />
              Jawa Barat, Indonesia<br />
              Email: <a href="mailto:info@hotelcendana.com" className="link-light text-decoration-none">info@hotelcendana.com</a><br />
              Telp: <a href="tel:+62211234567" className="link-light text-decoration-none">+62 21 123 4567</a>
            </address>
            <div className="d-flex gap-2 justify-content-center justify-content-md-start">
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <hr className="border-secondary my-4" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-2 mb-md-0 small">&copy; {currentYear} Hotel Cendana. Hak Cipta Dilindungi.</p>
          <div className="d-flex gap-3">
            <a href="#" className="link-light text-decoration-none small">Kebijakan Privasi</a>
            <a href="#" className="link-light text-decoration-none small">Syarat &amp; Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;