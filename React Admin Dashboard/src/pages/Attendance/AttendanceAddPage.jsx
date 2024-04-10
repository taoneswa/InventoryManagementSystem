import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const AttendanceAddPage = () => {
    const [attendanceData, setAttendanceData] = useState({
        employee_id: '',
        att_date: '',
        att_month: '',
        att_year: '',
        attendance: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendanceData({ ...attendanceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/attendance', attendanceData, {
                headers: {
                    'Content-Type': 'application/json' // Adjust content type as needed
                }
            }); // Adjust the API URL as needed
            if (response.status === 200 || response.status === 201) {
                setSnackbarMessage('Attendance added successfully!');
                setSnackbarOpen(true);
                // Clear form or redirect as needed
            }
        } catch (error) {
            console.error('Error adding attendance:', error);
            setSnackbarMessage('Failed to add attendance!');
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
                        Add New Attendance
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(attendanceData).map((key) => (
                                <Grid item xs={12} key={key}>
                                    <TextField
                                        fullWidth
                                        label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                        variant="outlined"
                                        name={key}
                                        value={attendanceData[key]}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
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

export default AttendanceAddPage;
