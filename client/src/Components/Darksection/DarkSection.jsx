import "./DarkSection.css";

function DarkSection() {
  return (
    <section className="dark-section">
      <div className="dark-overlay"></div>

      <div className="dark-wrapper">
        {/* LEFT CONTENT */}
        <div className="dark-content">
          <h2>
            Secure communication <br />
            built for the future.
          </h2>

          <p>
            Experience next-generation encrypted messaging with a
            clean, privacy-focused interface designed for modern teams.
          </p>
        </div>

        {/* RIGHT BUTTON COLUMN */}
        <div className="dark-actions">
          <button className="primary-btn">
            Get Started
          </button>

          <button className="secondary-btn">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default DarkSection;