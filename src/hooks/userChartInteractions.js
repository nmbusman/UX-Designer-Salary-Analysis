import { useCallback } from "react";

export const useChartInteractions = ({
  svgRef,
  adjustedData,
  yourJobData,
  xScale,
  yScale,
  setHoveredPoint,
  setTooltipPosition,
}) => {
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
      const allData = [...adjustedData, ...(yourJobData || [])];

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
    [
      svgRef,
      adjustedData,
      yourJobData,
      xScale,
      yScale,
      setHoveredPoint,
      setTooltipPosition,
    ]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredPoint(null);
  }, [setHoveredPoint]);

  const handleChartClick = useCallback(() => {
    // Open job posting for hovered point when clicking anywhere on chart
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

  return {
    handleMouseMove,
    handleMouseLeave,
    handleChartClick,
    handleDotClick,
  };
};
