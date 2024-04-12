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
const CustomerListPage = () => {
    const [customer, setCustomer] = useState([]);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await axios.get("customer", {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                });
                setCustomer(response.data);
                console.log(response)
            } catch (error) {
                console.error("Failed to fetch Customers records:", error);
                setSnackbar({ open: true, message: "Failed to fetch customers" });
            }
        };

        fetchCustomer();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.0.1:8000/customer/${id}`); // Adjust the API URL as needed
            setCustomer(customer.filter((customer) => customer.id !== id));
            setSnackbar({ open: true, message: "Customer deleted successfully" });
        } catch (error) {
            console.error("Failed to delete customer:", error);
            setSnackbar({ open: true, message: "Failed to delete customer" });
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
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Shop Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Bank Name</TableCell>
                            <TableCell>Account Holder</TableCell>
                            <TableCell>Bank Branch</TableCell>
                            <TableCell>Account Number</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customer.map((customer) => (
                            <TableRow key={customer.id}>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.email}</TableCell>
                                <TableCell>{customer.phone}</TableCell>
                                <TableCell>{customer.shop_name}</TableCell>
                                <TableCell>{customer.address}</TableCell>
                                <TableCell>{customer.city}</TableCell>
                                <TableCell>{customer.bank_name}</TableCell>
                                <TableCell>{customer.account_holder}</TableCell>
                                <TableCell>{customer.bank_branch}</TableCell>
                                <TableCell>{customer.account_number}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/customer/view/${customer.id}`}
                                        color="info">
                                        View
                                    </Button>
                                    <Button
                                        component={Link}
                                        to={`/customer/edit/${customer.id}`}
                                        color="primary">
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(customer.id)}
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
                                    to="/customer/add"
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

export default CustomerListPage;
