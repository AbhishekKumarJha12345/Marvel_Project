import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Button,
    Box,
    Typography,
    TextField,
    Grid,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    InputAdornment,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTable = styled(Table)(({ theme }) => ({
    '& .MuiTableCell-head': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    '& .MuiTableCell-body': {
        padding: '8px 16px',
    },
}));

const ModalComponent = ({ open, type, onClose, training_active, dateRange }) => {
    const [userFormData, setUserFormData] = useState({
        Name: "John Doe",
        Age: "",
        Email: "",
        Phone: ""
    });
    const [productFormData, setProductFormData] = useState([
        { Product: "Product A", Price: "", Quantity: "", Supplier: "", Category: "", Stock: "", Description: "" },
        { Product: "Product B", Price: "", Quantity: "", Supplier: "", Category: "", Stock: "", Description: "" },
        { Product: "Product C", Price: "", Quantity: "", Supplier: "", Category: "", Stock: "", Description: "" },
        { Product: "Product D", Price: "", Quantity: "", Supplier: "", Category: "", Stock: "", Description: "" },
        { Product: "Product E", Price: "", Quantity: "", Supplier: "", Category: "", Stock: "", Description: "" }
    ]);
    const [monthRange, setMonthRange] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const generateMonthRange = (start, end) => {
        const months = [];
        let currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate <= endDate) {
            months.push(new Date(currentDate));
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        return months;
    };

    const handleMonthRangeChange = () => {
        const monthRangeArray = generateMonthRange(startDate, endDate);
        setMonthRange(monthRangeArray);
    };

    const handleUserInputChange = (e) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleProductInputChange = (index, field, e) => {
        const newProductFormData = [...productFormData];
        newProductFormData[index][field] = e.target.value;
        setProductFormData(newProductFormData);
    };

    const handleSubmit = () => {
        const formData = {
            userInformation: userFormData,
            productInformation: productFormData,
            monthRange: monthRange.map(month => `${month.getFullYear()}-${(month.getMonth() + 1).toString().padStart(2, '0')}`)
        };
        alert(JSON.stringify(formData, null, 2));
    };

    const formatDate = (date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        handleMonthRangeChange();
    }, [startDate, endDate]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" fontWeight="bold">Dynamic Form Data Entry</Typography>
                    <IconButton edge="end" onClick={onClose} size="large">
                        <Close />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                {/* Month Range Selection */}
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Month Range Selection</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Start Month"
                                type="month"
                                variant="outlined"
                                value={formatDate(startDate)}
                                onChange={(e) => setStartDate(new Date(e.target.value + "-01"))}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="End Month"
                                type="month"
                                variant="outlined"
                                value={formatDate(endDate)}
                                onChange={(e) => setEndDate(new Date(e.target.value + "-01"))}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                </Paper>

                {/* User Information */}
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>User Information</Typography>
                    <StyledTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Month - Year</TableCell>
                                <TableCell>Total Constab</TableCell>
                                <TableCell>Trained (Constab.)</TableCell>
                                <TableCell>% Trained (Constab.)</TableCell>
                                <TableCell>Total Officers</TableCell>
                                <TableCell>Trained Officers</TableCell>
                                <TableCell>% Trained Officers</TableCell>
                                <TableCell>Total Trained</TableCell>
                                <TableCell>Total Trained %</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="Name"
                                        value={userFormData.month_year}
                                        InputProps={{ readOnly: true }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="Name"
                                        value={userFormData.total_constab}
                                        InputProps={{ readOnly: true }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        name="Age"
                                        value={userFormData.trained_constab}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Age"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="email"
                                        name="Email"
                                        value={userFormData.percent_trained_constab}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Email"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        name="Phone"
                                        value={userFormData.total_officers}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Phone"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        name="Phone"
                                        value={userFormData.trained_officers}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Phone"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        name="Phone"
                                        value={userFormData.percent_trained_officers}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Phone"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        name="Phone"
                                        value={userFormData.total_trained}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Phone"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="tel"
                                        name="Phone"
                                        value={userFormData.total_trained_percent}
                                        onChange={handleUserInputChange}
                                        placeholder="Enter Phone"
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </StyledTable>
                </Paper>

                {/* Product Information */}
                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>Product Information</Typography>
                    <Box sx={{ maxHeight: 500, overflow: 'auto' }}>
                        <StyledTable stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Month-Year</TableCell>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Supplier</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Stock</TableCell>
                                    <TableCell>Description</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {monthRange.map((month, monthIndex) => (
                                    <React.Fragment key={monthIndex}>
                                        {productFormData.map((product, productIndex) => (
                                            <TableRow key={`${monthIndex}-${productIndex}`}>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={`${month.getFullYear()}-${(month.getMonth() + 1).toString().padStart(2, '0')}`}
                                                        InputProps={{ readOnly: true }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={product.Product}
                                                        InputProps={{ readOnly: true }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={product.Price}
                                                        onChange={(e) => handleProductInputChange(productIndex, 'Price', e)}
                                                        placeholder="Enter Price"
                                                        InputProps={{
                                                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        type="number"
                                                        value={product.Quantity}
                                                        onChange={(e) => handleProductInputChange(productIndex, 'Quantity', e)}
                                                        placeholder="Enter Quantity"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={product.Supplier}
                                                        onChange={(e) => handleProductInputChange(productIndex, 'Supplier', e)}
                                                        placeholder="Enter Supplier"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={product.Category}
                                                        onChange={(e) => handleProductInputChange(productIndex, 'Category', e)}
                                                        placeholder="Enter Category"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        type="number"
                                                        value={product.Stock}
                                                        onChange={(e) => handleProductInputChange(productIndex, 'Stock', e)}
                                                        placeholder="Enter Stock"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        variant="outlined"
                                                        value={product.Description}
                                                        onChange={(e) => handleProductInputChange(productIndex, 'Description', e)}
                                                        placeholder="Enter Description"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </TableBody>
                        </StyledTable>
                    </Box>
                </Paper>

                {/* pendency of Cases */}
                <div>
                    <table>
                        <tr>
                            <thead>
                                <tr>Total Cases Registered</tr>
                                <tr>Number of Cases Disposed</tr>
                                <tr>Total Pending Cases</tr>
                                <tr>Total Cases Registered</tr>
                                <tr>Total Cases Registered</tr>
                                <tr>Total Cases Registered</tr>
                            </thead>
                        </tr>
                        <tr>
                            <tbody>
                                <td>1</td>
                            </tbody>
                        </tr>
                    </table>
                </div>

                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        size="large"
                        sx={{ minWidth: 120 }}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default ModalComponent;