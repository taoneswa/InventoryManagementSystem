import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const OrderingViewPage = () => {
    const { id } = useParams();
    const [ordering, setOrdering] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrdering = async () => {
            try {
                const response = await axios.get(`ordering/${id}`); // Adjust the API URL as needed
                setOrdering(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch orders:', err);
                setError('Failed to fetch order details');
                setLoading(false);
            }
        };

        fetchOrdering();
    }, [id]);

    if (loading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return (
            <Typography variant="h6" color="error" textAlign="center">
                {error}
            </Typography>
        );
    }

    return (
        <div className='main-container'>
            <Paper elevation={3} style={{ padding: 20, margin: '20px auto', maxWidth: 600 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Employee Details
                </Typography>
                {employee ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Name:</strong> {ordering.product_name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Email:</strong> {ordering.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Phone:</strong> {ordering.product_code}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Employee ID:</strong> {ordering.order_date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>NID No:</strong> {ordering.delivery_date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Experience:</strong> {ordering.quantity}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Salary:</strong> {ordering.total_amount}</Typography>
                        </Grid>

                    </Grid>
                ) : (
                    <Typography variant="body1">Order not found</Typography>
                )}
            </Paper>
        </div>

    );
};

export default OrderingViewPage;
