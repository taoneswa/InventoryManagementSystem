import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Link } from '@material-ui/core';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('your_api_endpoint_here', {
                username: username,
                password: password
            });

            // Handle successful login response here
            console.log(response.data);
        } catch (error) {
            setError('Invalid username or password');
            console.error('Login error:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
                <Typography variant="h4" gutterBottom><center>Login</center></Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
                    Login
                </Button>
                <div style={{ marginTop: '1rem' }}>
                    <Typography variant="body2" align="center">
                        <Link href="/register">Do you have an account?</Link>
                    </Typography>
                    <Typography variant="body2" align="center">
                        <Link href="#">Forgot password?</Link>
                    </Typography>
                </div>
            </div>
        </Container>
    );
}

export default LoginPage;
