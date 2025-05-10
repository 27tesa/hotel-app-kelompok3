import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/logo.png"
                alt="Hotel Cendana Logo"
                className="logo"
              />
              <h3 className="hotel-name">Hotel Cendana</h3>
            </div>
            <p className="tagline">Pengalaman menginap yang nyaman dan berkesan</p>
          </div>
          
          <div className="footer-links">
            <div className="links-column">
              <h4>Tautan</h4>
              <ul>
                <li><a href="/">Beranda</a></li>
                <li><a href="/about">Tentang</a></li>
                <li><a href="/rooms">Kamar</a></li>
                <li><a href="/contact">Kontak</a></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h4>Hubungi</h4>
              <address>
                <p>Jl.Pusri No.01, Kedawung, Kec. Kedawung, Kabupaten Cirebon, Jawa Barat 45153</p>
                <p>Jawa Barat, Indonesia</p>
                <p>Email: info@hotelcendana.com</p>
                <p>Telp: +62 21 123 4567</p>
              </address>
            </div>
            
            <div className="links-column">
              <h4>Ikuti Kami</h4>
              <div className="social-links">
                <a href="#" className="social-icon">
                  <div className="icon-container">
                    <i className="fab fa-instagram"></i>
                  </div>
                  <span>cendanatotal</span>
                </a>
                <a href="#" className="social-icon">
                  <div className="icon-container">
                    <i className="fab fa-facebook-f"></i>
                  </div>
                  <span>cendanahotel</span>
                </a>
                <a href="#" className="social-icon">
                  <div className="icon-container">
                    <i className="fab fa-twitter"></i>
                  </div>
                  <span>cendanahotel</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} Hotel Cendana. Hak Cipta Dilindungi.</p>
          </div>
          <div className="policy-links">
            <a href="#">Kebijakan Privasi</a>
            <a href="#">Syarat &amp; Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;