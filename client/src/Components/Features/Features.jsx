import React from "react";
import "./Features.css";
import { FaRobot, FaCheckCircle, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";

const Features = () => {
  return (
    <section className="kk-features">
      <div className="kk-features-container">
        <h2>Everything in One Smart Platform</h2>

        <div className="kk-grid">

          <div className="kk-card">
            <div className="kk-icon">
              <FaRobot />
            </div>
            <h3>AI Test Generation</h3>
            <p>
              Generate intelligent coding tests instantly with smart difficulty scaling.
            </p>
          </div>

          <div className="kk-card">
            <div className="kk-icon">
              <FaCheckCircle />
            </div>
            <h3>Automatic AI Evaluation</h3>
            <p>
              AI checks logic, efficiency, edge cases and correctness in real-time.
            </p>
          </div>

          <div className="kk-card">
            <div className="kk-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Teacher Dashboard</h3>
            <p>
              Track student progress, create assessments and view performance insights.
            </p>
          </div>

          <div className="kk-card">
            <div className="kk-icon">
              <FaUserShield />
            </div>
            <h3>Admin Control</h3>
            <p>
              Manage analytics, user roles, permissions and platform settings easily.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;