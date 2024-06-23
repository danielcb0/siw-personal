import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getTransactions = async (categoryId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${API_URL}/categories/${categoryId}/transactions`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createTransaction = async (categoryId, transaction) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.post(`${API_URL}/categories/${categoryId}/transactions`, {
        amount: parseFloat(transaction.amount),
        note: transaction.note,
        transactionDate: new Date(transaction.transactionDate).getTime()
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const deleteTransaction = async (categoryId, transactionId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.delete(`${API_URL}/categories/${categoryId}/transactions/${transactionId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const updateTransaction = async (categoryId, transactionId, transaction) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.put(`${API_URL}/categories/${categoryId}/transactions/${transactionId}`, transaction, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
