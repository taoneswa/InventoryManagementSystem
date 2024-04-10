import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@mui/material';
import axios from 'axios';

const EmployeeEditPage = ({ match }) => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        email: '',
        phone: '',
        employee_id: '',
        nid_no: '',
        experience: '',
        photo: '',
        salary: '',
        vacation: '',
        city: '',
        address: '',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const employeeId = match.params.id; // Assuming you're using react-router

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(`/api/employees/${employeeId}`); // Adjust API URL as needed
                setEmployeeData(response.data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                setSnackbarMessage('Failed to fetch employee data!');
                setSnackbarOpen(true);
            }
        };

        fetchEmployeeData();
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({ ...employeeData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`api/employee/${employeeId}`, employeeData); // Adjust API URL as needed
            if (response.status === 200) {
                setSnackbarMessage('Employee updated successfully!');
                setSnackbarOpen(true);
                // Optionally redirect or perform further actions
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            setSnackbarMessage('Failed to update employee!');
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
                        Edit Employee
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {Object.keys(employeeData).map((key) =>
                                key !== 'id' && key !== 'photo' ? ( // Assuming 'id' and 'photo' should not be edited
                                    <Grid item xs={12} sm={6} key={key}>
                                        <TextField
                                            fullWidth
                                            label={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
                                            variant="outlined"
                                            name={key}
                                            value={employeeData[key]}
                                            onChange={handleChange}
                                            type={key === 'email' ? 'email' : 'text'}
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

export default EmployeeEditPage;
