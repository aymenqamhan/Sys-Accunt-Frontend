import API from './axios';

export const getUsers = () => API.get('/auth/users/');
export const getUser = (id) => API.get(`/auth/users/${id}/`);
export const createUser = (formData) => API.post('/auth/users/', formData);
export const updateUser = (id, formData) => API.put(`/auth/users/${id}/`, formData);
export const deleteUser = (id) => API.delete(`/auth/users/${id}/`);