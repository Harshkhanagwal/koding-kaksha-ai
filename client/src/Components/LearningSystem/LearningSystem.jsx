// LearningSystem.js
import React from "react";
import "./LearningSystem.css";
import { FaUserGraduate, FaChalkboardTeacher, FaRobot } from "react-icons/fa";

const LearningSystem = () => {
  return (
    <section className="kk-section kk-learning">
      <div className="kk-container">
        <h2 className="kk-section-title">Interactive Learning Ecosystem</h2>

        <div className="kk-feature-grid">

          <div className="kk-feature-card">
            <div className="kk-feature-icon">
              <FaUserGraduate />
            </div>
            <h3>Student Dashboard</h3>
            <p>
              Students can practice coding problems, get instant AI feedback,
              track progress, and improve through real-time insights.
            </p>
          </div>

          <div className="kk-feature-card">
            <div className="kk-feature-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Teacher Control Panel</h3>
            <p>
              Teachers can assign tasks, monitor student submissions,
              analyze performance reports, and personalize guidance.
            </p>
          </div>

          <div className="kk-feature-card">
            <div className="kk-feature-icon">
              <FaRobot />
            </div>
            <h3>AI Teaching Assistant</h3>
            <p>
              The built-in AI assistant explains concepts, fixes errors,
              suggests improvements, and helps students learn smarter.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LearningSystem;