import React, { useState } from 'react';
import { register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, FormHelperText, Typography } from '@mui/material';

const Register = () => {
    const [userDetails, setUserDetails] = useState({ username: '', password: '', phoneNo: '', role: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userDetails);
            // Navigate based on the selected role
            if (userDetails.role === 'coach') {
                navigate('/coach-dashboard');
            } else if (userDetails.role === 'player') {
                navigate('/player-dashboard');
            }
        } catch (error) {
            setError('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ width: '300px', margin: 'auto' }}>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <TextField
                label="Username"
                name="username"
                fullWidth
                onChange={handleChange}
                margin="normal"
                value={userDetails.username}
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                onChange={handleChange}
                margin="normal"
                value={userDetails.password}
            />
            <TextField
                label="Phone Number"
                name="phoneNo"
                fullWidth
                onChange={handleChange}
                margin="normal"
                value={userDetails.phoneNo}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Select Role</InputLabel>
                <Select
                    name="role"
                    value={userDetails.role}
                    onChange={handleChange}
                    displayEmpty
                >
                    
                    <MenuItem value="coach">Coach</MenuItem>
                    <MenuItem value="player">Player</MenuItem>
                </Select>
                <FormHelperText>{error}</FormHelperText>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" color="primary">
                Register
            </Button>
        </form>
    );
};

export default Register;
