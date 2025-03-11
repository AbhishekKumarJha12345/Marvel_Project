import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import maharashtraBoundary from "./maharashtraBoundary.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosInstance from "@/utils/axiosInstance";

const MaharashtraMap = () => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zonePercentages, setZonePercentages] = useState({});
  const [districtPercentages, setDistrictPercentages] = useState({});


  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchData(zoneName, districtName) {
        try {
            const response = await axiosInstance.get("/maharashtra-police-data", {
                params: { zone: zoneName, district: districtName }
            });
            console.log("response:", response.data);
            
            setZonePercentages(response.data.zones);
            setDistrictPercentages(response.data.districts);
        } catch (error) {
            console.error("Error fetching Maharashtra police data:", error);
        }
    }

    fetchData("", ""); // Fetch all data initially
}, []);


  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map("map", {
      center: [19.7515, 75.7139],
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);


  const zoneMapping = {
    "Amravati": ["Akola", "Amravati", "Buldana", "Washim", "Yavatmal"],
    "Aurangabad": ["Aurangabad", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    "Konkan": ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane"],
    "Nagpur": ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur", "Wardha"],
    "Nashik": ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    "Pune": ["Kolhapur", "Pune", "Sangli", "Satara", "Solapur"],
  };

  const getZoneForDistrict = (district) => {
    for (const [zone, districts] of Object.entries(zoneMapping)) {
      if (districts.includes(district)) return zone;
    }
    return null;
  };

  const getZoneColor = (name) => {
    
    const percentage = zonePercentages[name] || districtPercentages[name];

    if (percentage > 80) return "#37C503";
    if (percentage >= 60) return "#9AD911";
    if (percentage >= 40) return "#FF8585";
    return "#F45546";
  };


  

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });


    const userZones = ""; // Example single zone
const userDistricts = ""; // Example single district



const isDistrictAllowed = (districtName) => {
  if (!userDistricts && !userZones) return true; // Show all if no restriction
  if (userDistricts) return districtName === userDistricts; // Only allow the specific district
  if (userZones) return zoneMapping[userZones]?.includes(districtName); // Allow all districts in the zone
  return false;
};

    

    const filteredFeatures = selectedZone
      ? maharashtraBoundary.features.filter((feature) =>
          zoneMapping[selectedZone].includes(feature.properties.dtname)
        )
      : maharashtraBoundary.features;

    // const filteredFeatures = maharashtraBoundary.features.filter((feature) => {
    //   const districtName = feature.properties.dtname;
    //   return isDistrictAllowed(districtName);
    // });
    
    let maharashtraLayer = L.geoJSON(filteredFeatures, {
      style: (feature) => {
        const districtName = feature.properties.dtname;
        const zoneName = Object.keys(zoneMapping).find((zone) =>
          zoneMapping[zone].includes(districtName)
        );
        return {
          fillColor: selectedZone ? getZoneColor(districtName) : getZoneColor(zoneName),
          fillOpacity: 0.7,
          color: "#333",
          weight: 1.5,
        };
      },
      onEachFeature: (feature, layer) => {
        if (!feature.properties?.dtname) return;

        const districtName = feature.properties.dtname;
        const zoneName = getZoneForDistrict(districtName);

        layer.on({
          click: (e) => {
            setSelectedZone(zoneName);
            L.popup().setLatLng(e.latlng).setContent(`<b>${zoneName}</b>`).openOn(map);
          },
          mouseover: (e) => {
            layer.setStyle({ color: "#000", weight: 2 });
            L.popup().setLatLng(e.latlng).setContent(`<b>${selectedZone ? districtName : zoneName}</b>`).openOn(map);
          },
          mouseout: () => {
            layer.setStyle({ color: "#333", fillOpacity: 0.7 });
            map.closePopup();
          },
        });
      },
    }).addTo(map);

    const bounds = maharashtraLayer.getBounds();
    map.fitBounds(bounds);
    map.setMaxBounds(bounds);

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

      const zoneMask = {
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
                ...extractCoordinates(
                  selectedZone ?
                  maharashtraBoundary.features.filter((feature) =>
                    zoneMapping[selectedZone].includes(feature.properties.dtname)
                  )
                  : maharashtraBoundary.features
                ),
              ],
            },
          },
        ],
      };

      L.geoJSON(zoneMask, {
        style: { color: "black", weight: 0, fillColor: "white", fillOpacity: 1 },
      }).addTo(map);

    return () => {
      if (map.hasLayer(maharashtraLayer)) {
        map.removeLayer(maharashtraLayer);
      }
    };
  }, [selectedZone, zonePercentages]);

  return (
    <div style={{ display: "flex", height: "80vh", width: "100%", zIndex: "0" }}>
      <div style={{ display: "flex", height: "80vh", width: "100%", position: "relative" }}>
        {selectedZone && (
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
            onClick={() => setSelectedZone(null)}
          >
            <ArrowBackIcon />
          </div>
        )}
        <div id="map" style={{ flex: 1, borderRadius: "8px" }}></div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
