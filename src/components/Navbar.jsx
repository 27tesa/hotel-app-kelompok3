import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

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
    <nav className={`navbar navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <div className="logo-container">
            <img
              src="/logo.png"
              alt="Hotel Cendana Logo"
              className="logo"
            />
            <span className="brand-text">Hotel Cendana</span>
          </div>
        </NavLink>
        
        <button
          className={`navbar-toggler ${isOpen ? "open" : ""}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="toggler-icon top-bar"></span>
          <span className="toggler-icon middle-bar"></span>
          <span className="toggler-icon bottom-bar"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav">
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
            <li className="nav-item book-now">
              <NavLink 
                to="/reservation" 
                className="btn-reservation"
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