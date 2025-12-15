import React, { useState, useRef } from "react";

const SalaryAnalysis = () => {
  const [activeTab, setActiveTab] = useState("chart");
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showDiagonalLine, setShowDiagonalLine] = useState(true);
  const [showAverageLines, setShowAverageLines] = useState(true);
  const [showMedianLines, setShowMedianLines] = useState(true);
  const [sortBy, setSortBy] = useState("minRank");
  const svgRef = useRef(null);

  const jobData = [
    {
      company: "StitchFix",
      title: "Lead Product Designer",
      minSalary: 102800,
      maxSalary: 171000,
      type: "comparison",
      id: "stitchfix",
      link: "https://www.stitchfix.com/careers/jobs?gh_jid=7386505",
    },
    {
      company: "Moody's Corporation",
      title: "Experience Designer",
      minSalary: 107600,
      maxSalary: 156200,
      type: "comparison",
      id: "moodys",
      link: "https://www.linkedin.com/jobs/view/4323377889",
    },
    {
      company: "Omnidian",
      title: "Sr. UX Designer",
      minSalary: 110500,
      maxSalary: 149500,
      type: "comparison",
      id: "omnidian",
      link: "https://jobs.lever.co/omnidian/bf3b0bc1-2c6e-4059-bfa3-7e0c5a2bf5b9",
    },
    {
      company: "Hypergiant",
      title: "Senior UX/UI Designer",
      minSalary: 113000,
      maxSalary: 145000,
      type: "comparison",
      id: "hypergiant",
      link: "https://jobright.ai/jobs/info/690a385d4a1b456627b054a7",
    },
    {
      company: "Olo",
      title: "Senior Product Designer - Serve",
      minSalary: 114500,
      maxSalary: 156275.1,
      type: "comparison",
      id: "olo",
      link: "https://www.linkedin.com/jobs/view/4342387122",
    },
    {
      company: "Luna Physical Therapy",
      title: "Senior Product Designer",
      minSalary: 115000,
      maxSalary: 140000,
      type: "comparison",
      id: "luna",
      link: "https://www.linkedin.com/jobs/view/4338534379",
    },
    {
      company: "SelectQuote Insurance",
      title: "User Experience Designer III",
      minSalary: 115000,
      maxSalary: 130000,
      type: "comparison",
      id: "selectquote",
      link: "https://www.linkedin.com/jobs/view/4338807579",
    },
    {
      company: "Thumbtack",
      title: "Product Designer, Monetization Experience",
      minSalary: 127400,
      maxSalary: 164900,
      type: "comparison",
      id: "thumbtack",
      link: "https://careers.thumbtack.com/jobs/7423962",
    },
    {
      company: "Articulate",
      title: "Senior Product Designer I",
      minSalary: 129900,
      maxSalary: 194900,
      type: "comparison",
      id: "articulate",
      link: "https://jobs.lever.co/articulate/76a17f4d-8b38-4896-af16-ce3d7dc10df2",
    },
    {
      company: "Hammerspace",
      title: "UX Designer",
      minSalary: 130000,
      maxSalary: 170000,
      type: "comparison",
      id: "hammerspace",
      link: "https://ats.rippling.com/hammerspace/jobs/41e17d39-1f43-4503-9fba-5ab19ccb2191?utm_source=ziprecruiter",
    },
    {
      company: "ClassPass",
      title: "Senior Product Designer",
      minSalary: 140000,
      maxSalary: 175000,
      type: "comparison",
      id: "classpass",
      link: "https://www.playlist.com/careers/opportunities/4615177006",
    },
    {
      company: "Frontline Education",
      title: "Senior Product Designer",
      minSalary: 140000,
      maxSalary: 160000,
      type: "comparison",
      id: "frontline",
      link: "https://www.linkedin.com/jobs/view/4341883048",
    },
    {
      company: "Uplight",
      title: "Senior Product Designer",
      minSalary: 140000,
      maxSalary: 160000,
      type: "comparison",
      id: "uplight",
      link: "https://www.linkedin.com/jobs/view/4341275458",
    },
    {
      company: "FloQast",
      title: "Senior Product Designer",
      minSalary: 144000,
      maxSalary: 216000,
      type: "comparison",
      id: "floqast",
      link: "https://jobs.lever.co/floqast/5c2f43cc-0881-4196-989c-07b03495fd04",
    },
    {
      company: "Omada Health",
      title: "Senior Product Designer",
      minSalary: 149600,
      maxSalary: 187000,
      type: "comparison",
      id: "omada",
      link: "https://job-boards.greenhouse.io/omadahealth/jobs/7235667",
    },
    {
      company: "Signal Messenger",
      title: "Product Designer",
      minSalary: 150000,
      maxSalary: 210000,
      type: "comparison",
      id: "signal",
      link: "https://www.indeed.com/viewjob?jk=44fee9e03431b3b3&from=shareddesktop_copy",
    },
    {
      company: "Redox",
      title: "Senior Product Designer",
      minSalary: 156000,
      maxSalary: 184000,
      type: "comparison",
      id: "redox",
      link: "https://www.linkedin.com/jobs/view/4347366673",
    },
    {
      company: "Human Interest",
      title: "Senior Product Designer",
      minSalary: 175000,
      maxSalary: 200000,
      type: "comparison",
      id: "human",
      link: "https://job-boards.greenhouse.io/humaninterest/jobs/7391721?gh_src=dea5e79a1us",
    },
    {
      company: "Coinbase",
      title: "Sr. Product Designer - Pay Platform",
      minSalary: 180370,
      maxSalary: 212200,
      type: "comparison",
      id: "coinbase",
      link: "https://www.indeed.com/viewjob?jk=a331cf0b72031d3c&from=shareddesktop_copy",
    },
    {
      company: "Rula",
      title: "Sr. Product Designer (Remote) @ Rula",
      minSalary: 181000,
      maxSalary: 212900,
      type: "comparison",
      id: "rula",
      link: "https://jobs.ashbyhq.com/rula/2cba9b06-d875-4ed0-8d22-ea44840b81c8",
    },
    {
      company: "Sevaro",
      title: "Sr. UI/UX Designer - Healthcare",
      minSalary: 115000,
      maxSalary: 125000,
      type: "comparison",
      id: "sevaro",
      link: "https://www.indeed.com/viewjob?jk=4d817fe7c7b0c027&hl=en",
    },
    {
      company: "Vetcove",
      title: "Product Designer (Staff Level)",
      minSalary: 90000,
      maxSalary: 180000,
      type: "comparison",
      id: "vetcove",
      link: "https://www.indeed.com/viewjob?jk=a3edfba36cf6c0c8&hl=en",
    },
    {
      company: "Mindbody",
      title: "Senior Product Designer",
      minSalary: 140000,
      maxSalary: 175000,
      type: "comparison",
      id: "mindbody",
      link: "https://www.indeed.com/viewjob?jk=527e2cc806923325&hl=en",
    },
    {
      company: "Mural",
      title: "Senior Product Designer, Monetization",
      minSalary: 132000,
      maxSalary: 165000,
      type: "comparison",
      id: "mural",
      link: "https://www.indeed.com/viewjob?jk=527e2cc806923325&hl=en",
    },
    {
      company: "Humana",
      title: "Senior Product Designer",
      minSalary: 86300,
      maxSalary: 118700,
      type: "comparison",
      id: "humana",
      link: "https://www.indeed.com/viewjob?jk=ff7603c419b2f528&hl=en",
    },
    {
      company: "Variate",
      title: "Senior UX Designer",
      minSalary: 125000,
      maxSalary: 150000,
      type: "comparison",
      id: "variate",
      link: "https://www.linkedin.com/jobs/view/4334829873/?refId=e91f4597-8814-42ae-9761-43bf6f121bfd&trackingId=5QnToMurRNWsZC5IuTz8sA%3D%3D&trk=flagship3_job_home_savedjobs",
    },
    {
      company: "BLACKCLOAK",
      title: "Lead Product Designer",
      minSalary: 80000,
      maxSalary: 100000,
      type: "comparison",
      id: "blackcloak",
      link: "https://www.linkedin.com/jobs/view/4334865588",
    },
    {
      company: "Benchling",
      title: "Product Designer, Chemistry",
      minSalary: 153000,
      maxSalary: 230000,
      type: "comparison",
      id: "benchling",
      link: "https://www.linkedin.com/jobs/view/4313277706",
    },
    {
      company: "Atlassian",
      title: "Senior Product Designer",
      minSalary: 134100,
      maxSalary: 175075,
      type: "comparison",
      id: "atlassian",
      link: "https://www.atlassian.com/company/careers/details/23098",
    },
    {
      company: "Red Ventures",
      title: "Senior Product Designer | Coverage.com",
      minSalary: 100000,
      maxSalary: 187500,
      type: "comparison",
      id: "redventures",
      link: "https://www.indeed.com/viewjob?jk=5814839baff86f22&hl=en",
    },
    {
      company: "Position Under Review",
      title: "Sr. UI/UX Designer and Researcher",
      minSalary: 101000,
      maxSalary: 131000,
      type: "yourJob",
      id: "yourJob",
      link: "#",
    },
  ];

  const comparisonData = jobData.filter((job) => job.type === "comparison");
  const minSalaries = comparisonData.map((job) => job.minSalary);
  const maxSalaries = comparisonData.map((job) => job.maxSalary);

  const avgMinSalary =
    minSalaries.reduce((a, b) => a + b, 0) / minSalaries.length;
  const avgMaxSalary =
    maxSalaries.reduce((a, b) => a + b, 0) / maxSalaries.length;

  const sortedMinSalaries = [...minSalaries].sort((a, b) => a - b);
  const sortedMaxSalaries = [...maxSalaries].sort((a, b) => a - b);
  const medianMinSalary =
    sortedMinSalaries[Math.floor(sortedMinSalaries.length / 2)];
  const medianMaxSalary =
    sortedMaxSalaries[Math.floor(sortedMaxSalaries.length / 2)];

  const avgRange = avgMaxSalary - avgMinSalary;
  const purpleZoneRadius = avgRange * 0.1;

  const calculateMaxDistance = () => {
    let maxDist = 0;
    comparisonData.forEach((job) => {
      const distance = Math.sqrt(
        Math.pow(job.minSalary - avgMinSalary, 2) +
          Math.pow(job.maxSalary - avgMaxSalary, 2)
      );
      if (distance > maxDist) maxDist = distance;
    });
    return maxDist;
  };

  const maxDistanceFromAverage = calculateMaxDistance();

  const getColorIntensity = (baseColor, distance, isNearAverage = false) => {
    if (isNearAverage) {
      const intensity = Math.min(distance / purpleZoneRadius, 1);
      const r1 = 196,
        g1 = 181,
        b1 = 253;
      const r2 = 139,
        g2 = 92,
        b2 = 246;

      const r = Math.round(r1 + (r2 - r1) * intensity);
      const g = Math.round(g1 + (g2 - g1) * intensity);
      const b = Math.round(b1 + (b2 - b1) * intensity);

      return `rgb(${r}, ${g}, ${b})`;
    }

    const normalizedDistance = Math.min(distance / maxDistanceFromAverage, 1);
    const intensity = normalizedDistance;

    let r, g, b;
    if (baseColor.startsWith("#")) {
      r = parseInt(baseColor.slice(1, 3), 16);
      g = parseInt(baseColor.slice(3, 5), 16);
      b = parseInt(baseColor.slice(5, 7), 16);
    } else if (baseColor.startsWith("rgb")) {
      const match = baseColor.match(/\d+/g);
      r = parseInt(match[0]);
      g = parseInt(match[1]);
      b = parseInt(match[2]);
    } else {
      return baseColor;
    }

    const lightnessAdjustment = 0.7;
    const adjust = (channel) => {
      const factor = 1 - intensity * lightnessAdjustment;
      return Math.max(0, Math.min(255, Math.round(channel * factor)));
    };

    return `rgb(${adjust(r)}, ${adjust(g)}, ${adjust(b)})`;
  };

  const getMarketPosition = (job) => {
    const isAboveAvgMin = job.minSalary > avgMinSalary;
    const isAboveAvgMax = job.maxSalary > avgMaxSalary;
    const distanceFromAvg = Math.sqrt(
      Math.pow(job.minSalary - avgMinSalary, 2) +
        Math.pow(job.maxSalary - avgMaxSalary, 2)
    );

    if (distanceFromAvg < purpleZoneRadius) {
      return {
        label: "Near Average",
        color: "#8b5cf6",
        bgColor: "#f3e8ff",
        description: "Within 10% of market average range",
        order: 1,
        baseColor: "#8b5cf6",
        isNearAverage: true,
      };
    }

    if (isAboveAvgMin && isAboveAvgMax) {
      return {
        label: "Above Market",
        color: "#2563eb",
        bgColor: "#dbeafe",
        description: "Both min and max above market averages",
        order: 2,
        baseColor: "#2563eb",
        isNearAverage: false,
      };
    } else if (!isAboveAvgMin && !isAboveAvgMax) {
      return {
        label: "Below Market",
        color: "#dc2626",
        bgColor: "#fee2e2",
        description: "Both min and max below market averages",
        order: 3,
        baseColor: "#dc2626",
        isNearAverage: false,
      };
    } else if (isAboveAvgMin && !isAboveAvgMax) {
      return {
        label: "High Min, Low Max",
        color: "#ca8a04",
        bgColor: "#fef3c7",
        description: "High minimum but low maximum salary",
        order: 4,
        baseColor: "#ca8a04",
        isNearAverage: false,
      };
    } else {
      return {
        label: "Low Min, High Max",
        color: "#ca8a04",
        bgColor: "#fef3c7",
        description: "Low minimum but high maximum salary",
        order: 5,
        baseColor: "#ca8a04",
        isNearAverage: false,
      };
    }
  };

  const getComparisonStatus = (value, average) => {
    const difference = value - average;
    const percentDifference = (difference / average) * 100;

    const formattedDifference =
      difference >= 0
        ? `+$${Math.abs(difference).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`
        : `-$${Math.abs(difference).toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}`;

    if (percentDifference > 10) {
      return {
        text: "Well Above",
        color: "#16a34a",
        symbol: "↑↑",
        difference: formattedDifference,
        percentDifference: percentDifference,
      };
    } else if (percentDifference > 0) {
      return {
        text: "Slightly Above",
        color: "#22c55e",
        symbol: "↑",
        difference: formattedDifference,
        percentDifference: percentDifference,
      };
    } else if (percentDifference > -10) {
      return {
        text: "Slightly Below",
        color: "#f59e0b",
        symbol: "↓",
        difference: formattedDifference,
        percentDifference: percentDifference,
      };
    } else {
      return {
        text: "Well Below",
        color: "#dc2626",
        symbol: "↓↓",
        difference: formattedDifference,
        percentDifference: percentDifference,
      };
    }
  };

  const generateDotLabels = () => {
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
  };

  const dotLabels = generateDotLabels();

  const adjustOverlappingPoints = (enrichedData) => {
    const adjustedData = [...enrichedData];
    const positionMap = {};

    adjustedData.forEach((point, index) => {
      const key = `${point.minSalary}-${point.maxSalary}`;
      if (!positionMap[key]) {
        positionMap[key] = [];
      }
      positionMap[key].push({ index, point });
    });

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
  };

  const enrichedData = jobData.map((job) => {
    const sortedByMin = [...jobData].sort((a, b) => a.minSalary - b.minSalary);
    const sortedByMax = [...jobData].sort((a, b) => a.maxSalary - b.maxSalary);

    const minRank = sortedByMin.findIndex((j) => j.id === job.id) + 1;
    const maxRank = sortedByMax.findIndex((j) => j.id === job.id) + 1;

    const marketPosition = getMarketPosition(job);
    const minStatus = getComparisonStatus(job.minSalary, avgMinSalary);
    const maxStatus = getComparisonStatus(job.maxSalary, avgMaxSalary);

    const distanceFromAvg = Math.sqrt(
      Math.pow(job.minSalary - avgMinSalary, 2) +
        Math.pow(job.maxSalary - avgMaxSalary, 2)
    );

    const dotColor = getColorIntensity(
      marketPosition.baseColor,
      distanceFromAvg,
      marketPosition.isNearAverage
    );

    return {
      ...job,
      minRank,
      maxRank,
      range: job.maxSalary - job.minSalary,
      marketPosition,
      minStatus,
      maxStatus,
      distanceFromAvg,
      isNearAverage: distanceFromAvg < purpleZoneRadius,
      dotLabel: dotLabels[job.id],
      dotColor,
    };
  });

  const adjustedData = adjustOverlappingPoints(enrichedData);

  const yourJobData = adjustedData.filter((job) => job.type === "yourJob");

  const countQuadrants = () => {
    let aboveMarket = 0;
    let belowMarket = 0;
    let highMinLowMax = 0;
    let lowMinHighMax = 0;
    let nearAverage = 0;

    comparisonData.forEach((job) => {
      const marketPosition = getMarketPosition(job);

      if (marketPosition.label === "Near Average") {
        nearAverage++;
      } else if (marketPosition.label === "Above Market") {
        aboveMarket++;
      } else if (marketPosition.label === "Below Market") {
        belowMarket++;
      } else if (marketPosition.label === "High Min, Low Max") {
        highMinLowMax++;
      } else {
        lowMinHighMax++;
      }
    });

    return {
      aboveMarket,
      belowMarket,
      highMinLowMax,
      lowMinHighMax,
      nearAverage,
    };
  };

  const quadrantCounts = countQuadrants();

  const groupByMarketPosition = (data) => {
    const groups = {
      "Above Market": [],
      "Below Market": [],
      "Mixed Market": [],
      "Near Average": [],
      "Your Position": [],
    };

    data.forEach((job) => {
      if (job.type === "yourJob") {
        groups["Your Position"].push(job);
      } else if (job.marketPosition.label === "Near Average") {
        groups["Near Average"].push(job);
      } else if (job.marketPosition.label === "Above Market") {
        groups["Above Market"].push(job);
      } else if (job.marketPosition.label === "Below Market") {
        groups["Below Market"].push(job);
      } else {
        groups["Mixed Market"].push(job);
      }
    });

    Object.keys(groups).forEach((group) => {
      groups[group].sort((a, b) => {
        switch (sortBy) {
          case "minRank":
            return a.minRank - b.minRank;
          case "maxRank":
            return a.maxRank - b.maxRank;
          case "range":
            return b.range - a.range;
          case "marketPosition":
            return a.marketPosition.order - b.marketPosition.order;
          default:
            return a.minRank - b.minRank;
        }
      });
    });

    return groups;
  };

  const chartWidth = 1000;
  const chartHeight = 1000;
  const margin = { top: 80, right: 80, bottom: 100, left: 100 };

  const xScale = (value) => {
    const xMin = 80000;
    const xMax = 240000;
    return (
      margin.left +
      ((value - xMin) / (xMax - xMin)) *
        (chartWidth - margin.left - margin.right)
    );
  };

  const yScale = (value) => {
    const yMin = 80000;
    const yMax = 240000;
    return (
      chartHeight -
      margin.bottom -
      ((value - yMin) / (yMax - yMin)) *
        (chartHeight - margin.top - margin.bottom)
    );
  };

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
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  const handleChartClick = () => {
    if (hoveredPoint && hoveredPoint.link && hoveredPoint.link !== "#") {
      window.open(hoveredPoint.link, "_blank", "noopener,noreferrer");
    }
  };

  const handleDotClick = (e) => {
    e.stopPropagation();
    if (hoveredPoint && hoveredPoint.link && hoveredPoint.link !== "#") {
      window.open(hoveredPoint.link, "_blank", "noopener,noreferrer");
    }
  };

  const CustomTooltip = () => {
    if (!hoveredPoint) return null;

    const data = hoveredPoint;

    let tooltipX = tooltipPosition.x + 10;
    let tooltipY = tooltipPosition.y - 10;

    if (tooltipX + 350 > window.innerWidth) {
      tooltipX = tooltipPosition.x - 360;
    }

    if (tooltipY - 300 < 0) {
      tooltipY = tooltipPosition.y + 20;
    }

    return (
      <div
        style={{
          position: "fixed",
          left: `${tooltipX}px`,
          top: `${tooltipY}px`,
          backgroundColor: "white",
          padding: "16px",
          border: "2px solid #d1d5db",
          borderRadius: "8px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          width: "350px",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translateY(-100%)",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "6px",
            color: "#1f2937",
          }}
        >
          {data.company}
          {data.type === "yourJob" && " ★"}
        </p>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
          {data.title}
        </p>

        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Min Salary:
            </span>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>
              ${data.minSalary.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: data.minStatus.color,
              }}
            >
              {data.minStatus.symbol} {data.minStatus.difference} (
              {Math.abs(data.minStatus.percentDifference).toFixed(1)}%)
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "4px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "600" }}>
              Max Salary:
            </span>
            <span style={{ fontSize: "14px", fontWeight: "700" }}>
              ${data.maxSalary.toLocaleString()}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: data.maxStatus.color,
              }}
            >
              {data.maxStatus.symbol} {data.maxStatus.difference} (
              {Math.abs(data.maxStatus.percentDifference).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Geographic Zones Data
  const geographicZones = {
    "Zone A": {
      color: "#dc2626",
      bgColor: "#fee2e2",
      description: "San Francisco Bay Area",
      salaryAdjustment: "+30%",
      cities: ["San Francisco", "San Jose", "Palo Alto", "Oakland"],
      salaryRange: `$${Math.round(
        avgMinSalary * 1.3
      ).toLocaleString()} - $${Math.round(
        avgMaxSalary * 1.3
      ).toLocaleString()}`,
      keyEmployers: [
        "Google",
        "Apple",
        "Facebook",
        "Netflix",
        "Uber",
        "Airbnb",
      ],
      avgSalaryPremium: 1.3,
    },
    "Zone B": {
      color: "#2563eb",
      bgColor: "#dbeafe",
      description: "High Cost Metro Areas",
      salaryAdjustment: "+15-25%",
      cities: [
        "Boston, MA",
        "Los Angeles, CA",
        "New York, NY",
        "Sacramento, CA",
        "San Diego, CA",
        "Seattle, WA",
        "Washington D.C.",
      ],
      salaryRange: `$${Math.round(
        avgMinSalary * 1.2
      ).toLocaleString()} - $${Math.round(
        avgMaxSalary * 1.2
      ).toLocaleString()}`,
      keyEmployers: [
        "Microsoft",
        "Amazon",
        "Spotify",
        "Bloomberg",
        "Capital One",
      ],
      avgSalaryPremium: 1.2,
    },
    "Zone C": {
      color: "#16a34a",
      bgColor: "#dcfce7",
      description: "All Other Areas",
      salaryAdjustment: "Market Rate",
      cities: ["All other states and metropolitan areas"],
      salaryRange: `$${Math.round(
        avgMinSalary * 1.0
      ).toLocaleString()} - $${Math.round(
        avgMaxSalary * 1.0
      ).toLocaleString()}`,
      keyEmployers: ["Various local and remote companies"],
      avgSalaryPremium: 1.0,
    },
  };

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

  const ChartView = () => {
    const xTicks = [
      80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000,
    ];
    const yTicks = [
      80000, 100000, 120000, 140000, 160000, 180000, 200000, 220000, 240000,
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            width: "100%",
            maxWidth: "1000px",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#2563eb",
                  }}
                ></div>
                <span style={{ fontSize: "14px" }}>
                  Above Market ({quadrantCounts.aboveMarket})
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#dc2626",
                  }}
                ></div>
                <span style={{ fontSize: "14px" }}>
                  Below Market ({quadrantCounts.belowMarket})
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#ca8a04",
                  }}
                ></div>
                <span style={{ fontSize: "14px" }}>
                  Mixed Market (
                  {quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax})
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "50%",
                    backgroundColor: "#8b5cf6",
                  }}
                ></div>
                <span style={{ fontSize: "14px" }}>
                  Near Average ({quadrantCounts.nearAverage})
                </span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "#28a745",
                  }}
                ></div>
                <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                  Position Under Review
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="checkbox"
                    id="diagonalToggle"
                    checked={showDiagonalLine}
                    onChange={(e) => setShowDiagonalLine(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    htmlFor="diagonalToggle"
                    style={{
                      fontSize: "14px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    y = x Line
                  </label>
                </div>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="checkbox"
                    id="averageToggle"
                    checked={showAverageLines}
                    onChange={(e) => setShowAverageLines(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    htmlFor="averageToggle"
                    style={{
                      fontSize: "14px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    Average Lines
                  </label>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <input
                    type="checkbox"
                    id="medianToggle"
                    checked={showMedianLines}
                    onChange={(e) => setShowMedianLines(e.target.checked)}
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    htmlFor="medianToggle"
                    style={{
                      fontSize: "14px",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    Median Lines
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#6b7280",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "6px",
            }}
          >
            💡 Hover over any point to see detailed salary information
            <br />
            <small>
              Click anywhere on the chart to open the job posting for the
              currently hovered position
            </small>
            <br />
            <small>
              <strong>Color intensity:</strong> Darker colors = farther from
              market average, Lighter colors = closer to average
            </small>
            <br />
            <small>
              <strong>Dot labels:</strong> First two letters of company name
              {dotLabels["frontline"] === "F2" &&
                " (F2 = Frontline, F1 = FloQast)"}
            </small>
            <br />
            <small>
              <strong>Note:</strong> Overlapping points are slightly offset for
              visibility
            </small>
          </div>
        </div>

        <div
          style={{
            width: "1000px",
            height: "1000px",
            position: "relative",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            backgroundColor: "white",
            overflow: "hidden",
            cursor: "crosshair",
          }}
          onClick={handleChartClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <svg
            ref={svgRef}
            width="100%"
            height="100%"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <g>
              <rect
                x={xScale(avgMinSalary)}
                y={margin.top}
                width={chartWidth - margin.right - xScale(avgMinSalary)}
                height={yScale(avgMaxSalary) - margin.top}
                fill="#dbeafe"
                fillOpacity="0.5"
              />

              <rect
                x={margin.left}
                y={yScale(avgMaxSalary)}
                width={xScale(avgMinSalary) - margin.left}
                height={chartHeight - margin.bottom - yScale(avgMaxSalary)}
                fill="#fee2e2"
                fillOpacity="0.5"
              />

              <rect
                x={margin.left}
                y={margin.top}
                width={xScale(avgMinSalary) - margin.left}
                height={yScale(avgMaxSalary) - margin.top}
                fill="#fef3c7"
                fillOpacity="0.5"
              />

              <rect
                x={xScale(avgMinSalary)}
                y={yScale(avgMaxSalary)}
                width={chartWidth - margin.right - xScale(avgMinSalary)}
                height={chartHeight - margin.bottom - yScale(avgMaxSalary)}
                fill="#fef3c7"
                fillOpacity="0.5"
              />
            </g>

            <circle
              cx={xScale(avgMinSalary)}
              cy={yScale(avgMaxSalary)}
              r={xScale(avgMinSalary + purpleZoneRadius) - xScale(avgMinSalary)}
              fill="#8b5cf6"
              fillOpacity="0.1"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            <g>
              {xTicks.map((tick) => (
                <line
                  key={`xgrid-${tick}`}
                  x1={xScale(tick)}
                  y1={margin.top}
                  x2={xScale(tick)}
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
                  y1={yScale(tick)}
                  x2={chartWidth - margin.right}
                  y2={yScale(tick)}
                  stroke="#e0e0e0"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
              ))}
            </g>

            {showAverageLines && (
              <g>
                <line
                  x1={xScale(avgMinSalary)}
                  y1={margin.top}
                  x2={xScale(avgMinSalary)}
                  y2={chartHeight - margin.bottom}
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
                <line
                  x1={margin.left}
                  y1={yScale(avgMaxSalary)}
                  x2={chartWidth - margin.right}
                  y2={yScale(avgMaxSalary)}
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
                <g>
                  <line
                    x1={xScale(avgMinSalary) - 6}
                    y1={yScale(avgMaxSalary)}
                    x2={xScale(avgMinSalary) + 6}
                    y2={yScale(avgMaxSalary)}
                    stroke="#8b5cf6"
                    strokeWidth="3"
                  />
                  <line
                    x1={xScale(avgMinSalary)}
                    y1={yScale(avgMaxSalary) - 6}
                    x2={xScale(avgMinSalary)}
                    y2={yScale(avgMaxSalary) + 6}
                    stroke="#8b5cf6"
                    strokeWidth="3"
                  />
                </g>
                <text
                  x={xScale(avgMinSalary) + 15}
                  y={yScale(avgMaxSalary) - 15}
                  fontSize="14"
                  fontWeight="bold"
                  fill="#8b5cf6"
                >
                  Market Average
                </text>
              </g>
            )}

            {showMedianLines && (
              <g>
                <line
                  x1={xScale(medianMinSalary)}
                  y1={margin.top}
                  x2={xScale(medianMinSalary)}
                  y2={chartHeight - margin.bottom}
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
                <line
                  x1={margin.left}
                  y1={yScale(medianMaxSalary)}
                  x2={chartWidth - margin.right}
                  y2={yScale(medianMaxSalary)}
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="6 3"
                />
                <g>
                  <line
                    x1={xScale(medianMinSalary) - 6}
                    y1={yScale(medianMaxSalary) - 6}
                    x2={xScale(medianMinSalary) + 6}
                    y2={yScale(medianMaxSalary) + 6}
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  <line
                    x1={xScale(medianMinSalary) - 6}
                    y1={yScale(medianMaxSalary) + 6}
                    x2={xScale(medianMinSalary) + 6}
                    y2={yScale(medianMaxSalary) - 6}
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                </g>
                <text
                  x={xScale(medianMinSalary) + 15}
                  y={yScale(medianMaxSalary) + 25}
                  fontSize="14"
                  fontWeight="bold"
                  fill="#10b981"
                >
                  Market Median
                </text>
              </g>
            )}

            <g>
              <text
                x={xScale(200000)}
                y={yScale(220000)}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#2563eb"
              >
                Above Market ({quadrantCounts.aboveMarket})
              </text>
              <text
                x={xScale(100000)}
                y={yScale(100000)}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#dc2626"
              >
                Below Market ({quadrantCounts.belowMarket})
              </text>
              <text
                x={xScale(200000)}
                y={yScale(100000)}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#ca8a04"
              >
                High Min, Low Max ({quadrantCounts.highMinLowMax})
              </text>
              <text
                x={xScale(100000)}
                y={yScale(220000)}
                textAnchor="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#ca8a04"
              >
                Low Min, High Max ({quadrantCounts.lowMinHighMax})
              </text>
            </g>

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

            {xTicks.map((tick) => (
              <text
                key={`xlabel-${tick}`}
                x={xScale(tick)}
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
                y={yScale(tick)}
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

            {showDiagonalLine && (
              <g>
                <line
                  x1={xScale(80000)}
                  y1={yScale(80000)}
                  x2={xScale(240000)}
                  y2={yScale(240000)}
                  stroke="#999"
                  strokeWidth="1"
                  strokeDasharray="5 5"
                />
                <text
                  x={xScale(160000)}
                  y={yScale(160000) - 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  y = x
                </text>
              </g>
            )}

            {adjustedData
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

                const xPos = xScale(point.displayMinSalary || point.minSalary);
                const yPos = yScale(point.displayMaxSalary || point.maxSalary);

                return (
                  <g key={point.id}>
                    <circle
                      cx={xPos}
                      cy={yPos}
                      r="25"
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                    />
                    <circle
                      cx={xPos}
                      cy={yPos}
                      r="10"
                      fill={point.dotColor}
                      fillOpacity={hoveredPoint?.id === point.id ? "1" : "0.9"}
                      stroke={strokeColor}
                      strokeWidth={hoveredPoint?.id === point.id ? "3" : "2"}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x={xPos}
                      y={yPos}
                      textAnchor="middle"
                      dy="0.35em"
                      fontSize="6"
                      fontWeight="bold"
                      fill="white"
                      pointerEvents="none"
                    >
                      {point.dotLabel}
                    </text>
                    {point.isOverlapping && (
                      <line
                        x1={xPos}
                        y1={yPos}
                        x2={xScale(point.minSalary)}
                        y2={yScale(point.maxSalary)}
                        stroke={point.dotColor}
                        strokeWidth="1"
                        strokeDasharray="2 2"
                        opacity="0.5"
                      />
                    )}
                  </g>
                );
              })}

            {yourJobData.map((point) => {
              const xPos = xScale(point.displayMinSalary || point.minSalary);
              const yPos = yScale(point.displayMaxSalary || point.maxSalary);

              return (
                <g key={point.id}>
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r="40"
                    fill="transparent"
                    style={{ cursor: "pointer" }}
                  />
                  <circle
                    cx={xPos}
                    cy={yPos}
                    r="14"
                    fill="#28a745"
                    fillOpacity={hoveredPoint?.id === point.id ? "1" : "0.9"}
                    stroke={
                      hoveredPoint?.id === point.id ? "#145c32" : "#1e7e34"
                    }
                    strokeWidth={hoveredPoint?.id === point.id ? "4" : "3"}
                    style={{ cursor: "pointer" }}
                  />
                  <text
                    x={xPos}
                    y={yPos}
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize="8"
                    fontWeight="bold"
                    fill="white"
                    pointerEvents="none"
                  >
                    PR
                  </text>
                </g>
              );
            })}

            {hoveredPoint && (
              <>
                <circle
                  cx={xScale(
                    hoveredPoint.displayMinSalary || hoveredPoint.minSalary
                  )}
                  cy={yScale(
                    hoveredPoint.displayMaxSalary || hoveredPoint.maxSalary
                  )}
                  r={hoveredPoint.type === "yourJob" ? "20" : "15"}
                  fill="none"
                  stroke={
                    hoveredPoint.type === "yourJob" ? "#145c32" : "#0a5c6b"
                  }
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={xScale(
                    hoveredPoint.displayMinSalary || hoveredPoint.minSalary
                  )}
                  cy={yScale(
                    hoveredPoint.displayMaxSalary || hoveredPoint.maxSalary
                  )}
                  r={hoveredPoint.type === "yourJob" ? "25" : "20"}
                  fill="none"
                  stroke={
                    hoveredPoint.type === "yourJob" ? "#145c32" : "#0a5c6b"
                  }
                  strokeWidth="1"
                  opacity="0.5"
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

          <CustomTooltip />
        </div>
      </div>
    );
  };

  const TableView = () => {
    const groupedData = groupByMarketPosition(enrichedData);

    const marketPositionSummary = {
      "Above Market": quadrantCounts.aboveMarket,
      "Below Market": quadrantCounts.belowMarket,
      "Mixed Market":
        quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax,
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
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <div>
            <h3 style={{ margin: "0 0 10px 0", color: "#374151" }}>
              Market Position Summary
            </h3>
            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              {Object.entries(marketPositionSummary).map(
                ([position, count]) => {
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
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 12px",
                        backgroundColor: positionData.bgColor,
                        borderRadius: "6px",
                        border: `1px solid ${positionData.color}40`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: positionData.color,
                        }}
                      >
                        {position}:{" "}
                        <span style={{ fontWeight: "700" }}>{count}</span>
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label
              style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}
            >
              Sort within groups by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                fontSize: "14px",
                cursor: "pointer",
                minWidth: "180px",
              }}
            >
              <option value="minRank">Minimum Salary Rank</option>
              <option value="maxRank">Maximum Salary Rank</option>
              <option value="range">Salary Range (Largest First)</option>
              <option value="marketPosition">Market Position</option>
            </select>
          </div>
        </div>

        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "13px",
            color: "#475569",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "600" }}>
            📊 Market Reference Points:
          </p>
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#8b5cf6",
                  borderRadius: "2px",
                }}
              ></div>
              <span>
                Average Min:{" "}
                <strong>
                  $
                  {avgMinSalary.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#8b5cf6",
                  borderRadius: "2px",
                }}
              ></div>
              <span>
                Average Max:{" "}
                <strong>
                  $
                  {avgMaxSalary.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#10b981",
                  borderRadius: "2px",
                }}
              ></div>
              <span>
                Median Min:{" "}
                <strong>
                  $
                  {medianMinSalary.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </strong>
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#10b981",
                  borderRadius: "2px",
                }}
              ></div>
              <span>
                Median Max:{" "}
                <strong>
                  $
                  {medianMaxSalary.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </strong>
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
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
              <div key={groupName} style={{ marginBottom: "20px" }}>
                <div
                  style={{
                    backgroundColor: groupBgColor,
                    padding: "12px 16px",
                    borderLeft: `4px solid ${groupColor}`,
                    borderTop: "1px solid #d1d5db",
                    borderRight: "1px solid #d1d5db",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        color: groupColor,
                      }}
                    >
                      {groupName}
                    </span>
                    <span
                      style={{
                        backgroundColor: groupColor,
                        color: "white",
                        borderRadius: "12px",
                        padding: "2px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {groupJobs.length} position
                      {groupJobs.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  {groupName !== "Your Position" && (
                    <div style={{ fontSize: "13px", color: "#6b7280" }}>
                      Click job titles in chart to view postings
                    </div>
                  )}
                </div>

                <table
                  style={{
                    width: "100%",
                    fontSize: "13px",
                    borderCollapse: "collapse",
                    fontFamily: "Arial, sans-serif",
                    borderBottom:
                      groupName !== "Below Market"
                        ? "2px solid #e5e7eb"
                        : "none",
                  }}
                >
                  <thead
                    style={{
                      backgroundColor: "#f3f4f6",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "12px",
                          textAlign: "left",
                          fontWeight: "bold",
                          backgroundColor: "#e5e7eb",
                          minWidth: "140px",
                        }}
                      >
                        Company
                      </th>
                      <th
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "12px",
                          textAlign: "left",
                          fontWeight: "bold",
                          backgroundColor: "#e5e7eb",
                          minWidth: "200px",
                        }}
                      >
                        Job Title
                      </th>
                      <th
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "12px",
                          textAlign: "right",
                          fontWeight: "bold",
                          backgroundColor: "#e5e7eb",
                          minWidth: "140px",
                        }}
                      >
                        Min Salary
                      </th>
                      <th
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "12px",
                          textAlign: "right",
                          fontWeight: "bold",
                          backgroundColor: "#e5e7eb",
                          minWidth: "140px",
                        }}
                      >
                        Max Salary
                      </th>
                      <th
                        style={{
                          border: "1px solid #d1d5db",
                          padding: "12px",
                          textAlign: "center",
                          fontWeight: "bold",
                          backgroundColor: "#e5e7eb",
                          minWidth: "140px",
                        }}
                      >
                        Market Position
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupJobs.map((job, idx) => (
                      <tr
                        key={idx}
                        style={
                          job.type === "yourJob"
                            ? {
                                backgroundColor: "#f0fdf4",
                                fontWeight: "600",
                                borderLeft: "4px solid #16a34a",
                              }
                            : idx % 2 === 0
                            ? { backgroundColor: "#f9fafb" }
                            : { backgroundColor: "white" }
                        }
                      >
                        <td
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px 12px",
                            position: "relative",
                          }}
                        >
                          {job.company}
                          {job.type === "yourJob" && (
                            <span
                              style={{
                                position: "absolute",
                                right: "8px",
                                color: "#16a34a",
                                fontWeight: "bold",
                              }}
                            >
                              ★
                            </span>
                          )}
                        </td>
                        <td
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px 12px",
                          }}
                        >
                          {job.title}
                        </td>
                        <td
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px 12px",
                            textAlign: "right",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontWeight:
                                  job.type === "yourJob" ? "bold" : "normal",
                                fontSize: "14px",
                              }}
                            >
                              ${job.minSalary.toLocaleString()}
                            </span>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: "2px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "600",
                                  color: job.minStatus.color,
                                }}
                              >
                                {job.minStatus.symbol}
                              </span>
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "600",
                                  color: job.minStatus.color,
                                }}
                              >
                                {job.minStatus.text} ({job.minStatus.difference}
                                )
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px 12px",
                            textAlign: "right",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "2px",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "monospace",
                                fontWeight:
                                  job.type === "yourJob" ? "bold" : "normal",
                                fontSize: "14px",
                              }}
                            >
                              ${job.maxSalary.toLocaleString()}
                            </span>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                gap: "2px",
                              }}
                            >
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "600",
                                  color: job.maxStatus.color,
                                }}
                              >
                                {job.maxStatus.symbol}
                              </span>
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: "600",
                                  color: job.maxStatus.color,
                                }}
                              >
                                {job.maxStatus.text} ({job.maxStatus.difference}
                                )
                              </span>
                            </div>
                          </div>
                        </td>
                        <td
                          style={{
                            border: "1px solid #d1d5db",
                            padding: "10px 12px",
                            textAlign: "center",
                            fontWeight: "600",
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

        <div
          style={{
            padding: "12px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "13px",
            color: "#475569",
            textAlign: "center",
          }}
        >
          <p style={{ margin: 0 }}>
            Showing {enrichedData.length} positions grouped by market position.
            Sort within groups using the dropdown above.
            <br />
            <span style={{ fontWeight: "600" }}>Color coding:</span>
            <span style={{ color: "#2563eb", marginLeft: "8px" }}>
              Above Market
            </span>{" "}
            •
            <span style={{ color: "#dc2626", marginLeft: "8px" }}>
              Below Market
            </span>{" "}
            •
            <span style={{ color: "#ca8a04", marginLeft: "8px" }}>
              Mixed Market
            </span>{" "}
            •
            <span style={{ color: "#8b5cf6", marginLeft: "8px" }}>
              Near Average
            </span>{" "}
            •
            <span style={{ color: "#16a34a", marginLeft: "8px" }}>
              Your Position
            </span>
          </p>
        </div>
      </div>
    );
  };

  const SummaryView = () => {
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
        Math.abs(job.minSalary - yourPosition.minSalary) /
        yourPosition.minSalary;
      const maxDiff =
        Math.abs(job.maxSalary - yourPosition.maxSalary) /
        yourPosition.maxSalary;
      return minDiff <= 0.15 && maxDiff <= 0.15;
    }).length;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#1f2937",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "10px",
            }}
          >
            📊 Key Market Insights
          </h2>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <h3
                style={{
                  color: "#374151",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                Market Overview
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #2563eb",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Average Salary Range
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    $
                    {avgMinSalary.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    - $
                    {avgMaxSalary.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Based on 30 comparable positions
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #10b981",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Median Salary Range
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    $
                    {medianMinSalary.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    - $
                    {medianMaxSalary.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Middle point of the market
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #8b5cf6",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px",
                    }}
                  >
                    Market Distribution
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#1f2937",
                    }}
                  >
                    {quadrantCounts.aboveMarket} above •{" "}
                    {quadrantCounts.nearAverage} near •{" "}
                    {quadrantCounts.belowMarket} below
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    {quadrantCounts.highMinLowMax +
                      quadrantCounts.lowMinHighMax}{" "}
                    mixed positions
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3
                style={{
                  color: "#374151",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                Your Position Analysis
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #16a34a",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#166534",
                      marginBottom: "4px",
                    }}
                  >
                    Your Salary Range
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#166534",
                    }}
                  >
                    ${yourPosition.minSalary.toLocaleString()} - $
                    {yourPosition.maxSalary.toLocaleString()}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#166534",
                      marginTop: "4px",
                    }}
                  >
                    Range: ${yourPosition.range.toLocaleString()}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #16a34a",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#166534",
                      marginBottom: "4px",
                    }}
                  >
                    Market Percentile
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#166534",
                    }}
                  >
                    Min: {yourMinPercentile}% • Max: {yourMaxPercentile}%
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#166534",
                      marginTop: "4px",
                    }}
                  >
                    Ranks {yourMinRank}/{totalPositions} for min, {yourMaxRank}/
                    {totalPositions} for max
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f0fdf4",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #16a34a",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#166534",
                      marginBottom: "4px",
                    }}
                  >
                    Similar Positions
                  </div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#166534",
                    }}
                  >
                    {positionsWithin15Percent} positions
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#166534",
                      marginTop: "4px",
                    }}
                  >
                    Within 15% of your salary range
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3
                style={{
                  color: "#374151",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                Key Insights
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "15px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#fef3c7",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #ca8a04",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#92400e",
                      marginBottom: "8px",
                    }}
                  >
                    Market Position
                  </div>
                  <div style={{ fontSize: "14px", color: "#92400e" }}>
                    Your position is in the{" "}
                    <strong>{yourPosition.marketPosition.label}</strong>{" "}
                    category.
                    {yourPosition.marketPosition.label === "Below Market" &&
                      " Consider negotiating for higher compensation."}
                    {yourPosition.marketPosition.label === "Above Market" &&
                      " You're in a strong position relative to the market."}
                    {yourPosition.marketPosition.label === "Near Average" &&
                      " Your compensation aligns with market standards."}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#dbeafe",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #2563eb",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1e40af",
                      marginBottom: "8px",
                    }}
                  >
                    Salary Spread
                  </div>
                  <div style={{ fontSize: "14px", color: "#1e40af" }}>
                    The market shows wide variation: minimum salaries range by $
                    {minSalarySpread.toLocaleString()}, and maximum salaries
                    range by ${maxSalarySpread.toLocaleString()}. This indicates
                    significant negotiation room at many companies.
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#f3e8ff",
                    padding: "16px",
                    borderRadius: "8px",
                    borderLeft: "4px solid #8b5cf6",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#6b21a8",
                      marginBottom: "8px",
                    }}
                  >
                    Competitive Analysis
                  </div>
                  <div style={{ fontSize: "14px", color: "#6b21a8" }}>
                    {quadrantCounts.aboveMarket} positions offer both higher
                    minimum and maximum salaries.
                    {quadrantCounts.nearAverage > 0 &&
                      ` ${quadrantCounts.nearAverage} positions are very close to market averages.`}
                    Your position is competitive with {positionsWithin15Percent}{" "}
                    similar opportunities.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3
                style={{
                  color: "#374151",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                Actionable Recommendations
              </h3>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <li style={{ fontSize: "14px", color: "#374151" }}>
                    <strong>Negotiation Strategy:</strong> Your minimum salary
                    is {yourPosition.minStatus.text.toLowerCase()} market
                    average.
                    {yourPosition.minStatus.text.includes("Below") &&
                      " Consider targeting the average minimum of $" +
                        avgMinSalary.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        }) +
                        " in negotiations."}
                    {yourPosition.minStatus.text.includes("Above") &&
                      " You have strong leverage for maintaining or improving your current compensation."}
                  </li>

                  <li style={{ fontSize: "14px", color: "#374151" }}>
                    <strong>Target Companies:</strong> Focus on the{" "}
                    {quadrantCounts.aboveMarket} companies in the "Above Market"
                    quadrant for maximum earning potential. These companies
                    offer both higher minimum and maximum salaries.
                  </li>

                  <li style={{ fontSize: "14px", color: "#374151" }}>
                    <strong>Salary Expectations:</strong> Based on market data,
                    a reasonable target range is $
                    {(avgMinSalary * 0.9).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}{" "}
                    - $
                    {(avgMaxSalary * 1.1).toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                    (10% below to 10% above market averages).
                  </li>

                  <li style={{ fontSize: "14px", color: "#374151" }}>
                    <strong>Growth Potential:</strong> The maximum salary at top
                    companies exceeds $
                    {Math.max(...maxSalaries).toLocaleString()}. With strong
                    performance, there's significant room for salary growth
                    beyond initial offers.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3
                style={{
                  color: "#374151",
                  marginBottom: "12px",
                  fontSize: "18px",
                }}
              >
                Market Distribution
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    flex: 1,
                    minWidth: "300px",
                  }}
                >
                  {[
                    {
                      label: "Above Market",
                      count: quadrantCounts.aboveMarket,
                      color: "#2563eb",
                      bgColor: "#dbeafe",
                    },
                    {
                      label: "Below Market",
                      count: quadrantCounts.belowMarket,
                      color: "#dc2626",
                      bgColor: "#fee2e2",
                    },
                    {
                      label: "Mixed Market",
                      count:
                        quadrantCounts.highMinLowMax +
                        quadrantCounts.lowMinHighMax,
                      color: "#ca8a04",
                      bgColor: "#fef3c7",
                    },
                    {
                      label: "Near Average",
                      count: quadrantCounts.nearAverage,
                      color: "#8b5cf6",
                      bgColor: "#f3e8ff",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: item.color,
                        }}
                      ></div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <span style={{ fontSize: "14px", color: "#374151" }}>
                            {item.label}
                          </span>
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: item.color,
                            }}
                          >
                            {item.count} positions
                          </span>
                        </div>
                        <div
                          style={{
                            height: "6px",
                            backgroundColor: "#e5e7eb",
                            borderRadius: "3px",
                            marginTop: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${
                                (item.count / comparisonData.length) * 100
                              }%`,
                              height: "100%",
                              backgroundColor: item.color,
                              borderRadius: "3px",
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    flex: 1,
                    minWidth: "300px",
                    backgroundColor: "#f8fafc",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "12px",
                    }}
                  >
                    Quick Stats
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        Total Positions Analyzed
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {comparisonData.length}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        Average Salary Range
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        $
                        {avgMinSalary.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}{" "}
                        - $
                        {avgMaxSalary.toLocaleString(undefined, {
                          maximumFractionDigits: 0,
                        })}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "8px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        Your Position Percentile
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#16a34a",
                        }}
                      >
                        Min: {yourMinPercentile}% • Max: {yourMaxPercentile}%
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ fontSize: "13px", color: "#6b7280" }}>
                        Positions Near Your Range
                      </span>
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#16a34a",
                        }}
                      >
                        {positionsWithin15Percent}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const GeographicView = () => {
    const [hoveredZone, setHoveredZone] = useState(null);

    // SVG path data for US states (simplified)
    const usStates = [
      // West Coast
      {
        id: "WA",
        name: "Washington",
        zone: "B",
        fill: "#93c5fd",
        d: "M 50 80 L 60 90 L 70 85 L 65 75 Z",
      },
      {
        id: "OR",
        name: "Oregon",
        zone: "B",
        fill: "#93c5fd",
        d: "M 50 100 L 60 110 L 70 105 L 65 95 Z",
      },
      {
        id: "CA",
        name: "California",
        zone: "A/B",
        fill: "#dc2626",
        d: "M 50 120 L 60 130 L 70 125 L 80 140 L 90 150 L 85 160 L 75 155 L 70 145 L 65 135 Z",
      },
      {
        id: "NV",
        name: "Nevada",
        zone: "C",
        fill: "#86efac",
        d: "M 100 120 L 110 130 L 120 125 L 115 115 Z",
      },
      {
        id: "AZ",
        name: "Arizona",
        zone: "C",
        fill: "#86efac",
        d: "M 100 140 L 110 150 L 120 145 L 115 135 Z",
      },

      // Mountain States
      {
        id: "MT",
        name: "Montana",
        zone: "C",
        fill: "#86efac",
        d: "M 120 80 L 130 90 L 140 85 L 135 75 Z",
      },
      {
        id: "ID",
        name: "Idaho",
        zone: "C",
        fill: "#86efac",
        d: "M 120 100 L 130 110 L 140 105 L 135 95 Z",
      },
      {
        id: "WY",
        name: "Wyoming",
        zone: "C",
        fill: "#86efac",
        d: "M 140 100 L 150 110 L 160 105 L 155 95 Z",
      },
      {
        id: "UT",
        name: "Utah",
        zone: "C",
        fill: "#86efac",
        d: "M 120 120 L 130 130 L 140 125 L 135 115 Z",
      },
      {
        id: "CO",
        name: "Colorado",
        zone: "C",
        fill: "#86efac",
        d: "M 140 120 L 150 130 L 160 125 L 155 115 Z",
      },
      {
        id: "NM",
        name: "New Mexico",
        zone: "C",
        fill: "#86efac",
        d: "M 120 140 L 130 150 L 140 145 L 135 135 Z",
      },

      // Midwest
      {
        id: "ND",
        name: "North Dakota",
        zone: "C",
        fill: "#86efac",
        d: "M 160 80 L 170 90 L 180 85 L 175 75 Z",
      },
      {
        id: "SD",
        name: "South Dakota",
        zone: "C",
        fill: "#86efac",
        d: "M 160 100 L 170 110 L 180 105 L 175 95 Z",
      },
      {
        id: "NE",
        name: "Nebraska",
        zone: "C",
        fill: "#86efac",
        d: "M 160 120 L 170 130 L 180 125 L 175 115 Z",
      },
      {
        id: "KS",
        name: "Kansas",
        zone: "C",
        fill: "#86efac",
        d: "M 160 140 L 170 150 L 180 145 L 175 135 Z",
      },
      {
        id: "OK",
        name: "Oklahoma",
        zone: "C",
        fill: "#86efac",
        d: "M 160 160 L 170 170 L 180 165 L 175 155 Z",
      },
      {
        id: "TX",
        name: "Texas",
        zone: "C",
        fill: "#86efac",
        d: "M 160 180 L 170 190 L 180 185 L 200 195 L 210 185 L 205 175 L 195 165 Z",
      },

      // Great Lakes
      {
        id: "MN",
        name: "Minnesota",
        zone: "C",
        fill: "#86efac",
        d: "M 180 80 L 190 90 L 200 85 L 195 75 Z",
      },
      {
        id: "WI",
        name: "Wisconsin",
        zone: "C",
        fill: "#86efac",
        d: "M 200 90 L 210 100 L 220 95 L 215 85 Z",
      },
      {
        id: "MI",
        name: "Michigan",
        zone: "C",
        fill: "#86efac",
        d: "M 220 90 L 230 100 L 240 95 L 235 85 Z",
      },
      {
        id: "IL",
        name: "Illinois",
        zone: "C",
        fill: "#86efac",
        d: "M 200 110 L 210 120 L 220 115 L 215 105 Z",
      },
      {
        id: "IN",
        name: "Indiana",
        zone: "C",
        fill: "#86efac",
        d: "M 220 110 L 230 120 L 240 115 L 235 105 Z",
      },
      {
        id: "OH",
        name: "Ohio",
        zone: "C",
        fill: "#86efac",
        d: "M 240 110 L 250 120 L 260 115 L 255 105 Z",
      },
      {
        id: "MO",
        name: "Missouri",
        zone: "C",
        fill: "#86efac",
        d: "M 200 130 L 210 140 L 220 135 L 215 125 Z",
      },
      {
        id: "AR",
        name: "Arkansas",
        zone: "C",
        fill: "#86efac",
        d: "M 200 150 L 210 160 L 220 155 L 215 145 Z",
      },
      {
        id: "LA",
        name: "Louisiana",
        zone: "C",
        fill: "#86efac",
        d: "M 200 170 L 210 180 L 220 175 L 215 165 Z",
      },

      // East Coast
      {
        id: "KY",
        name: "Kentucky",
        zone: "C",
        fill: "#86efac",
        d: "M 240 130 L 250 140 L 260 135 L 255 125 Z",
      },
      {
        id: "TN",
        name: "Tennessee",
        zone: "C",
        fill: "#86efac",
        d: "M 240 150 L 250 160 L 260 155 L 255 145 Z",
      },
      {
        id: "MS",
        name: "Mississippi",
        zone: "C",
        fill: "#86efac",
        d: "M 240 170 L 250 180 L 260 175 L 255 165 Z",
      },
      {
        id: "AL",
        name: "Alabama",
        zone: "C",
        fill: "#86efac",
        d: "M 240 190 L 250 200 L 260 195 L 255 185 Z",
      },
      {
        id: "GA",
        name: "Georgia",
        zone: "C",
        fill: "#86efac",
        d: "M 260 190 L 270 200 L 280 195 L 275 185 Z",
      },
      {
        id: "FL",
        name: "Florida",
        zone: "C",
        fill: "#86efac",
        d: "M 260 210 L 270 220 L 290 230 L 285 240 L 275 235 L 270 225 Z",
      },

      // Northeast
      {
        id: "NY",
        name: "New York",
        zone: "B",
        fill: "#93c5fd",
        d: "M 280 90 L 290 100 L 300 95 L 295 85 Z",
      },
      {
        id: "PA",
        name: "Pennsylvania",
        zone: "B",
        fill: "#93c5fd",
        d: "M 280 110 L 290 120 L 300 115 L 295 105 Z",
      },
      {
        id: "NJ",
        name: "New Jersey",
        zone: "B",
        fill: "#93c5fd",
        d: "M 300 110 L 310 120 L 320 115 L 315 105 Z",
      },
      {
        id: "MD",
        name: "Maryland",
        zone: "B",
        fill: "#93c5fd",
        d: "M 300 130 L 310 140 L 320 135 L 315 125 Z",
      },
      {
        id: "DC",
        name: "Washington DC",
        zone: "B",
        fill: "#93c5fd",
        d: "M 310 130 L 315 135 L 320 130 L 315 125 Z",
      },
      {
        id: "VA",
        name: "Virginia",
        zone: "B",
        fill: "#93c5fd",
        d: "M 300 150 L 310 160 L 320 155 L 315 145 Z",
      },
      {
        id: "WV",
        name: "West Virginia",
        zone: "C",
        fill: "#86efac",
        d: "M 280 130 L 290 140 L 300 135 L 295 125 Z",
      },
      {
        id: "NC",
        name: "North Carolina",
        zone: "C",
        fill: "#86efac",
        d: "M 300 170 L 310 180 L 320 175 L 315 165 Z",
      },
      {
        id: "SC",
        name: "South Carolina",
        zone: "C",
        fill: "#86efac",
        d: "M 300 190 L 310 200 L 320 195 L 315 185 Z",
      },
      {
        id: "MA",
        name: "Massachusetts",
        zone: "B",
        fill: "#93c5fd",
        d: "M 320 90 L 330 100 L 340 95 L 335 85 Z",
      },
      {
        id: "CT",
        name: "Connecticut",
        zone: "B",
        fill: "#93c5fd",
        d: "M 320 110 L 330 120 L 340 115 L 335 105 Z",
      },
      {
        id: "RI",
        name: "Rhode Island",
        zone: "B",
        fill: "#93c5fd",
        d: "M 330 110 L 335 115 L 340 110 L 335 105 Z",
      },
      {
        id: "NH",
        name: "New Hampshire",
        zone: "B",
        fill: "#93c5fd",
        d: "M 320 130 L 330 140 L 340 135 L 335 125 Z",
      },
      {
        id: "VT",
        name: "Vermont",
        zone: "B",
        fill: "#93c5fd",
        d: "M 320 150 L 330 160 L 340 155 L 335 145 Z",
      },
      {
        id: "ME",
        name: "Maine",
        zone: "C",
        fill: "#86efac",
        d: "M 340 90 L 350 100 L 360 95 L 355 85 Z",
      },
    ];

    // City coordinates for markers
    const cityMarkers = [
      // Zone A - San Francisco Bay Area
      { name: "San Francisco", zone: "A", x: 65, y: 135, color: "#dc2626" },
      { name: "San Jose", zone: "A", x: 70, y: 145, color: "#dc2626" },

      // Zone B - Other major cities
      { name: "Seattle", zone: "B", x: 60, y: 85, color: "#2563eb" },
      { name: "Sacramento", zone: "B", x: 75, y: 130, color: "#2563eb" },
      { name: "Los Angeles", zone: "B", x: 85, y: 155, color: "#2563eb" },
      { name: "San Diego", zone: "B", x: 90, y: 160, color: "#2563eb" },
      { name: "Boston", zone: "B", x: 335, y: 100, color: "#2563eb" },
      { name: "New York", zone: "B", x: 295, y: 110, color: "#2563eb" },
      { name: "Washington DC", zone: "B", x: 315, y: 135, color: "#2563eb" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#1f2937",
              borderBottom: "2px solid #e5e7eb",
              paddingBottom: "10px",
            }}
          >
            🗺️ Geographic Pay Zones
          </h2>

          <div style={{ marginBottom: "24px" }}>
            <p
              style={{ fontSize: "15px", color: "#6b7280", lineHeight: "1.6" }}
            >
              Tech companies adjust salaries based on geographic location to
              account for cost of living differences. Understanding these zones
              helps you evaluate whether a salary offer is competitive for a
              specific location.
            </p>
          </div>

          {/* Zone Legend */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              marginBottom: "30px",
            }}
          >
            {Object.entries(geographicZones).map(([zone, data]) => (
              <div
                key={zone}
                style={{
                  flex: "1",
                  minWidth: "200px",
                  backgroundColor: data.bgColor,
                  padding: "16px",
                  borderRadius: "8px",
                  border: `2px solid ${data.color}`,
                  transition: "transform 0.2s",
                  transform: hoveredZone === zone ? "translateY(-4px)" : "none",
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredZone(zone)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: data.color,
                    }}
                  ></div>
                  <h3
                    style={{ margin: 0, color: data.color, fontSize: "18px" }}
                  >
                    {zone}
                  </h3>
                </div>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  {data.description}
                </p>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  <strong>Salary Adjustment:</strong> {data.salaryAdjustment}
                </p>
                <p
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "14px",
                    color: "#6b7280",
                  }}
                >
                  <strong>Estimated Salary Range:</strong> {data.salaryRange}
                </p>
                <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>
                  <strong>Key Areas:</strong>{" "}
                  {data.cities.slice(0, 3).join(", ")}
                  {data.cities.length > 3 && "..."}
                </p>
              </div>
            ))}
          </div>

          {/* US Map Visualization */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "30px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h3
              style={{
                marginBottom: "16px",
                color: "#374151",
                fontSize: "18px",
              }}
            >
              US Geographic Pay Zone Map
            </h3>

            <div style={{ position: "relative" }}>
              <svg
                width="100%"
                height="500"
                viewBox="0 0 400 250"
                style={{ backgroundColor: "#f1f5f9", borderRadius: "8px" }}
              >
                {/* Draw state outlines */}
                {usStates.map((state) => (
                  <path
                    key={state.id}
                    d={state.d}
                    fill={state.fill}
                    stroke="#ffffff"
                    strokeWidth="1"
                    opacity="0.8"
                    style={{ cursor: "pointer" }}
                  />
                ))}

                {/* Draw city markers */}
                {cityMarkers.map((city) => (
                  <g key={city.name}>
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="4"
                      fill={city.color}
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r="6"
                      fill="none"
                      stroke={city.color}
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.5"
                    >
                      <animate
                        attributeName="r"
                        values="6;10;6"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.5;0.2;0.5"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}

                {/* Zone labels */}
                <text
                  x="65"
                  y="125"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#dc2626"
                >
                  Zone A: SF Bay Area
                </text>
                <text
                  x="60"
                  y="75"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#2563eb"
                >
                  Zone B: Seattle
                </text>
                <text
                  x="85"
                  y="145"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#2563eb"
                >
                  Zone B: LA/SD
                </text>
                <text
                  x="295"
                  y="100"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#2563eb"
                >
                  Zone B: NYC
                </text>
                <text
                  x="315"
                  y="125"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#2563eb"
                >
                  Zone B: DC
                </text>
                <text
                  x="335"
                  y="90"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#2563eb"
                >
                  Zone B: Boston
                </text>

                {/* Map title */}
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

              {/* Map legend */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  backgroundColor: "white",
                  padding: "12px",
                  borderRadius: "6px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Map Legend
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#dc2626",
                        borderRadius: "2px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px" }}>
                      Zone A (SF Bay Area)
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#93c5fd",
                        borderRadius: "2px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px" }}>Zone B States</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        backgroundColor: "#86efac",
                        borderRadius: "2px",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px" }}>Zone C States</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#2563eb",
                        borderRadius: "50%",
                      }}
                    ></div>
                    <span style={{ fontSize: "11px" }}>Zone B Cities</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                fontSize: "13px",
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              💡 The map shows the three geographic pay zones. Zone A (San
              Francisco Bay Area) commands the highest salaries, followed by
              Zone B (major metropolitan areas), with Zone C representing all
              other areas at market rates.
            </div>
          </div>

          {/* Detailed Zone Information */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            {Object.entries(geographicZones).map(([zone, data]) => (
              <div
                key={zone}
                style={{
                  backgroundColor: data.bgColor,
                  padding: "20px",
                  borderRadius: "8px",
                  border: `1px solid ${data.color}40`,
                }}
              >
                <h4
                  style={{
                    margin: "0 0 12px 0",
                    color: data.color,
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: data.color,
                      borderRadius: "50%",
                    }}
                  ></div>
                  {zone}: {data.description}
                </h4>

                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Salary Adjustment
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: data.color,
                    }}
                  >
                    {data.salaryAdjustment}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    Estimated: {data.salaryRange}
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Key Cities
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    {data.cities.map((city, index) => (
                      <div key={index} style={{ padding: "2px 0" }}>
                        • {city}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#374151",
                      marginBottom: "4px",
                    }}
                  >
                    Typical Employers
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    {data.keyEmployers.slice(0, 3).map((employer, index) => (
                      <span
                        key={index}
                        style={{
                          display: "inline-block",
                          backgroundColor: `${data.color}20`,
                          padding: "2px 6px",
                          borderRadius: "4px",
                          margin: "0 4px 4px 0",
                          border: `1px solid ${data.color}40`,
                        }}
                      >
                        {employer}
                      </span>
                    ))}
                    {data.keyEmployers.length > 3 && (
                      <span style={{ fontSize: "12px", color: data.color }}>
                        +{data.keyEmployers.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Salary Comparison Table */}
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#f3f4f6",
                padding: "16px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h4 style={{ margin: 0, color: "#374151", fontSize: "16px" }}>
                Salary Comparison by Geographic Zone
              </h4>
              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: "13px",
                  color: "#6b7280",
                }}
              >
                Based on market average of $
                {avgMinSalary.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}{" "}
                - $
                {avgMaxSalary.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>

            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f9fafb" }}>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Zone
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "left",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Estimated Min Salary
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Estimated Max Salary
                  </th>
                  <th
                    style={{
                      padding: "12px",
                      textAlign: "center",
                      borderBottom: "1px solid #e5e7eb",
                      fontWeight: "600",
                      color: "#374151",
                    }}
                  >
                    Adjustment
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(geographicZones).map(([zone, data]) => (
                  <tr
                    key={zone}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      backgroundColor:
                        hoveredZone === zone ? `${data.bgColor}80` : "white",
                    }}
                    onMouseEnter={() => setHoveredZone(zone)}
                    onMouseLeave={() => setHoveredZone(null)}
                  >
                    <td
                      style={{
                        padding: "12px",
                        fontWeight: "600",
                        color: data.color,
                        borderLeft: `4px solid ${data.color}`,
                      }}
                    >
                      {zone}
                    </td>
                    <td style={{ padding: "12px", color: "#374151" }}>
                      {data.description}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      ${zoneStatistics[zone].avgMinSalary.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        textAlign: "right",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      ${zoneStatistics[zone].avgMaxSalary.toLocaleString()}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-block",
                          backgroundColor: data.bgColor,
                          color: data.color,
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontWeight: "600",
                          fontSize: "12px",
                          border: `1px solid ${data.color}40`,
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
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              backgroundColor: "#f0f9ff",
              borderRadius: "8px",
              border: "1px solid #bae6fd",
            }}
          >
            <h4
              style={{
                margin: "0 0 12px 0",
                color: "#0369a1",
                fontSize: "16px",
              }}
            >
              💡 Key Geographic Insights
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                <strong>Zone A (San Francisco Bay Area):</strong> Commands the
                highest salaries due to extreme cost of living and concentration
                of tech giants. Expect 30%+ premium over national averages.
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                <strong>Zone B (Major Metro Areas):</strong> High-cost cities
                with strong tech presence. Salaries typically 15-25% above
                national averages to offset living costs.
              </p>
              <p style={{ margin: 0, fontSize: "14px", color: "#374151" }}>
                <strong>Zone C (All Other Areas):</strong> Market-rate salaries
                with lower cost of living. Remote positions often adjust based
                on employee location rather than company HQ.
              </p>
              <p
                style={{
                  margin: "12px 0 0 0",
                  fontSize: "14px",
                  color: "#374151",
                  fontWeight: "600",
                }}
              >
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

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          padding: "32px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 48px)",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "12px",
            color: "#1f2937",
          }}
        >
          Product/UX Designer Salary Analysis (5+ Years Experience)
        </h1>
        <p
          style={{
            fontSize: "16px",
            textAlign: "center",
            marginBottom: "32px",
            color: "#6b7280",
            maxWidth: "1000px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Market comparison of 30 positions with similar experience
          requirements.
          <br />
          Colored quadrants and dots show market positioning relative to
          averages.
        </p>

        <div
          style={{
            display: "flex",
            borderBottom: "2px solid #e5e7eb",
            marginBottom: "24px",
          }}
        >
          <button
            style={{
              padding: "12px 28px",
              fontWeight: "600",
              borderBottom:
                activeTab === "chart" ? "3px solid #3b82f6" : "none",
              color: activeTab === "chart" ? "#2563eb" : "#6b7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.2s",
              marginBottom: "-1px",
            }}
            onClick={() => setActiveTab("chart")}
          >
            📊 Chart View
          </button>
          <button
            style={{
              padding: "12px 28px",
              fontWeight: "600",
              borderBottom:
                activeTab === "table" ? "3px solid #3b82f6" : "none",
              color: activeTab === "table" ? "#2563eb" : "#6b7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.2s",
              marginBottom: "-1px",
            }}
            onClick={() => setActiveTab("table")}
          >
            📋 Table View
          </button>
          <button
            style={{
              padding: "12px 28px",
              fontWeight: "600",
              borderBottom:
                activeTab === "summary" ? "3px solid #3b82f6" : "none",
              color: activeTab === "summary" ? "#2563eb" : "#6b7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.2s",
              marginBottom: "-1px",
            }}
            onClick={() => setActiveTab("summary")}
          >
            📈 Summary & Insights
          </button>
          <button
            style={{
              padding: "12px 28px",
              fontWeight: "600",
              borderBottom:
                activeTab === "geographic" ? "3px solid #3b82f6" : "none",
              color: activeTab === "geographic" ? "#2563eb" : "#6b7280",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "all 0.2s",
              marginBottom: "-1px",
            }}
            onClick={() => setActiveTab("geographic")}
          >
            🗺️ Geographic Pay Zones
          </button>
        </div>

        <div style={{ flex: 1, overflow: "hidden", minHeight: "600px" }}>
          {activeTab === "chart" ? (
            <ChartView />
          ) : activeTab === "table" ? (
            <TableView />
          ) : activeTab === "summary" ? (
            <SummaryView />
          ) : (
            <GeographicView />
          )}
        </div>

        {activeTab === "chart" && (
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{
                  flex: 1,
                  minWidth: "300px",
                  backgroundColor: "#dbeafe",
                  border: "1px solid #93c5fd",
                  borderRadius: "10px",
                  padding: "20px",
                  fontSize: "14px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#1e40af",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Above Market ({quadrantCounts.aboveMarket} positions)
                </p>
                <p style={{ color: "#1e40af", lineHeight: "1.6" }}>
                  Positions with <strong>blue dots</strong> have both minimum
                  and maximum salaries <strong>above market averages</strong>.
                  <br />
                  <strong>Color intensity:</strong> Lighter blue = closer to
                  market average, Darker blue = farther from market average
                </p>
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: "300px",
                  backgroundColor: "#fee2e2",
                  border: "1px solid #fca5a5",
                  borderRadius: "10px",
                  padding: "20px",
                  fontSize: "14px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#991b1b",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Below Market ({quadrantCounts.belowMarket} positions)
                </p>
                <p style={{ color: "#991b1b", lineHeight: "1.6" }}>
                  Positions with <strong>red dots</strong> have both minimum and
                  maximum salaries <strong>below market averages</strong>.
                  <br />
                  <strong>Color intensity:</strong> Lighter red = closer to
                  market average, Darker red = farther from market average
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              <div
                style={{
                  flex: 1,
                  minWidth: "300px",
                  backgroundColor: "#fef3c7",
                  border: "1px solid #fde68a",
                  borderRadius: "10px",
                  padding: "20px",
                  fontSize: "14px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#92400e",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Mixed Market (
                  {quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax}{" "}
                  positions)
                </p>
                <p style={{ color: "#92400e", lineHeight: "1.6" }}>
                  Positions with <strong>yellow dots</strong> have one salary
                  component above average and one below.
                  <br />
                  <strong>Color intensity:</strong> Lighter yellow = closer to
                  market average, Darker yellow = farther from market average
                </p>
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: "300px",
                  backgroundColor: "#f3e8ff",
                  border: "1px solid #d8b4fe",
                  borderRadius: "10px",
                  padding: "20px",
                  fontSize: "14px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    color: "#6b21a8",
                    marginBottom: "8px",
                    fontSize: "16px",
                  }}
                >
                  Near Average ({quadrantCounts.nearAverage} positions)
                </p>
                <p style={{ color: "#6b21a8", lineHeight: "1.6" }}>
                  Positions with <strong>purple dots</strong> are within 10% of
                  the market average range.
                  <br />
                  <strong>Color intensity:</strong> Light purple = very close to
                  market average, Darker purple = closer to edge of purple zone
                  <br />
                  The <strong>light purple circle</strong> shows this proximity
                  zone around the market average point.
                </p>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "15px",
                fontSize: "13px",
                color: "#475569",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "6px" }}>
                📈 Market Analysis Summary:
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>
                  <strong>Total Comparison Positions:</strong> 30
                </li>
                <li>
                  <strong>Above Market:</strong> {quadrantCounts.aboveMarket}{" "}
                  positions (darker blue = farther from average)
                </li>
                <li>
                  <strong>Below Market:</strong> {quadrantCounts.belowMarket}{" "}
                  positions (darker red = farther from average)
                </li>
                <li>
                  <strong>Mixed Market:</strong>{" "}
                  {quadrantCounts.highMinLowMax + quadrantCounts.lowMinHighMax}{" "}
                  positions (darker yellow = farther from average)
                </li>
                <li>
                  <strong>Near Average:</strong> {quadrantCounts.nearAverage}{" "}
                  positions (within purple zone)
                </li>
                <li>
                  <strong>Average Market Minimum:</strong> $
                  {avgMinSalary.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </li>
                <li>
                  <strong>Average Market Maximum:</strong> $
                  {avgMaxSalary.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </li>
                <li>
                  <strong>Click anywhere on the chart</strong> to open the job
                  posting for the currently hovered position
                </li>
                <li>
                  <strong>Dot labels:</strong> First two letters of company name
                  (CP = ClassPass, F1/F2 = overlapping positions)
                </li>
                <li>
                  <strong>Note:</strong> Overlapping points (Frontline Education
                  and Uplight) are slightly offset with connecting lines for
                  visibility
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalaryAnalysis;
