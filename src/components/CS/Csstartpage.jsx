import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import maharashtraBoundary from "./maharashtraBoundary.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosInstance from "@/utils/axiosInstance";

import maharashtraZonals from "./maharashtraZonals.json";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";


import policeLatLong from './police_stations.json'


const policeStationIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="15px" height="15px" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.352 8.0004C16.3519 10.1221 15.4904 12.1569 13.9571 13.6571C12.4238 15.1573 10.3442 16.0001 8.1758 16C6.00742 15.9999 3.92788 15.1571 2.39462 13.6568C0.86137 12.1565 0 10.1217 0 8C0 5.8783 0.86137 3.8435 2.39462 2.34322C3.92788 0.842931 6.00742 5.30449e-05 8.1758 2.50363e-09C10.3442 -5.30399e-05 12.4238 0.842723 13.9571 2.34293C15.4904 3.84314 16.3519 5.8787 16.352 8.0004Z" fill="#85BDE4"/>
      <path d="M12.6401 8.00033C12.64 9.17905 12.1615 10.3095 11.3096 11.1429C10.4578 11.9764 9.30243 12.4446 8.09777 12.4446C6.89312 12.4445 5.73782 11.9763 4.88601 11.1428C4.0342 10.3093 3.55566 9.17883 3.55566 8.00011C3.55566 6.82139 4.0342 5.69094 4.88601 4.85745C5.73782 4.02396 6.89312 3.55569 8.09777 3.55566C9.30243 3.55563 10.4578 4.02384 11.3096 4.85729C12.1615 5.69074 12.64 6.82161 12.6401 8.00033Z" fill="#73A4C6"/>
      <path d="M9.5467 8.00011C9.54668 8.39302 9.38715 8.76982 9.1032 9.04764C8.81925 9.32546 8.43414 9.48153 8.03259 9.48152C7.63104 9.48151 7.24594 9.32542 6.962 9.04759C6.67807 8.76976 6.51855 8.39294 6.51855 8.00004C6.51855 7.60713 6.67807 7.23031 6.962 6.95248C7.24594 6.67465 7.63104 6.51856 8.03259 6.51855C8.43414 6.51854 8.81925 6.67461 9.1032 6.95243C9.38715 7.23025 9.54668 7.6072 9.5467 8.00011Z" fill="white"/>
    </svg>
  `),
  iconSize: [10, 10], // Adjusted size for the icon
  iconAnchor: [0, 0], // Adjusted anchor point
  popupAnchor: [0, 0], // Adjusted popup anchor
});

const MaharashtraMap = (catogoryBar) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [zonePercentages, setZonePercentages] = useState({});
  const [districtPercentages, setDistrictPercentages] = useState({});
  const [percent, setpercent] = useState(0);

  const [loading, setLoading] = useState(false); // Loader state


  const options = [
    "Pendency of cases under BNS",
    "Offences against body under BNS",
    "Untraced Missing",
    "Important sections introduced in BNS",
    "Property offences under BNS",
    "Esakshya Wrt Unit",
    "Esakshya wrt 7yrs or more",
    "FIR's and Zero FIR's",
    "eFIR",
    "ITSSO Compliance",
    "Stolen Recovered Property",
    "Forensic Team Deployment"
  ];

  const staionsFilters = [
  "Offences against body under BNS",

  "Untraced Missing",
  "Important sections introduced in BNS",

  "Property offences under BNS",

  "eFIR"]


  const [selectedForm, setSelectedForm] = useState(options[0]);


  const handleChange = (event) => {
    setSelectedForm(event.target.value);
  };


  const catogory = catogoryBar.catogoryBar


  const zone = localStorage.getItem("zone")

  const district = localStorage.getItem("district")

  const sub_role = localStorage.getItem("sub_role")
  const role = localStorage.getItem("role")

  console.log("Zone : ", zone, " ", "district : ", district, " ", "role : ", sub_role);



  const userZones = sub_role == 'IG/DIG' || sub_role == 'CP' || sub_role == 'SP' ? zone : ""; // Example single zone
  const userDistricts = sub_role == 'CP' || sub_role == 'SP' ? district : ""; // Example single district


  console.log("userZones : ", userZones);
  console.log("userDistricts : ", userDistricts);




  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchData(zoneName, districtName) {
      setLoading(true); // Start loading

      try {
        const response = await axiosInstance.get("/maharashtra-police-data", {
          params: { zone: zoneName, district: districtName, table: catogory, typeFilter: selectedForm }
        });
        console.log("response:", response.data);

        setZonePercentages(response.data.zones);
        setDistrictPercentages(response.data.districts);
      } catch (error) {
        console.error("Error fetching Maharashtra police data:", error);
      }
      setTimeout(() => setLoading(false), 1000); // Add 2-sec delay before hiding loader
    }

    fetchData("", ""); // Fetch all data initially
  }, [catogory,selectedForm]);


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

    // L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    //   maxZoom: 18,
    // }).addTo(map);


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
    "Nagpur ": ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur Rural", "Wardha"],
    "Nashik": ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    "Pune": ["Kolhapur", "Pune", "Sangli", "Satara", "Solapur"],
  };

  const getZoneForDistrict = (district) => {
    for (const [zone, districts] of Object.entries(zoneMapping)) {
      if (districts.includes(district)) return zone;
    }
    return null;
  };

  let percentage;
  const getZoneColor = (name) => {
    console.log("name:", name);
    console.log("selectedZone:", selectedZone);
    console.log("zonePercentages:", zonePercentages);

    // Handle cases where name is an array
    if (Array.isArray(name)) {
      // Get the highest percentage among all zones in the array
      percentage = Math.max(...name.map(zone => zonePercentages[zone] || districtPercentages[zone] || 0));
    } else {
      // Treat it as a string and fetch the percentage normally
      percentage = zonePercentages[name] || districtPercentages[name] || 0;
    }

    console.log("percentage:", percentage);

    setpercent(percentage)

    // Determine the color based on percentage
    if (percentage > 80) return "#37C503";
    if (percentage >= 60) return "#9AD911";
    if (percentage >= 40) return "#FF8585";
    return "#F45546";
  };





  useEffect(() => {

    setLoading(true); // Start loading


    if (!mapRef.current) return;

    const map = mapRef.current;

    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });
  
  
   


    const isDistrictAllowed = (districtName) => {
      console.log("userZones : ", zoneMapping[userZones]?.includes(districtName));

      if (!userDistricts && !userZones) return true; // Show all if no restriction
      if (userDistricts) return districtName === userDistricts; // Only allow the specific district
      if (userZones) return zoneMapping[userZones]?.includes(districtName); // Allow all districts in the zone
      return false;
    };

    const filteredFeatures = selectedZone
      ? maharashtraBoundary.features.filter((feature) =>
        // zoneMapping[selectedZone].includes(feature.properties.dtname) &&
        isDistrictAllowed(feature.properties.dtname))
      : userDistricts ? maharashtraBoundary.features.filter((feature) =>
        // zoneMapping[selectedZone].includes(feature.properties.dtname) &&
        isDistrictAllowed(feature.properties.dtname)) : maharashtraZonals.features.filter((feature) =>
          isDistrictAllowed(feature.properties.division));



        const markersLayer = L.layerGroup().addTo(map);

        let percentageDisplay;
    let maharashtraLayer = L.geoJSON(filteredFeatures, {
      style: (feature) => {
        const districtName = selectedZone ? feature.properties.dtname : feature.properties.division;
        let zoneName = districtName
          ? Object.keys(zoneMapping).find(zone => zoneMapping[zone].includes(districtName))
          : Object.keys(zoneMapping);

          // Get the percentage for the district or zone
          percentageDisplay = selectedZone 
          ? zonePercentages[districtName] || districtPercentages[districtName] || 0 
          : zonePercentages[zoneName] || districtPercentages[zoneName] || 0;




        if(((selectedZone && districtName == "Nagpur Rural") || (district == "Nagpur Rural")) && catogory == 'FIR'  ){

          


          const nagpurDistricts = ["Nagpur Rural","Nagpur"];
          const nagpurStations = policeLatLong.filter(station => 
            nagpurDistricts.includes(station.District) // Adjust this based on your JSON structure
          );
      
          // Add markers for each police station
          nagpurStations.forEach(station => {
            const marker = L.marker([station.Latitude, station.Longitude], { icon: policeStationIcon })
              .addTo(markersLayer)
              .bindPopup(`<b>${station.PoliceStation}</b><br>${station.District}`);
          });
      }
    
       
    

        return {
          fillColor: selectedZone ? getZoneColor(districtName) : getZoneColor(zoneName),
          fillOpacity: 0.7,
          color: "#ffff",
          weight: 1.5,
        };
      },
      onEachFeature: (feature, layer) => {
        const districtName = selectedZone ? feature.properties.dtname : feature.properties.division;
        const zoneName = getZoneForDistrict(districtName);

        layer.on({
          click: (e) => {
            setSelectedZone(zoneName);
            L.popup().setLatLng(e.latlng).setContent(`<b>${zoneName}</b>`).openOn(map);
          },
          mouseover: (e) => {
            layer.setStyle({ color: "#ffff", weight: 2 });
            L.popup().setLatLng(e.latlng).setContent(`<b>${selectedZone ? districtName : zoneName}</b><br>Percentage: ${ percent}%`).openOn(map);
          },
          mouseout: () => {
            layer.setStyle({ color: "#ffff", fillOpacity: 0.7 });
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
                  : maharashtraZonals.features
              ),
            ],
          },
        },
      ],
    };

    L.geoJSON(zoneMask, {
      style: { color: "black", weight: 0, fillColor: "white", fillOpacity: 1 },
    }).addTo(map);

    setTimeout(() => setLoading(false), 1000); // Add 2-sec delay before hiding loader
    return () => {
      if (map.hasLayer(maharashtraLayer)) {
        map.removeLayer(maharashtraLayer);
      markersLayer.clearLayers(); // Clean up markers on unmount

      }
    };
 

  }, [selectedZone, zonePercentages,selectedForm]);

  return (
    <div style={{ display: "flex", height: "80vh", width: "100%", zIndex: "0" }}>
      <div style={{ display: "flex", height: "80vh", width: "100%", position: "relative" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.6)", // Semi-transparent white
              backdropFilter: "blur(5px)", // Blur effect
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
            }}
          >
            <CircularProgress />
          </div>
        )}

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

        {

          (sub_role == 'IG/DIG' || role == 'chief secretary') && catogory == 'FIR' ?

            (<div
              style={{
                position: "absolute",
                right: 0,
                top: "10%",
                transform: "translateY(-50%)",
                padding: "0",
                background: "#fff",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "8px",
                fontSize: "10px",
                fontWeight: "bold",
                textAlign: "center",
                zIndex: "999",
                cursor: "pointer",
                width: "20vw",
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              }}
            >
              <h6>Type of Data</h6>
              <Select
                className="h-[40px]"
                labelId="form-type-label"
                id="form-type"
                value={selectedForm}
                onChange={handleChange}
              >
                {options.map((form) => (
                  <MenuItem key={form} value={form}>
                    {form}
                  </MenuItem>
                ))}
              </Select>
            </div>)
            :
            null

        }
        <div id="map" style={{ flex: 1, borderRadius: "8px" }}></div>
        <div
          style={{
            position: "absolute",
            right: 60,
            bottom: "-7%",
            transform: "translateY(-50%)",
            padding: "10px",
            background: "#fff",
            boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            zIndex: "999",
            cursor: "pointer",
            width: "15vw",
            minHeight: "auto", // Auto-adjust height
            // height: (sub_role == 'IG/DIG' || role == 'chief secretary') ? "51vh" : '32vh',
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >

          <div style={{ textAlign: "center", marginBottom: "5px", fontWeight: "bold", padding: "10px", width: "300px" }}>Legend</div>
          {(sub_role == 'IG/DIG' || role == 'chief secretary') ? (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Population</span> <span>12.73 Crore</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Districts</span> <span>36</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Commissionerates</span> <span>12</span>
              </div>
            </>
          ) : null}

          <hr style={{ margin: "5px 0", borderColor: "#ccc" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
            <span>80</span>
            <div style={{ width: "30px", height: "10px", background: "#37C503", borderRadius: "2px" }}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
            <span>60-80</span>
            <div style={{ width: "30px", height: "10px", background: "#9AD911", borderRadius: "2px" }}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
            <span>40-60</span>
            <div style={{ width: "30px", height: "10px", background: "#FF8585", borderRadius: "2px" }}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
            <span>less than 40</span>
            <div style={{ width: "30px", height: "10px", background: "#F45546", borderRadius: "2px" }}></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MaharashtraMap;
