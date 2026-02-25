import React from "react";
import "./HowItWorks.css";
import { FaUserGraduate, FaChalkboardTeacher, FaRobot } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="kk-how">
      <div className="kk-how-container">
        <h2>How Koding-Kaksha-AI Works</h2>

        <div className="kk-how-grid">
          
          {/* Students */}
          <div className="kk-how-card">
            <div className="kk-how-icon">
              <FaUserGraduate />
            </div>
            <h3>Students Practice & Grow</h3>
            <p>
              Students solve real-world coding problems, practice regularly, and 
              strengthen their concepts to gain deeper knowledge and confidence.
            </p>
          </div>

          {/* Teachers */}
          <div className="kk-how-card">
            <div className="kk-how-icon">
              <FaChalkboardTeacher />
            </div>
            <h3>Teachers Create & Monitor</h3>
            <p>
              Teachers create smart tests and assignments while monitoring 
              student performance, progress, and learning patterns in real-time.
            </p>
          </div>

          {/* AI */}
          <div className="kk-how-card">
            <div className="kk-how-icon">
              <FaRobot />
            </div>
            <h3>AI Evaluates & Explains</h3>
            <p>
              AI analyzes code logic, efficiency, and correctness, assigns marks 
              automatically, and provides detailed explanations and feedback 
              to improve understanding.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;