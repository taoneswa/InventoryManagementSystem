import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const AttendanceEditPage = ({ match }) => {
    const [attendanceData, setAttendanceData] = useState({
        employee_id: '',
        att_date: '',
        att_month: '',
        att_year: '',
        attendance: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const attendanceId = match.params.id; // Assuming you're using react-router

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`/api/attendance/${attendanceId}`); // Adjust API URL as needed
                setAttendanceData(response.data);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setSnackbarMessage('Failed to fetch attendance data!');
                setSnackbarOpen(true);
            }
        };

        fetchAttendanceData();
    }, [attendanceId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAttendanceData({ ...attendanceData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/attendance/${attendanceId}`, attendanceData); // Adjust API URL as needed
            if (response.status === 200) {
                setSnackbarMessage('Attendance updated successfully!');
                setSnackbarOpen(true);
                // Optionally redirect or perform further actions
            }
        } catch (error) {
            console.error('Error updating attendance:', error);
            setSnackbarMessage('Failed to update attendance!');
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
                        Edit Attendance
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(attendanceData).map((key) =>
                                key !== 'id' ? (
                                    <Grid item xs={12} sm={6} key={key}>
                                        <TextField
                                            fullWidth
                                            label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                            variant="outlined"
                                            name={key}
                                            value={attendanceData[key]}
                                            onChange={handleChange}
                                            type={key.includes('date') ? 'date' : 'text'}
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

export default AttendanceEditPage;
