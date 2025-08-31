import API from './axios';

export const login = (formData) => API.post('/auth/login/', formData);
export const register = (formData) => API.post('/auth/register/', formData);
export const changePassword = (formData) => API.post('/auth/change-password/', formData);
export const verifyToken = (token) => API.post('/auth/token/verify/', { token });