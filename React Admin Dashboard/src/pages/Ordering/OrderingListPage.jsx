import React, { useEffect, useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
const OrderingListPage = () => {
    const [ordering, setOrdering] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchOrdering = async () => {
            try {
                const response = await axios.get("ordering", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setOrdering(response.data);
                console.log(response)
            } catch (error) {
                console.error("Failed to fetch Orders:", error);
                setSnackbar({ open: true, message: "Failed to fetch Orders" });
            }
        };

        fetchOrdering();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.0.1:8000/ordering/${id}`); // Adjust the API URL as needed
            setOrdering(ordering.filter((ordering) => ordering.id !== id));
            setSnackbar({ open: true, message: "Order deleted successfully" });
        } catch (error) {
            console.error("Failed to delete order:", error);
            setSnackbar({ open: true, message: "Failed to delete order" });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <main className='main-container'>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Product Code</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Delievery Date</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Total Amount </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ordering.map((ordering) => (
                            <TableRow key={ordering.product_name}>
                                <TableCell>{ordering.description}</TableCell>
                                <TableCell>{ordering.product_code}</TableCell>
                                <TableCell>{ordering.order_date}</TableCell>
                                <TableCell>{ordering.delievery_date}</TableCell>
                                <TableCell>{ordering.quantity}</TableCell>
                                <TableCell>{ordering.total_amount}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/ordering/view/${ordering.id}`}
                                        color="info">
                                        View
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/ordering/edit/${ordering.id}`}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(ordering.id)}
                                        color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={9}>
                                <Button
                                    component={Link}
                                    to="/ordering/add"
                                    color="primary"
                                    fullWidth
                                    variant="contained">
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbar.message}
            />
        </main>
    )
}

export default OrderingListPage;
