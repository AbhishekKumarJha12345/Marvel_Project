import {React,useState,useEffect} from 'react'
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
  import axiosInstance from "../../../../utils/axiosInstance";
const Courtform = ({ open,type, onClose }) => {
    const [selectedOption, setSelectedOption] = useState("court_1");
    const initial = {   
        date_of_data:'',
        // Form Type 1
        pending: "",
        completed: "",
        average_resolution_time: "",
        
        // Form Type 2
        adoption_rate: "",
        electronic_court_summons: "",
        data_security_complaints: "",
        accessibility_complaints: "",
        accessibility_non_complaints: "",
        data_security_non_complaints: "",
        // Form Type 3
        disposed_cases: "",
        backlog_reduction: "",
        
        // Form Type 4
        judicial_effectiveness: "",
        prosecution_effectiveness: "",
        forensic_effectiveness: "",
        percentage_of_cases_using_forensic_data: "",
        response_time_for_evidence_retrieval: "",
        // Form Type 5
        planning: "",
        development: "",
        testing: "",
        implementation: "",
        ai_transcription_integration: "",
        judges_feedback: "",
        administrative_staff_feedback: "",
        legal_professionals_feedback: "",
      };
    const court_types=['court_1','court_2','court_3','court_4','court_5',]
    const formDictionary = {
        court_1: "Case Resolution Metrics",
        court_2: "Digital Adoption & Security",
        court_3: "Case Backlog & Disposal",
        court_4: "Judicial & Forensic Effectiveness",
        court_5: "System Development & Feedback"
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
    // useEffect(() => {
    //   if (type === "police") setSelectedOption("training");
    //   if (type === "forensic") setSelectedOption("van");
    // }, [type]);
   
  
  
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
        formDataToSend.append("date", currentDate);
        let url='/court_form'
       
        formDataToSend.append("type", type);
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
      
        alert(`${formDictionary[type]} Form Submitted Successfully!`);
      
        // Reset states
        setFormData(initial);
        setUploadedFiles([]);
        // if (type === "police") setSelectedOption("training");
        // if (type === "forensic") setSelectedOption("van");
        onClose()
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
            <Typography variant="h6"><strong>{formDictionary[type]}</strong></Typography>
            <IconButton onClick={onClose}>
              <Close style={{color:'white',fontWeight:'bold'}} />
            </IconButton>
          </Box>
        </DialogTitle>
    
        <DialogContent marginTop='10px'>
          {/* Button Group */}
          
            {/* <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {court_types.map((type) => (
            <Button
                key={type}
                variant={selectedOption === type ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleOptionChange({ target: { value: type } })}
                sx={{
                marginRight: 2,
                backgroundColor: selectedOption === type ? "#2d3748" : "transparent", 
                color: selectedOption === type ? "white" : "inherit",
                "&:hover": {
                    backgroundColor: selectedOption === type ? "#2d3748" : "transparent",
                },
                }}
            >
                {type}
            </Button>
            ))}    
            </Box> */}
          
          
    
          {/* Conditionally render fields based on selected option */}
            {type === "court_1" && (
                <Box display="flex" flexDirection="column" gap={2}>
                    <TextField
                    label="Pending"
                    name="pending"
                    value={formData.pending}
                    onChange={handleChange}
                    fullWidth
                    />
                    <TextField
                    label="Completed"
                    name="completed"
                    value={formData.completed}
                    onChange={handleChange}
                    fullWidth
                    />
                    <TextField
                    label="Average Resolution Time"
                    name="average_resolution_time"
                    value={formData.average_resolution_time}
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
                </Box>
            )}

            {type === "court_2" && (
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                label="Adoption Rate"
                name="adoption_rate"
                value={formData.adoption_rate}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Electronic Court Summons"
                name="electronic_court_summons"
                value={formData.electronic_court_summons}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Data Security Complaints"
                name="data_security_complaints"
                value={formData.data_security_complaints}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Data Security Non-Complaints"
                name="data_security_non_complaints"
                value={formData.data_security_non_complaints}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Accessibility Complaints"
                name="accessibility_complaints"
                value={formData.accessibility_complaints}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Accessibility Non-Complaints"
                name="accessibility_non_complaints"
                value={formData.accessibility_non_complaints}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Disposed Cases"
                name="disposed_cases"
                value={formData.disposed_cases}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Backlog Reduction"
                name="backlog_reduction"
                value={formData.backlog_reduction}
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
            </Box>
            )}

            {type === "court_3" && (
            <Box display="flex" flexDirection="column" gap={2}>
            
                <TextField
                label="Disposed Cases"
                name="disposed_cases"
                value={formData.disposed_cases}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Backlog Reduction"
                name="backlog_reduction"
                value={formData.backlog_reduction}
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
            </Box>
            )}

            {type === "court_4" && (
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                label="Judicial Effectiveness"
                name="judicial_effectiveness"
                value={formData.judicial_effectiveness}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Prosecution Effectiveness"
                name="prosecution_effectiveness"
                value={formData.prosecution_effectiveness}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Forensic Effectiveness"
                name="forensic_effectiveness"
                value={formData.forensic_effectiveness}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Percentage of Cases Using Forensic Data"
                name="percentage_of_cases_using_forensic_data"
                value={formData.percentage_of_cases_using_forensic_data}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Response Time for Evidence Retrieval"
                name="response_time_for_evidence_retrieval"
                value={formData.response_time_for_evidence_retrieval}
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
            </Box>
            )}

            {type === "court_5" && (
            <Box display="flex" flexDirection="column" gap={2}>
                <TextField
                label="Planning"
                name="planning"
                value={formData.planning}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Development"
                name="development"
                value={formData.development}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Testing"
                name="testing"
                value={formData.testing}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Implementation"
                name="implementation"
                value={formData.implementation}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="AI Transcription Integration"
                name="ai_transcription_integration"
                value={formData.ai_transcription_integration}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Judges' Feedback"
                name="judges_feedback"
                value={formData.judges_feedback}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Administrative Staff Feedback"
                name="administrative_staff_feedback"
                value={formData.administrative_staff_feedback}
                onChange={handleChange}
                fullWidth
                />
                <TextField
                label="Legal Professionals' Feedback"
                name="legal_professionals_feedback"
                value={formData.legal_professionals_feedback}
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
  )
}

export default Courtform
