import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Aapka Laravel backend URL
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Request interceptor token add karne ke liye (Agar Sanctum token use ho)
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API;
