import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`kk-header ${scrolled ? "scrolled" : ""}`}>
      <div className="kk-nav">
        
        {/* Logo Image */}
        <div className="kk-logo-wrapper">
          <img
            src="/Images/Logo-white-DwwczthU.png"
            alt="Koding Kaksha AI"
            className="kk-logo-img"
          />
        </div>

        {/* Desktop Links */}
        <div className="kk-links">
          <div className="kk-dropdown">
            <a href="/">Home</a>
           
          </div>

          <div className="kk-dropdown">
            <a href="#">About</a>
            
          </div>

          <a href="#">Features</a>

          <a href="/login" className="kk-btn-link">
            <button className="kk-nav-btn">Login</button>
          </a>
        </div>

        {/* Hamburger */}
        <div
          className={`kk-hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`kk-mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="/">Home</a>
        <a href="#">About</a>
        <a href="#">Features</a>
        <a href="/login">
          <button className="kk-nav-btn mobile-btn">Login</button>
        </a>
      </div>
    </header>
  );
};

export default Header;