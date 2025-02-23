import React, { useEffect, useState } from 'react';
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import axiosInstance from "../../utils/axiosInstance"; // Using axios instance

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MiniMap = ({ district }) => {
    const [barData, setBarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!district) return;

        const miniMap = L.map('mini-map', {
          
            center: district.properties.dtname === "Palghar" ? [19.6967, 72.7699] : [district.geometry.coordinates[0][0][1], district.geometry.coordinates[0][0][0]], 
            zoom: 7,
            minZoom: 7,
            maxZoom: 16,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(miniMap);

        L.geoJSON(district.geometry, {
            style: { color: 'rgb(165, 165, 165)', weight: 2, fillOpacity: 0.5, fillColor: "rgba(129, 163, 255, 0.24)" },
        }).addTo(miniMap);

        return () => {
            miniMap.remove();
        };
    }, [district]);

    useEffect(() => {
        const fetchBarData = async () => {
            if (!district) return;

            setLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get("/district-services");
                const { data } = response;

                if (!data || !data.success || !Array.isArray(data.data)) {
                    throw new Error("Invalid response from server.");
                }

                const districtData = data.data.find(item => item.district.toLowerCase() === district.properties.dtname.toLowerCase());

                if (!districtData) {
                    throw new Error(`No data found for district: ${district.name}`);
                }

                setBarData({
                    labels: ['Services'], // Single category to split into three datasets
                    datasets: [
                        {
                            label: 'Police',
                            data: [districtData.Police || 0],
                            backgroundColor: '#4274D1' // Rich Royal Blue
                        },
                        {
                            label: 'Forensic',
                            data: [districtData.Forensic || 0],
                            backgroundColor: '#E8743B' // Deep Sunset Orange
                        },
                        {
                            label: 'Correctional',
                            data: [districtData.Correctional || 0],
                            backgroundColor: '#8E5EBE' // Vibrant Purple
                        }
                    ]
                });
                
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Error fetching data.");
            } finally {
                setLoading(false);
            }
        };

        fetchBarData();
    }, [district]);

    return (
        <div className="minimap-container" style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', backgroundColor: '#f9f9f9' }}>
            <div id="mini-map" style={{ height: '300px', width: '100%', borderRadius: '8px' }}></div>
            
            <div style={{ textAlign: 'center', marginTop: '10px', padding: '10px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ margin: 0, fontSize: '1.2em', color: '#333' }}>{district?.properties.dtname || "Select a District"}</h3>
            </div>

            <div style={{ marginTop: '15px', backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', height: '250px' }}>
                {loading ? <p>Loading data...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : barData && (
                    <Bar 
                        data={barData} 
                        options={{ responsive: true, maintainAspectRatio: false }} 
                    />
                )}
            </div>
        </div>
    );
};

export default MiniMap;
