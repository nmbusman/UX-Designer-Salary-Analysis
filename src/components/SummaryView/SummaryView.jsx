import React from "react";
import "./SummaryView.css";

const SummaryView = ({
  enrichedData,
  yourJobData,
  quadrantCounts,
  avgMinSalary,
  avgMaxSalary,
  medianMinSalary,
  medianMaxSalary,
  minSalaries,
  maxSalaries,
}) => {
  const totalPositions = enrichedData.length;
  const yourPosition = yourJobData[0];
  const yourMinRank = yourPosition?.minRank || 0;
  const yourMaxRank = yourPosition?.maxRank || 0;
  const yourMinPercentile = (
    ((totalPositions - yourMinRank) / totalPositions) *
    100
  ).toFixed(1);
  const yourMaxPercentile = (
    ((totalPositions - yourMaxRank) / totalPositions) *
    100
  ).toFixed(1);

  const minSalarySpread = Math.max(...minSalaries) - Math.min(...minSalaries);
  const maxSalarySpread = Math.max(...maxSalaries) - Math.min(...maxSalaries);

  const positionsWithin15Percent = enrichedData.filter((job) => {
    if (job.type === "yourJob") return false;
    const minDiff =
      Math.abs(job.minSalary - yourPosition.minSalary) / yourPosition.minSalary;
    const maxDiff =
      Math.abs(job.maxSalary - yourPosition.maxSalary) / yourPosition.maxSalary;
    return minDiff <= 0.15 && maxDiff <= 0.15;
  }).length;

  return (
    <div className="summary-view">
      <div className="summary-container">
        <h2>📊 Key Market Insights</h2>

        {/* Market Overview */}
        <div className="insights-section">
          <h3>Market Overview</h3>
          <div className="stats-grid">
            <div className="stat-card" style={{ borderLeftColor: "#2563eb" }}>
              <div className="stat-label">Average Salary Range</div>
              <div className="stat-value">
                ${avgMinSalary.toLocaleString()} - $
                {avgMaxSalary.toLocaleString()}
              </div>
              <div className="stat-subtitle">
                Based on 30 comparable positions
              </div>
            </div>
            <div className="stat-card" style={{ borderLeftColor: "#10b981" }}>
              <div className="stat-label">Median Salary Range</div>
              <div className="stat-value">
                ${medianMinSalary.toLocaleString()} - $
                {medianMaxSalary.toLocaleString()}
              </div>
              <div className="stat-subtitle">Middle point of the market</div>
            </div>
            <div className="stat-card" style={{ borderLeftColor: "#8b5cf6" }}>
              <div className="stat-label">Market Distribution</div>
              <div className="stat-value">
                {quadrantCounts.aboveMarket} above •{" "}
                {quadrantCounts.nearAverage} near • {quadrantCounts.belowMarket}{" "}
                below
              </div>
              <div className="stat-subtitle">
                {quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax}{" "}
                mixed positions
              </div>
            </div>
          </div>
        </div>

        {/* Your Position Analysis */}
        <div className="insights-section">
          <h3>Your Position Analysis</h3>
          <div className="stats-grid">
            <div
              className="stat-card"
              style={{ borderLeftColor: "#16a34a", backgroundColor: "#f0fdf4" }}
            >
              <div className="stat-label" style={{ color: "#166534" }}>
                Your Salary Range
              </div>
              <div className="stat-value" style={{ color: "#166534" }}>
                ${yourPosition.minSalary.toLocaleString()} - $
                {yourPosition.maxSalary.toLocaleString()}
              </div>
              <div className="stat-subtitle" style={{ color: "#166534" }}>
                Range: ${yourPosition.range.toLocaleString()}
              </div>
            </div>
            <div
              className="stat-card"
              style={{ borderLeftColor: "#16a34a", backgroundColor: "#f0fdf4" }}
            >
              <div className="stat-label" style={{ color: "#166534" }}>
                Market Percentile
              </div>
              <div className="stat-value" style={{ color: "#166534" }}>
                Min: {yourMinPercentile}% • Max: {yourMaxPercentile}%
              </div>
              <div className="stat-subtitle" style={{ color: "#166534" }}>
                Ranks {yourMinRank}/{totalPositions} for min, {yourMaxRank}/
                {totalPositions} for max
              </div>
            </div>
            <div
              className="stat-card"
              style={{ borderLeftColor: "#16a34a", backgroundColor: "#f0fdf4" }}
            >
              <div className="stat-label" style={{ color: "#166534" }}>
                Similar Positions
              </div>
              <div className="stat-value" style={{ color: "#166534" }}>
                {positionsWithin15Percent} positions
              </div>
              <div className="stat-subtitle" style={{ color: "#166534" }}>
                Within 15% of your salary range
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="insights-section">
          <h3>Key Insights</h3>
          <div className="insights-grid">
            <div
              className="insight-card"
              style={{ borderLeftColor: "#ca8a04", backgroundColor: "#fef3c7" }}
            >
              <div className="insight-title" style={{ color: "#92400e" }}>
                Market Position
              </div>
              <div className="insight-text" style={{ color: "#92400e" }}>
                Your position is in the{" "}
                <strong>{yourPosition.marketPosition.label}</strong> category.
                {yourPosition.marketPosition.label === "Below Market" &&
                  " Consider negotiating for higher compensation."}
                {yourPosition.marketPosition.label === "Above Market" &&
                  " You're in a strong position relative to the market."}
                {yourPosition.marketPosition.label === "Near Average" &&
                  " Your compensation aligns with market standards."}
              </div>
            </div>
            <div
              className="insight-card"
              style={{ borderLeftColor: "#2563eb", backgroundColor: "#dbeafe" }}
            >
              <div className="insight-title" style={{ color: "#1e40af" }}>
                Salary Spread
              </div>
              <div className="insight-text" style={{ color: "#1e40af" }}>
                The market shows wide variation: minimum salaries range by $
                {minSalarySpread.toLocaleString()}, and maximum salaries range
                by ${maxSalarySpread.toLocaleString()}. This indicates
                significant negotiation room at many companies.
              </div>
            </div>
            <div
              className="insight-card"
              style={{ borderLeftColor: "#8b5cf6", backgroundColor: "#f3e8ff" }}
            >
              <div className="insight-title" style={{ color: "#6b21a8" }}>
                Competitive Analysis
              </div>
              <div className="insight-text" style={{ color: "#6b21a8" }}>
                {quadrantCounts.aboveMarket} positions offer both higher minimum
                and maximum salaries.
                {quadrantCounts.nearAverage > 0 &&
                  ` ${quadrantCounts.nearAverage} positions are very close to market averages.`}
                Your position is competitive with {positionsWithin15Percent}{" "}
                similar opportunities.
              </div>
            </div>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="insights-section">
          <h3>Actionable Recommendations</h3>
          <div className="recommendations">
            <ul>
              <li>
                <strong>Negotiation Strategy:</strong> Your minimum salary is{" "}
                {yourPosition.minStatus.text.toLowerCase()} market average.
                {yourPosition.minStatus.text.includes("Below") &&
                  ` Consider targeting the average minimum of $${avgMinSalary.toLocaleString()} in negotiations.`}
                {yourPosition.minStatus.text.includes("Above") &&
                  " You have strong leverage for maintaining or improving your current compensation."}
              </li>
              <li>
                <strong>Target Companies:</strong> Focus on the{" "}
                {quadrantCounts.aboveMarket} companies in the "Above Market"
                quadrant for maximum earning potential. These companies offer
                both higher minimum and maximum salaries.
              </li>
              <li>
                <strong>Salary Expectations:</strong> Based on market data, a
                reasonable target range is $
                {(avgMinSalary * 0.9).toLocaleString()} - $
                {(avgMaxSalary * 1.1).toLocaleString()}
                (10% below to 10% above market averages).
              </li>
              <li>
                <strong>Growth Potential:</strong> The maximum salary at top
                companies exceeds ${Math.max(...maxSalaries).toLocaleString()}.
                With strong performance, there's significant room for salary
                growth beyond initial offers.
              </li>
            </ul>
          </div>
        </div>

        {/* Market Distribution */}
        <div className="insights-section">
          <h3>Market Distribution</h3>
          <div className="distribution-container">
            <div className="distribution-bars">
              {[
                {
                  label: "Above Market",
                  count: quadrantCounts.aboveMarket,
                  color: "#2563eb",
                },
                {
                  label: "Below Market",
                  count: quadrantCounts.belowMarket,
                  color: "#dc2626",
                },
                {
                  label: "Mixed Market",
                  count:
                    quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax,
                  color: "#ca8a04",
                },
                {
                  label: "Near Average",
                  count: quadrantCounts.nearAverage,
                  color: "#8b5cf6",
                },
              ].map((item) => (
                <div key={item.label} className="distribution-item">
                  <div className="distribution-label">
                    <div
                      className="distribution-dot"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span>{item.label}</span>
                    <span
                      className="distribution-count"
                      style={{ color: item.color }}
                    >
                      {item.count} positions
                    </span>
                  </div>
                  <div className="distribution-bar">
                    <div
                      className="distribution-fill"
                      style={{
                        width: `${(item.count / enrichedData.length) * 100}%`,
                        backgroundColor: item.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quick-stats">
              <div className="stats-title">Quick Stats</div>
              <div className="stats-list">
                <div className="stat-row">
                  <span>Total Positions Analyzed</span>
                  <span>{enrichedData.length}</span>
                </div>
                <div className="stat-row">
                  <span>Average Salary Range</span>
                  <span>
                    ${avgMinSalary.toLocaleString()} - $
                    {avgMaxSalary.toLocaleString()}
                  </span>
                </div>
                <div className="stat-row">
                  <span>Your Position Percentile</span>
                  <span style={{ color: "#16a34a" }}>
                    Min: {yourMinPercentile}% • Max: {yourMaxPercentile}%
                  </span>
                </div>
                <div className="stat-row">
                  <span>Positions Near Your Range</span>
                  <span style={{ color: "#16a34a" }}>
                    {positionsWithin15Percent}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
