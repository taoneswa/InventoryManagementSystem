import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';

const SalaryViewPage = () => {
    const { id } = useParams();
    const [salary, setSalary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchSalary = async () => {
            try {
                const response = await axios.get(`salary/${id}`, {
                    cancelToken: source.token
                });
                setSalary(response.data);
                setLoading(false);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message);
                } else {
                    console.error('Failed to fetch salary:', err);
                    setError('Failed to fetch salary details');
                    setLoading(false);
                }
            }
        };

        fetchSalary();

        return () => {
            source.cancel('Component unmounted');
        };
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
            <div>
                <Typography variant="h6" color="error" textAlign="center">
                    {error}
                </Typography>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    return (
        <div className='main-container'>
            <Paper elevation={3} style={{ padding: 20, margin: '20px auto', maxWidth: '90%', minWidth: 300 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Salary Details
                </Typography>
                {salary ? (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Employee ID:</strong> {salary.employee_id}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Salary Month:</strong> {salary.salary_month}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Salary Year:</strong> {salary.salary_year}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Advance Salary:</strong> {salary.advance_salary}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1"><strong>Paid Amount:</strong> {salary.paid_amount}</Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1">Salary details not found</Typography>
                )}
            </Paper>
        </div>
    );
};

export default SalaryViewPage;
