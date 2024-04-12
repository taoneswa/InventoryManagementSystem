import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const AttendanceViewPage = () => {
    const { employeeId } = useParams(); // Assuming the parameter is employeeId
    const [attendance, setAttendance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get(`aattendance/${employeeId}`); // Adjust the API URL as needed
                setAttendance(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch attendance:', err);
                setError('Failed to fetch attendance details');
                setLoading(false);
            }
        };

        fetchAttendance();
    }, [employeeId]);

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
                    Attendance Details
                </Typography>
                {attendance ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Employee ID:</strong> {attendance.employee_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Att Date:</strong> {attendance.att_date}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Att Month:</strong> {attendance.att_month}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Att Year:</strong> {attendance.att_year}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Attendance:</strong> {attendance.attendance}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Attendance not found</Typography>
                )}
            </Paper>
        </div>
    );
};

export default AttendanceViewPage;
