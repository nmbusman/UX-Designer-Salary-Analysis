import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import "./GeographicView.css";

const GeographicView = ({ geographicZones, avgMinSalary, avgMaxSalary }) => {
  const [hoveredZone, setHoveredZone] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);

  // Update salary ranges in zones
  const updatedZones = { ...geographicZones };
  Object.keys(updatedZones).forEach((zone) => {
    updatedZones[zone].salaryRange = `$${Math.round(
      avgMinSalary * updatedZones[zone].avgSalaryPremium
    ).toLocaleString()} - $${Math.round(
      avgMaxSalary * updatedZones[zone].avgSalaryPremium
    ).toLocaleString()}`;
  });

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

  // Pay zone logic
  const zoneAStates = ["California"];
  const zoneBStates = [
    "Washington",
    "Oregon",
    "New York",
    "Massachusetts",
    "Connecticut",
    "Rhode Island",
    "New Hampshire",
    "Maryland",
    "District of Columbia",
    "Virginia",
    "New Jersey",
    "Pennsylvania",
    "Illinois",
    "Texas",
    "Colorado",
    "Georgia",
  ];

  // City markers
  const cityMarkers = [
    { name: "Seattle", coordinates: [-122.3321, 47.6062], zone: "B" },
    { name: "Portland", coordinates: [-122.6784, 45.5152], zone: "B" },
    { name: "San Francisco", coordinates: [-122.4194, 37.7749], zone: "A" },
    { name: "San Jose", coordinates: [-121.8863, 37.3382], zone: "A" },
    { name: "Los Angeles", coordinates: [-118.2437, 34.0522], zone: "B" },
    { name: "San Diego", coordinates: [-117.1611, 32.7157], zone: "B" },
    { name: "Sacramento", coordinates: [-121.4944, 38.5816], zone: "B" },
    { name: "New York City", coordinates: [-74.006, 40.7128], zone: "B" },
    { name: "Boston", coordinates: [-71.0589, 42.3601], zone: "B" },
    { name: "Washington DC", coordinates: [-77.0369, 38.9072], zone: "B" },
    { name: "Chicago", coordinates: [-87.6298, 41.8781], zone: "B" },
    { name: "Austin", coordinates: [-97.7431, 30.2672], zone: "B" },
    { name: "Denver", coordinates: [-104.9903, 39.7392], zone: "B" },
    { name: "Atlanta", coordinates: [-84.388, 33.749], zone: "B" },
  ];

  const getFillColor = (stateName) => {
    if (zoneAStates.includes(stateName)) return updatedZones["Zone A"].color;
    if (zoneBStates.includes(stateName)) return updatedZones["Zone B"].color;
    return updatedZones["Zone C"].color;
  };

  const getZoneLabel = (stateName) => {
    if (zoneAStates.includes(stateName)) return "Zone A";
    if (zoneBStates.includes(stateName)) return "Zone B";
    return "Zone C";
  };

  return (
    <div className="geographic-view">
      <div className="geographic-container">
        <h2>🗺️ Geographic Pay Zones</h2>

        <div className="zone-intro">
          <p>
            Tech companies adjust salaries based on geographic location to
            account for cost of living differences. Understanding these zones
            helps you evaluate whether a salary offer is competitive for a
            specific location.
          </p>
        </div>

        {/* Zone Legend */}
        <div className="zone-legend">
          {Object.entries(updatedZones).map(([zone, data]) => (
            <div
              key={zone}
              className={`zone-card ${hoveredZone === zone ? "hovered" : ""}`}
              style={{
                backgroundColor: data.bgColor,
                borderColor: data.color,
              }}
              onMouseEnter={() => setHoveredZone(zone)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <div className="zone-header">
                <div
                  className="zone-color"
                  style={{ backgroundColor: data.color }}
                ></div>
                <h3 style={{ color: data.color }}>{zone}</h3>
              </div>
              <p className="zone-description">{data.description}</p>
              <p className="zone-adjustment">
                <strong>Salary Adjustment:</strong> {data.salaryAdjustment}
              </p>
              <p className="zone-range">
                <strong>Estimated Salary Range:</strong> {data.salaryRange}
              </p>
              <p className="zone-cities">
                <strong>Key Areas:</strong> {data.cities.slice(0, 3).join(", ")}
                {data.cities.length > 3 && "..."}
              </p>
            </div>
          ))}
        </div>

        {/* US Map Visualization */}
        <div className="map-section">
          <h3>US Geographic Pay Zone Map</h3>
          <div className="map-container">
            <ComposableMap
              projection="geoAlbersUsa"
              projectionConfig={{
                scale: 1000,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.name;

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={getFillColor(stateName)}
                        stroke="#ffffff"
                        strokeWidth={1}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            fill: getFillColor(stateName),
                            opacity: 0.8,
                            cursor: "pointer",
                          },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={() => {
                          setHoveredState(stateName);
                        }}
                        onMouseLeave={() => {
                          setHoveredState(null);
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {/* City markers */}
              {cityMarkers.map(({ name, coordinates, zone }) => (
                <Marker key={name} coordinates={coordinates}>
                  <circle
                    r={zone === "A" ? 5 : 4}
                    fill={
                      zone === "A"
                        ? updatedZones["Zone A"].color
                        : updatedZones["Zone B"].color
                    }
                    stroke="#ffffff"
                    strokeWidth={1.5}
                  />
                  {zone === "A" && (
                    <text
                      textAnchor="middle"
                      y={-12}
                      className="city-label"
                      style={{
                        fill: updatedZones["Zone A"].color,
                      }}
                    >
                      {name}
                    </text>
                  )}
                </Marker>
              ))}
            </ComposableMap>

            {/* Hover info */}
            {hoveredState && (
              <div className="map-hover-info">
                <div className="hover-state">
                  <strong>{hoveredState}</strong>
                  <span className="hover-zone">
                    {getZoneLabel(hoveredState)}
                  </span>
                </div>
                <div className="hover-salary">
                  Estimated salary:{" "}
                  {updatedZones[getZoneLabel(hoveredState)]?.salaryRange ||
                    "Market rate"}
                </div>
              </div>
            )}

            <div className="map-legend">
              <div className="legend-title">Map Legend</div>
              <div className="legend-items">
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: updatedZones["Zone A"].color }}
                  ></div>
                  <span>Zone A (SF Bay Area)</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: updatedZones["Zone B"].color }}
                  ></div>
                  <span>Zone B (Major Metro Areas)</span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{ backgroundColor: updatedZones["Zone C"].color }}
                  ></div>
                  <span>Zone C (All Other Areas)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="map-note">
            💡 The map shows the three geographic pay zones. Zone A (San
            Francisco Bay Area) commands the highest salaries, followed by Zone
            B (major metropolitan areas), with Zone C representing all other
            areas at market rates.
          </div>
        </div>

        {/* Detailed Zone Information */}
      </div>
    </div>
  );
};

export default GeographicView;
