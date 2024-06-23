import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: authHeader(),
});

export default axiosInstance;
