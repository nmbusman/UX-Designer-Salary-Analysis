import React from "react";
import "./Header.css";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <div className="header-container">
      <h1 className="header-title">
        Product/UX Designer Salary Analysis (5+ Years Experience)
      </h1>
      <p className="header-description">
        Market comparison of 30 positions with similar experience requirements.
        <br />
        Colored quadrants and dots show market positioning relative to averages.
      </p>

      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === "chart" ? "active" : ""}`}
          onClick={() => setActiveTab("chart")}
        >
          📊 Chart View
        </button>
        <button
          className={`tab-button ${activeTab === "table" ? "active" : ""}`}
          onClick={() => setActiveTab("table")}
        >
          📋 Table View
        </button>
        <button
          className={`tab-button ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => setActiveTab("summary")}
        >
          📈 Summary & Insights
        </button>
        <button
          className={`tab-button ${activeTab === "geographic" ? "active" : ""}`}
          onClick={() => setActiveTab("geographic")}
        >
          🗺️ Geographic Pay Zones
        </button>
        {/* Added Methodology tab */}
        <button
          className={`tab-button ${
            activeTab === "methodology" ? "active" : ""
          }`}
          onClick={() => setActiveTab("methodology")}
        >
          🧮 Methodology & Math
        </button>
      </div>
    </div>
  );
};

export default Header;
