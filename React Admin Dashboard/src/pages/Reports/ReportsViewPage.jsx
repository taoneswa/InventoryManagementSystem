import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const ReportsViewPage = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get('api/reports/${id}'); // Adjust the API URL as needed
                setReport(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch report:', err);
                setError('Failed to fetch report details');
                setLoading(false);
            }
        };

        fetchReport();
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
                    Report Details
                </Typography>
                {report ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Name:</strong> {report.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Description:</strong> {report.description}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Inventory ID:</strong> {report.inventory_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Type:</strong> {report.type}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>User ID:</strong> {report.user_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Status:</strong> {report.status}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Report not found</Typography>
                )}
            </Paper>
        </div>

    );
};

export default ReportsViewPage;
