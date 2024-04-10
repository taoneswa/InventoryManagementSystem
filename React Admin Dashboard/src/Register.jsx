import React from 'react';
import { Container, TextField, Button, Typography, Link } from '@material-ui/core';

function SignUpPage() {
    return (
        <Container component="main" maxWidth="xs">
            <Typography variant="h2">Sign Up</Typography>
            <form>
                <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                <Button type="submit" fullWidth variant="contained" color="primary">
                    Sign Up
                </Button>
            </form>
            <Typography variant="body2" align="center">
                Already have an account? <Link href="/login">Login here</Link>
            </Typography>
        </Container>
    );
}

export default SignUpPage;
