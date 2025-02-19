import {React,useState,useRef} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tab2 from './Tab2';
import Tab3 from './Tab3';
import Tab4 from './Tab4';
import Tab1 from './Tab1';
import ForensicStrengtheningInitiatives from './ForensicStrengtheningInitiatives';
import forensicPDF from '../../../assets/Forensic_Department_Analysis.pdf';
import jsPDF from "jspdf";
import html2canvas from "html2canvas"; // ✅ Add this at the top




function CustomTabPanel({ children, value, index }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Dashboard1() {
  const [value, setValue] = useState(0);
  const trainingRef = useRef(null); // Reference to PoliceTraining component

  const handleChange = (_, newValue) => {
    console.log('new value', newValue);
    setValue(newValue);
  };
  const tabData = [
    { label: 'Forensic Lab Pendency Monitoring', component: <Tab1 ref={trainingRef} /> },
    { label: 'Mobile Forensic Vans Deployment', component: <Tab2  /> },
    { label: 'Forensic Strengthening Initiatives', component: <ForensicStrengtheningInitiatives  /> },
    { label: 'MoU with NFSU & Infrastructure Growth', component: <Tab4 /> },
  ];
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = forensicPDF;
    link.download = 'Forensic_Department_Analysis.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportDataDetails = [
    {
      name: "Forensic Department",
      data: 
      `
  Generated Summary:
From January 2024 to October 2024, there has been a steady decrease in the number of correctional institutions by approximately 5%,
from 1,200 to 1,140 facilities. During the same period, the number of courts also decreased by around 3%, from 3,600 to 3,510 entities.

Regarding video conferencing infrastructure, the data indicates a significant increase in the availability of video conferencing sets within correctional institutions, growing from 8,700 sets in January 2024 to 9,400 sets in October 2024, marking an approximately 7% growth. Similarly, cubicles for video conferencing have seen a similar trend, with the number of cubicles rising from 12,600 in January 2024 to 13,500 in October 2024, representing an increase of around 8%.

Notably, the growth in video conferencing infrastructure outpaces the decline in the number of correctional institutions and courts. This suggests a strategic initiative towards modernizing and upgrading the existing facilities, likely to improve communication between institutions, courts, and remote locations for hearings and administrative purposes.

As for trends across months, there is a consistent upward trajectory in the availability of video conferencing sets and cubicles throughout the period, with noticeable growth occurring from June 2024 onwards. This may be due to budget allocations and implementation timelines for infrastructure upgrades during this time.

In conclusion, over the eight-month period, there has been a decrease in the number of correctional institutions and courts, while the availability of video conferencing sets and cubicles has increased significantly. The trend towards modernization aligns with the growing need for efficient communication between various judicial entities in today's digital age.
      `
    }
  ];

const handleExportPoliceTraining = async () => {
  const pdf = new jsPDF("p", "mm", "a4"); // Create A4 size PDF
  const margin = 10;
  let yPosition = 20; // Start position for text
  
  // Capture PoliceTraining as an image
  if (trainingRef.current) {
    const canvas = await html2canvas(trainingRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const imgWidth = 180; // Fit image width into A4
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
    yPosition += imgHeight + 10; // Move below image
  }

  // Add a separator
  pdf.setDrawColor(0);
  pdf.line(10, yPosition, 200, yPosition);
  yPosition += 10;

  // Loop through exportDataDetails and add formatted text
  exportDataDetails.forEach((item, index) => {
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text(item.name, margin, yPosition);
    yPosition += 6;

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");

    // Properly format long text for PDF
    const textLines = pdf.splitTextToSize(item.data, 180);
    
    // Check if text fits on the page, if not add a new page
    let linesPerPage = 50; // Approximate lines per page
    let lineChunks = [];
    
    for (let i = 0; i < textLines.length; i += linesPerPage) {
      lineChunks.push(textLines.slice(i, i + linesPerPage));
    }
    
    lineChunks.forEach((chunk, chunkIndex) => {
      if (yPosition > 270) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(chunk, margin, yPosition);
      yPosition += chunk.length * 5 + 10; // Adjust spacing
    });

    // Add a separator for sections
    if (index !== exportDataDetails.length - 1) {
      pdf.line(10, yPosition, 200, yPosition);
      yPosition += 10;
    }
  });

  // Save the PDF
  pdf.save("Forensic_Department_Analysis.pdf");
};

  return (
    <Box sx={{ width: '100%', padding: '1rem', fontFamily: 'Work Sans', backgroundColor: '#f4f4f4' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: 0, borderColor: '#dbdfed' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          sx={{
            "& .MuiTab-root": {
              minWidth: 'auto',
              margin: '0px 10px',
              padding: '0px',
              fontWeight: '400',
              color: '#2A2E43',
            },
            "& .Mui-selected": {
              color: 'rgba(43, 47, 67, 1) !important',
              padding: '0px',
              fontWeight: 'bold',
            },
            "& .MuiTabs-indicator": {
              borderBottom: '2px',
              bottom: 0,
              backgroundColor: '#2A2E43',
              height: '5px',
              boxShadow: '0px 3.17px 25.33px 0px #0000001F',
              transform: 'translateY(50%)',
            },
            marginLeft: '-10px',
            fontFamily: 'Work Sans',
          }}
          className="tab_names"
          aria-label="navigation tabs"
        >
          {tabData.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              {...a11yProps(index)}
              sx={{
                fontSize: '14px',
                textTransform: 'none',
                fontFamily: 'Work Sans',
                color: '#8B8A8A !important',
              }}
            />
          ))}
        </Tabs>
        {value===0&&<Button
        sx={{
          backgroundColor: "transparent",
          color: "#65558F",
          border: "2px solid #65558F",
          padding: "5px 9px",
          borderRadius: "8px",
          "&:hover": {
          backgroundColor: "#65558F",
          color: "white",
          },
          }}
          onClick={handleExportPoliceTraining}>
          Export
        </Button>}
      </Box>
      {tabData.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
