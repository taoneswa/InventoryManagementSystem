import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const SalaryEditPage = ({ match }) => {
    const [salaryData, setSalaryData] = useState({
        employee_id: '',
        salary_month: '',
        salary_year: '',
        advance_salary: '',
        paid_amount: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const salaryId = match.params.id; // Assuming you're using react-router

    useEffect(() => {
        const fetchSalaryData = async () => {
            try {
                const response = await axios.get(`/api/salaries/${salaryId}`); // Adjust API URL as needed
                setSalaryData(response.data);
            } catch (error) {
                console.error('Error fetching salary data:', error);
                setSnackbarMessage('Failed to fetch salary data!');
                setSnackbarOpen(true);
            }
        };

        fetchSalaryData();
    }, [salaryId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalaryData({ ...salaryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`salary/${salaryId}`, salaryData); // Adjust API URL as needed
            if (response.status === 200) {
                setSnackbarMessage('Salary updated successfully!');
                setSnackbarOpen(true);
                // Optionally redirect or perform further actions
            }
        } catch (error) {
            console.error('Error updating salary:', error);
            setSnackbarMessage('Failed to update salary!');
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
                        Edit Salary
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(salaryData).map((key) =>
                                key !== 'id' ? (
                                    <Grid item xs={12} sm={6} key={key}>
                                        <TextField
                                            fullWidth
                                            label={key.replace('_', ' ')}
                                            variant="outlined"
                                            name={key}
                                            value={salaryData[key]}
                                            onChange={handleChange}
                                            type="text"
                                        />
                                    </Grid>
                                ) : null,
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

export default SalaryEditPage;
