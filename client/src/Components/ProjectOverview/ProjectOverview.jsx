// ProjectOverview.js
import React from "react";
import "./ProjectOverview.css";
import { FaCode, FaCheckCircle, FaBrain } from "react-icons/fa";

const ProjectOverview = () => {
  return (
    <section className="kk-section kk-overview">
      <div className="kk-container">
        <h2 className="kk-section-title">AI-Powered Learning Platform</h2>
        <p className="kk-section-subtitle">
          An intelligent platform combining AI, smart compilation, and interactive learning 
          to transform how students learn and teachers teach.
        </p>

        <div className="kk-feature-grid">

          <div className="kk-feature-card">
            <div className="kk-feature-icon">
              <FaCode />
            </div>
            <h3>Smart AI Compiler</h3>
            <p>
              Our integrated compiler executes code in real-time and evaluates
              multiple test cases using advanced AI APIs to ensure accurate output validation.
            </p>
          </div>

          <div className="kk-feature-card">
            <div className="kk-feature-icon">
              <FaCheckCircle />
            </div>
            <h3>Automatic Test Case Checking</h3>
            <p>
              The system automatically generates and validates multiple edge-case
              scenarios using AI-powered logic verification.
            </p>
          </div>

          <div className="kk-feature-card">
            <div className="kk-feature-icon">
              <FaBrain />
            </div>
            <h3>AI-Based Evaluation</h3>
            <p>
              Code submissions are analyzed not only for correctness
              but also for optimization, structure, and logic efficiency.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;