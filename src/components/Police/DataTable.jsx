import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TrainingDataDialog = ({ open, onClose, data }) => {
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    if (data) {
      const formattedData = Object.entries(data).map(([key, values]) => ({
        title: key,
        values: values
      }));
      setEditedData(formattedData);
    }
  }, [data]);

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" style={{ overflow: "auto" }}>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h5>Data Pre-View</h5>
        
        <IconButton onClick={onClose} sx={{ color: "gray" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {editedData.map((tableData, tableIndex) => (
        <div key={tableIndex}>
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {tableData.title}
          </DialogTitle>
          {tableData.values.length === 0 ? (
            <Typography sx={{ padding: 2, textAlign: "center" }}>No Data Filled Yet</Typography>
          ) : (
            <Table sx={{ minWidth: 650, border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#2d3748" }}>
                  {Object.keys(tableData.values[0]).map((col, colIndex) => (
                    <TableCell key={colIndex} sx={{ color: "white", fontWeight: "bold", borderBottom: "1px solid white", textAlign: "center", padding: "4px" }}>
                      {col.replace("_", " ")}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.values.map((row, rowIndex) => (
                  <TableRow key={rowIndex} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}>
                    {Object.keys(row).map((col, colIndex) => (
                      <TableCell key={colIndex} sx={{ padding: "4px", borderBottom: "1px solid #ddd", textAlign: "center", whiteSpace: "nowrap" }}>
                        {row[col] === "" || row[col] === null || row[col] === undefined ? "-" : row[col]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      ))}
    </Dialog>
  );
};

export default TrainingDataDialog;