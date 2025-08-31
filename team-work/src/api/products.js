import API from './axios';

export const getProducts = () => API.get('/api/products/');
export const createProduct = (formData) => API.post('/api/products/', formData);
export const getProduct = (id) => API.get(`/api/products/${id}/`);
export const updateProduct = (id, formData) => API.put(`/api/products/${id}/`, formData);
export const deleteProduct = (id) => API.delete(`/api/products/${id}/`);