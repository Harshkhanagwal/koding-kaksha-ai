import React from "react";
import "./TrustSection.css";
import {
  FaEnvelope,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaWhatsapp
} from "react-icons/fa";

const TrustSection = () => {
  return (
    <section className="kk-creators">
      <div className="kk-creators-container">

        <h2 className="kk-creators-title">
          Meet The Creators
        </h2>

        <div className="kk-creators-grid">

          {/* ================= Harsh ================= */}
          <div className="kk-creator-card">
            <h3>Harsh</h3>

            <div className="kk-creator-info">
              <p>
                <FaEnvelope />
                <a href="mailto:Harshkhanagwall29@gmail.com">
                  Harshkhanagwall29@gmail.com
                </a>
              </p>

              <p>
                <FaPhone />
                <a href="tel:+919818937777">
                  +91 9818937777
                </a>
              </p>

              <p>
                <FaWhatsapp />
                <a
                  href="https://wa.me/919818937777"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-whatsapp-text"
                >
                  WhatsApp
                </a>
              </p>
            </div>

            <div className="kk-social-row">
              <a
                href="https://github.com/Harshkhanagwal"
                target="_blank"
                rel="noreferrer"
                className="kk-social-btn"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/harshkhanagwal/"
                target="_blank"
                rel="noreferrer"
                className="kk-social-btn"
              >
                <FaLinkedin />
              </a>
            </div>

            <a
              href="https://harshkhanagwal.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              <button className="kk-primary kk-portfolio-btn">
                View Portfolio
              </button>
            </a>
          </div>

          {/* ================= Priyanshu ================= */}
          <div className="kk-creator-card">
            <h3>Priyanshu</h3>

            <div className="kk-creator-info">
              <p>
                <FaEnvelope />
                <a href="mailto:priyanshukashyap844@gmail.com">
                  priyanshukashyap844@gmail.com
                </a>
              </p>

              <p>
                <FaPhone />
                <a href="tel:+918851021358">
                  +91 8851021358
                </a>
              </p>

              <p>
                <FaWhatsapp />
                <a
                  href="https://wa.me/918851021358"
                  target="_blank"
                  rel="noreferrer"
                  className="kk-whatsapp-text"
                >
                  WhatsApp
                </a>
              </p>
            </div>

            <div className="kk-social-row">
              <a
                href="https://github.com/priyanshu8851"
                target="_blank"
                rel="noreferrer"
                className="kk-social-btn"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/2004-priyanshu-kashyap/"
                target="_blank"
                rel="noreferrer"
                className="kk-social-btn"
              >
                <FaLinkedin />
              </a>
            </div>

            <a
              href="https://priyanshukashyap.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              <button className="kk-primary kk-portfolio-btn">
                View Portfolio
              </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrustSection;