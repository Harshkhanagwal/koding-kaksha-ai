import React from "react";
import "./HowItWorks.css";
import { FaUserGraduate, FaChalkboardTeacher, FaRobot } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="kk-how">
      <div className="kk-how-container">
        <h2>How Koding-Kaksha-AI Works</h2>

        <div className="kk-how-grid">
          <div className="kk-how-card">
            <div className="kk-how-icon">
              <FaUserGraduate />
            </div>
            <h3>Students Learn</h3>
            <p>
              Students practice coding problems with AI-generated challenges.
            </p>
          </div>

          <div className="kk-how-card">
            <div className="kk-how-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Teachers Create</h3>
            <p>
              Teachers generate smart tests and assignments in seconds.
            </p>
          </div>

          <div className="kk-how-card">
            <div className="kk-how-icon">
              <FaRobot />
            </div>
            <h3>AI Evaluates</h3>
            <p>
              AI checks submissions instantly and provides performance insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;