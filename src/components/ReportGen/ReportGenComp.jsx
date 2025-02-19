import React from "react";
import jsPDF from "jspdf";
import logo from "../../assets/pdflogo.png";
import background from "../../assets/rbg3.jpg"; // Add your background image

const ReportGencomp = () => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add background image
    const bgImg = new Image();
    bgImg.src = background;
    doc.addImage(bgImg, "PNG", 0, 0, 210, 297); // A4 size background

    // Title
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White color
    doc.text("Interoperable Criminal Justice System Report", 40, 10);

    // Add logo
    const img = new Image();
    img.src = logo;
    doc.addImage(img, "PNG", 80, 16, 50, 30);

    // Add a line break
    // doc.setLineWidth(0.5);
    // doc.line(10, 60, 200, 60);

    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0)
    doc.text("Summary :",10, 90, { maxWidth: 190 });
    doc.text("In the provided data, there are two sets of statistics related to court cases for the months September 2021 and February 2025. Here's a summary comparison between the two months:", 10, 100, { maxWidth: 190 });
    doc.text("- Total charge-sheeted: Both months have a total of 7 charges sheeted, but it's not clear if this is the same set of cases or different ones.", 10, 120, { maxWidth: 190 });
    doc.text("- Pending Cases: In September 2021, there were 432 pending cases, while in February 2025, there were 7 pending cases. It appears that the number of pending cases has significantly decreased from September 2021 to February 2025.", 10, 140, { maxWidth: 190 });
    doc.text("- Acquittals: In September 2021, there were 44 acquitted cases, while in February 2025, there were 7 acquitted cases. It seems that the number of acquitted cases has decreased from September 2021 to February 2025.", 10, 160, { maxWidth: 190 });
    doc.text("- Convictions: In September 2021, there were 233 convicted cases, while in February 2025, there were only 7 convicted cases. This suggests a significant decrease in the number of convictions from September 2021 to February 2025.", 10, 180, { maxWidth: 190 });
    doc.text("- In summary, it appears that there has been a significant reduction in the number of pending, acquitted, and convicted cases from September 2021 to February 2025. However, more data would be needed to definitively determine if this is a trend or an anomaly.", 10, 200, { maxWidth: 190 });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255); // White color
    doc.text("Generated on: " + new Date().toLocaleString(), 10, 280);

    // Save PDF
    doc.save("Overall_Report.pdf");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Court Cases Summary</h1>
      <button 
        onClick={generatePDF} 
        style={{ 
          padding: "10px 20px", 
          fontSize: "16px", 
          cursor: "pointer", 
          backgroundColor: "#007BFF", 
          color: "white", 
          border: "none", 
          borderRadius: "5px" 
        }}
      >
        Generate PDF Report
      </button>
    </div>
  );
};

export default ReportGencomp;
