import React from "react";
import "./TrustSection.css";

const TrustSection = () => {
  return (
    <section className="kk-trust">
      <div className="kk-trust-container">

        {/* Left Content */}
        <div className="kk-trust-content">
          <div className="kk-trust-badge">
            <span></span>
          </div>

          <h2>
            Thousands of Students & Teachers
            Trust Koding-Kaksha-AI
          </h2>

          <p>
            Secure. Intelligent. Automated.
            Experience next-generation AI-powered coding education.
          </p>

          <button className="kk-trust-btn">
            Start Learning Free
          </button>
        </div>

        {/* Right Image */}
        <div className="kk-trust-image">
          <img
            src="/koikhatarnaakImage.png"
            alt="Platform Dashboard"
          />
        </div>

      </div>
    </section>
  );
};

export default TrustSection;