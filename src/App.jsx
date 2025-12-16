import React, { useState, useRef } from "react";
import Header from "./components/Header";
import ChartView from "./components/ChartView";
import TableView from "./components/TableView";
import SummaryView from "./components/SummaryView";
import GeographicView from "./components/GeographicView";
import { jobData, geographicZones } from "./utils/data";
import {
  calculateStatistics,
  calculateMarketPositions,
  groupByMarketPosition,
  countQuadrants,
} from "./utils/calculations";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("chart");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showDiagonalLine, setShowDiagonalLine] = useState(true);
  const [showAverageLines, setShowAverageLines] = useState(true);
  const [showMedianLines, setShowMedianLines] = useState(true);
  const [sortBy, setSortBy] = useState("minRank");
  const svgRef = useRef(null);

  // Calculate statistics
  const stats = calculateStatistics(jobData);
  const {
    avgMinSalary,
    avgMaxSalary,
    medianMinSalary,
    medianMaxSalary,
    purpleZoneRadius,
    maxDistanceFromAverage,
    minSalaries,
    maxSalaries,
    comparisonData,
  } = stats;

  // Calculate market positions and enrich data
  const enrichedData = calculateMarketPositions(
    jobData,
    avgMinSalary,
    avgMaxSalary,
    purpleZoneRadius,
    maxDistanceFromAverage
  );

  // Quadrant counts
  const quadrantCounts = countQuadrants(
    comparisonData,
    avgMinSalary,
    avgMaxSalary,
    purpleZoneRadius
  );

  // Your job data
  const yourJobData = enrichedData.filter((job) => job.type === "yourJob");

  // Group data for table view
  const groupedData = groupByMarketPosition(enrichedData, sortBy);

  // Chart dimensions
  const chartWidth = 1000;
  const chartHeight = 1000;
  const margin = { top: 80, right: 80, bottom: 100, left: 100 };

  // Event handlers
  const handleMouseMove = (e) => {
    if (!svgRef.current) return;

    const svg = svgRef.current;
    const svgRect = svg.getBoundingClientRect();
    const viewBox = svg.viewBox.baseVal;
    const scaleX = svgRect.width / viewBox.width;
    const scaleY = svgRect.height / viewBox.height;

    const svgMouseX = (e.clientX - svgRect.left) / scaleX;
    const svgMouseY = (e.clientY - svgRect.top) / scaleY;

    let closestPoint = null;
    let minDistance = Infinity;

    enrichedData.forEach((point) => {
      const pointX =
        margin.left +
        ((point.displayMinSalary || point.minSalary - 80000) / 160000) *
          (chartWidth - margin.left - margin.right);
      const pointY =
        chartHeight -
        margin.bottom -
        ((point.displayMaxSalary || point.maxSalary - 80000) / 160000) *
          (chartHeight - margin.top - margin.bottom);

      const distance = Math.sqrt(
        Math.pow(svgMouseX - pointX, 2) + Math.pow(svgMouseY - pointY, 2)
      );

      const hoverRadius = point.type === "yourJob" ? 35 : 25;

      if (distance < hoverRadius && distance < minDistance) {
        minDistance = distance;
        closestPoint = point;
        setTooltipPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    });

    setHoveredPoint(closestPoint);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const handleChartClick = () => {
    if (hoveredPoint && hoveredPoint.link && hoveredPoint.link !== "#") {
      window.open(hoveredPoint.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === "chart" && (
          <ChartView
            enrichedData={enrichedData}
            yourJobData={yourJobData}
            quadrantCounts={quadrantCounts}
            showDiagonalLine={showDiagonalLine}
            showAverageLines={showAverageLines}
            showMedianLines={showMedianLines}
            setShowDiagonalLine={setShowDiagonalLine}
            setShowAverageLines={setShowAverageLines}
            setShowMedianLines={setShowMedianLines}
            hoveredPoint={hoveredPoint}
            tooltipPosition={tooltipPosition}
            avgMinSalary={avgMinSalary}
            avgMaxSalary={avgMaxSalary}
            medianMinSalary={medianMinSalary}
            medianMaxSalary={medianMaxSalary}
            purpleZoneRadius={purpleZoneRadius}
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            margin={margin}
            svgRef={svgRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleChartClick}
            setHoveredPoint={setHoveredPoint}
          />
        )}

        {activeTab === "table" && (
          <TableView
            enrichedData={enrichedData}
            quadrantCounts={quadrantCounts}
            groupedData={groupedData}
            sortBy={sortBy}
            setSortBy={setSortBy}
            avgMinSalary={avgMinSalary}
            avgMaxSalary={avgMaxSalary}
            medianMinSalary={medianMinSalary}
            medianMaxSalary={medianMaxSalary}
          />
        )}

        {activeTab === "summary" && (
          <SummaryView
            enrichedData={enrichedData}
            yourJobData={yourJobData}
            quadrantCounts={quadrantCounts}
            avgMinSalary={avgMinSalary}
            avgMaxSalary={avgMaxSalary}
            medianMinSalary={medianMinSalary}
            medianMaxSalary={medianMaxSalary}
            minSalaries={minSalaries}
            maxSalaries={maxSalaries}
          />
        )}

        {activeTab === "geographic" && (
          <GeographicView
            geographicZones={geographicZones}
            avgMinSalary={avgMinSalary}
            avgMaxSalary={avgMaxSalary}
          />
        )}
      </main>
    </div>
  );
}

export default App;
