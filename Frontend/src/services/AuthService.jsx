import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token); // Store JWT token
    localStorage.setItem('role', response.data.role); // Store user role separately
    return response.data;
};

export const register = async (userDetails) => {
    const response = await axios.post(`${API_URL}/register`, userDetails);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove role on logout
};

export const getToken = () => {
    return localStorage.getItem('token');
};
