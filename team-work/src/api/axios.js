import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8000/api' });

// Add an interceptor to include the auth token in every request
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export default API;