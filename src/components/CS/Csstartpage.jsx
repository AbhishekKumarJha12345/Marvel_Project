import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import maharashtraBoundary from "./maharashtraBoundary.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import maharashtraZonals from "./maharashtraZonals.json";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";


import policeLatLong from './police_stations.json'

import policeCP from './maharashtraCP.json'
import { Category } from "@mui/icons-material";

import ApexCharts from "react-apexcharts";
import { use } from "react";

import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import Sunburst from 'highcharts/modules/sunburst';


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
  const [cityPercentages, setcityPercentages] = useState({});
  // -------------------------------------------
  const [totalCases, settotalCases] = useState({});
  const [disposedCases, setdisposedCases] = useState({});

  const [startDate, setStartDate] = useState("2025-02");
  const [endDate, setEndDate] = useState("2025-02");



  const sub_role = localStorage.getItem("sub_role")
  const role = localStorage.getItem("role")
  const district = localStorage.getItem("district")
  const zone = localStorage.getItem("zone")



  // -------------------------------------------


  // ------------------added by me /value_pie_chart --------------------------------
  const [pieData1, setPieData1] = useState({ labels: [], series: [] });
  const [pieData2, setPieData2] = useState({ labels: [], series: [] });
  const [pieData3, setPieData3] = useState({ labels: [], series: [] });
  const [totalMissingPersons, setTotalMissingPersons] = useState(0);

  const [barData1, setBarData1] = useState({ categories: [], series: [] });
  const [barData2, setBarData2] = useState({ categories: [], series: [] });
  const [barData, setBarData] = useState({ categories: [], series: [] });

  const [sunburstData, setSunburstData] = useState([]); // Initialize sunburstData state


  const fetchPieChartData = async (districtName, typeFilter, Catogory, zoneName) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/value_pie_chart", {
        district: districtName,
        typeFilter: typeFilter,
        Catogory: Catogory,
        zoneName: zoneName,
      });


      const data = response.data;

      if (data.type === "Pendency of cases under BNS") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Disposed Cases", "Total Cases"],
          series: [data.disposedCases, data.totalCases],
        });

        setPieData2({
          labels: ["Punishment < 7 years", "Punishment > 7 years"],
          series: [data.punishmentLessThan7, data.punishmentMoreThan7],
        });

      } else if (data.type === "Untraced Missing") {

        const totalMissingPersons = (data["missingPersons_18+"] || 0) + (data["missingPersons_18-"] || 0);
        // Pie charts for Untraced Missing
        setPieData1({
          labels: ["MissingPersons 18+", "MissingPersons 18-", "Untraced 18+", "Untraced 18-"],
          series: [
            data["missingPersons_18+"], data["missingPersons_18-"], data["untraced_18+"], data["untraced_18-"]],
        });

        setPieData2({
          labels: ["Traced 18+", "Traced 18-", "Untraced 18+", "Untraced 18-"],
          series: [
            data["traced_18+"], data["traced_18-"], data["untraced_18+"], data["untraced_18-"]],
        });
        setTotalMissingPersons(totalMissingPersons);

      } else if (data && data.type === "Important sections introduced in BNS") {
        console.log("Setting Pie Data for:", data.type);

        setPieData1({
          labels: ["Registered_Mob", "Registered_Snatchr", "Registered_Organized", "Registered_Petty", "Registered_Terrorist"],
          series: [data.registeredCases_mob, data.registeredCases_snatch, data.registeredCases_organized, data.registeredCases_petty, data.registeredCases_terrorist],
        });

        setPieData2({
          labels: ["Detected_Mob", "Detected_Snatch", "Detected_Organized", "Detected_Petty", "Detected_Terrorist"],
          series: [data.detectedCases_mob, data.detectedCases_snatch, data.detectedCases_organized, data.detectedCases_petty, data.detectedCases_terrorist],
        });

      }
      else if (data.type === "Offences against body under BNS") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Registered_Murder", "Registered_Att_to_Mur", "Registered_Rape", "Registered_Hurt", "Registered_Riots", "Registered_Molestation"],
          series: [data.registeredCases_murder, data.registeredCases_Att, data.registeredCases_Rape, data.registeredCases_Hurt, data.registeredCases_Riots, data.registeredCases_Molestation],
        });

        setPieData2({
          labels: ["Detected_Murder", "Detected_Att_to_Mur", "Detected_Rape", "Detected_Hurt", "Detected_Riots", "Detected_Molestation"],
          series: [data.detectedCases_murder, data.detectedCases_Att, data.detectedCases_Rape, data.detectedCases_Hurt, data.detectedCases_Riots, data.detectedCases_Molestation],
        });

      }
      else if (data.type === "eSakshya Details") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Total IO's eSakshya Registered", "Total IO's eSakshaya Download"],
          series: [data.totalIOsEsakshyaRegistered, data.totalIOsEsakshyaDownload],
        });
      }
      else if (data.type === "eFIR") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Total EComplaints Received", "Total Complaints Converted"],
          series: [data.totalEComplaintsReceived, data.totalComplaintsConverted],
        });
      }
      else if (data.type === "ITSSO Compliance Form") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Total Registered Cases", "Cases Chargesheet", "Compilance Rate"],
          series: [data.total_pocso_bns_cases, data.charge_sheeted_within_60_days, data.percentage],
        });
      }
      else if (data.type === "Use of eSakshya App in cases with punishment of 7 yrs. or more") {
        // Separate inner and outer donut values
        const sunburstData = [
          { id: '0.0', parent: '', name: 'Use of eSakshya App', value: 1 },
          { id: '1.1', parent: '0.0', name: 'Cases eSakshya Used', value: data.cases_esakshya_used },
          { id: '1.2', parent: '0.0', name: 'Cases eSakshya Not Used', value: data.cases_esakshya_not_used },
          { id: '2.1', parent: '1.1', name: 'eSakshya Used Charge Sheeted', value: data.esakshya_used_charge_sheeted },
          { id: '2.2', parent: '1.2', name: 'eSakshya Not Used Investigation', value: data.esakshya_not_used_invest },
        ];

        setSunburstData(sunburstData);
      }
      else if (data.type === "Stolen & Recovered Property") {
        setBarData1({
          categories: ["HBT", "Robbery", "Theft", "Dacoity"],
          series: [
            { name: "Offences Registered", data: [data.offences_registered_HBT, data.offences_registered_Robbery, data.offences_registered_Theft, data.offences_registered_Dacoity] },
            { name: "Detected Cases", data: [data.detected_cases_HBT, data.detected_cases_Robbery, data.detected_cases_Theft, data.detected_cases_Dacoity] },
          ]
        });
        // Second Bar Graph: Stolen Property vs Recovered Property
        setBarData2({
          categories: ["HBT", "Robbery", "Theft", "Dacoity"],
          series: [
            { name: "Value Stolen", data: [data.value_stolen_property_HBT, data.value_stolen_property_Robbery, data.value_stolen_property_Theft, data.value_stolen_property_Dacoity] },
            { name: "Value Recovered", data: [data.value_recovered_property_HBT, data.value_recovered_property_Robbery, data.value_recovered_property_Theft, data.value_recovered_property_Dacoity] }
          ]
        });

      }
      else if (data.type === "FORENSIC") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Total Cases Greater Than 7 Yrs", "Cases Forensic Team Visited"],
          series: [data.total_cases_gt_7_years, data.cases_forensic_team_visited],
        });
      }
      else if (data.type === "Zero FIR's") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Total No Zero FIR Transferred Outside MH", "Total No Zero FIR Transferred Outer State to MH"],
          series: [data.total_no_zero_fir_transferred_outside_mh, data.total_no_zero_fir_transferred_outer_state_to_mh],
        });
        setPieData2({
          labels: ["Total No Zero FIR Transferred Outside MH", "Total No Zero FIR Transferred Outer State to MH"],
          series: [data.total_transferred_zero_firs_in_mh, data.pending_to_transfer_outside_mh],
        });
        setPieData3({
          labels: ["Re-registered FIR's", "Pending for Re-registration"],
          series: [data.re_reg_firs, data.pending_for_re_registration],
        });
        // Bar chart data for Zero FIRs
        setBarData({
          categories: ["Total Zero FIRs", "Pending to Transfer", "Total FIRs Registered", "Re-registered FIRs"],
          series: [
            {
              name: "Count",
              data: [
                data.total_zero_firs,
                data.pending_to_transfer_outside_mh,
                data.total_firs_registered,
                data.re_reg_firs,
              ],
            },
          ],
        });
      }
      else if (data.type === "Training Data") {
        // Pie charts for Pendency Cases
        setPieData1({
          labels: ["Constables Trained", "Total Registered Constables"],
          series: [data.personnel_trained, data.total_personnel],
        });

        setPieData2({
          labels: ["Officers Trained", "Total Registered Officers"],
          series: [data.officers_trained, data.total_officers],
        });

      }

    } catch (error) {
      console.error("Error fetching pie chart data:", error);
    } finally {
      setLoading(false); // Stop loading after API call completion
    }
  };



  // ----------------------------------------------------------------

  const [percent, setpercent] = useState(0);

  const [loading, setLoading] = useState(false); // Loader state

  const catogory = catogoryBar.catogoryBar

  const options = [
    "Pendency of cases under BNS",
    "Offences against body under BNS",
    "Untraced Missing",
    "Important sections introduced in BNS",
    "Property offences under BNS",
    "eSakshya Details",
    "Use of eSakshya App in cases with punishment of 7 yrs. or more",
    "Zero FIR's",
    "eFIR",
    "ITSSO Compliance Form",
    "Stolen & Recovered Property",
    "Conviction under BNS",

  ];



  const triningFilter = [
    "Constabulary Trained",
    "Officers Trained"
  ]




  const [selectedForm, setSelectedForm] = useState(options[0]);


  const handleChange = (event) => {
    setSelectedForm(event.target.value);
  };



  useEffect(() => {
    setPieData1({ labels: [], series: [] })
    setPieData2({ labels: [], series: [] })
    setPieData3({ labels: [], series: [] })
    setBarData1({ categories: [], series: [] })
    setBarData2({ categories: [], series: [] })
    setBarData({ categories: [], series: [] })



  }, [catogory, selectedForm])






  // if (sub_role == 'CP' || sub_role == 'SP') {

  //   var from_date = localStorage.getItem("from_date")
  //   var to_date = localStorage.getItem("to_date")


  // }


  const userZones = sub_role == 'IG/DIG' || sub_role == 'CP' || sub_role == 'SP' ? zone : ""; // Example single zone
  const userDistricts = sub_role == 'CP' || sub_role == 'SP' ? district : ""; // Example single district


  const mapRef = useRef(null);

  useEffect(() => {
    async function fetchData(zoneName, districtName) {
      setLoading(true); // Start loading

      try {
        const response = await axiosInstance.get("/maharashtra-police-data", {
          params: { zone: zoneName, district: districtName, table: catogory, typeFilter: selectedForm, start_date: startDate, end_date: endDate }
        });


        (role == 'chief secretary' || role == 'ACS' || role == 'DGP') && !selectedZone ? setpercent(response.data.zones) : (district && district != 'null') || selectedZone ? setpercent(response.data.districts || 0) : zone ? setpercent(response.data.zones || 0) : setpercent(0)


        setZonePercentages(response.data.zones);
        setDistrictPercentages(response.data.districts);
        setcityPercentages(response.data.city);
      } catch (error) {
        console.error("Error fetching Maharashtra police data:", error);
      }
      setTimeout(() => setLoading(false), 1000); // Add 2-sec delay before hiding loader
    }

    fetchData(userZones, userDistricts); // Fetch all data initially


  }, [catogory, selectedForm, selectedZone, startDate, endDate]);




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
  }, [zonePercentages, districtPercentages, cityPercentages]);


  const zoneMapping = {
    Amravati: ["Akola", "Amravati Rural", "Buldana", "Washim", "Yavatmal"],
    'Chhatrapati Sambhajinagar': ["Chhatrapati Sambhajinagar", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Osmanabad", "Parbhani"],
    Konkan: ["Mumbai", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane Rural"],
    Nagpur: ["Bhandara", "Chandrapur", "Gadchiroli", "Gondia", "Nagpur Rural", "Wardha"],
    Nashik: ["Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik"],
    Pune: ["Kolhapur", "Pune Rural", "Sangli", "Satara", "Solapur Rural"],
  };

  const getZoneForDistrict = (district) => {
    for (const [zone, districts] of Object.entries(zoneMapping)) {
      if (districts.includes(district)) return zone;
    }
    return null;
  };

  let percentage;
  const getZoneColor = (name) => {


    // Handle cases where name is an array
    if (Array.isArray(name)) {
      // Get the highest percentage among all zones in the array
      percentage = Math.max(...name.map(zone => zonePercentages[zone] || districtPercentages[zone] || 0));
    } else {
      // Treat it as a string and fetch the percentage normally
      percentage = zonePercentages[name] || districtPercentages[name] || 0;
    }

    // Determine the color based on percentage
    if (percentage > 80) return "#37C5037A";
    if (percentage >= 60) return "#9AD91180";
    if (percentage >= 40) return "#FF85855C";
    return "#F455466B";
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




        if ((selectedZone == 'Nagpur' && districtName == "Nagpur Rural") || (district == "Nagpur Rural")) {




          const nagpurDistricts = ["Nagpur Rural", "Nagpur"];
          const nagpurStations = policeLatLong.filter(station =>
            nagpurDistricts.includes(station.District) // Adjust this based on your JSON structure
          );

          // Add markers for each police station
          nagpurStations.forEach(station => {
            const marker = L.marker([station.Latitude, station.Longitude], { icon: policeStationIcon })
              .addTo(markersLayer)

              .on('mouseover', function () {
                this.bindPopup(`<b>${station.PoliceStation}</b><br>${station.District}`, {
                  offset: L.point(2, 10) // Adjust offset
                }).openPopup();
              })
              .on('mouseout', function () {
                this.closePopup();
              })
          });
        }

        if (sub_role === 'CP' || role === 'chief secretary' || role == 'ACS' || role == 'DGP') {
          // Filter policeCP based on selectedZone
          const filteredStations = selectedZone || zone
            ? policeCP.filter(station => station.zone === selectedZone)
            : policeCP;

          filteredStations.forEach(station => {
            const percentage = cityPercentages[station.city] || 0; // Get the percentage, default to 0
            const CpColorStrok = percentage > 80 ? "#37C503" :
              percentage >= 60 ? "#9AD911" :
                percentage >= 40 ? "#FF8585" : "#FFA726";

            const policeCPIcon = new L.Icon({
              iconUrl: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="15px" height="15px" viewBox="0 0 40 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_82_279)">
                    <ellipse cx="20.2439" cy="15.854" rx="8.53659" ry="9.5122" fill="white"/>
                    <path d="M23.9094 22.0951L24.9445 22.7161L24.6517 21.5451L23.5597 17.1769L26.9935 14.2114L27.8696 13.4548L26.7181 13.3357L22.1787 12.8661L20.4605 8.80485L19.9913 7.69584L19.5369 8.81103L17.8212 13.0223L13.2989 13.3342L12.0875 13.4177L13.0065 14.2114L16.4403 17.1769L15.3482 21.5451L15.0555 22.7161L16.0906 22.0951L20 19.7494L23.9094 22.0951ZM20 35.907C19.9621 35.863 19.9215 35.8158 19.8784 35.7655C19.5621 35.3964 19.1095 34.8584 18.566 34.1855C17.4786 32.8392 16.0295 30.9553 14.5814 28.8038C13.1324 26.6509 11.6905 24.2392 10.6124 21.8366C9.53124 19.4272 8.83331 17.0646 8.83331 14.9997C8.83331 8.77582 13.7761 3.83301 20 3.83301C26.2238 3.83301 31.1666 8.77582 31.1666 14.9997C31.1666 17.0646 30.4687 19.4272 29.3875 21.8366C28.3095 24.2392 26.8676 26.6509 25.4185 28.8038C23.9704 30.9553 22.5214 32.8392 21.4339 34.1855C20.8904 34.8584 20.4378 35.3964 20.1216 35.7655C20.0785 35.8158 20.0379 35.863 20 35.907Z"
                    fill="${CpColorStrok}" stroke="black"/>
                  </g>
                </svg>
              `),
              iconSize: [30, 30],
              iconAnchor: [15, 30],
              popupAnchor: [0, -30]
            });

            const marker = L.marker([station.latitude, station.longitude], { icon: policeCPIcon })
              .addTo(markersLayer)
              .on('mouseover', function () {
                this.bindPopup(`<b>${station.city} CP</b></br>Percentage : ${percentage}%`, {
                  offset: L.point(2, 10) // Adjust offset
                }).openPopup();
              })
              .on('mouseout', function () {
                this.closePopup();
              })
              .on('click', function () {
                // Only allow zoom if the CP's assigned city matches the station's city
                if (sub_role === 'CP' && station.city === assignedCPCity) {
                  // Zoom into the clicked city
                  map.setView([station.latitude, station.longitude], 12);


                  // Clear previous markers and layers
                  markersLayer.clearLayers();
                  if (window.cityRadiusLayer) {
                    map.removeLayer(window.cityRadiusLayer);
                  }

                  // Filter police stations in the clicked city
                  const cityStations = policeLatLong.filter(st => st.city === station.city);

                  // Add markers for the city's police stations
                  cityStations.forEach(st => {
                    L.marker([st.Latitude, st.Longitude], { icon: policeStationIcon })
                      .addTo(markersLayer)
                      .bindPopup(`<b>${st.PoliceStation}</b><br>${st.city}`);
                  });

                  // Draw a radius (circle) around the city
                  window.cityRadiusLayer = L.circle([station.latitude, station.longitude], {
                    color: "blue",
                    fillColor: "lightblue",
                    fillOpacity: 0.3,
                    radius: 5000 // 5 km radius
                  }).addTo(map);
                }
              });
          });
        }






        return {
          fillColor: selectedZone ? getZoneColor(sub_role == 'SP' ? district : districtName) : getZoneColor(sub_role == 'SP' ? zone : zoneName),
          fillOpacity: 0.7,
          color: "#ffff",
          weight: 1.5,
        };
      },
      // onEachFeature: (feature, layer) => {
      //   const districtName = selectedZone ? feature.properties.dtname : feature.properties.division;
      //   const zoneName = getZoneForDistrict(districtName);

      //   // if (sub_role != 'CP' && !assignedCPCity) {  
      //   layer.on({
      //     click: (e) => {
      //       setSelectedZone(zoneName);

      //     },
      //     mouseover: (e) => {
      //       layer.setStyle({ color: "#ffff", weight: 2 });
      //       console.log("selectedZone : ", selectedZone);
      //       console.log("percent : ", percent);

      //       L.popup()
      //         .setLatLng(e.latlng)
      //         .setContent(`<b>${selectedZone ? districtName : zoneName || district}</b><br>Percentage: ${selectedZone ? percent[districtName] || 0 : percent[zoneName] || 0 || percent[district] || 0}%`)
      //         .openOn(map);
      //     },
      //     mouseout: () => {
      //       layer.setStyle({ color: "#ffff", fillOpacity: 0.7 });
      //       map.closePopup();
      //     },
      //   });
      //   // }

      // },
      // --------------------------------added by me --------------------------------------------------------------


      onEachFeature: (feature, layer) => {
        const districtName = selectedZone ? feature.properties.dtname : feature.properties.division;
        const zoneName = getZoneForDistrict(districtName);
        const displayName = selectedZone ? districtName : zoneName || district;
        const displayPercent = selectedZone
          ? percent[districtName] || 0
          : percent[zoneName] || 0 || percent[district] || 0;

        // Bind tooltip to show percentage on the map
        // Get the center of the polygon for label placement
        const center = layer.getBounds().getCenter();

        // Create a custom label using Leaflet's DivIcon
        const label = L.divIcon({
          className: "map-label",
          html: (() => {
            if (selectedZone) {
              // Check if the districtName belongs to the selected zone
              if (zoneMapping[selectedZone]?.includes(districtName)) {
                return `<div class="flex flex-col justify-center text-center">
                          <b>${districtName}</b>
                          <b>${percent[districtName] || 0}%</b>
                        </div>`;
              } else {
                return ""; // Hide the label if the district does not belong to the selected zone
              }
            } else {
              return `<div class="flex flex-col justify-center text-center">
                        <b>${zoneName || district}</b>
                        <b>${percent[zoneName] || percent[district] || 0}%</b>
                      </div>`;
            }
          })(),
          iconSize: [100, 30],
        });


        // Add the label as a marker to the map
        L.marker(center, { icon: label }).addTo(map);

        let clickTimeout;
        let district_sp_cp = localStorage.getItem("district")
        let zone_sp_cp = localStorage.getItem("zone")
        sub_role == 'SP' || sub_role == 'CP' ? fetchPieChartData(district_sp_cp, selectedForm, catogory, zone_sp_cp) : null
        console.log("districtName", zone_sp_cp, "..................test............");
        layer.on({
          click: (e) => {
            if (clickTimeout) {
              clearTimeout(clickTimeout);
              clickTimeout = null;
              setSelectedZone(zoneName); // Double click action
            } else {
              clickTimeout = setTimeout(() => {
                if (sub_role === 'SP' || sub_role === 'CP') {
                  fetchPieChartData(district_sp_cp, selectedForm, catogory, zone_sp_cp);
                } else {
                  fetchPieChartData(selectedZone ? districtName : null, selectedForm, catogory, zoneName);
                }
                clickTimeout = null;
              }, 250); // Delay to detect double-click
            }
          },
          mouseover: () => {
            layer.setStyle({ color: "#ffff", weight: 2 });
          },
          mouseout: () => {
            layer.setStyle({ color: "#ffff", fillOpacity: 0.7 });
          }
        });
      },


      // ----------------------------added by me --------------------------------------------------------------------------

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


  }, [selectedZone, zonePercentages, selectedForm]);







  // -------------------i am adding useEffect ------------------------------------------
  const [mlResponse, setMlResponse] = useState(""); // State to store ML response
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls popup visibility


  const zoneMappingpayload = {
    "Amravati": "amravati_district",
    "Chhatrapati Sambhajinagar": "Chhatrapati_Sambhajinagar_district",
    "Konkan": "Konkan_district",
    "Nagpur": "Nagpur_district",
    "Pune": "Pune_district",
    "Nashik": "Nashik_district"
  };
  const zoneMappingpayloadFIR = {
    "Amravati": "amravati_fir",
    "Chhatrapati Sambhajinagar": "CHHATRAPATI_SAMBHAJINAGAR_fir",
    "Konkan": "Konkan_fir",
    "Nagpur": "NAGPUR_fir",
    "Pune": "pune_fir",
    "Nashik": "Nashik_fir"
  };

  useEffect(() => {
    const fetchMLResponse = async () => {
      try {

        console.log("catogory : ", catogory);

        // Decide whether to send `type` or `districts`
        const requestBody =
          !selectedZone
            ? (catogory === "Training"
              ? { type: "police_all_zone" }
              : catogory === "FIR"
                ? { type: "fir_zone_cp" }
                : {})
            : (catogory === "Training"
              ? { type: zoneMappingpayload[selectedZone] }
              : { type: zoneMappingpayloadFIR[selectedZone] });
        console.log("requestBody : ", requestBody)
        let response;
        if (catogory === "Training") {
          response = await axios.post(
            "https://mhmarvel.org/api2/llm_result",
            requestBody,
            { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
          );
        } else if (catogory === "FIR") {
          response = await axios.post(
            "https://mhmarvel.org/api2/offences",
            requestBody,
            { headers: { "Content-Type": "application/json", "Accept": "application/json" } }
          );
        }


        console.log("response.data:", response.data.formatted_llm_result);

        const modifiedHTML = response.data.formatted_llm_result

        setMlResponse(modifiedHTML);

        // Store in localStorage only for all zones
        localStorage.setItem("MLReport", modifiedHTML);

      } catch (error) {
        console.error("Error fetching ML response:", error);
        setMlResponse("Failed to load response");
      }
    };

    fetchMLResponse();
  }, [role, selectedZone, catogory]);

  // Runs only once when the component mounts

  // Function to format text: Converts bold text into <h3> tags

  // -------------------------------





  return (
    <div>
      {(role === 'chief secretary' || role == 'ACS' || role == 'DGP') &&
        <div
          style={{
            padding: "10px",
            borderRadius: "5px",
            height: "fit-content", // Auto-adjust height
            // width: "fit-content", // Auto-adjust width
            display: "flex",
            alignItems: "center",
            borderRadius: "10px",
            background: "#fff",
            right: "0",
            marginBottom: "10px",
          }}
        >
          {/* Text Content (Acts like an Input) */}
          <div
            style={{
              flex: 1,
              textOverflow: "ellipsis",
              padding: "5px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: mlResponse || "<p>Loading...</p>" }} />
          </div>
        </div>
      }

      <div style={{ display: "flex", height: "76vh", zIndex: "0", gap: "20px" }}>
        {/* Left Side - Map Section (75%) */}
        <div style={{ display: "flex", height: "71vh", width: "80%", position: "relative" }}>

          {/* ---------------------------myncode ----------------------------- */}

          {/* ------------------------------------------------------------------ */}

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "10%",
              transform: "translateX(-50%)",
              background: "#fff",
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              zIndex: 1001,
              //  width:"350px"
            }}
          >
            {/* Heading */}
            <h6 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "bold", textAlign: "center" }}>
              Select Date Range
            </h6>

            {/* Date Picker Inputs */}
            <div style={{ gap: "10px", alignItems: "center", }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>From Month</label>
                <input
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="p-2 border rounded-md"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "4px" }}>To Month</label>
                <input
                  type="month"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  className="p-2 border rounded-md"
                />
              </div>
            </div>

          </div>




          {/* Loading Overlay */}
          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(5px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <CircularProgress />
            </div>
          )}

          {/* Back Button (if selectedZone is true) */}
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

          {/* Map */}
          <div id="map" style={{ flex: 1, borderRadius: "8px" }}></div>

          {/* Legend */}
          <div
            style={{
              position: "absolute",
              right: 5,
              bottom: "-16%",
              transform: "translateY(-50%)",
              padding: "6px",  // Reduced padding
              background: "#fff",
              boxShadow: "0px 3px 5px rgba(0,0,0,0.1)",
              borderRadius: "5px",  // Reduced border radius
              fontSize: "12px",  // Smaller font size
              fontWeight: "bold",
              textAlign: "center",
              zIndex: "999",
              cursor: "pointer",
              width: "13vw",  // Reduced width
              minHeight: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "5px",  // Reduced gap
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "5px", fontWeight: "bold", padding: "10px", width: "200px" }}>
              Legend
            </div>
            {(sub_role === "IG/DIG" || role === "chief secretary") && (
              <>


                {/* changes */}
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Submit Zone / Total Zones</span>
                  <span> {Object.keys(zonePercentages).length} / 6</span> {/* Change 50 to your total districts count */}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Sumited-Dist / Total-Dist</span>
                  <span> {Object.keys(districtPercentages).length} / 36</span> {/* Change 50 to your total districts count */}
                </div>
                {/* changes */}


                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Submited CP/Total CP</span> <span> {Object.keys(cityPercentages).length}/12</span>
                </div>
              </>
            )}
            <hr style={{ margin: "5px 0", borderColor: "#ccc" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
              <span>80% or Above </span>
              <div style={{ width: "30px", height: "10px", background: "#37C503", borderRadius: "2px" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
              <span>60% - 80%</span>
              <div style={{ width: "30px", height: "10px", background: "#9AD911", borderRadius: "2px" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
              <span>40% - 60%</span>
              <div style={{ width: "30px", height: "10px", background: "#FF8585", borderRadius: "2px" }}></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5px" }}>
              <span>Less than 40%</span>
              <div style={{ width: "30px", height: "10px", background: "#F45546", borderRadius: "2px" }}></div>
            </div>
          </div>
        </div>



        <div style={{
          height: "75vh",
          width: "25%",
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",  // Centers content horizontally
          marginTop: "2px",
          overflow: "scroll"
        }}>

          {catogory === "FIR" ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "30px" }} className="flex-col">
              <h4
                style={{
                  textAlign: "center",
                  marginBottom: "0px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  width: "100%",
                }}
              >
                Type of Data
              </h4>

              <Select
                className="h-[40px]"
                labelId="form-type-label"
                id="form-type"
                value={selectedForm}
                onChange={handleChange}
                style={{ width: "80%" }} // Keeps dropdown width balanced
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: "200px",
                      overflowY: "auto",
                      width: "200px",
                    },
                  },
                }}
              >
                {options.map((form) => (
                  <MenuItem key={form} value={form}>
                    {form}
                  </MenuItem>
                ))}
              </Select>
            </div>
          ) : null}



          {catogory === "FIR" && selectedForm === "Pendency of cases under BNS" ? (
            <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}>

              <h3 style={{
                textAlign: "center",
                marginTop: "10px",
                marginBottom: "0px",
                fontWeight: "bold",
                width: "100%",
              }} >Registered Cases</h3>
              <div style={{ display: "flex" }}>
                <ApexCharts
                  options={{
                    labels: pieData1.labels,
                    chart: { type: "pie" },
                    legend: { position: "bottom" },
                    colors: ["#66B8FF", "#66F0B3"]
                  }}
                  series={pieData1.series}
                  type="pie"
                  width="300"
                />
              </div>
              <div>
                <ApexCharts
                  options={{
                    labels: pieData2.labels,
                    chart: { type: "pie" },
                    legend: { position: "bottom" },
                    colors: ["#66B8FF", "#66F0B3"]
                  }}
                  series={pieData2.series}
                  type="pie"
                  width="325"
                />
              </div>



            </div>
          ) :
            catogory === "FIR" && selectedForm === "Untraced Missing" ? (
              <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                <h4
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    marginBottom: "0px",
                    fontWeight: "bold",
                    width: "100%",
                  }}
                >Total of Missing Persons - {totalMissingPersons}</h4>

                <div style={{ display: "flex" }}>
                  <ApexCharts
                    options={{
                      labels: pieData1.labels,
                      chart: { type: "pie" },
                      legend: { position: "bottom" },
                      colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                      tooltip: {
                        y: {
                          formatter: (value) => value // Shows actual count in tooltip
                        }
                      },
                      dataLabels: {
                        enabled: true,
                        formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                      }
                    }}
                    series={pieData1.series}
                    type="pie"
                    width="320"
                  />

                </div>

                <div>
                  <ApexCharts
                    options={{
                      labels: pieData2.labels,
                      chart: { type: "pie" },
                      legend: { position: "bottom" },
                      colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                      tooltip: {
                        y: {
                          formatter: (value) => value // Shows actual count in tooltip
                        }
                      },
                      dataLabels: {
                        enabled: true,
                        formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                      }
                    }}
                    series={pieData2.series}
                    type="pie"
                    width="323"
                  />

                </div>
              </div>
            ) :
              catogory === "FIR" && selectedForm === "Important sections introduced in BNS" ? (
                <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                  <h4
                    style={{
                      textAlign: "center",
                      marginTop: "10px",
                      marginBottom: "0px",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >Important</h4>

                  <div style={{ display: "flex" }}>
                    <ApexCharts
                      options={{
                        labels: pieData1.labels,
                        chart: { type: "pie" },
                        legend: { position: "bottom" },
                        colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                        tooltip: {
                          y: {
                            formatter: (value) => value // Shows actual count in tooltip
                          }
                        },
                        dataLabels: {
                          enabled: true,
                          formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                        }
                      }}
                      series={pieData1.series}
                      type="pie"
                      width="320"
                    />

                  </div>

                  <div>
                    <ApexCharts
                      options={{
                        labels: pieData2.labels,
                        chart: { type: "pie" },
                        legend: { position: "bottom" },
                        colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                        tooltip: {
                          y: {
                            formatter: (value) => value // Shows actual count in tooltip
                          }
                        },
                        dataLabels: {
                          enabled: true,
                          formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                        }
                      }}
                      series={pieData2.series}
                      type="pie"
                      width="323"
                    />

                  </div>
                </div>
              ) :
                catogory === "FIR" && selectedForm === "Offences against body under BNS" ? (
                  <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                    <h4
                      style={{
                        textAlign: "center",
                        marginTop: "10px",
                        marginBottom: "0px",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >Offences</h4>

                    <div style={{ display: "flex" }}>
                      <ApexCharts
                        options={{
                          labels: pieData1.labels,
                          chart: { type: "pie" },
                          legend: { position: "bottom" },
                          colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                          tooltip: {
                            y: {
                              formatter: (value) => value // Shows actual count in tooltip
                            }
                          },
                          dataLabels: {
                            enabled: true,
                            formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                          }
                        }}
                        series={pieData1.series}
                        type="pie"
                        width="320"
                      />

                    </div>

                    <div>
                      <ApexCharts
                        options={{
                          labels: pieData2.labels,
                          chart: { type: "pie" },
                          legend: { position: "bottom" },
                          colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                          tooltip: {
                            y: {
                              formatter: (value) => value // Shows actual count in tooltip
                            }
                          },
                          dataLabels: {
                            enabled: true,
                            formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                          }
                        }}
                        series={pieData2.series}
                        type="pie"
                        width="323"
                      />

                    </div>
                  </div>
                ) :
                  catogory === "FIR" && selectedForm === "eSakshya Details" ? (
                    <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                      <h4
                        style={{
                          textAlign: "center",
                          marginTop: "10px",
                          marginBottom: "0px",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >esakshay details</h4>

                      <div style={{ display: "flex" }}>
                        <ApexCharts
                          options={{
                            labels: pieData1.labels,
                            chart: { type: "pie" },
                            legend: { position: "bottom" },
                            colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                            tooltip: {
                              y: {
                                formatter: (value) => value // Shows actual count in tooltip
                              }
                            },
                            dataLabels: {
                              enabled: true,
                              formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                            }
                          }}
                          series={pieData1.series}
                          type="pie"
                          width="300"
                        />

                      </div>

                    </div>
                  ) :
                    catogory === "FIR" && selectedForm === "Zero FIR's" ? (
                      // <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>
                      <div className="flex-col" style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "30px",
                        alignItems: "center",
                        textWrap: "wrap",
                        overflow: "auto",
                        flexWrap: "wrap", // Ensures all charts fit in the available space
                        width: "100%" // Ensures proper layout inside the container
                      }}>

                        <h4
                          style={{
                            textAlign: "center",
                            marginTop: "10px",
                            marginBottom: "0px",
                            fontWeight: "bold",
                            width: "100%",
                          }}
                        >Zero FIR's</h4>
                        {/* first pie chart */}
                        <div style={{ display: "flex" }}>
                          <ApexCharts
                            options={{
                              labels: pieData1.labels,
                              chart: { type: "pie" },
                              legend: { position: "bottom" },
                              colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                              tooltip: {
                                y: {
                                  formatter: (value) => value // Shows actual count in tooltip
                                }
                              },
                              dataLabels: {
                                enabled: true,
                                formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                              }
                            }}
                            series={pieData1.series}
                            type="pie"
                            width="300"
                          />

                        </div>
                        {/* second pie chart */}
                        <div style={{ display: "flex" }}>
                          <ApexCharts
                            options={{
                              labels: pieData2.labels,
                              chart: { type: "pie" },
                              legend: { position: "bottom" },
                              colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                              tooltip: {
                                y: {
                                  formatter: (value) => value // Shows actual count in tooltip
                                }
                              },
                              dataLabels: {
                                enabled: true,
                                formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                              }
                            }}
                            series={pieData2.series}
                            type="pie"
                            width="300"
                          />

                        </div>

                        {/* third pie chart */}
                        <div style={{ display: "flex" }}>
                          <ApexCharts
                            options={{
                              labels: pieData3.labels,
                              chart: { type: "pie" },
                              legend: { position: "bottom" },
                              colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                              tooltip: {
                                y: {
                                  formatter: (value) => value // Shows actual count in tooltip
                                }
                              },
                              dataLabels: {
                                enabled: true,
                                formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                              }
                            }}
                            series={pieData3.series}
                            type="pie"
                            width="300"
                          />

                        </div>

                        {/* Bar Chart for Zero FIRs */}
                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                          <ApexCharts
                            options={{
                              chart: { type: "bar", stacked: true },
                              xaxis: { categories: barData.categories },
                              legend: { position: "bottom" },
                              plotOptions: {
                                bar: {
                                  horizontal: false,
                                  dataLabels: { position: "top" },
                                },
                              },
                              tooltip: { y: { formatter: (value) => value } },
                            }}
                            series={barData.series}
                            type="bar"
                            width="500"
                            height="350"
                          />
                        </div>



                      </div>
                    ) :
                      catogory === "FIR" && selectedForm === "ITSSO Compliance Form" ? (
                        <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                          <h4
                            style={{
                              textAlign: "center",
                              marginTop: "10px",
                              marginBottom: "0px",
                              fontWeight: "bold",
                              width: "100%",
                            }}
                          >ITSSO Compliance Form</h4>

                          <div style={{ display: "flex" }}>
                            <ApexCharts
                              options={{
                                labels: pieData1.labels,
                                chart: { type: "pie" },
                                legend: { position: "bottom" },
                                colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                                tooltip: {
                                  y: {
                                    formatter: (value) => value // Shows actual count in tooltip
                                  }
                                },
                                dataLabels: {
                                  enabled: true,
                                  formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                                }
                              }}
                              series={pieData1.series}
                              type="pie"
                              width="300"
                            />

                          </div>

                        </div>
                      ) :
                        catogory === "FIR" && selectedForm === "Use of eSakshya App in cases with punishment of 7 yrs. or more" ? (
                          <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>
                            <h4 style={{
                              textAlign: "center",
                              marginTop: "10px",
                              marginBottom: "0px",
                              fontWeight: "bold",
                              width: "100%",
                            }}>
                              Use of eSakshya App (7 yrs. or more)
                            </h4>

                            {/* Sunburst Chart */}
                            <div style={{ width: "400px", height: "400px" }}>
                              <HighchartsReact
                                highcharts={Highcharts}
                                options={{
                                  chart: {
                                    type: 'sunburst',
                                    height: '100%',
                                  },
                                  title: {
                                    text: 'Sunburst Chart for eSakshya Usage',
                                  },
                                  series: [{
                                    type: 'sunburst',
                                    data: sunburstData, // Dynamically set data
                                    allowDrillToNode: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                      format: '{point.name}',
                                    },
                                    levels: [
                                      {
                                        level: 1,
                                        levelIsConstant: false,
                                        dataLabels: {
                                          filter: {
                                            property: 'innerArcLength',
                                            operator: '>',
                                            value: 16,
                                          },
                                        },
                                      },
                                      {
                                        level: 2,
                                        colorByPoint: true,
                                      },
                                    ],
                                  }],
                                  tooltip: {
                                    pointFormat: '{point.name}: <b>{point.value}</b>',
                                  },
                                }}
                              />
                            </div>
                          </div>

                        ) :
                          catogory === "FIR" && selectedForm === "Stolen & Recovered Property" ? (
                            <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}>

                              <h4 style={{ textAlign: "center", fontWeight: "bold", width: "100%" }}>
                                Stolen & Recovered Property
                              </h4>

                              {/* First Stacked Bar Graph */}
                              <ApexCharts
                                options={{
                                  chart: { type: "bar", stacked: true },
                                  xaxis: { categories: barData1.categories },
                                  legend: { position: "bottom" },
                                  colors: ["#FF6666", "#66B8FF"], // Colors for stacked bars
                                  tooltip: { y: { formatter: (value) => value } }
                                }}
                                series={barData1.series}
                                type="bar"
                                width="400"
                                height="200"
                              />

                              {/* Second Stacked Bar Graph */}
                              <ApexCharts
                                options={{
                                  chart: { type: "bar", stacked: true },
                                  xaxis: { categories: barData2.categories },
                                  legend: { position: "bottom" },
                                  colors: ["#FFB366", "#66F0B3"], // Colors for stacked bars
                                  tooltip: { y: { formatter: (value) => value } }
                                }}
                                series={barData2.series}
                                type="bar"
                                width="460"
                                height="340"
                              />

                            </div>
                          ) :
                            catogory === "FIR" && selectedForm === "eFIR" ? (
                              <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                                <h4
                                  style={{
                                    textAlign: "center",
                                    marginTop: "10px",
                                    marginBottom: "0px",
                                    fontWeight: "bold",
                                    width: "100%",
                                  }}
                                >eFIR</h4>

                                <div style={{ display: "flex" }}>
                                  <ApexCharts
                                    options={{
                                      labels: pieData1.labels,
                                      chart: { type: "pie" },
                                      legend: { position: "bottom" },
                                      colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                                      tooltip: {
                                        y: {
                                          formatter: (value) => value // Shows actual count in tooltip
                                        }
                                      },
                                      dataLabels: {
                                        enabled: true,
                                        formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                                      }
                                    }}
                                    series={pieData1.series}
                                    type="pie"
                                    width="300"
                                  />

                                </div>

                              </div>
                            ) :
                              catogory === "FORENSIC" ? (
                                <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center", textWrap: "wrap" }}>

                                  <h4
                                    style={{
                                      textAlign: "center",
                                      marginTop: "10px",
                                      marginBottom: "0px",
                                      fontWeight: "bold",
                                      width: "100%",
                                    }}
                                  >Forensic Team</h4>

                                  <div style={{ display: "flex" }}>
                                    <ApexCharts
                                      options={{
                                        labels: pieData1.labels,
                                        chart: { type: "pie" },
                                        legend: { position: "bottom" },
                                        colors: ["#FFB366", "#FF6666", "#66B8FF", "#66F0B3"],
                                        tooltip: {
                                          y: {
                                            formatter: (value) => value // Shows actual count in tooltip
                                          }
                                        },
                                        dataLabels: {
                                          enabled: true,
                                          formatter: (value, { seriesIndex, w }) => w.config.series[seriesIndex] // Show actual count on pie chart
                                        }
                                      }}
                                      series={pieData1.series}
                                      type="pie"
                                      width="300"
                                    />

                                  </div>

                                </div>
                              ) :
                                catogory === "Training" ? (
                                  <div className="flex-col" style={{ display: "flex", justifyContent: "center", gap: "30px", alignItems: "center" }}>

                                    <h4
                                      style={{
                                        textAlign: "center",
                                        marginTop: "10px",
                                        marginBottom: "0px",
                                        fontWeight: "bold",
                                        width: "100%",
                                      }}
                                    >Training Data</h4>
                                    <div style={{ display: "flex" }}>
                                      <ApexCharts
                                        options={{
                                          labels: pieData1.labels,
                                          chart: { type: "pie" },
                                          legend: { position: "bottom" },
                                          colors: ["#66B8FF", "#66F0B3"],
                                          tooltip: {
                                            y: {
                                              formatter: (val) => `${val} cases`, // Format the tooltip value as case count
                                            },
                                          },
                                          dataLabels: {
                                            formatter: (val, { seriesIndex, w }) => {
                                              return `${w.config.series[seriesIndex]}`; // Show raw values inside slices
                                            },
                                          },
                                        }}
                                        series={pieData1.series}
                                        type="pie"
                                        width="300"
                                      />
                                    </div>

                                    <div>
                                      <ApexCharts
                                        options={{
                                          labels: pieData2.labels,
                                          chart: { type: "pie" },
                                          legend: { position: "bottom" },
                                          colors: ["#66B8FF", "#66F0B3"],
                                          tooltip: {
                                            y: {
                                              formatter: (val) => `${val} cases`, // Format the tooltip value as case count
                                            },
                                          },
                                          dataLabels: {
                                            formatter: (val, { seriesIndex, w }) => {
                                              return `${w.config.series[seriesIndex]}`; // Show raw values inside slices
                                            },
                                          },
                                        }}
                                        series={pieData2.series}
                                        type="pie"
                                        width="300"
                                      />
                                    </div>




                                  </div>
                                ) :
                                  (
                                    <h1 style={{
                                      textAlign: "center",
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                      color: "#ff4d4d",
                                      backgroundColor: "#f8d7da",
                                      padding: "15px 20px",
                                      borderRadius: "8px",
                                      border: "1px solid #f5c6cb",
                                      boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                                      display: "inline-block",
                                      marginTop: "50%"
                                    }}>
                                      No data available
                                    </h1>

                                  )}


        </div>

      </div>
    </div>

  );
};

export default MaharashtraMap;
