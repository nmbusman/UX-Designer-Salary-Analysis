// Helper functions
export const generateDotLabels = (jobData) => {
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

export const adjustOverlappingPoints = (enrichedData) => {
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

export const getMarketPosition = (
  job,
  avgMinSalary,
  avgMaxSalary,
  purpleZoneRadius
) => {
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

export const getComparisonStatus = (value, average) => {
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

export const getColorIntensity = (
  baseColor,
  distance,
  maxDistanceFromAverage,
  isNearAverage = false,
  purpleZoneRadius
) => {
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
