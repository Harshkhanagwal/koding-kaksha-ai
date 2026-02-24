// Footer.jsx
import React from "react";
import "./Footer.css";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="kk-footer">
      <div className="kk-footer-container">

        <div className="kk-footer-top">

          {/* Brand */}
          <div className="kk-footer-brand">
            <h2>Koding-Kaksha-AI</h2>
            <p>
              AI-powered coding education platform helping students,
              teachers, and institutions grow smarter with automation.
            </p>
          </div>

          {/* Links */}
          <div className="kk-footer-links">
            <h4>Platform</h4>
            <a href="#">Students</a>
            <a href="#">Teachers</a>
            <a href="#">Admin</a>
          </div>

          <div className="kk-footer-links">
            <h4>Resources</h4>
            <a href="#">Documentation</a>
            <a href="#">Support</a>
            <a href="#">Privacy Policy</a>
          </div>

          {/* Social */}
          <div className="kk-footer-social">
            <h4>Connect</h4>
            <div className="kk-social-icons">
              <a href="#"><FaGithub /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaGlobe /></a>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="kk-footer-bottom">
          <p>
            © {new Date().getFullYear()} Koding-Kaksha-AI. All rights reserved.
          </p>

          <p className="kk-created">
            Created by{" "}
            <a
              href="https://harshkhanagwal.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Harsh
            </a>{" "}
            &{" "}
            <a
              href="https://priyanshukashyap.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Priyanshu
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;