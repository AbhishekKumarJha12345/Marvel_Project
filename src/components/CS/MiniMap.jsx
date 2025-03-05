import React, { useEffect, useState } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import policeStations from "./police_stations.json"; // Import JSON directly

const MiniMap = ({ district }) => {
    useEffect(() => {
        if (!district) return;

        const miniMap = L.map('mini-map', {
            center: district.properties.dtname === "Palghar" ? [19.6967, 72.7699] : 
                    [district.geometry.coordinates[0][0][1], district.geometry.coordinates[0][0][0]], 
            zoom: 8.4,
            minZoom: 8.4,
            maxZoom: 16,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(miniMap);

        L.geoJSON(district.geometry, {
            style: { color: 'rgb(165, 165, 165)', weight: 2 },
        }).addTo(miniMap);

        const filteredStations = policeStations.filter(
            (station) => station.District.toLowerCase() === district.properties.dtname.toLowerCase()
        );


        const customIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Default marker icon
            iconSize: [25, 41], // Size of the icon
            iconAnchor: [12, 41], // Point of the icon that corresponds to marker's location
            popupAnchor: [1, -34], // Where popups should open
            tooltipAnchor: [16, -28], // Adjust tooltip position
            shadowUrl: '', // No shadow
            shadowSize: [0, 0], // Ensure no shadow
            shadowAnchor: [0, 0] // No shadow anchor
        });

        // Add Police Station Markers
        filteredStations.forEach(station => {
            const marker = L.marker([station.Latitude, station.Longitude], { icon: customIcon }).addTo(miniMap);

            marker.bindTooltip(
                `<div>
                    <strong>${station["Police Station"]}</strong><br/>
                    <b>Sub Division:</b> ${station["Sub Division"]}<br/>
                    <b>District:</b> ${station.District}<br/>
                    <b>Range:</b> ${station.Range}<br/>
                    <b>Constables:</b> ${station.Constables}<br/>
                    <b>Officers:</b> ${station.Officers}
                </div>`,
                { permanent: false, direction: "top" }
            );
        });

        return () => {
            miniMap.remove();
        };
    }, [district]);

    return (
        <div className="minimap-container" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9', width: "100vw" }}>
            <div id="mini-map" style={{ height: "80vh", width: '100%', borderRadius: '8px' }}></div>
        </div>
    );
};

export default MiniMap;
