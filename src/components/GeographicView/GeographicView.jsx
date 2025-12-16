import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import "./GeographicView.css";

const GeographicView = ({
  companyGeographicZones,
  companyCityCoordinates,
  initialCompany = "Atlassian",
}) => {
  const [selectedCompany, setSelectedCompany] = useState(initialCompany);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [hoveredCity, setHoveredCity] = useState(null);

  const geographicZones = companyGeographicZones[selectedCompany];
  const cityMarkers = companyCityCoordinates[selectedCompany];

  // Define state zones for each company
  const companyStateZones = useMemo(
    () => ({
      Atlassian: {
        "Zone A": [], // No states in Zone A for Atlassian
        "Zone B": ["New York", "New Jersey", "Connecticut", "Pennsylvania"],
        "Zone C": [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Mexico",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
          "District of Columbia",
        ],
      },
      "Snap Inc.": {
        "Zone A": ["California", "Washington"],
        "Zone B": [], // No states in Zone B for Snap
        "Zone C": [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "Colorado",
          "Connecticut",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Jersey",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
          "District of Columbia",
        ],
      },
      Asana: {
        "Zone A": [], // No Zone A states for Asana
        "Zone B": ["Connecticut", "New Jersey"],
        "Zone C": [
          "Alabama",
          "Alaska",
          "Arizona",
          "Arkansas",
          "California",
          "Colorado",
          "Delaware",
          "Florida",
          "Georgia",
          "Hawaii",
          "Idaho",
          "Illinois",
          "Indiana",
          "Iowa",
          "Kansas",
          "Kentucky",
          "Louisiana",
          "Maine",
          "Maryland",
          "Massachusetts",
          "Michigan",
          "Minnesota",
          "Mississippi",
          "Missouri",
          "Montana",
          "Nebraska",
          "Nevada",
          "New Hampshire",
          "New Mexico",
          "New York",
          "North Carolina",
          "North Dakota",
          "Ohio",
          "Oklahoma",
          "Oregon",
          "Pennsylvania",
          "Rhode Island",
          "South Carolina",
          "South Dakota",
          "Tennessee",
          "Texas",
          "Utah",
          "Vermont",
          "Virginia",
          "Washington",
          "West Virginia",
          "Wisconsin",
          "Wyoming",
          "District of Columbia",
        ],
      },
    }),
    []
  );

  // Get the zone for a state based on the selected company
  const getStateZone = (stateName) => {
    const stateZones = companyStateZones[selectedCompany];

    if (stateZones["Zone A"].includes(stateName)) return "Zone A";
    if (stateZones["Zone B"].includes(stateName)) return "Zone B";
    return "Zone C";
  };

  // Get fill color for a state
  const getFillColor = (stateName) => {
    const zone = getStateZone(stateName);
    return geographicZones[zone]?.color || "#e5e5e5";
  };

  // Get company description
  const getCompanyDescription = () => {
    return `${selectedCompany} adjusts salaries based on geographic location. Below are the 3 zones specified by ${selectedCompany}.`;
  };

  return (
    <div className="geographic-view">
      <div className="geographic-container">
        <h2>Geographic Pay Zones Comparison</h2>

        {/* Company Selector */}
        <div className="company-selector">
          <h3>Select Company</h3>
          <div className="company-buttons">
            {Object.keys(companyGeographicZones).map((company) => (
              <button
                key={company}
                className={`company-button ${
                  selectedCompany === company ? "active" : ""
                }`}
                onClick={() => setSelectedCompany(company)}
              >
                {company}
              </button>
            ))}
          </div>
        </div>

        <div className="zone-intro">
          <p>{getCompanyDescription()}</p>
        </div>

        {/* US Map Visualization */}
        <div className="map-section">
          <h3>{selectedCompany} Pay Zone Map</h3>
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
                    const fillColor = getFillColor(stateName);

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
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

              {/* City markers for ALL companies - BIGGER and MORE READABLE */}
              {cityMarkers.map((city) => (
                <Marker
                  key={`${city.name}-${city.zone}`}
                  coordinates={city.coordinates}
                  onMouseEnter={() => setHoveredCity(city)}
                  onMouseLeave={() => setHoveredCity(null)}
                >
                  {/* Bigger circle markers */}
                  <circle
                    r={city.zone === "Zone A" ? 7 : 6} // Increased from 5/4
                    fill={geographicZones[city.zone]?.color || "#000"}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                  {/* Bigger and bolder city labels */}
                  <text
                    textAnchor="middle"
                    y={city.zone === "Zone A" ? -15 : -14} // Adjusted for bigger font
                    className="city-label"
                    style={{
                      fill: geographicZones[city.zone]?.color || "#000",
                      fontSize: city.zone === "Zone A" ? "12px" : "11px", // Increased from 10/9
                      fontWeight: "bold", // Always bold now
                      fontFamily: "Arial, sans-serif",
                      textShadow:
                        "2px 2px 3px white, -2px -2px 3px white, 2px -2px 3px white, -2px 2px 3px white",
                    }}
                  >
                    {city.name.split(",")[0]}
                  </text>
                </Marker>
              ))}
            </ComposableMap>

            {/* State hover info */}
            {hoveredState && (
              <div className="map-hover-info">
                <div className="hover-state">
                  <strong>{hoveredState}</strong>
                  <span className="hover-zone">
                    {getStateZone(hoveredState)}
                  </span>
                </div>
                <div className="hover-salary">
                  Zone: {getStateZone(hoveredState)} -{" "}
                  {geographicZones[getStateZone(hoveredState)]?.description}
                </div>
              </div>
            )}

            {/* City hover info */}
            {hoveredCity && (
              <div className="map-hover-info">
                <div className="hover-state">
                  <strong>{hoveredCity.name}</strong>
                  <span className="hover-zone">{hoveredCity.zone}</span>
                </div>
              </div>
            )}

            <div className="map-legend">
              <div className="legend-title">Map Legend</div>
              <div className="legend-items">
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{
                      backgroundColor: geographicZones["Zone A"]?.color,
                    }}
                  ></div>
                  <span>
                    Zone A{" "}
                    {selectedCompany === "Snap Inc."
                      ? "(CA, WA States)"
                      : "(Premium Areas)"}
                  </span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{
                      backgroundColor: geographicZones["Zone B"]?.color,
                    }}
                  ></div>
                  <span>
                    Zone B{" "}
                    {selectedCompany === "Atlassian"
                      ? "(NY, NJ, CT, PA States)"
                      : selectedCompany === "Asana"
                      ? "(CT, NJ States)"
                      : "(Major Metro Areas)"}
                  </span>
                </div>
                <div className="legend-item">
                  <div
                    className="legend-dot"
                    style={{
                      backgroundColor: geographicZones["Zone C"]?.color,
                    }}
                  ></div>
                  <span>Zone C (All Other States)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* State/Zone Information */}
        <div className="zone-details">
          <div className="zone-detail">
            <h3>{selectedCompany} Zone Details</h3>
            {Object.entries(geographicZones).map(([zone, data]) => (
              <div key={zone} className="zone-detail-card">
                <h4 style={{ color: data.color }}>
                  {zone}: {data.description}
                </h4>
                <p>
                  <strong>States:</strong>{" "}
                  {companyStateZones[selectedCompany][zone].length > 0
                    ? companyStateZones[selectedCompany][zone].join(", ")
                    : "None"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Company-specific notes */}
        <div className="zone-details">
          <div className="zone-detail-card">
            <h4>Important Notes</h4>
            {selectedCompany === "Atlassian" && (
              <p>
                • <strong>State-based zones:</strong> Zone B includes NY, NJ,
                CT, PA (blue states).
                <br />• <strong>City markers:</strong> Show specific cities
                colored by their zone (dots on map).
                <br />• <strong>Example:</strong> California is Zone C (green),
                but SF Bay Area cities are Zone A (red dots).
              </p>
            )}
            {selectedCompany === "Snap Inc." && (
              <p>
                • <strong>State-based zones:</strong> Zone A includes CA and WA
                (red states).
                <br />• <strong>City markers:</strong> Show specific cities
                colored by their zone (dots on map).
                <br />• <strong>Example:</strong> Austin, TX is Zone B (blue
                dot) even though Texas is Zone C (green state).
              </p>
            )}
            {selectedCompany === "Asana" && (
              <p>
                • <strong>State-based zones:</strong> Zone B includes CT and NJ
                (blue states).
                <br />• <strong>City markers:</strong> Show specific cities
                colored by their zone (dots on map).
                <br />• <strong>Example:</strong> New York State is Zone C
                (green), but NYC metro is Zone A (red dots).
              </p>
            )}
          </div>
        </div>

        {/* City List */}
        <div className="zone-details">
          <div className="zone-detail-card">
            <h4>City Markers by Zone</h4>
            {Object.entries(geographicZones).map(([zone, data]) => {
              const citiesInZone = cityMarkers.filter(
                (city) => city.zone === zone
              );
              return citiesInZone.length > 0 ? (
                <div key={zone}>
                  <h5 style={{ color: data.color, margin: "10px 0 5px 0" }}>
                    {zone} Cities ({citiesInZone.length}):
                  </h5>
                  <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
                    {citiesInZone.map((city) => city.name).join(", ")}
                  </p>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicView;
