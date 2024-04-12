import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const OrderingEditPage = ({ orderId }) => {
    const [orderData, setOrderData] = useState({
        product_name: '',
        description: '',
        product_code: '',
        order_date: '',
        delivery_date: '',
        quantity: '',
        total_amount: ''
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        // Fetch order details based on orderId when component mounts
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderId}`);
                const orderDetails = response.data; // Assuming the response contains order details
                setOrderData(orderDetails);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };
        fetchOrderDetails();
    }, [orderId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrderData({ ...orderData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/orderring/${orderId}`, orderData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 200 || response.status === 201) {
                setSnackbarMessage('Order updated successfully!');
                setSnackbarOpen(true);
                // Redirect or perform any other action after successful update
            }
        } catch (error) {
            console.error('Error updating order:', error);
            setSnackbarMessage('Failed to update order!');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container justifyContent="center" className='main-container'>
            <Grid item xs={12} md={8} lg={6}>
                <Paper style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h6" gutterBottom>
                        Edit Order
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(orderData).map((key) => (
                                <Grid item xs={12} key={key}>
                                    <TextField
                                        fullWidth
                                        label={key.replace('_', ' ').toUpperCase()}
                                        variant="outlined"
                                        name={key}
                                        value={orderData[key]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
        </Grid>
    );
};

export default OrderingEditPage;
