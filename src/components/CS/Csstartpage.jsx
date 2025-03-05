import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import maharashtraBoundary from "./maharashtraBoundary.json";
import policeData from "./policeData.json";
import MiniMap from './MiniMap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MaharashtraMap = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCriteria, setSelectedCriteria] = useState("population");

  const colorSchemes = {
    population: ["#ffeda0", "#f03b20"], // Yellow to Red
    police_subdivisions: ["#deebf7", "#3182bd"], // Light Blue to Dark Blue
    total_sanctioned_strength: ["#e5f5e0", "#238b45"], // Light Green to Dark Green
  };

  useEffect(() => {

    if(!selectedDistrict){

    const map = L.map("map", {
      center: [19.7515, 75.7139],
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
    });

    L.tileLayer("/tiles/7/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    let selectedLayer = null;

    const getColor = (value, max, scheme) => {
      const ratio = value / max;
      const [startColor, endColor] = colorSchemes[scheme];

      // Convert HEX to RGB
      const hexToRgb = (hex) => {
        const bigint = parseInt(hex.substring(1), 16);
        return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
      };

      const startRGB = hexToRgb(startColor);
      const endRGB = hexToRgb(endColor);

      // Linear interpolation between start and end colors
      const r = Math.round(startRGB[0] + ratio * (endRGB[0] - startRGB[0]));
      const g = Math.round(startRGB[1] + ratio * (endRGB[1] - startRGB[1]));
      const b = Math.round(startRGB[2] + ratio * (endRGB[2] - startRGB[2]));

      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    };

    const maxValue = Math.max(...policeData.map(d => d[selectedCriteria]));

    const maharashtraLayer = L.geoJSON(maharashtraBoundary, {
      style: (feature) => {
        const districtData = policeData.find(d => d.district === feature.properties.dtname);
        const value = districtData ? districtData[selectedCriteria] : 0;
        return {
          fillColor: getColor(value, maxValue, selectedCriteria),
          fillOpacity: 0.7,
          color: "rgba(151, 151, 151, 0.7)",
          weight: 1.5,
        };
      },

      onEachFeature: (feature, layer) => {
        if (!feature.properties?.dtname) return;

        const resetStyle = () => layer.setStyle({ color: "rgba(151, 151, 151, 0.7)", fillOpacity: 0.7 });
        const highlightStyle = () => layer.setStyle({ color: "rgb(166, 166, 166)", weight: 1 });

        layer.on({
          click: (e) => {
            if (selectedLayer) resetStyle();
            if (selectedLayer === layer) {
              selectedLayer = null;
              setSelectedDistrict(null);
              map.closePopup();
            } else {
              highlightStyle();
              selectedLayer = layer;
              setSelectedDistrict(feature);
              L.popup().setLatLng(e.latlng).setContent(`<b>${feature.properties.dtname}</b>`).openOn(map);
            }
          },
          mouseover: (e) => {
            const districtData = policeData.find(d => d.district === feature.properties.dtname);
            const value = districtData ? districtData[selectedCriteria] : "N/A";

            highlightStyle();
            L.popup()
              .setLatLng(e.latlng)
              .setContent(`<b>${feature.properties.dtname}</b><br/>${selectedCriteria.replace(/_/g, " ").toUpperCase()}: ${value}`)
              .openOn(map);
          },
          mouseout: () => {
            resetStyle();
            map.closePopup();
          },
        });
      },
    }).addTo(map);

    const bounds = maharashtraLayer.getBounds();
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);

    map.on("drag", () => {
      map.panInsideBounds(bounds, { animate: true });
    });

    map.on("zoomend", () => {
      if (map.getZoom() < 6) {
        map.setZoom(6);
      }
    });

    const extractCoordinates = (features) => {
      return features.flatMap((feature) => {
        if (feature.geometry.type === "Polygon") {
          return feature.geometry.coordinates;
        } else if (feature.geometry.type === "MultiPolygon") {
          return feature.geometry.coordinates.flat();
        }
        return [];
      });
    };

    const worldMask = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-180, 90],
                [180, 90],
                [180, -90],
                [-180, -90],
                [-180, 90],
              ],
              ...extractCoordinates(maharashtraBoundary.features),
            ],
          },
        },
      ],
    };

    L.geoJSON(worldMask, {
      style: {
        color: "black",
        weight: 0,
        fillColor: "white",
        fillOpacity: 1,
      },
    }).addTo(map);

    return () => {
      map.remove();
    };
  }
  }, [selectedCriteria,selectedDistrict]);

  return (
    <div style={{ display: "flex", height: "80vh", width: "100%", zIndex: "0" }}>
      <div style={{ display: "flex", height: "80vh", width: "100%", position: "relative" }}>
        {/* Map */}
        {selectedDistrict ? (
          <>
            <div
              style={{
                position: "absolute",
                left: 60,
                top: "10%",
                transform: "translateY(-50%)",
                padding: "10px",
                background: "#fff",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                fontSize: "10px",
                fontWeight: "bold",
                textAlign: "center",
                zIndex: "999",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedDistrict(null);
              }}
              
            >
              <ArrowBackIcon />
            </div>
            <MiniMap district={selectedDistrict} />
          </>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                bottom: 10,
                left: 200,
                zIndex: 1000,
                display: "grid",
                gridTemplateColumns: "repeat(3, auto)",
                gap: "10px",
                padding: "10px",
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "8px",
              }}
            >
              {Object.keys(colorSchemes).map((criteria) => (
                <div
                  key={criteria}
                  onClick={() => setSelectedCriteria(criteria)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontWeight: selectedCriteria === criteria ? "bold" : "normal",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 10,
                      background: colorSchemes[criteria][1],
                      marginRight: 5,
                    }}
                  ></div>
                  <span style={{ fontSize: "14px" }}>{criteria.replace(/_/g, " ").toUpperCase()}</span>
                </div>
              ))}
            </div>

            {/* Left Card - Population */}
            <div
              style={{
                position: "absolute",
                left: 20,
                top: "40%",
                transform: "translateY(-50%)",
                textAlign: "center",
                zIndex: "999",
              }}
            >
              <div
                style={{
                  transform: "translateY(-50%)",
                  padding: "15px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <div>Population</div>
                <div style={{ fontSize: "18px", color: "#d9534f" }}>12.73 Crore</div>
              </div>

              <div
                style={{
                  transform: "translateY(-50%)",
                  padding: "15px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <div>Districts</div>
                <div style={{ fontSize: "18px", color: "#0275d8" }}>36</div>
              </div>

              <div
                style={{
                  transform: "translateY(-50%)",
                  padding: "15px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                <div>Commissionerates</div>
                <div style={{ fontSize: "18px", color: "#0275d8" }}>12</div>
              </div>
            </div>

            {/* Render the map with the default district if no district is selected */}
            <div id="map" style={{ flex: 1, borderRadius: '8px' }}></div>
          </>
        )}
      </div>
    </div>
  );
};

export default MaharashtraMap;