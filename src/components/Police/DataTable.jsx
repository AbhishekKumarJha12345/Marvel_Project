import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

const TrainingDataDialog = ({ open, onClose, data, onSubmit, onEdit }) => {
  const [editedData, setEditedData] = useState([]);
  const [errorDetected, setErrorDetected] = useState(false);

  console.log("data-------------------------------------last : ", data);


  useEffect(() => {
    if (data) {
      const formattedData = Object.entries(data).map(([month, values]) => ({
        month_year: month,
        ...values
      }));
      setEditedData(formattedData);
    }
  }, [data]);

  useEffect(() => {
    // Check for errors across all rows before rendering
    const hasError = editedData.some(
      (entry) =>
        Number(entry.personnel_trained) > Number(entry.total_personnel) ||
        Number(entry.officers_trained) > Number(entry.total_officers)
    );
    setErrorDetected(hasError);
  }, [editedData]);

  const handleEditClick = (index) => {
    onEdit(editedData[index].month_year);
    onClose();
  };

  const handleSubmit = () => {
    onSubmit(editedData);
    onClose();
  };

  if (!editedData.length) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" style={{ overflow: "auto" }}>
      {/* ----------------------1st table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Training Data
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["total_personnel", "personnel_trained", "percent_personnel_trained", "total_officers", "officers_trained", "percent_officers_trained"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["total_personnel", "personnel_trained", "percent_personnel_trained", "total_officers", "officers_trained", "percent_officers_trained"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* </DialogContent> */}

      {/* <Button
          variant="contained"
          disabled={errorDetected} // Disable Submit button if error is detected
          sx={{ backgroundColor: "#2d3748", color: "white", marginTop: "16px" }}
          onClick={handleSubmit}
        >
          Submit
        </Button> */}

      {/* ----------------------2nd table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Pendency of cases under BNS
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["totalCases", "disposedCases", "pendingCases", "pendingPercentage", "punishmentLessThan7", "punishmentMoreThan7"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "5px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["totalCases", "disposedCases", "pendingCases", "pendingPercentage", "punishmentLessThan7", "punishmentMoreThan7"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "5px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------3rd table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Conviction under BNS
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["type_of_court", "bns_sections", "cases_decided", "convicted_cases", "conviction_rate", "total_cases_convicted", "total_cases_decided"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["type_of_court", "bns_sections", "cases_decided", "convicted_cases", "conviction_rate", "total_cases_convicted", "total_cases_decided"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------3rd table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Untraced Missing
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["ageGroup", "untracedPersons"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["ageGroup", "untracedPersons"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------4 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Offences against body under BNS
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------5 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        eSakshya Details
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["totalIOsNagapur", "totalIOsEsakshya", "esakshyaWage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["totalIOsNagapur", "totalIOsEsakshya", "esakshyaWage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------6 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Important sections introduced in BNS
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------7 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Property offences under BNS
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["actAndSection", "registeredCases", "detectedCases", "detectedCasesPercentage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------8 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Use of eSakshya App in cases with punishment of 7 yrs. or more
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["totalIOsNagapur", "totalIOsEsakshya", "esakshyaWage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["totalIOsNagapur", "totalIOsEsakshya", "esakshyaWage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------9 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Zero FIR's
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["total_no_zero_fir_transferred_outside_mh", "total_no_zero_fir_transferred_outer_state_to_mh", "total_zero_firs", "pending_to_transfer_outside_mh", 'total_firs_registered', 're_reg_firs', "total_transferred_zero_firs_in_mh", "pending_for_transfer_within_mh", "pending_for_re_registration"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["total_no_zero_fir_transferred_outside_mh", "total_no_zero_fir_transferred_outer_state_to_mh", "total_zero_firs", "pending_to_transfer_outside_mh", 'total_firs_registered', 're_reg_firs', "total_transferred_zero_firs_in_mh", "pending_for_transfer_within_mh", "pending_for_re_registration"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------10 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        eFIR
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["totalEComplaintsReceived", "totalComplaintsConverted", "disposedEComplaints"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["totalEComplaintsReceived", "totalComplaintsConverted", "disposedEComplaints"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------12 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Stolen & Recovered Property
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["total_cases", "offences_registered", "value_stolen_property", "detected_cases", "value_recovered_property", "recovery_percentage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["total_cases", "offences_registered", "value_stolen_property", "detected_cases", "value_recovered_property", "recovery_percentage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

      {/* ----------------------12 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        ITSSO Compliance Form
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["total_pocso_bns_cases", "charge_sheeted_within_60_days", "percentage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["total_pocso_bns_cases", "charge_sheeted_within_60_days", "percentage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}
      {/* ----------------------13 table------------------------------- */}
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        Forensic Visits
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>
      {/* <DialogContent> */}
      <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#2d3748" }}>
            {["total_cases_gt_7_years", "cases_forensic_team_visited", "forensic_team_deployment_percentage"].map((key) => (
              <TableCell
                key={key}
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  borderBottom: "1px solid white",
                  width: "20px", // Set fixed width for each column
                  textAlign: "center",
                  padding: "4px"
                }}
              >
                {key.replace("_", " ")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((entry, index) => {
            const hasPersonnelError = Number(entry.personnel_trained) > Number(entry.total_personnel);
            const hasOfficersError = Number(entry.officers_trained) > Number(entry.total_officers);

            return (
              <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                {["total_cases_gt_7_years", "cases_forensic_team_visited", "forensic_team_deployment_percentage"].map((key) => {
                  const isError =
                    (key === "personnel_trained" && hasPersonnelError) ||
                    (key === "officers_trained" && hasOfficersError);

                  return (
                    <TableCell
                      key={key}
                      sx={{
                        padding: "4px",
                        borderBottom: "1px solid #ddd",
                        color: isError ? "red" : "black",
                        width: "20px", // Set fixed width for each column
                        textAlign: "center",
                        overflow: "hidden",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {entry[key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {/* </DialogContent> */}

{/* 
      <Button
        variant="contained"
        disabled={errorDetected} // Disable Submit button if error is detected
        sx={{ backgroundColor: "#2d3748", color: "white", marginTop: "16px", width: "30px" }}
        onClick={handleSubmit}
      >
        Submit
      </Button> */}

    </Dialog>
  );
};

export default TrainingDataDialog;