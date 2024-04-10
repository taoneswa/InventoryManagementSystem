import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Link } from '@material-ui/core';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('your_forgot_password_endpoint_here', {
                email: email,
            });

            // Handle successful forgot password request here
            setSuccessMessage('Instructions to reset your password have been sent to your email.');
        } catch (error) {
            setError('Failed to reset password. Please check your email and try again.');
            console.error('Forgot password error:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <Typography variant="h4" gutterBottom><center>Forgot Password</center></Typography>
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="primary">{successMessage}</Typography>}
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleForgotPassword}>
                    Reset Password
                </Button>
                <div style={{ marginTop: '1rem' }}>
                    <Typography variant="body2" align="center">
                        <Link href="/login">Back to login</Link>
                    </Typography>
                </div>
            </div>
        </Container>
    );
}

export default ForgotPassword;
