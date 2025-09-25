import API from './axios';

export const getAccounts = () => API.get('/accounts/');
export const createAccount = (formData) => API.post('/accounts/', formData);
export const getAccount = (id) => API.get(`/accounts/${id}/`);
export const updateAccount = (id, formData) => API.put(`/accounts/${id}/`, formData);
export const deleteAccount = (id) => API.delete(`/accounts/${id}/`);