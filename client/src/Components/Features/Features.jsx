import React from "react";
import "./Features.css";
import { FaRobot, FaCode, FaChalkboardTeacher, FaComments } from "react-icons/fa";

const Features = () => {
  return (
    <section className="kk-features">
      <div className="kk-features-container">
        <h2>Everything in One Smart Learning Platform</h2>

        <div className="kk-grid">

          {/* AI Test Generation */}
          <div className="kk-card">
            <div className="kk-icon">
              <FaRobot />
            </div>
            <h3>AI Test Generation</h3>
            <p>
              Instantly generate smart coding tests with adaptive difficulty and topic-based customization.
            </p>
          </div>

          {/* Online Code with AI Support */}
          <div className="kk-card">
            <div className="kk-icon">
              <FaCode />
            </div>
            <h3>Online Code with AI Support</h3>
            <p>
              Write, compile, and debug code online with real-time AI assistance and smart suggestions.
            </p>
          </div>

          {/* Teacher Dashboard */}
          <div className="kk-card">
            <div className="kk-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Teacher Dashboard</h3>
            <p>
              Monitor student progress, create assignments, and analyze performance with detailed insights.
            </p>
          </div>

          {/* Discussion Forum */}
          <div className="kk-card">
            <div className="kk-icon">
              <FaComments />
            </div>
            <h3>Discussion Forum</h3>
            <p>
              Collaborate, ask questions, share solutions, and engage in topic-based discussions with peers.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;