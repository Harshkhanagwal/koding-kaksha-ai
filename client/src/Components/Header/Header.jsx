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
        <h2 className="kk-logo">Koding-Kaksha-AI</h2>

        {/* Desktop Links */}
        <div className="kk-links">
          <div className="kk-dropdown">
            <a href="#">Students</a>
            <div className="kk-dropdown-menu">
              <a href="#">Learn Coding</a>
              <a href="#">Practice Tests</a>
              <a href="#">Performance</a>
            </div>
          </div>

          <div className="kk-dropdown">
            <a href="#">Teachers</a>
            <div className="kk-dropdown-menu">
              <a href="#">Create Test</a>
              <a href="#">AI Generator</a>
              <a href="#">Reports</a>
            </div>
          </div>

          <a href="#">Admin</a>
          <button className="kk-nav-btn">Get Started</button>
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
        <a href="#">Students</a>
        <a href="#">Teachers</a>
        <a href="#">Admin</a>
        <button className="kk-nav-btn mobile-btn">Get Started</button>
      </div>
    </header>
  );
};

export default Header;