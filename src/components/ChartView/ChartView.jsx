import React from "react";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import "./ChartView.css";

const ChartView = ({
  enrichedData,
  yourJobData,
  quadrantCounts,
  showDiagonalLine,
  showAverageLines,
  showMedianLines,
  setShowDiagonalLine,
  setShowAverageLines,
  setShowMedianLines,
  hoveredPoint,
  tooltipPosition,
  avgMinSalary,
  avgMaxSalary,
  medianMinSalary,
  medianMaxSalary,
  purpleZoneRadius,
  chartWidth,
  chartHeight,
  margin,
  svgRef,
  onMouseMove,
  onMouseLeave,
  onClick,
  setHoveredPoint,
  // NEW PROPS - Add these for functionality
  adjustedData, // This includes display positions for overlapping points
  onDotClick, // Handle dot click events
  dotLabels, // For displaying company abbreviations on dots
  xScale, // Scaling function for X axis
  yScale, // Scaling function for Y axis
}) => {
  // Calculate scaling functions if not provided as props
  const getXScale = (value) => {
    if (xScale) return xScale(value);

    const xMin = 80000;
    const xMax = 240000;
    return (
      margin.left +
      ((value - xMin) / (xMax - xMin)) *
        (chartWidth - margin.left - margin.right)
    );
  };

  const getYScale = (value) => {
    if (yScale) return yScale(value);

    const yMin = 80000;
    const yMax = 240000;
    return (
      chartHeight -
      margin.bottom -
      ((value - yMin) / (yMax - yMin)) *
        (chartHeight - margin.top - margin.bottom)
    );
  };

  // Use provided scaling functions or fall back to internal ones
  const currentXScale = getXScale;
  const currentYScale = getYScale;

  // Handle dot click
  const handleDotClick = (e, point) => {
    e.stopPropagation();
    if (onDotClick) {
      onDotClick(e, point);
    } else if (point.link && point.link !== "#") {
      // Fallback: open link directly if onDotClick not provided
      window.open(point.link, "_blank", "noopener,noreferrer");
    }
  };

  // Handle chart area click
  const handleChartClick = () => {
    if (onClick) {
      onClick();
    } else if (hoveredPoint && hoveredPoint.link && hoveredPoint.link !== "#") {
      // Fallback: open link for hovered point
      window.open(hoveredPoint.link, "_blank", "noopener,noreferrer");
    }
  };

  const xTicks = [
    80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000,
  ];
  const yTicks = [
    80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000,
  ];

  return (
    <div className="chart-view">
      {/* Controls and Legend */}
      <div className="chart-controls">
        <div className="legend-section">
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: "#2563eb" }}
            />
            <span>Above Market ({quadrantCounts.aboveMarket})</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: "#dc2626" }}
            />
            <span>Below Market ({quadrantCounts.belowMarket})</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: "#ca8a04" }}
            />
            <span>
              Mixed Market (
              {quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax})
            </span>
          </div>
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{ backgroundColor: "#8b5cf6" }}
            />
            <span>Near Average ({quadrantCounts.nearAverage})</span>
          </div>
          <div className="legend-item">
            <div
              className="legend-dot"
              style={{
                backgroundColor: "#28a745",
                width: "16px",
                height: "16px",
              }}
            />
            <span style={{ fontWeight: "bold" }}>Position Under Review</span>
          </div>
        </div>

        <div className="controls-section">
          <div className="control-group">
            <label className="control-label">
              <input
                type="checkbox"
                checked={showDiagonalLine}
                onChange={(e) => setShowDiagonalLine(e.target.checked)}
              />
              y = x Line
            </label>
          </div>
          <div className="control-group">
            <label className="control-label">
              <input
                type="checkbox"
                checked={showAverageLines}
                onChange={(e) => setShowAverageLines(e.target.checked)}
              />
              Average Lines
            </label>
            <label className="control-label">
              <input
                type="checkbox"
                checked={showMedianLines}
                onChange={(e) => setShowMedianLines(e.target.checked)}
              />
              Median Lines
            </label>
          </div>
        </div>
      </div>

      {/* Chart Hints */}
      <div className="chart-hints">
        💡 Hover over any point to see detailed salary information
        <br />
        <small>
          Click on any point to open the job posting for that position
        </small>
        <br />
        <small>
          <strong>Color intensity:</strong> Darker colors = farther from market
          average, Lighter colors = closer to average
        </small>
        {dotLabels && dotLabels["frontline"] === "F2" && (
          <>
            <br />
            <small>
              <strong>Dot labels:</strong> First two letters of company name (F2
              = Frontline, F1 = FloQast)
            </small>
          </>
        )}
      </div>

      {/* Main Chart */}
      <div
        className="chart-container"
        onClick={handleChartClick}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="chart-svg"
        >
          {/* Background Quadrants */}
          <g>
            <rect
              x={currentXScale(avgMinSalary)}
              y={margin.top}
              width={chartWidth - margin.right - currentXScale(avgMinSalary)}
              height={currentYScale(avgMaxSalary) - margin.top}
              fill="#dbeafe"
              fillOpacity="0.5"
            />
            <rect
              x={margin.left}
              y={currentYScale(avgMaxSalary)}
              width={currentXScale(avgMinSalary) - margin.left}
              height={chartHeight - margin.bottom - currentYScale(avgMaxSalary)}
              fill="#fee2e2"
              fillOpacity="0.5"
            />
            <rect
              x={margin.left}
              y={margin.top}
              width={currentXScale(avgMinSalary) - margin.left}
              height={currentYScale(avgMaxSalary) - margin.top}
              fill="#fef3c7"
              fillOpacity="0.5"
            />
            <rect
              x={currentXScale(avgMinSalary)}
              y={currentYScale(avgMaxSalary)}
              width={chartWidth - margin.right - currentXScale(avgMinSalary)}
              height={chartHeight - margin.bottom - currentYScale(avgMaxSalary)}
              fill="#fef3c7"
              fillOpacity="0.5"
            />
          </g>

          {/* Purple Zone */}
          <circle
            cx={currentXScale(avgMinSalary)}
            cy={currentYScale(avgMaxSalary)}
            r={
              currentXScale(avgMinSalary + purpleZoneRadius) -
              currentXScale(avgMinSalary)
            }
            fill="#8b5cf6"
            fillOpacity="0.1"
            stroke="#8b5cf6"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Grid Lines */}
          <g>
            {xTicks.map((tick) => (
              <line
                key={`xgrid-${tick}`}
                x1={currentXScale(tick)}
                y1={margin.top}
                x2={currentXScale(tick)}
                y2={chartHeight - margin.bottom}
                stroke="#e0e0e0"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}
            {yTicks.map((tick) => (
              <line
                key={`ygrid-${tick}`}
                x1={margin.left}
                y1={currentYScale(tick)}
                x2={chartWidth - margin.right}
                y2={currentYScale(tick)}
                stroke="#e0e0e0"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))}
          </g>

          {/* Average Lines */}
          {showAverageLines && (
            <g className="average-lines">
              <line
                x1={currentXScale(avgMinSalary)}
                y1={margin.top}
                x2={currentXScale(avgMinSalary)}
                y2={chartHeight - margin.bottom}
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <line
                x1={margin.left}
                y1={currentYScale(avgMaxSalary)}
                x2={chartWidth - margin.right}
                y2={currentYScale(avgMaxSalary)}
                stroke="#8b5cf6"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <g>
                <line
                  x1={currentXScale(avgMinSalary) - 6}
                  y1={currentYScale(avgMaxSalary)}
                  x2={currentXScale(avgMinSalary) + 6}
                  y2={currentYScale(avgMaxSalary)}
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
                <line
                  x1={currentXScale(avgMinSalary)}
                  y1={currentYScale(avgMaxSalary) - 6}
                  x2={currentXScale(avgMinSalary)}
                  y2={currentYScale(avgMaxSalary) + 6}
                  stroke="#8b5cf6"
                  strokeWidth="3"
                />
              </g>
              <text
                x={currentXScale(avgMinSalary) + 15}
                y={currentYScale(avgMaxSalary) - 15}
                fontSize="14"
                fontWeight="bold"
                fill="#8b5cf6"
              >
                Market Average
              </text>
            </g>
          )}

          {/* Median Lines */}
          {showMedianLines && (
            <g className="median-lines">
              <line
                x1={currentXScale(medianMinSalary)}
                y1={margin.top}
                x2={currentXScale(medianMinSalary)}
                y2={chartHeight - margin.bottom}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <line
                x1={margin.left}
                y1={currentYScale(medianMaxSalary)}
                x2={chartWidth - margin.right}
                y2={currentYScale(medianMaxSalary)}
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="6 3"
              />
              <g>
                <line
                  x1={currentXScale(medianMinSalary) - 6}
                  y1={currentYScale(medianMaxSalary) - 6}
                  x2={currentXScale(medianMinSalary) + 6}
                  y2={currentYScale(medianMaxSalary) + 6}
                  stroke="#10b981"
                  strokeWidth="3"
                />
                <line
                  x1={currentXScale(medianMinSalary) - 6}
                  y1={currentYScale(medianMaxSalary) + 6}
                  x2={currentXScale(medianMinSalary) + 6}
                  y2={currentYScale(medianMaxSalary) - 6}
                  stroke="#10b981"
                  strokeWidth="3"
                />
              </g>
              <text
                x={currentXScale(medianMinSalary) + 15}
                y={currentYScale(medianMaxSalary) + 25}
                fontSize="14"
                fontWeight="bold"
                fill="#10b981"
              >
                Market Median
              </text>
            </g>
          )}

          {/* Diagonal Line */}
          {showDiagonalLine && (
            <g className="diagonal-line">
              <line
                x1={currentXScale(80000)}
                y1={currentYScale(80000)}
                x2={currentXScale(240000)}
                y2={currentYScale(240000)}
                stroke="#999"
                strokeWidth="1"
                strokeDasharray="5 5"
              />
              <text
                x={currentXScale(160000)}
                y={currentYScale(160000) - 20}
                textAnchor="middle"
                fontSize="12"
                fill="#666"
              >
                y = x
              </text>
            </g>
          )}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={chartHeight - margin.bottom}
            x2={chartWidth - margin.right}
            y2={chartHeight - margin.bottom}
            stroke="#374151"
            strokeWidth="2"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={chartHeight - margin.bottom}
            stroke="#374151"
            strokeWidth="2"
          />

          {/* Axis Labels */}
          {xTicks.map((tick) => (
            <text
              key={`xlabel-${tick}`}
              x={currentXScale(tick)}
              y={chartHeight - margin.bottom + 25}
              textAnchor="middle"
              fontSize="13"
              fill="#374151"
            >
              {`${(tick / 1000).toFixed(0)}k`}
            </text>
          ))}
          {yTicks.map((tick) => (
            <text
              key={`ylabel-${tick}`}
              x={margin.left - 15}
              y={currentYScale(tick)}
              textAnchor="end"
              fontSize="13"
              fill="#374151"
              dy="0.3em"
            >
              {`${(tick / 1000).toFixed(0)}k`}
            </text>
          ))}

          <text
            x={chartWidth / 2}
            y={chartHeight - 30}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#374151"
          >
            Minimum Annual Salary (USD)
          </text>
          <text
            x={25}
            y={chartHeight / 2}
            textAnchor="middle"
            fontSize="16"
            fontWeight="bold"
            fill="#374151"
            transform={`rotate(-90, 25, ${chartHeight / 2})`}
          >
            Maximum Annual Salary (USD)
          </text>

          {/* Data Points - Comparison Jobs */}
          {/* Use adjustedData if provided, otherwise fall back to enrichedData */}
          {(adjustedData || enrichedData)
            .filter((job) => job.type === "comparison")
            .map((point) => {
              const strokeColor =
                hoveredPoint?.id === point.id
                  ? point.marketPosition.color === "#2563eb"
                    ? "#1d4ed8"
                    : point.marketPosition.color === "#dc2626"
                    ? "#b91c1c"
                    : point.marketPosition.color === "#ca8a04"
                    ? "#a16207"
                    : "#6d28d9"
                  : point.marketPosition.color;

              const xPos = currentXScale(
                point.displayMinSalary || point.minSalary
              );
              const yPos = currentYScale(
                point.displayMaxSalary || point.maxSalary
              );

              return (
                <g key={point.id} className="data-point">
                  {/* Invisible larger circle for better click target */}
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r="25"
                    fill="transparent"
                    className="point-hit-area"
                    onClick={(e) => handleDotClick(e, point)}
                    style={{ cursor: "pointer" }}
                  />
                  {/* Visible dot */}
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r="10"
                    fill={point.dotColor}
                    fillOpacity={hoveredPoint?.id === point.id ? "1" : "0.9"}
                    stroke={strokeColor}
                    strokeWidth={hoveredPoint?.id === point.id ? "3" : "2"}
                    className="point-circle"
                    onClick={(e) => handleDotClick(e, point)}
                    style={{ cursor: "pointer" }}
                  />
                  {/* Dot label - use dotLabel from point or fallback */}
                  <text
                    x={xPos}
                    y={yPos}
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize="6"
                    fontWeight="bold"
                    fill="white"
                    className="point-label"
                  >
                    {point.dotLabel ||
                      (dotLabels && dotLabels[point.id]) ||
                      "??"}
                  </text>
                  {/* Overlap indicator line */}
                  {point.isOverlapping && (
                    <line
                      x1={xPos}
                      y1={yPos}
                      x2={currentXScale(point.minSalary)}
                      y2={currentYScale(point.maxSalary)}
                      stroke={point.dotColor}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.5"
                      className="overlap-line"
                    />
                  )}
                </g>
              );
            })}

          {/* Your Job Data Points */}
          {yourJobData.map((point) => {
            const xPos = currentXScale(
              point.displayMinSalary || point.minSalary
            );
            const yPos = currentYScale(
              point.displayMaxSalary || point.maxSalary
            );

            return (
              <g key={point.id} className="your-job-point">
                {/* Invisible larger circle for better click target */}
                <circle
                  cx={xPos}
                  cy={yPos}
                  r="40"
                  fill="transparent"
                  className="point-hit-area"
                  onClick={(e) => handleDotClick(e, point)}
                  style={{ cursor: "pointer" }}
                />
                {/* Visible dot */}
                <circle
                  cx={xPos}
                  cy={yPos}
                  r="14"
                  fill="#28a745"
                  fillOpacity={hoveredPoint?.id === point.id ? "1" : "0.9"}
                  stroke={hoveredPoint?.id === point.id ? "#145c32" : "#1e7e34"}
                  strokeWidth={hoveredPoint?.id === point.id ? "4" : "3"}
                  className="point-circle your-job-circle"
                  onClick={(e) => handleDotClick(e, point)}
                  style={{ cursor: "pointer" }}
                />
                {/* Dot label */}
                <text
                  x={xPos}
                  y={yPos}
                  textAnchor="middle"
                  dy="0.35em"
                  fontSize="8"
                  fontWeight="bold"
                  fill="white"
                  className="point-label"
                >
                  {point.dotLabel || "PR"}
                </text>
              </g>
            );
          })}

          {/* Hover Effects */}
          {hoveredPoint && (
            <>
              <circle
                cx={currentXScale(
                  hoveredPoint.displayMinSalary || hoveredPoint.minSalary
                )}
                cy={currentYScale(
                  hoveredPoint.displayMaxSalary || hoveredPoint.maxSalary
                )}
                r={hoveredPoint.type === "yourJob" ? "20" : "15"}
                fill="none"
                stroke={hoveredPoint.type === "yourJob" ? "#145c32" : "#0a5c6b"}
                strokeWidth="2"
                strokeDasharray="3 3"
                className="hover-ring"
              />
              <circle
                cx={currentXScale(
                  hoveredPoint.displayMinSalary || hoveredPoint.minSalary
                )}
                cy={currentYScale(
                  hoveredPoint.displayMaxSalary || hoveredPoint.maxSalary
                )}
                r={hoveredPoint.type === "yourJob" ? "25" : "20"}
                fill="none"
                stroke={hoveredPoint.type === "yourJob" ? "#145c32" : "#0a5c6b"}
                strokeWidth="1"
                opacity="0.5"
                className="hover-pulse"
              >
                <animate
                  attributeName="r"
                  values={`${hoveredPoint.type === "yourJob" ? "25" : "20"};${
                    hoveredPoint.type === "yourJob" ? "35" : "30"
                  };${hoveredPoint.type === "yourJob" ? "25" : "20"}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.5;0.2;0.5"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}
        </svg>

        {/* Custom Tooltip */}
        {hoveredPoint && (
          <CustomTooltip
            data={hoveredPoint}
            position={tooltipPosition}
            setHoveredPoint={setHoveredPoint}
          />
        )}
      </div>
    </div>
  );
};

export default ChartView;
