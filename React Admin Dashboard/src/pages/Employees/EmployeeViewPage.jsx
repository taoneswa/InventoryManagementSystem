import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const EmployeeViewPage = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`api/employee/${id}`); // Adjust the API URL as needed
                setEmployee(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Failed to fetch employee:', err);
                setError('Failed to fetch employee details');
                setLoading(false);
            }
        };

        fetchEmployee();
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
                            <Typography variant="body1"><strong>Name:</strong> {employee.name}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Email:</strong> {employee.email}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Phone:</strong> {employee.phone}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Employee ID:</strong> {employee.employee_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>NID No:</strong> {employee.nid_no}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Experience:</strong> {employee.experience}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Salary:</strong> {employee.salary}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Vacation:</strong> {employee.vacation}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>City:</strong> {employee.city}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Address:</strong> {employee.address}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Employee not found</Typography>
                )}
            </Paper>
        </div>

    );
};

export default EmployeeViewPage;
