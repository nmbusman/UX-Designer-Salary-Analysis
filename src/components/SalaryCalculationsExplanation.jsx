// SalaryCalculationsExplanation.jsx
import React, { useState } from "react";
import { jobData } from "../utils/data.js";
import { calculateStatistics, countQuadrants } from "../utils/calculations.js";

const SalaryCalculationsExplanation = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const stats = calculateStatistics(jobData);
  const quadrants = countQuadrants(
    jobData.filter((job) => job.type === "comparison"),
    stats.avgMinSalary,
    stats.avgMaxSalary,
    stats.purpleZoneRadius
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
      num
    );
  };

  const sections = [
    {
      id: "average-calc",
      title: "Average Salary Calculation",
      icon: "🧮",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Dataset Used</h4>
            <p className="text-gray-700">
              Analysis based on{" "}
              <span className="font-semibold">
                {stats.comparisonData.length} comparable UX/Product Designer
                roles
              </span>{" "}
              from established companies.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              All salaries are annual base compensation in USD for roles in the
              United States.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-medium text-blue-900 mb-2">
                Average Minimum Salary
              </h4>
              <p className="text-2xl font-bold text-blue-800">
                {formatCurrency(stats.avgMinSalary)}
              </p>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Formula: Sum of all min salaries ÷{" "}
                  {stats.comparisonData.length} positions
                </p>
                <p className="mt-1">
                  Total sum:{" "}
                  {formatCurrency(stats.minSalaries.reduce((a, b) => a + b, 0))}
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h4 className="font-medium text-purple-900 mb-2">
                Average Maximum Salary
              </h4>
              <p className="text-2xl font-bold text-purple-800">
                {formatCurrency(stats.avgMaxSalary)}
              </p>
              <div className="mt-2 text-sm text-purple-700">
                <p>
                  Formula: Sum of all max salaries ÷{" "}
                  {stats.comparisonData.length} positions
                </p>
                <p className="mt-1">
                  Total sum:{" "}
                  {formatCurrency(stats.maxSalaries.reduce((a, b) => a + b, 0))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Average Salary Range
            </h4>
            <p className="text-lg font-semibold text-gray-800">
              {formatCurrency(stats.avgMinSalary)} –{" "}
              {formatCurrency(stats.avgMaxSalary)}
            </p>
            <p className="text-gray-700 mt-1">
              This represents the typical compensation band for Senior
              Product/UX Designer positions in the current market.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "median-calc",
      title: "Median Salary Calculation",
      icon: "📊",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              What is the Median?
            </h4>
            <p className="text-gray-700">
              The median is the middle value when all salaries are sorted in
              ascending order. Unlike the average, it's not affected by extreme
              outliers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-900 mb-2">
                Median Minimum Salary
              </h4>
              <p className="text-2xl font-bold text-green-800">
                {formatCurrency(stats.medianMinSalary)}
              </p>
              <div className="mt-2 text-sm text-green-700">
                <p>Calculation method:</p>
                <ol className="list-decimal pl-4 mt-1 space-y-1">
                  <li>
                    Sort all {stats.comparisonData.length} minimum salaries from
                    low to high
                  </li>
                  <li>
                    Select the middle value (position{" "}
                    {Math.floor(stats.comparisonData.length / 2) + 1})
                  </li>
                </ol>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-medium text-green-900 mb-2">
                Median Maximum Salary
              </h4>
              <p className="text-2xl font-bold text-green-800">
                {formatCurrency(stats.medianMaxSalary)}
              </p>
              <div className="mt-2 text-sm text-green-700">
                <p>Calculation method:</p>
                <ol className="list-decimal pl-4 mt-1 space-y-1">
                  <li>
                    Sort all {stats.comparisonData.length} maximum salaries from
                    low to high
                  </li>
                  <li>
                    Select the middle value (position{" "}
                    {Math.floor(stats.comparisonData.length / 2) + 1})
                  </li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Why Both Average and Median Matter
            </h4>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <span className="font-semibold">Average</span> shows the mean
                  compensation across all roles
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  <span className="font-semibold">Median</span> shows the true
                  middle point, unaffected by extreme high or low salaries
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>
                  Together they provide a comprehensive view of market
                  compensation
                </span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: "market-zones",
      title: "Market Position Definitions",
      icon: "📍",
      content: (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              The "Purple Zone" (At Market Rate)
            </h4>
            <div className="flex items-center mb-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
              <p className="font-medium text-gray-800">
                Definition: Within 10% of the average range
              </p>
            </div>
            <p className="text-gray-700">
              The purple zone radius is calculated as:{" "}
              <span className="font-semibold">
                10% of the average salary range
              </span>
            </p>
            <div className="mt-3 p-3 bg-purple-100 rounded">
              <p className="text-sm font-medium text-purple-800">
                Purple Zone Radius = (Average Max - Average Min) × 0.10
              </p>
              <p className="text-sm text-purple-700 mt-1">
                Current radius:{" "}
                {formatCurrency(stats.avgMaxSalary - stats.avgMinSalary)} × 0.10
                = {formatCurrency(stats.purpleZoneRadius)}
              </p>
            </div>
            <p className="text-gray-700 mt-3">
              Any salary range where both min and max fall within this radius
              from the average point is considered "At Market Rate".
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">
              Market Position Categories
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <h5 className="font-medium text-red-900">Above Market</h5>
                </div>
                <p className="text-sm text-red-800">
                  Both minimum and maximum salaries are above the market average
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Current count: {quadrants.aboveMarket} positions (
                  {formatNumber(
                    (quadrants.aboveMarket / stats.comparisonData.length) * 100
                  )}
                  %)
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <h5 className="font-medium text-green-900">Below Market</h5>
                </div>
                <p className="text-sm text-green-800">
                  Both minimum and maximum salaries are below the market average
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Current count: {quadrants.belowMarket} positions (
                  {formatNumber(
                    (quadrants.belowMarket / stats.comparisonData.length) * 100
                  )}
                  %)
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <h5 className="font-medium text-yellow-900">
                    High Min, Low Max
                  </h5>
                </div>
                <p className="text-sm text-yellow-800">
                  Minimum is above average, but maximum is below average
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Current count: {quadrants.highMinLowMax} positions (
                  {formatNumber(
                    (quadrants.highMinLowMax / stats.comparisonData.length) *
                      100
                  )}
                  %)
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <h5 className="font-medium text-blue-900">
                    Low Min, High Max
                  </h5>
                </div>
                <p className="text-sm text-blue-800">
                  Minimum is below average, but maximum is above average
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Current count: {quadrants.lowMinHighMax} positions (
                  {formatNumber(
                    (quadrants.lowMinHighMax / stats.comparisonData.length) *
                      100
                  )}
                  %)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Distance Calculation
            </h4>
            <p className="text-gray-700 text-sm mb-3">
              Each position's distance from the market average is calculated
              using the Euclidean distance formula:
            </p>
            <div className="p-3 bg-gray-100 rounded">
              <code className="text-sm font-mono text-gray-800">
                distance = √[(minSalary - avgMin)² + (maxSalary - avgMax)²]
              </code>
            </div>
            <p className="text-gray-700 text-sm mt-3">
              This distance determines how far a position is from the market
              center and affects the color intensity in the visualization.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "methodology",
      title: "Data Methodology",
      icon: "🔍",
      content: (
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Data Collection</h4>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  All data sourced from official company career pages and
                  LinkedIn job postings
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  Only includes roles with explicitly stated salary ranges
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  Focus on Senior/Lead Product Designer and UX Designer roles
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  Data collected within the last 30 days to ensure current
                  market relevance
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Exclusions & Limitations
            </h4>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>
                  Does not include equity, bonuses, or other non-base
                  compensation
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>Limited to U.S.-based roles</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <span>
                  Geographic cost-of-living adjustments are not factored into
                  this analysis
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Sample Size & Statistical Significance
            </h4>
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-700">Total positions analyzed:</p>
              <p className="font-bold text-gray-900">
                {stats.comparisonData.length}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-700">Average salary range spread:</p>
              <p className="font-bold text-gray-900">
                {formatCurrency(stats.avgMaxSalary - stats.avgMinSalary)}
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-3">
              This sample size provides a representative view of the current
              UX/Product Designer market compensation landscape.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Salary Analysis Methodology
        </h1>
        <p className="text-gray-600">
          A transparent breakdown of how market salaries are calculated and
          visualized
        </p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <span className="font-semibold">Purpose:</span> This analysis
            provides an objective, data-driven basis for salary negotiations by
            comparing your offer against current market rates for comparable
            positions.
          </p>
        </div>
      </div>

      {/* Key Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Average Range</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(stats.avgMinSalary)} –{" "}
            {formatCurrency(stats.avgMaxSalary)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Median Range</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(stats.medianMinSalary)} –{" "}
            {formatCurrency(stats.medianMaxSalary)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Positions</p>
          <p className="text-xl font-bold text-gray-900">
            {stats.comparisonData.length}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500">At Market Rate</p>
          <p className="text-xl font-bold text-gray-900">
            {quadrants.nearAverage} positions
          </p>
        </div>
      </div>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`border rounded-lg transition-all duration-300 ${
              expandedSection === section.id
                ? "border-blue-300 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center">
                <span className="text-2xl mr-4">{section.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {section.title}
                </h3>
              </div>
              <span className="text-gray-500 text-2xl">
                {expandedSection === section.id ? "−" : "+"}
              </span>
            </button>

            {expandedSection === section.id && (
              <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer/Conclusion */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          How to Use This Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-900 mb-2">
              1. Reference Point
            </h4>
            <p className="text-sm text-gray-700">
              Use the average and median as objective reference points for
              market compensation
            </p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-900 mb-2">
              2. Position Context
            </h4>
            <p className="text-sm text-gray-700">
              Understand where your offer falls relative to similar positions
              and companies
            </p>
          </div>
          <div className="p-3 bg-white rounded border">
            <h4 className="font-medium text-gray-900 mb-2">
              3. Negotiation Framework
            </h4>
            <p className="text-sm text-gray-700">
              Use the data to justify salary expectations with concrete market
              evidence
            </p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm text-gray-600 italic">
            This analysis is based on publicly available salary data and is
            intended for informational purposes. Actual compensation may vary
            based on experience, location, and other factors.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculationsExplanation;
