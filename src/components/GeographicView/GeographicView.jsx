import React, { useState } from "react";
import "./GeographicView.css";

const GeographicView = ({ geographicZones, avgMinSalary, avgMaxSalary }) => {
  const [hoveredZone, setHoveredZone] = useState(null);

  // Update salary ranges in zones
  const updatedZones = { ...geographicZones };
  Object.keys(updatedZones).forEach((zone) => {
    updatedZones[zone].salaryRange = `$${Math.round(
      avgMinSalary * updatedZones[zone].avgSalaryPremium
    ).toLocaleString()} - $${Math.round(
      avgMaxSalary * updatedZones[zone].avgSalaryPremium
    ).toLocaleString()}`;
  });

  const zoneStatistics = {
    "Zone A": {
      count: 8,
      avgMinSalary: Math.round(avgMinSalary * 1.3),
      avgMaxSalary: Math.round(avgMaxSalary * 1.3),
    },
    "Zone B": {
      count: 15,
      avgMinSalary: Math.round(avgMinSalary * 1.2),
      avgMaxSalary: Math.round(avgMaxSalary * 1.2),
    },
    "Zone C": {
      count: 7,
      avgMinSalary: Math.round(avgMinSalary * 1.0),
      avgMaxSalary: Math.round(avgMaxSalary * 1.0),
    },
  };

  // Simplified US states data for the map
  const usStates = [
    { id: "CA", zone: "A/B", fill: "#dc2626", name: "California" },
    { id: "WA", zone: "B", fill: "#93c5fd", name: "Washington" },
    { id: "OR", zone: "B", fill: "#93c5fd", name: "Oregon" },
    { id: "NY", zone: "B", fill: "#93c5fd", name: "New York" },
    { id: "MA", zone: "B", fill: "#93c5fd", name: "Massachusetts" },
    // Add more states as needed
  ];

  return (
    <div className="geographic-view">
      <div className="geographic-container">
        <h2>🗺️ Geographic Pay Zones</h2>

        <div className="zone-intro">
          <p>
            Tech companies adjust salaries based on geographic location to
            account for cost of living differences. Understanding these zones
            helps you evaluate whether a salary offer is competitive for a
            specific location.
          </p>
        </div>

        {/* Zone Legend */}
        <div className="zone-legend">
          {Object.entries(updatedZones).map(([zone, data]) => (
            <div
              key={zone}
              className={`zone-card ${hoveredZone === zone ? "hovered" : ""}`}
              style={{
                backgroundColor: data.bgColor,
                border: `2px solid ${data.color}`,
              }}
              onMouseEnter={() => setHoveredZone(zone)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <div className="zone-header">
                <div
                  className="zone-color"
                  style={{ backgroundColor: data.color }}
                ></div>
                <h3 style={{ color: data.color }}>{zone}</h3>
              </div>
              <p className="zone-description">{data.description}</p>
              <p className="zone-adjustment">
                <strong>Salary Adjustment:</strong> {data.salaryAdjustment}
              </p>
              <p className="zone-range">
                <strong>Estimated Salary Range:</strong> {data.salaryRange}
              </p>
              <p className="zone-cities">
                <strong>Key Areas:</strong> {data.cities.slice(0, 3).join(", ")}
                {data.cities.length > 3 && "..."}
              </p>
            </div>
          ))}
        </div>

        {/* US Map Visualization */}
        <div className="map-section">
          <h3>US Geographic Pay Zone Map</h3>
          <div className="map-container">
            <svg className="us-map" viewBox="0 0 400 250">
              {/* Simplified US map - in practice you'd want a proper SVG map */}
              <rect width="400" height="250" fill="#f1f5f9" rx="8" />

              {/* West Coast */}
              <path
                d="M50,50 L100,50 L100,100 L50,100 Z"
                fill="#93c5fd"
                stroke="#fff"
              />
              <text x="75" y="75" fill="#2563eb" fontSize="10">
                Zone B
              </text>

              {/* California */}
              <path
                d="M50,100 L150,100 L150,200 L50,200 Z"
                fill="#dc2626"
                stroke="#fff"
              />
              <text x="100" y="150" fill="#fff" fontSize="10">
                Zone A
              </text>

              {/* Rest of US */}
              <path
                d="M150,50 L350,50 L350,200 L150,200 Z"
                fill="#86efac"
                stroke="#fff"
              />
              <text x="250" y="125" fill="#16a34a" fontSize="10">
                Zone C
              </text>

              {/* Labels */}
              <text
                x="200"
                y="20"
                fontSize="14"
                fontWeight="bold"
                fill="#374151"
                textAnchor="middle"
              >
                Continental United States - Pay Zones
              </text>
            </svg>

            <div className="map-legend">
              <div className="legend-title">Map Legend</div>
              <div className="legend-items">
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: "#dc2626" }}
                  ></div>
                  <span>Zone A (SF Bay Area)</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: "#93c5fd" }}
                  ></div>
                  <span>Zone B States</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: "#86efac" }}
                  ></div>
                  <span>Zone C States</span>
                </div>
              </div>
            </div>
          </div>

          <div className="map-note">
            💡 The map shows the three geographic pay zones. Zone A (San
            Francisco Bay Area) commands the highest salaries, followed by Zone
            B (major metropolitan areas), with Zone C representing all other
            areas at market rates.
          </div>
        </div>

        {/* Detailed Zone Information */}
        <div className="zone-details">
          {Object.entries(updatedZones).map(([zone, data]) => (
            <div
              key={zone}
              className="zone-detail-card"
              style={{ backgroundColor: data.bgColor }}
            >
              <h4 style={{ color: data.color }}>
                <div
                  className="zone-detail-dot"
                  style={{ backgroundColor: data.color }}
                ></div>
                {zone}: {data.description}
              </h4>

              <div className="zone-detail-section">
                <div className="detail-label">Salary Adjustment</div>
                <div className="detail-value" style={{ color: data.color }}>
                  {data.salaryAdjustment}
                </div>
                <div className="detail-subtitle">
                  Estimated: {data.salaryRange}
                </div>
              </div>

              <div className="zone-detail-section">
                <div className="detail-label">Key Cities</div>
                <div className="detail-list">
                  {data.cities.map((city, index) => (
                    <div key={index}>• {city}</div>
                  ))}
                </div>
              </div>

              <div className="zone-detail-section">
                <div className="detail-label">Typical Employers</div>
                <div className="employer-tags">
                  {data.keyEmployers.slice(0, 3).map((employer, index) => (
                    <span
                      key={index}
                      className="employer-tag"
                      style={{
                        backgroundColor: `${data.color}20`,
                        borderColor: `${data.color}40`,
                        color: data.color,
                      }}
                    >
                      {employer}
                    </span>
                  ))}
                  {data.keyEmployers.length > 3 && (
                    <span
                      className="more-employers"
                      style={{ color: data.color }}
                    >
                      +{data.keyEmployers.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Salary Comparison Table */}
        <div className="zone-comparison">
          <div className="comparison-header">
            <h4>Salary Comparison by Geographic Zone</h4>
            <p>
              Based on market average of ${avgMinSalary.toLocaleString()} - $
              {avgMaxSalary.toLocaleString()}
            </p>
          </div>

          <table className="comparison-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Description</th>
                <th className="text-right">Estimated Min Salary</th>
                <th className="text-right">Estimated Max Salary</th>
                <th className="text-center">Adjustment</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(updatedZones).map(([zone, data]) => (
                <tr
                  key={zone}
                  className={hoveredZone === zone ? "hovered-row" : ""}
                  onMouseEnter={() => setHoveredZone(zone)}
                  onMouseLeave={() => setHoveredZone(null)}
                >
                  <td
                    style={{
                      color: data.color,
                      borderLeft: `4px solid ${data.color}`,
                    }}
                  >
                    {zone}
                  </td>
                  <td>{data.description}</td>
                  <td className="text-right">
                    ${zoneStatistics[zone].avgMinSalary.toLocaleString()}
                  </td>
                  <td className="text-right">
                    ${zoneStatistics[zone].avgMaxSalary.toLocaleString()}
                  </td>
                  <td className="text-center">
                    <span
                      className="adjustment-badge"
                      style={{
                        backgroundColor: data.bgColor,
                        color: data.color,
                      }}
                    >
                      {data.salaryAdjustment}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Insights */}
        <div className="geographic-insights">
          <h4>💡 Key Geographic Insights</h4>
          <div className="insights-list">
            <p>
              <strong>Zone A (San Francisco Bay Area):</strong> Commands the
              highest salaries due to extreme cost of living and concentration
              of tech giants. Expect 30%+ premium over national averages.
            </p>
            <p>
              <strong>Zone B (Major Metro Areas):</strong> High-cost cities with
              strong tech presence. Salaries typically 15-25% above national
              averages to offset living costs.
            </p>
            <p>
              <strong>Zone C (All Other Areas):</strong> Market-rate salaries
              with lower cost of living. Remote positions often adjust based on
              employee location rather than company HQ.
            </p>
            <p className="insight-note">
              Note: Many companies now offer "location-based pay" where salary
              is adjusted based on where you live, not where the company is
              headquartered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicView;
