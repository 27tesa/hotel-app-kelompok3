import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// Hapus import './Navbar.css';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top${scrolled ? " border-bottom" : ""}`}> 
      <div className="container">
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <img
            src="/logo.png"
            alt="Hotel Cendana Logo"
            style={{height:32, width:32, objectFit:'contain'}}
          />
          <span className="fw-bold">Hotel Cendana</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse${isOpen ? " show" : ""}`}> 
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink 
                to="/" 
                end 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsOpen(false)}
              >
                Tentang
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/rooms" 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsOpen(false)}
              >
                Kamar
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/contact" 
                className={({isActive}) => isActive ? "nav-link active" : "nav-link"}
                onClick={() => setIsOpen(false)}
              >
                Kontak
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <NavLink 
                to="/reservation" 
                className="btn btn-primary px-3 fw-bold"
                onClick={() => setIsOpen(false)}
              >
                Pesan Sekarang
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;