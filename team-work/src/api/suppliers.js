import API from './axios';

export const getSuppliers = () => API.get('/suppliers/');
export const createSupplier = (formData) => API.post('/suppliers/', formData);
export const getSupplier = (id) => API.get(`/suppliers/${id}/`);
export const updateSupplier = (id, formData) => API.put(`/suppliers/${id}/`, formData);
export const deleteSupplier = (id) => API.delete(`/suppliers/${id}/`);
