import API from './axios';

export const getCustomers = () => API.get('/api/customers/');
export const getCustomer = (id) => API.get(`/api/customers/${id}/`);
export const createCustomer = (formData) => API.post('/api/customers/', formData);
export const updateCustomer = (id, formData) => API.put(`/api/customers/${id}/`, formData);
export const deleteCustomer = (id) => API.delete(`/api/customers/${id}/`);