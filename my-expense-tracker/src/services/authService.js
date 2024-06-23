import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
};

export const register = async (firstName, lastName, email, password) => {
    const response = await axios.post(`${API_URL}/users/register`, { firstName, lastName, email, password });
    return response.data;
};
