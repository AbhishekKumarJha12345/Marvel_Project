import React from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LoginChart = ({ data }) => {
    if (!data || !data.datasets) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="h-[400px]">
            <Line
                data={data}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: "bottom" },
                        tooltip: { mode: "index", intersect: false },
                    },
                    scales: {
                        x: { title: { display: true, text: "Date" } },
                        y: { title: { display: true, text: "Logins" } },
                    },
                }}
            />
        </div>
    );
};

export default LoginChart;