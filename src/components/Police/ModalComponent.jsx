
import React, { useState } from "react";
import {
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
  IconButton,
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
const ModalComponent = ({ open, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("training");
  const [selectedFileType, setSelectedFileType] = useState(""); // Police or Workshop
  const initial ={
    // type:selectedOption,
    rank: "",
    trained_officers:"",
    available_officers: "",
    percentage: "",
    training_workshops: "",
    e_academy_online: "",
    master_trainers: "",
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
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  // Remove File
  const removeFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(updatedFiles);
  };

 


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
      formDataToSend.append("type", selectedOption);

    
      // Append files if any
      if (uploadedFiles.length > 0) {
        formDataToSend.append('type',selectedFileType)
        uploadedFiles.forEach((file) => {
          formDataToSend.append("files", file);
        });
      }
    
      // Debugging: Log FormData contents before sending
      console.log("FormData Contents:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      console.log("FormData Type:", formDataToSend instanceof FormData ? "FormData" : typeof formDataToSend);


      // Send all data in one request
      const response = await axiosInstance.post("/add_forms", formDataToSend, {
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
      setSelectedOption("training");
    
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };
  
  
  


  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Upload Details</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Radio Options */}
        <RadioGroup
          row
          value={selectedOption}
          onChange={handleOptionChange}
          sx={{ mb: 2, justifyContent: "center" }}
        >
          <FormControlLabel value="training" control={<Radio />} label="Police Form" />
          <FormControlLabel value="workshop" control={<Radio />} label="Workshop Form" />
          <FormControlLabel value="file" control={<Radio />} label="Upload File" />
        </RadioGroup>

        {/* Police Form */}
        {selectedOption === "training" && (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="Rank" name="rank" value={formData.rank} onChange={handleChange} fullWidth />
            <TextField label="Available Officers" name="available_officers" value={formData.available_officers} onChange={handleChange} fullWidth />
            <TextField label="Trained Officers" name="trained_officers" value={formData.trained_officers} onChange={handleChange} fullWidth />
            <TextField label="Percentage" name="percentage" value={formData.percentage} onChange={handleChange} fullWidth />
          </Box>
        )}

        {/* Workshop Form */}
        {selectedOption === "workshop" && (
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField label="No. of Training Workshops Conducted" name="training_workshops" value={formData.training_workshops} onChange={handleChange} fullWidth />
            <TextField label="Through E-Academy Online" name="e_academy_online" value={formData.e_academy_online} onChange={handleChange} fullWidth />
            <TextField label="No. of Master Trainers" name="master_trainers" value={formData.master_trainers} onChange={handleChange} fullWidth />
          </Box>
        )}

        {/* File Upload with File Type Selection */}
        {selectedOption === "file" && (
          <>
            {/* Select File Type */}
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Typography variant="body1" fontWeight="bold">Select File Type:</Typography>
              <Select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                displayEmpty  
                fullWidth
              >
                <MenuItem value="">Choose File Type</MenuItem>
                <MenuItem value="police">Police</MenuItem>
                <MenuItem value="workshop">Workshop</MenuItem>
              </Select>
            </Box>

            {/* File Upload */}
            <Box
              mt={2}
              p={2}
              border="2px dashed #ccc"
              borderRadius="8px"
              textAlign="center"
              sx={{ cursor: "pointer", backgroundColor: "#f9f9f9" }}
              onClick={() => document.getElementById("file-upload").click()}
            >
              <CloudUpload fontSize="large" color="primary" />
              <Typography variant="body1" mt={1}>Drag & Drop or Click to Upload</Typography>
              <input
                id="file-upload"
                type="file"
                multiple
                hidden
                onChange={handleFileUpload}
              />
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
        )}

        {/* Submit Button */}
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ModalComponent;
