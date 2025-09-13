
import API from './axios';

export const login = (formData) => API.post('/auth/login/', formData);

export const changePassword = (formData) => API.post('/auth/change-password/', formData);

export const logout = (formData) => API.post('/auth/logout/', formData);

export const register = (formData) => API.post('/auth/register/', formData);

export const resend_otp = (formData) => API.post('/auth/resend-otp/', formData);

export const token = () => API.post('/auth/token/');

export const refreshToken = () => API.post('/auth/token/refresh/');

export const verifyemail = (formData) => API.post('/auth/verify-email/', formData);