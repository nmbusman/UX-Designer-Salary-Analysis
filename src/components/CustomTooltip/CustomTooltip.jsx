import React, { useEffect, useState } from "react";
import "./CustomTooltip.css";

const CustomTooltip = ({ data, position }) => {
  const [tooltipStyle, setTooltipStyle] = useState({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    if (!data) return;

    let tooltipX = position.x + 10;
    let tooltipY = position.y - 10;

    // Adjust if tooltip would go off screen
    if (tooltipX + 350 > window.innerWidth) {
      tooltipX = position.x - 360;
    }

    if (tooltipY - 300 < 0) {
      tooltipY = position.y + 20;
    }

    setTooltipStyle({
      left: `${tooltipX}px`,
      top: `${tooltipY}px`,
    });
  }, [data, position]);

  if (!data) return null;

  return (
    <div className="custom-tooltip" style={tooltipStyle}>
      <p className="tooltip-company">
        {data.company}
        {data.type === "yourJob" && " ★"}
      </p>
      <p className="tooltip-title">{data.title}</p>

      <div className="tooltip-salary">
        <div className="salary-row">
          <span className="salary-label">Min Salary:</span>
          <span className="salary-value">
            ${data.minSalary.toLocaleString()}
          </span>
        </div>
        <div className="salary-comparison">
          <span style={{ color: data.minStatus.color }}>
            {data.minStatus.symbol} {data.minStatus.difference} (
            {Math.abs(data.minStatus.percentDifference).toFixed(1)}%)
          </span>
        </div>
      </div>

      <div className="tooltip-salary">
        <div className="salary-row">
          <span className="salary-label">Max Salary:</span>
          <span className="salary-value">
            ${data.maxSalary.toLocaleString()}
          </span>
        </div>
        <div className="salary-comparison">
          <span style={{ color: data.maxStatus.color }}>
            {data.maxStatus.symbol} {data.maxStatus.difference} (
            {Math.abs(data.maxStatus.percentDifference).toFixed(1)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomTooltip;
