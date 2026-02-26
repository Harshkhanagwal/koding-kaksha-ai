import React from "react";
import "./Cta.css";

const CTA = () => {
  return (
    <section className="kk-cta">
      <div className="kk-cta-container">
        <h2>Start Your AI-Powered Learning Journey Today</h2>
        <p>
          Join thousands of students and teachers transforming coding education.
        </p>
        <a href="/login">
        <button>Get Started Free</button>
        </a>
      </div>
    </section>
  );
};

export default CTA;