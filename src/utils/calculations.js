import { generateDotLabels, adjustOverlappingPoints } from "./helpers";
import { getMarketPosition, getComparisonStatus } from "./helpers";
import { getColorIntensity } from "./helpers";

export const calculateStatistics = (jobData) => {
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

  return {
    comparisonData,
    minSalaries,
    maxSalaries,
    avgMinSalary,
    avgMaxSalary,
    medianMinSalary,
    medianMaxSalary,
    purpleZoneRadius,
    maxDistanceFromAverage,
  };
};

export const calculateMarketPositions = (
  jobData,
  avgMinSalary,
  avgMaxSalary,
  purpleZoneRadius,
  maxDistanceFromAverage
) => {
  const dotLabels = generateDotLabels(jobData);

  const enrichedData = jobData.map((job) => {
    const sortedByMin = [...jobData].sort((a, b) => a.minSalary - b.minSalary);
    const sortedByMax = [...jobData].sort((a, b) => a.maxSalary - b.maxSalary);

    const minRank = sortedByMin.findIndex((j) => j.id === job.id) + 1;
    const maxRank = sortedByMax.findIndex((j) => j.id === job.id) + 1;

    const marketPosition = getMarketPosition(
      job,
      avgMinSalary,
      avgMaxSalary,
      purpleZoneRadius
    );

    const minStatus = getComparisonStatus(job.minSalary, avgMinSalary);
    const maxStatus = getComparisonStatus(job.maxSalary, avgMaxSalary);

    const distanceFromAvg = Math.sqrt(
      Math.pow(job.minSalary - avgMinSalary, 2) +
        Math.pow(job.maxSalary - avgMaxSalary, 2)
    );

    const dotColor = getColorIntensity(
      marketPosition.baseColor,
      distanceFromAvg,
      maxDistanceFromAverage,
      marketPosition.isNearAverage,
      purpleZoneRadius
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

  return adjustOverlappingPoints(enrichedData);
};

export const countQuadrants = (
  comparisonData,
  avgMinSalary,
  avgMaxSalary,
  purpleZoneRadius
) => {
  let aboveMarket = 0;
  let belowMarket = 0;
  let highMinLowMax = 0;
  let lowMinHighMax = 0;
  let nearAverage = 0;

  comparisonData.forEach((job) => {
    const marketPosition = getMarketPosition(
      job,
      avgMinSalary,
      avgMaxSalary,
      purpleZoneRadius
    );

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

export const groupByMarketPosition = (data, sortBy) => {
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
