import React, { useState, useRef, useCallback, useMemo } from "react";
import Header from "./components/Header";
import ChartView from "./components/ChartView";
import TableView from "./components/TableView";
import SummaryView from "./components/SummaryView";
import GeographicView from "./components/GeographicView";
import SalaryCalculationsExplanation from "./components/SalaryCalculationsExplanation"; // Added import
import {
  jobData,
  companyGeographicZones,
  companyCityCoordinates,
} from "./utils/data";
import {
  calculateStatistics,
  calculateMarketPositions,
  groupByMarketPosition,
  countQuadrants,
} from "./utils/calculations";
import "./App.css";

function App() {
  // State management
  const [activeTab, setActiveTab] = useState("chart");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showDiagonalLine, setShowDiagonalLine] = useState(true);
  const [showAverageLines, setShowAverageLines] = useState(true);
  const [showMedianLines, setShowMedianLines] = useState(true);
  const [sortBy, setSortBy] = useState("minRank");

  // Refs
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

  // Filter your job data
  const yourJobData = useMemo(
    () => enrichedData.filter((job) => job.type === "yourJob"),
    [enrichedData]
  );

  // Group data for table view
  const groupedData = useMemo(
    () => groupByMarketPosition(enrichedData, sortBy),
    [enrichedData, sortBy]
  );

  // Chart dimensions
  const chartWidth = 1000;
  const chartHeight = 1000;
  const margin = { top: 80, right: 80, bottom: 100, left: 100 };

  // Generate dot labels (company abbreviations)
  const generateDotLabels = useCallback(() => {
    const labels = {};
    const labelCounts = {};

    jobData.forEach((job) => {
      const company = job.company.toUpperCase();
      let baseLabel = company.replace(/[^A-Z]/g, "").substring(0, 2);

      if (baseLabel.length < 2) {
        baseLabel = company.substring(0, 2).padEnd(2, " ");
      }

      if (job.id === "classpass") {
        baseLabel = "CP";
      }

      if (!labelCounts[baseLabel]) {
        labelCounts[baseLabel] = 1;
      } else {
        labelCounts[baseLabel]++;
      }

      if (labelCounts[baseLabel] === 1) {
        labels[job.id] = baseLabel;
      } else {
        const jobsWithBaseLabel = jobData.filter((j) => {
          const jBaseLabel = j.company
            .toUpperCase()
            .replace(/[^A-Z]/g, "")
            .substring(0, 2);
          if (j.id === "classpass") return "CP" === baseLabel;
          return jBaseLabel === baseLabel;
        });

        const sortedJobs = jobsWithBaseLabel.sort((a, b) =>
          a.company.localeCompare(b.company)
        );
        const jobIndex = sortedJobs.findIndex((j) => j.id === job.id);
        labels[job.id] = baseLabel.substring(0, 1) + (jobIndex + 1);
      }
    });

    return labels;
  }, [jobData]);

  // Memoized dot labels
  const dotLabels = useMemo(() => generateDotLabels(), [generateDotLabels]);

  // Adjust overlapping points
  const adjustOverlappingPoints = useCallback((data) => {
    const adjustedData = [...data];
    const positionMap = {};

    // Group points by exact same position
    adjustedData.forEach((point, index) => {
      const key = `${point.minSalary}-${point.maxSalary}`;
      if (!positionMap[key]) {
        positionMap[key] = [];
      }
      positionMap[key].push({ index, point });
    });

    // Adjust positions for overlapping points
    Object.values(positionMap).forEach((group) => {
      if (group.length > 1) {
        const baseOffset = 500;
        group.forEach((item, i) => {
          const adjustedIndex = adjustedData.findIndex(
            (d) => d.id === item.point.id
          );
          if (adjustedIndex !== -1) {
            const angle = (2 * Math.PI * i) / group.length;
            const offsetX = Math.cos(angle) * baseOffset;
            const offsetY = Math.sin(angle) * baseOffset;

            adjustedData[adjustedIndex] = {
              ...adjustedData[adjustedIndex],
              displayMinSalary: adjustedData[adjustedIndex].minSalary + offsetX,
              displayMaxSalary: adjustedData[adjustedIndex].maxSalary + offsetY,
              isOverlapping: true,
              overlapCount: group.length,
              overlapIndex: i,
            };
          }
        });
      } else {
        const index = group[0].index;
        adjustedData[index] = {
          ...adjustedData[index],
          displayMinSalary: adjustedData[index].minSalary,
          displayMaxSalary: adjustedData[index].maxSalary,
          isOverlapping: false,
        };
      }
    });

    return adjustedData;
  }, []);

  // Memoized adjusted data
  const adjustedData = useMemo(
    () => adjustOverlappingPoints(enrichedData),
    [enrichedData, adjustOverlappingPoints]
  );

  // Scaling functions
  const xScale = useCallback(
    (value) => {
      const xMin = 80000;
      const xMax = 240000;
      return (
        margin.left +
        ((value - xMin) / (xMax - xMin)) *
          (chartWidth - margin.left - margin.right)
      );
    },
    [chartWidth, margin]
  );

  const yScale = useCallback(
    (value) => {
      const yMin = 80000;
      const yMax = 240000;
      return (
        chartHeight -
        margin.bottom -
        ((value - yMin) / (yMax - yMin)) *
          (chartHeight - margin.top - margin.bottom)
      );
    },
    [chartHeight, margin]
  );

  // Event handlers
  const handleMouseMove = useCallback(
    (e) => {
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
      const allData = [...adjustedData];

      allData.forEach((point) => {
        const pointX = xScale(point.displayMinSalary || point.minSalary);
        const pointY = yScale(point.displayMaxSalary || point.maxSalary);

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
    },
    [adjustedData, xScale, yScale]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPoint(null);
  }, []);

  const handleChartClick = useCallback(() => {
    if (hoveredPoint && hoveredPoint.link && hoveredPoint.link !== "#") {
      window.open(hoveredPoint.link, "_blank", "noopener,noreferrer");
    }
  }, [hoveredPoint]);

  const handleDotClick = useCallback((e, point) => {
    e.stopPropagation();
    if (point && point.link && point.link !== "#") {
      window.open(point.link, "_blank", "noopener,noreferrer");
    }
  }, []);

  return (
    <div className="app">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === "chart" && (
          <ChartView
            // Data props
            enrichedData={enrichedData}
            adjustedData={adjustedData}
            yourJobData={yourJobData}
            // Statistics props
            quadrantCounts={quadrantCounts}
            avgMinSalary={avgMinSalary}
            avgMaxSalary={avgMaxSalary}
            medianMinSalary={medianMinSalary}
            medianMaxSalary={medianMaxSalary}
            purpleZoneRadius={purpleZoneRadius}
            // Chart display props
            showDiagonalLine={showDiagonalLine}
            showAverageLines={showAverageLines}
            showMedianLines={showMedianLines}
            setShowDiagonalLine={setShowDiagonalLine}
            setShowAverageLines={setShowAverageLines}
            setShowMedianLines={setShowMedianLines}
            // Interaction state props
            hoveredPoint={hoveredPoint}
            tooltipPosition={tooltipPosition}
            setHoveredPoint={setHoveredPoint}
            // Chart dimensions props
            chartWidth={chartWidth}
            chartHeight={chartHeight}
            margin={margin}
            // Ref prop
            svgRef={svgRef}
            // Interaction handler props
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleChartClick}
            onDotClick={handleDotClick}
            // Label and scaling props
            dotLabels={dotLabels}
            xScale={xScale}
            yScale={yScale}
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
            companyGeographicZones={companyGeographicZones}
            companyCityCoordinates={companyCityCoordinates}
          />
        )}

        {/* Added Methodology view */}
        {activeTab === "methodology" && <SalaryCalculationsExplanation />}
      </main>
    </div>
  );
}

export default App;
