import React, { useEffect, useState } from "react";
import {
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,InputLabel,FormHelperText
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
const ModalComponent = ({ open,type, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFileType, setSelectedFileType] = useState(""); // Police or Workshop
  const initial = {
    // type:selectedOption,
    rank: "",
    trained_officers: "",
    available_officers: "",
    percentage: "",
    training_workshops: "",
    e_academy_online: "",
    master_trainers: "",
    // fir_1 fields
    total_no_fir_registered_under_bns_ipc: "",
    no_of_fir_registered_under_bns: "",
    percentage_of_fir_under_bns_against_total_firs: "",
    no_of_chargesheets_filed_under_bns: "",
    no_of_chargesheets_not_filed_within_the_stipulated_time: "",
    percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns: "",
    // fir_2 fields
    total_charge_sheeted: "",
    convicted: "",
    acquitted: "",
    pending: "",
    // fir_3 fields
    act: "",
    section: "",
    total_registered: "",
    chargesheeted: "",
    under_investigation: "",
    // fir_4 fields
    zero_fir : "",
    regular_fir : "",
    yet_to_be_registered_zero_fir : "",
    //fir_5 fields
    // city :"",
    state :"",
    ps_name:"",
    date_of_data :"",
    type_of_data :"",
    //van fields
    vanId :"", 
    city :"",
    // date :"",
    count :"",
    status :"",
    //for_dev fields
    month :"",
    earlier_pending :"",
    earlier_pending_exhibits :"",
    received_cases :"",
    received_exhibits :"",
    disposal_cases :"",
    disposal_exhibits :"",
    pending_cases :"",
    pending_exhibits :"",

  };
  
  const [formData, setFormData] = useState(initial);

  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Handle Radio Button Change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log('radio',event.target.value)
    setFormData(initial);
    setUploadedFiles([]);
  };


  // Handle Form Data Change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Handle File Upload
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const allowedTypes = ["application/zip", "application/x-zip-compressed", "text/csv"];
  
    const validFiles = files.filter(file => allowedTypes.includes(file.type));
  
    if (validFiles.length !== files.length) {
      alert("Only CSV or ZIP files are allowed.");
    }
  
    setUploadedFiles([...uploadedFiles, ...validFiles]);
  };
  

  // Remove File
  const removeFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };
  useEffect(() => {
    if (type === "police") setSelectedOption("training");
    if (type === "forensic") setSelectedOption("van");
  }, [type]);
 


  const handleSubmit = async () => {
    try {
      // Create FormData object
      const formDataToSend = new FormData();
    
      console.log("Raw Form Data:", formData);
  
      // Append form fields (convert values to strings to ensure compatibility)
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key] !== null ? String(formData[key]) : "");
      });
    
      // Append current date
      const currentDate = new Date().toISOString().split("T")[0];
      console.log('timestamp',currentDate)
      if(type!=="forensic") formDataToSend.append("date", currentDate);
      let url='/add_forms'
      if(type==='police') formDataToSend.append("type", selectedOption);

      if(['fir_1','fir_2','fir_3','fir_4','fir_5'].includes(type)) {console.log('type',type); formDataToSend.append("type", type)}
      if(type==='forensic'){
        formDataToSend.append("type", selectedOption);
        formDataToSend.append("date_of_file", currentDate);
        url='/forensic_form'
      }
      // Append files if any
      if (uploadedFiles.length > 0) {
        // formDataToSend.append('type',selectedFileType)
        uploadedFiles.forEach((file) => {
          formDataToSend.append("files", file);
        });
      }
    
      // Debugging: Log FormData contents before sending
      // console.log("FormData Contents:");
      // for (let pair of formDataToSend.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }
      // console.log("FormData Type:", formDataToSend instanceof FormData ? "FormData" : typeof formDataToSend);


      // Send all data in one request
      const response = await axiosInstance.post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data", // Important to specify this
        },
      });
    
      if (response.status !== 200&&response.status !== 201) {
        throw new Error("Failed to submit form data");
      }
    
      alert(`${selectedOption} Form Submitted Successfully!`);
    
      // Reset states
      setFormData(initial);
      setUploadedFiles([]);
      setSelectedFileType("");
      if (type === "police") setSelectedOption("training");
      if (type === "forensic") setSelectedOption("van");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  
  
  


  return (
    <>

<Dialog
  open={open}
  onClose={onClose}
  fullWidth
  maxWidth="sm"
  sx={{
    "& .MuiPaper-root": { borderRadius: "30px" }, // Rounded corners
    "& .MuiDialogContent-root": { 
      maxHeight: "600px",  // Set a max height to enable scrolling
      overflowY: "auto",   // Enable vertical scrolling
      scrollbarWidth: "thin", // Firefox scrollbar
      scrollbarColor: "#2d3748 #f0f0f0", // Track and thumb color for Firefox
      "&::-webkit-scrollbar": {
        width: "6px", // Slimmer scrollbar width
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#2d3748", // Thumb color
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-track": {
        backgroundColor: "#f0f0f0", // Track color
        marginBlock: "4px", // Removes scrollbar arrows
      },
    },
  }}
  
>

    <DialogTitle backgroundColor='#2d3748' color='white' marginBottom='30px'>
      <Box display="flex" justifyContent="space-between" alignItems="center" >
        <Typography variant="h6"><strong>Form Details</strong></Typography>
        <IconButton onClick={onClose}>
          <Close style={{color:'white',fontWeight:'bold'}} />
        </IconButton>
      </Box>
    </DialogTitle>

    <DialogContent marginTop='10px'>
      {/* Button Group */}
      {type === "police"&&
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
              variant={selectedOption === "training" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleOptionChange({ target: { value: "training" } })}
              sx={{
                marginRight: 2,
                backgroundColor: selectedOption === "training" ? "#2d3748" : "transparent", // Background color
                color: selectedOption === "training" ? "white" : "inherit", // Text color
                "&:hover": {
                  backgroundColor: selectedOption === "training" ? "#2d3748" : "transparent", // Keep background color on hover if selected
                },
              }}
            >
              Training Form
          </Button>

          <Button
            variant={selectedOption === "workshop" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleOptionChange({ target: { value: "workshop" } })}
            sx={{
              backgroundColor: selectedOption === "workshop" ? "#2d3748" : "transparent", // Background color
              color: selectedOption === "workshop" ? "white" : "inherit", // Text color
              "&:hover": {
                backgroundColor: selectedOption === "workshop" ? "#2d3748" : "transparent", // Keep background color on hover if selected
              },
            }}
          >
            Workshop Form
          </Button>

        </Box>
      }
      {type === "forensic"&&
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
              variant={selectedOption === "van" ? "contained" : "outlined"}
              color="primary"
              onClick={() => handleOptionChange({ target: { value: "van" } })}
              sx={{
                marginRight: 2,
                backgroundColor: selectedOption === "van" ? "#2d3748" : "transparent", // Background color
                color: selectedOption === "van" ? "white" : "inherit", // Text color
                "&:hover": {
                  backgroundColor: selectedOption === "van" ? "#2d3748" : "transparent", // Keep background color on hover if selected
                },
              }}
            >
              VAN Form
          </Button>

          <Button
            variant={selectedOption === "for_dev" ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleOptionChange({ target: { value: "for_dev" } })}
            sx={{
              backgroundColor: selectedOption === "for_dev" ? "#2d3748" : "transparent", // Background color
              color: selectedOption === "for_dev" ? "white" : "inherit", // Text color
              "&:hover": {
                backgroundColor: selectedOption === "for_dev" ? "#2d3748" : "transparent", // Keep background color on hover if selected
              },
            }}
          >
            DEV Form
          </Button>

        </Box>
      }

      {/* Conditionally render fields based on selected option */}
      {type === "police"&&selectedOption === "training" && (
       
        <Box display="flex" flexDirection="column" gap={2}>
  {/* <TextField
    label="Rank"
    name="rank"
    value={formData.rank}
    onChange={handleChange}
    fullWidth
  /> */}
  <FormControl fullWidth>
    {/* <InputLabel id="rank-label">Rank</InputLabel> */}
    <FormHelperText>Select Rank</FormHelperText> {/* Optional helper text */}

    <Select
      labelId="rank-label"
      value={formData.rank} // Bind to form data
      name="rank" // Name of the dropdown
      onChange={handleChange} // Handle change function
    >
      <MenuItem value="police officers(psi to dsp)">Police Officers(PSI to DSP)</MenuItem>
      <MenuItem value="police personnel(pc to asi)">Police Personnel(PC to ASI)</MenuItem>
      {/* <MenuItem value="inspector">Inspector</MenuItem>
      <MenuItem value="sub_inspector">Sub Inspector</MenuItem> */}
    </Select>
  </FormControl>
  <TextField
    label="Available Officers"
    name="available_officers"
    value={formData.available_officers}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    label="Trained Officers"
    name="trained_officers"
    value={formData.trained_officers}
    onChange={handleChange}
    fullWidth
  />
  <TextField
    label="Percentage"
    name="percentage"
    value={formData.percentage}
    onChange={handleChange}
    fullWidth
  />

  {/* First Dropdown for Rank */}
  

  {/* Second Dropdown for Department */}
  {/* <FormControl fullWidth>
    <InputLabel id="department-label">Department</InputLabel>
    <Select
      labelId="department-label"
      value={formData.department} // Bind to form data
      name="department" // Name of the dropdown
      onChange={handleChange} // Handle change function
    >
      <MenuItem value="admin">Admin</MenuItem>
      <MenuItem value="criminal_investigation">Criminal Investigation</MenuItem>
      <MenuItem value="cyber_security">Cyber Security</MenuItem>
      <MenuItem value="traffic">Traffic</MenuItem>
    </Select>
    <FormHelperText>Select Department</FormHelperText>
  </FormControl> */}
        </Box>

      )}

      {type === "police"&&selectedOption === "workshop" && (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="No. of Training Workshops Conducted"
            name="training_workshops"
            value={formData.training_workshops}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Through E-Academy Online"
            name="e_academy_online"
            value={formData.e_academy_online}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="No. of Master Trainers"
            name="master_trainers"
            value={formData.master_trainers}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}
      {type === "forensic" && selectedOption === "van" && (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Van ID"
            name="vanId"
            value={formData.vanId}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
          />
          {/* <TextField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
          /> */}
          <TextField
            label="Count"
            name="count"
            value={formData.count}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}

      {type === "forensic" && selectedOption === "for_dev" && (
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Earlier Pending Cases"
            name="earlier_pending"
            value={formData.earlier_pending}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Earlier Pending Exhibits"
            name="earlier_pending_exhibits"
            value={formData.earlier_pending_exhibits}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Received Cases"
            name="received_cases"
            value={formData.received_cases}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Received Exhibits"
            name="received_exhibits"
            value={formData.received_exhibits}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Disposal Cases"
            name="disposal_cases"
            value={formData.disposal_cases}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Disposal Exhibits"
            name="disposal_exhibits"
            value={formData.disposal_exhibits}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Pending Cases"
            name="pending_cases"
            value={formData.pending_cases}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Pending Exhibits"
            name="pending_exhibits"
            value={formData.pending_exhibits}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}


      {/* Fields for fir_1 */}
      {type === "fir_1" && (
        <Box display="flex" flexDirection="column" gap={2} marginTop='10px'>
          <TextField
            label="Total No. of FIR Registered Under BNS IPC"
            name="total_no_fir_registered_under_bns_ipc"
            value={formData.total_no_fir_registered_under_bns_ipc}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="No. of FIR Registered Under BNS"
            name="no_of_fir_registered_under_bns"
            value={formData.no_of_fir_registered_under_bns}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Percentage of FIR Under BNS Against Total FIRs"
            name="percentage_of_fir_under_bns_against_total_firs"
            value={formData.percentage_of_fir_under_bns_against_total_firs}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="No. of Chargesheets Filed Under BNS"
            name="no_of_chargesheets_filed_under_bns"
            value={formData.no_of_chargesheets_filed_under_bns}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="No. of Chargesheets Not Filed Within the Stipulated Time"
            name="no_of_chargesheets_not_filed_within_the_stipulated_time"
            value={formData.no_of_chargesheets_not_filed_within_the_stipulated_time}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Percentage of Chargesheets Filed on the Basis of FIRs Under BNS"
            name="percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns"
            value={formData.percentage_of_chargesheets_filed_on_the_basis_of_firs_under_bns}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}
      {/* Fields for fir_2 */}
      {type === "fir_2" && (
        <Box display="flex" flexDirection="column" gap={2} marginTop='10px'>
          <TextField
            label="Total Charge Sheeted"
            name="total_charge_sheeted"
            value={formData.total_charge_sheeted}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Convicted"
            name="convicted"
            value={formData.convicted}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Acquitted"
            name="acquitted"
            value={formData.acquitted}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Pending"
            name="pending"
            value={formData.pending}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}

      {/* Fields for fir_3 */}
      {type === "fir_3" && (
        <Box display="flex" flexDirection="column" gap={2} marginTop='10px'>
          <TextField
            label="Act"
            name="act"
            value={formData.act}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Section"
            name="section"
            value={formData.section}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Total Registered"
            name="total_registered"
            value={formData.total_registered}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Chargesheeted"
            name="chargesheeted"
            value={formData.chargesheeted}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Under Investigation"
            name="under_investigation"
            value={formData.under_investigation}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}
      {type === "fir_4" && (
        <Box display="flex" flexDirection="column" gap={2} marginTop="10px">
          <TextField
            label="Zero FIR"
            name="zero_fir"
            value={formData.zero_fir}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Regular FIR"
            name="regular_fir"
            value={formData.regular_fir}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Yet to be Registered Zero FIR"
            name="yet_to_be_registered_zero_fir"
            value={formData.yet_to_be_registered_zero_fir}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      )}
     {type === "fir_5" && (
      <Box display="flex" flexDirection="column" gap={2} marginTop="10px">
        <TextField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Police Station Name"
          name="ps_name"
          value={formData.ps_name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Date of Data"
          name="date_of_data"
          type="date"
          value={formData.date_of_data}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }} // Ensures label stays when date is selected
        />
        <TextField
          label="Type of Data"
          name="type_of_data"
          value={formData.type_of_data}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      )}



      <>
  {/* File Upload Box */}
  <Box
    mt={2}
    p={2}
    border="2px dashed #ccc"
    borderRadius="8px"
    textAlign="center"
    sx={{ cursor: "pointer", backgroundColor: "#f9f9f9", position: "relative" }}
    onClick={() => document.getElementById("file-upload").click()}
  >
    {/* File Upload Icon */}
    <CloudUpload fontSize="large" color="#2d3748" />

    {/* Text Below the Icon */}
    <Typography variant="body1" mt={1}>Drag & Drop or Click to Upload</Typography>

    {/* File Upload Disclaimer Below the Icon */}
    <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
      <strong>File Size Limit: </strong> Maximum file size is 10MB. <br />
      {/* <strong>Sensitive Data:</strong> Please avoid uploading sensitive or private information. */}
    </Typography>

    {/* Hidden File Input */}
    <input
      id="file-upload"
      type="file"
      multiple
      hidden
      onChange={handleFileUpload}
    />
  </Box>

  {/* Accepted File Types Below the Upload Box */}
  <Box mt={1}>
    <Typography variant="body2" color="textSecondary">
      <strong>Accepted File Types:</strong> csv,zip
    </Typography>
  </Box>

  {/* File Preview */}
  {uploadedFiles.length > 0 && (
    <Box mt={2}>
      <Typography variant="body2" fontWeight="bold">Uploaded Files:</Typography>
      {uploadedFiles.map((file, index) => (
        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mt={1} p={1} border="1px solid #ddd" borderRadius="4px">
          <Typography variant="body2">{file.name}</Typography>
          <IconButton size="small" onClick={() => removeFile(index)}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  )}
</>


      <Box display="flex" justifyContent="flex-end" mt={3}>
        <Button variant="contained" style={{backgroundColor:'#2d3748' ,color:'white'}} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </DialogContent>
  </Dialog>
    </>
  );
};

export default ModalComponent;
