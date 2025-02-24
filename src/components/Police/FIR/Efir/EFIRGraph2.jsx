import { React, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import ModalComponent from '../../ModalComponent';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';

// Register required chart components
ChartJS.register(LineElement, PointElement, Tooltip, Legend, CategoryScale, LinearScale);

const EFIRsChart2 = ({ generateReport }) => {
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  
  const originalData = [
    { month: 'Jan', total: 50, converted: 10 },
    { month: 'Feb', total: 40, converted: 15 },
    { month: 'Mar', total: 55, converted: 20 },
    { month: 'Apr', total: 65, converted: 18 },
    { month: 'May', total: 70, converted: 25 },
    { month: 'Jun', total: 85, converted: 30 },
    { month: 'Jul', total: 90, converted: 35 },
    { month: 'Aug', total: 100, converted: 45 },
    { month: 'Sep', total: 95, converted: 40 },
    { month: 'Oct', total: 80, converted: 38 },
    { month: 'Nov', total: 60, converted: 30 },
    { month: 'Dec', total: 75, converted: 25 },
  ];
  
  const monthIndex = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11,
  };

  const filteredData = useMemo(() => {
    return originalData.filter(({ month }) => {
      const monthNum = monthIndex[month];
      
      if (fromDate && monthNum < fromDate.getMonth()) return false;
      if (toDate && monthNum > toDate.getMonth()) return false;
      
      return true;
    });
  }, [fromDate, toDate]);

  const chartData = {
    labels: filteredData.map((d) => d.month),
    datasets: [
      {
        label: 'Total eFIRs Received',
        data: filteredData.map((d) => d.total),
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.5)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Total eFIRs Converted to FIRs',
        data: filteredData.map((d) => d.converted),
        borderColor: '#82ca9d',
        backgroundColor: 'rgba(130, 202, 157, 0.5)',
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'eFIRs Data Trend Over the Year' },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    scales: {
      x: { title: { display: true, text: 'Month' } },
      y: { title: { display: true, text: 'Number of eFIRs' }, beginAtZero: true },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
  <div className="bg-white p-6 mx-auto rounded-lg w-[100%] h-[400px]">
    <h2 className="text-3xl font-semibold flex-grow">
      E-FIRs Trend Over Time
    </h2>
    <div className="flex justify-between items-center mb-4">
      <div className="flex gap-4 mb-2 items-end">
        <DatePicker
          views={["month"]}
          label="From"
          value={fromDate}
          onChange={setFromDate}
          slotProps={{
            textField: {
              variant: "outlined",
              size: "small",
              sx: { width: "140px" },
            },
          }}
        />
        <DatePicker
          views={["month"]}
          label="To"
          value={toDate}
          onChange={setToDate}
          slotProps={{
            textField: {
              variant: "outlined",
              size: "small",
              sx: { width: "140px" },
            },
          }}
        />
        <button
          onClick={() => {
            setFromDate(null);
            setToDate(null);
          }}
          className="p-2 bg-[#2d3748] text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <div className="h-[300px]">
      <Line data={chartData} options={options} />
    </div>

    <ModalComponent open={showModal} type="fir_4" onClose={() => setShowModal(false)} />
  </div>
</LocalizationProvider>

  );
};

export default EFIRsChart2;
