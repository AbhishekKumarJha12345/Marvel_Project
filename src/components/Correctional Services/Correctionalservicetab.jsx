import {React,useRef,useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Correctionaservicesgraphs from './Correctionaservicesgraphs';
import Trainingtocorrectional from './Trainingtocorrectional';
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

export default function Correctionalservicetab() {
  const [value, setValue] = useState(0);
  const trainingRef = useRef(null); // Reference to PoliceTraining component
  const tabData = [
    { label: 'Home', component: <Correctionaservicesgraphs ref={trainingRef}/> },
    // { label: 'Services', component: null },
  ];
  const handleChange = (_, newValue) => {
    console.log('new value',newValue)
    setValue(newValue);
  };
  const exportDataDetails = [
    {
      name: "Correctional Services",
      data: `
Generated Summary:
Over the provided period, the following trends have been observed regarding correctional institutions:

Number of Correctional Institutions: The count has remained relatively stable over time, with minor fluctuations suggesting no significant increase or decrease in the number of facilities.

Inmate Population: There appears to be a gradual rise in the total inmate population, indicating a growing correctional system demand. However, it's essential to consider other factors that could influence this trend, such as crime rates and sentencing policies.

Admissions: Similar to the inmate population, admissions have also shown an upward trend. This increase might be attributed to the rise in the crime rate or changes in criminal justice policies.

Percentage of Inmates Served by Different Sentence Durations: Approximately 33% (one-third) of the inmates serve sentences lasting less than a year, while around 67% serve longer durations. This suggests that a majority of individuals are incarcerated for more extended periods, which could indicate a focus on rehabilitation or longer sentencing policies.

Application and Bond Counts: The data does not provide daily application and bond counts, but there appears to be an increase in the total number of applications and bonds processed over time. This trend may reflect growing public interest in correctional facilities or changes in legal procedures.

Significant Changes or Trends:
The gradual increase in the inmate population, admissions, and application/bond counts could suggest a growing need for correctional services or changes in criminal justice policies.
The steady number of correctional institutions may indicate that existing facilities are adapting to accommodate the increasing demand or new correctional facilities are being constructed.

Insights into the Relationships:
A positive correlation is observed between the number of admissions and the inmate population, indicating an association between the two variables. This could suggest that as more individuals enter the system, the total inmate population grows.
There seems to be a weak relationship between the number of correctional institutions, the inmate population, and application/bond counts. This may imply that changes in these factors do not significantly impact each other, or there are other underlying factors influencing these trends.

In conclusion, the provided data shows an increase in admissions, inmate population, applications, and bonds over time. The stable number of correctional institutions suggests that existing facilities are adapting to accommodate this growth. Further research could explore potential causes for these trends and analyze the impact on public safety and justice system efficiency.
      `
    }
  ];  
  const highlightAdjectives = (text, pdf, x, y) => {
    const words = text.split(" ");
    let currentX = x;
    let currentY = y;
    pdf.setFontSize(11);
  
    words.forEach((word) => {
      const isAdjective = /\b(amazing|significant|highest|lowest|sharp|major|stable|best|worst|efficient|new|strong|weak|increasing|decreasing|increase|decrease|critical|improved|rapid|slow|better|worse|important|remarkable)\b/i.test(word);
  
      if (isAdjective) {
        pdf.setFont("helvetica", "bold"); // Highlight adjective in bold
      } else {
        pdf.setFont("helvetica", "normal");
      }
  
      if (currentX + pdf.getTextWidth(word) > 180) {
        currentX = x;
        currentY += 6; // Move to new line if needed
      }
  
      pdf.text(word, currentX, currentY);
      currentX += pdf.getTextWidth(word) + 3; // Move forward
    });
  
    return currentY + 6; // Return new Y position
  };
  const [rloading,setRloading]=useState(false)
  const handleExportPoliceTraining = async () => {
    setRloading(true)
    const pdf = new jsPDF("p", "mm", "a4"); // Create A4 size PDF
    const margin = 10;
    let yPosition = 20; // Start position for text
    
    // Capture PoliceTraining as an image
    // if (trainingRef.current) {
    //   const canvas = await html2canvas(trainingRef.current, { scale: 2 });
    //   const imgData = canvas.toDataURL("image/png");
  
    //   const imgWidth = 180; // Fit image width into A4
    //   const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
    //   pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
    //   yPosition += imgHeight + 10; // Move below image
    // }
    if (trainingRef.current) {
      const canvas = await html2canvas(trainingRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
    
      const pageWidth = pdf.internal.pageSize.getWidth() - 2 * margin; // Get available width
      const pageHeight = pdf.internal.pageSize.getHeight() - 2 * margin; // Get available height
      const imgWidth = Math.min(pageWidth, canvas.width);
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
    
      if (imgHeight > pageHeight) {
        pdf.addImage(imgData, "PNG", margin, margin, pageWidth, pageHeight); // Stretch to fit
        pdf.addPage();
        yPosition = 20; // Reset yPosition for text
      } else {
        pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10; // Move below image
      }
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
    
      const textLines = pdf.splitTextToSize(item.data, 180);
      let linesPerPage = 50;
      let lineChunks = [];
    
      for (let i = 0; i < textLines.length; i += linesPerPage) {
        lineChunks.push(textLines.slice(i, i + linesPerPage));
      }
    
      lineChunks.forEach((chunk, chunkIndex) => {
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
        }
    
        chunk.forEach((line) => {
          yPosition = highlightAdjectives(line, pdf, margin, yPosition);
        });
    
        yPosition += 10;
      });
    
      if (index !== exportDataDetails.length - 1) {
        pdf.line(10, yPosition, 200, yPosition);
        yPosition += 10;
      }
    });
  
    // Save the PDF
    pdf.save("Correctional_Services_Report.pdf");
    setRloading(false)
  };

  return (
    <Box sx={{ width: '100%', padding: '1rem',fontFamily:"Work Sans",backgroundColor:"#f4f4f4"}}>
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
            fontFamily:"Work Sans",
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
          minWidth:'80px',
          "&:hover": {
          backgroundColor: "#65558F",
          color: "white",
          },
          }}
          onClick={handleExportPoliceTraining}>
          {!rloading ? 'Export' : <><span className="spinner-border spinner-border-sm me-2"></span></>}
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

