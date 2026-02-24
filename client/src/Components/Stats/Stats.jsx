import React from "react";
import "./Stats.css";

const Stats = () => {
  return (
    <section className="kk-stats">
      <div className="kk-stats-container">
        <div className="kk-stat">
          <h2>10K+</h2>
          <p>Active Students</p>
        </div>

        <div className="kk-stat">
          <h2>500+</h2>
          <p>Teachers</p>
        </div>

        <div className="kk-stat">
          <h2>50K+</h2>
          <p>AI Evaluations</p>
        </div>

        <div className="kk-stat">
          <h2>99%</h2>
          <p>Accuracy Rate</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;