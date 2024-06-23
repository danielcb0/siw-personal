import axios from 'axios';

const API_URL = 'http://localhost:8080/api/categories';

export const getCategories = async () => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const deleteCategory = async (categoryId) => {
    await axios.delete(`${API_URL}/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};

export const createCategory = async (title, description) => {
    const response = await axios.post(API_URL, {
        title,
        description
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const getCategory = async (categoryId) => {
    const response = await axios.get(`${API_URL}/${categoryId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
};

export const updateCategory = async (categoryId, title, description) => {
    await axios.put(`${API_URL}/${categoryId}`, {
        title,
        description
    }, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
};
