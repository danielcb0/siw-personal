import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getCategories = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${API_URL}/categories`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createCategory = async (category) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(`${API_URL}/categories`, category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
