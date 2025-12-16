import React from "react";
import "./TableView.css";

const TableView = ({
  enrichedData,
  quadrantCounts,
  groupedData,
  sortBy,
  setSortBy,
  avgMinSalary,
  avgMaxSalary,
  medianMinSalary,
  medianMaxSalary,
}) => {
  const marketPositionSummary = {
    "Above Market": quadrantCounts.aboveMarket,
    "Below Market": quadrantCounts.belowMarket,
    "Mixed Market": quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax,
    "Near Average": quadrantCounts.nearAverage,
    "Your Position": 1,
  };

  const groupOrder = [
    "Your Position",
    "Above Market",
    "Near Average",
    "Mixed Market",
    "Below Market",
  ];

  return (
    <div className="table-view">
      {/* Market Position Summary */}
      <div className="table-summary">
        <div className="summary-header">
          <h3>Market Position Summary</h3>
          <div className="position-tags">
            {Object.entries(marketPositionSummary).map(([position, count]) => {
              const positionData =
                position === "Your Position"
                  ? { color: "#28a745", bgColor: "#f0fdf4" }
                  : position === "Mixed Market"
                  ? { color: "#ca8a04", bgColor: "#fef3c7" }
                  : position === "Above Market"
                  ? { color: "#2563eb", bgColor: "#dbeafe" }
                  : position === "Below Market"
                  ? { color: "#dc2626", bgColor: "#fee2e2" }
                  : { color: "#8b5cf6", bgColor: "#f3e8ff" };

              return (
                <div
                  key={position}
                  className="position-tag"
                  style={{
                    backgroundColor: positionData.bgColor,
                    borderColor: `${positionData.color}40`,
                  }}
                >
                  <span style={{ color: positionData.color }}>
                    {position}: <strong>{count}</strong>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sort-controls">
          <label>Sort within groups by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="minRank">Minimum Salary Rank</option>
            <option value="maxRank">Maximum Salary Rank</option>
            <option value="range">Salary Range (Largest First)</option>
            <option value="marketPosition">Market Position</option>
          </select>
        </div>
      </div>

      {/* Market Reference Points */}
      <div className="market-reference">
        <p>📊 Market Reference Points:</p>
        <div className="reference-points">
          <div className="reference-item">
            <div
              className="reference-color"
              style={{ backgroundColor: "#8b5cf6" }}
            ></div>
            <span>
              Average Min: <strong>${avgMinSalary.toLocaleString()}</strong>
            </span>
          </div>
          <div className="reference-item">
            <div
              className="reference-color"
              style={{ backgroundColor: "#8b5cf6" }}
            ></div>
            <span>
              Average Max: <strong>${avgMaxSalary.toLocaleString()}</strong>
            </span>
          </div>
          <div className="reference-item">
            <div
              className="reference-color"
              style={{ backgroundColor: "#10b981" }}
            ></div>
            <span>
              Median Min: <strong>${medianMinSalary.toLocaleString()}</strong>
            </span>
          </div>
          <div className="reference-item">
            <div
              className="reference-color"
              style={{ backgroundColor: "#10b981" }}
            ></div>
            <span>
              Median Max: <strong>${medianMaxSalary.toLocaleString()}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div className="data-tables">
        {groupOrder.map((groupName) => {
          const groupJobs = groupedData[groupName];
          if (groupJobs.length === 0) return null;

          const groupColor =
            groupName === "Your Position"
              ? "#28a745"
              : groupName === "Above Market"
              ? "#2563eb"
              : groupName === "Below Market"
              ? "#dc2626"
              : groupName === "Mixed Market"
              ? "#ca8a04"
              : "#8b5cf6";

          const groupBgColor =
            groupName === "Your Position"
              ? "#f0fdf4"
              : groupName === "Above Market"
              ? "#dbeafe"
              : groupName === "Below Market"
              ? "#fee2e2"
              : groupName === "Mixed Market"
              ? "#fef3c7"
              : "#f3e8ff";

          return (
            <div key={groupName} className="group-table">
              <div
                className="group-header"
                style={{
                  backgroundColor: groupBgColor,
                  borderLeft: `4px solid ${groupColor}`,
                }}
              >
                <div className="group-title">
                  <span style={{ color: groupColor }}>{groupName}</span>
                  <span
                    className="group-count"
                    style={{ backgroundColor: groupColor }}
                  >
                    {groupJobs.length} position
                    {groupJobs.length !== 1 ? "s" : ""}
                  </span>
                </div>
                {groupName !== "Your Position" && (
                  <div className="group-hint">
                    Click job titles in chart to view postings
                  </div>
                )}
              </div>

              <table className="jobs-table">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Job Title</th>
                    <th className="text-right">Min Salary</th>
                    <th className="text-right">Max Salary</th>
                    <th className="text-center">Market Position</th>
                  </tr>
                </thead>
                <tbody>
                  {groupJobs.map((job, idx) => (
                    <tr
                      key={idx}
                      className={
                        job.type === "yourJob"
                          ? "your-job-row"
                          : idx % 2 === 0
                          ? "even-row"
                          : "odd-row"
                      }
                    >
                      <td>
                        {job.company}
                        {job.type === "yourJob" && (
                          <span className="star">★</span>
                        )}
                      </td>
                      <td>{job.title}</td>
                      <td className="text-right">
                        <div className="salary-cell">
                          <span className="salary-amount">
                            ${job.minSalary.toLocaleString()}
                          </span>
                          <div className="salary-status">
                            <span style={{ color: job.minStatus.color }}>
                              {job.minStatus.symbol}
                            </span>
                            <span style={{ color: job.minStatus.color }}>
                              {job.minStatus.text} ({job.minStatus.difference})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="salary-cell">
                          <span className="salary-amount">
                            ${job.maxSalary.toLocaleString()}
                          </span>
                          <div className="salary-status">
                            <span style={{ color: job.maxStatus.color }}>
                              {job.maxStatus.symbol}
                            </span>
                            <span style={{ color: job.maxStatus.color }}>
                              {job.maxStatus.text} ({job.maxStatus.difference})
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        className="market-position-cell"
                        style={{
                          color: job.marketPosition.color,
                          backgroundColor: job.marketPosition.bgColor,
                          borderLeft: `4px solid ${job.marketPosition.color}`,
                          borderRight: `4px solid ${job.marketPosition.color}`,
                        }}
                      >
                        {job.marketPosition.label}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="table-footer">
        <p>
          Showing {enrichedData.length} positions grouped by market position.
          Sort within groups using the dropdown above.
          <br />
          <span className="color-legend">
            <span style={{ color: "#2563eb" }}>Above Market</span> •
            <span style={{ color: "#dc2626" }}> Below Market</span> •
            <span style={{ color: "#ca8a04" }}> Mixed Market</span> •
            <span style={{ color: "#8b5cf6" }}> Near Average</span> •
            <span style={{ color: "#16a34a" }}> Your Position</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default TableView;
