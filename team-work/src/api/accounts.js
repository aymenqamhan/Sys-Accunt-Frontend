import API from './axios';

export const getAccounts = () => API.get('/api/accounts/');
export const createAccount = (formData) => API.post('/api/accounts/', formData);
export const getAccount = (id) => API.get(`/api/accounts/${id}/`);
export const updateAccount = (id, formData) => API.put(`/api/accounts/${id}/`, formData);
export const deleteAccount = (id) => API.delete(`/api/accounts/${id}/`);