import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import policeStations from "./police_stations.json";

const MiniMap = ({ district }) => {
    useEffect(() => {
        if (!district) return;

        const miniMap = L.map("mini-map", {
            center:
                district.properties.dtname === "Palghar"
                    ? [19.6967, 72.7699]
                    : [district.geometry.coordinates[0][0][1], district.geometry.coordinates[0][0][0]],
            zoom: district.properties.dtname === "Mumbai" ? 11.5 : district.properties.dtname === "Mumbai Suburban" ? 11 : 9,
      zoomControl: false,



      dragging: false,
      scrollWheelZoom: false,
      touchZoom: false,
      doubleClickZoom: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(miniMap);

        // Define large bounds to create the white mask
        const outerBounds = [
            [10, 60], // Bottom-left far outside Maharashtra
            [30, 90], // Top-right far outside Maharashtra
        ];

        const outerPolygon = [
            [outerBounds[0][0], outerBounds[0][1]], // SW
            [outerBounds[0][0], outerBounds[1][1]], // SE
            [outerBounds[1][0], outerBounds[1][1]], // NE
            [outerBounds[1][0], outerBounds[0][1]], // NW
        ];

        // Get district coordinates
        const districtCoords = district.geometry.coordinates[0].map((coord) => [coord[1], coord[0]]);

        // Create a hole in the white polygon by using the district boundary
        const maskLayer = L.polygon([outerPolygon, districtCoords], {
            color: "white",
            fillColor: "white",
            fillOpacity: 1,
            weight: 0,
        }).addTo(miniMap);

        // Add the district outline
        L.geoJSON(district.geometry, {
            style: { color: "rgb(139, 139, 139)", weight: 2, fillOpacity: 0.5, fillColor: "rgba(0,0,0,0.1)" },
        }).addTo(miniMap);

        miniMap.fitBounds(L.geoJSON(district.geometry).getBounds());

        // Add Police Station Markers
        const filteredStations = policeStations.filter(
            (station) => station.District.toLowerCase() === district.properties.dtname.toLowerCase()
        );

        const customIcon = L.icon({
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowUrl: "",
        });

        filteredStations.forEach((station) => {
            const marker = L.marker([station.Latitude, station.Longitude], { icon: customIcon }).addTo(miniMap);
            marker.bindTooltip(
                `<div>
                    <strong>${station["Police Station"]}</strong><br/>
                    <b>Sub Division:</b> ${station["Sub Division"]}<br/>
                    <b>District:</b> ${station.District}<br/>
                    <b>Constables:</b> ${station.Constables}<br/>
                    <b>Officers:</b> ${station.Officers}<br/>
                    <b>No.of FIR's:</b> ${station.FIR}<br/>
                    <b>Population:</b> ${station.Population}
                </div>`,
                { permanent: false, direction: "top" }
            );
        });

        return () => {
            miniMap.remove();
        };
    }, [district]);

    return (
        <div className="minimap-container" style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", backgroundColor: "#f9f9f9", width: "100vw" }}>
            <div id="mini-map" style={{ height: "80vh", width: "100%", borderRadius: "8px" }}></div>
        </div>
    );
};

export default MiniMap;
