import API from './axios';

export const getSuppliers = () => API.get('/api/suppliers/');
export const getSupplier = (id) => API.get(`/api/suppliers/${id}/`);
export const createSupplier = (formData) => API.post('/api/suppliers/', formData);
export const updateSupplier = (id, formData) => API.put(`/api/suppliers/${id}/`, formData);
export const deleteSupplier = (id) => API.delete(`/api/suppliers/${id}/`);