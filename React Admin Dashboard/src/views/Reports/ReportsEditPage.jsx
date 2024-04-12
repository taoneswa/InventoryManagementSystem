import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const ReportsEditPage = ({ match }) => {
    const [reportData, setReportData] = useState({
        name: '',
        description: '',
        inventory_id: '',
        type: '',
        user_id: '',
        status: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const reportId = match.params.id; // Assuming you're using react-router

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await axios.get(`/api/reports/${reportId}`); // Adjust API URL as needed
                setReportData(response.data);
            } catch (error) {
                console.error('Error fetching report data:', error);
                setSnackbarMessage('Failed to fetch report data!');
                setSnackbarOpen(true);
            }
        };

        fetchReportData();
    }, [reportId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData({ ...reportData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`api/reports/${reportId}`, reportData); // Adjust API URL as needed
            if (response.status === 200) {
                setSnackbarMessage('Report updated successfully!');
                setSnackbarOpen(true);
                // Optionally redirect or perform further actions
            }
        } catch (error) {
            console.error('Error updating report:', error);
            setSnackbarMessage('Failed to update report!');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Paper style={{ padding: 20, marginTop: 30 }}>
                    <Typography variant="h6" gutterBottom>
                        Edit Report
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(reportData).map((key) =>
                                <Grid item xs={12} key={key}>
                                    <TextField
                                        fullWidth
                                        label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                        variant="outlined"
                                        name={key}
                                        value={reportData[key]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            )}
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

export default ReportsEditPage;
