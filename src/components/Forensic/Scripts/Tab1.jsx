import React, { useState, forwardRef,useEffect, use } from "react";
import Tabledata from "./Tabledata";
import Tab1_1 from "./Tab1_1";
import ModalComponent from "../../Police/ModalComponent";
import BarGraph from "./BarGraph";
import OfficersGraph from "./OfficersGraph";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
 
const Tab1 = forwardRef((props, ref) => {  
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const[grade,setGrade]=useState(null);
   const Clearfilter=()=>{
        setFromDate(null);
        setToDate(null);
      }
      
      useEffect(() => {
        if(fromDate||toDate)
        {
          // fetchImplementationData();
        }
      }, [fromDate,toDate]);
  return (
    <div className="rounded-lg w-full max-w-full h-auto" ref={ref}>
      <div className="flex justify-between items-center ">
        <h1 className="text-2xl font-bold">Forensic Development Dashboard</h1>
      </div>
     
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
  
      <div style={{ backgroundColor: "#f4f4f4", padding: "1rem", borderRadius: "5px" }}>
  {/* Deviation Section */}
  <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-between items-center mb-4">
      <h2 style={{ textAlign: "left", fontSize: "1.5rem", fontWeight: "bold" }}>Deviation</h2>
        <div className="flex items-center gap-4">
          <div>
             
            <DatePicker
            label='From'
              views={["year", "month"]}
              value={fromDate}
              onChange={setFromDate}
              slotProps={{
                textField: { 
                  variant: "outlined",
                  size: "small",
                  sx: { width: "140px", fontSize: "12px" },
                }
              }}
              sx={{ "& .MuiPickersPopper-paper": { transform: "scale(0.9)" } }}
            />
          </div>

          <div>
              
            <DatePicker
            label='To'
              views={["year", "month"]}
              value={toDate}
              onChange={setToDate}
              slotProps={{
                textField: { 
                  variant: "outlined",
                  size: "small",
                  sx: { width: "140px", fontSize: "12px" },
                }
              }}
              sx={{ "& .MuiPickersPopper-paper": { transform: "scale(0.9)" } }}
            />
          </div>

          <button 
            onClick={Clearfilter} 
            className="bg-blue-500 text-white px-3 py-1 rounded-md "
            style={{ backgroundColor: "#2d3748" }}>
            Clear Filter
          </button>
        </div>

      </div>
    </LocalizationProvider>
    <div style={{ display: "flex", gap: "20px", width: "100%", minHeight: "300px", overflow: "auto" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #ddd", paddingRight: "10px" }}>
        <div style={{ flexGrow: 1, height: "auto", overflow: "auto" }}>
          <OfficersGraph setGrade={setGrade} to={toDate} from={fromDate} />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: "10px" }}>
        <div style={{ flexGrow: 1, height: "auto", overflow: "auto" }}>
          <Tabledata setData={setData} to={toDate} from={fromDate} />
        </div>
      </div>
    </div>
  </div>

  {/* Recent Entry Section */}
  <div style={{ background: "white", margin: "10px 0", padding: "10px", borderRadius: "10px", overflow: "auto", border: "1px solid #ddd" }}>
    <h2 style={{ textAlign: "left", fontSize: "1.5rem", fontWeight: "bold" }}>Recent Entry: {data && data?.month}</h2>
    <div style={{ display: "flex", gap: "20px", width: "100%", minHeight: "300px", overflow: "auto" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #ddd", paddingRight: "10px" }}>
        <div style={{ flexGrow: 1, height: "auto", overflow: "auto" }}>
          <Tab1_1 gradeData={grade}/>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: "10px" }}>
        <div style={{ flexGrow: 1, height: "auto", overflow: "auto" }}>
          <BarGraph data={data} />
        </div>
      </div>
    </div>
  </div>
</div>



      </div>



      <ModalComponent open={showModal} type="forensic" onClose={() => setShowModal(false)} />
    </div>
  );
});

export default Tab1;
