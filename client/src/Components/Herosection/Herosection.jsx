import React from "react";
import "./Herosection.css";

const Hero = () => {
  return (
    <section className="kk-hero">
      <div className="container">
        <div className="kk-hero-content">
          <h1>
            AI-Powered Coding Education Platform
          </h1>

          <p>
            Students learn coding. Teachers create tests.
            AI generates and evaluates everything automatically.
          </p>

          <div className="kk-hero-buttons">
            <a href="/login">
            <button className="kk-primary">
              Login
            </button>
            </a>
            <a href="https://github.com/Harshkhanagwal/koding-kaksha-ai">
            <button className="kk-secondary">
              Github
            </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;