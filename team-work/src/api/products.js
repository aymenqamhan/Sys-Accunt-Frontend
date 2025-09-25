import API from './axios';

export const getProducts = () => API.get('/products/');
export const createProduct = (formData) => API.post('/products/', formData);
export const getProduct = (id) => API.get(`/products/${id}/`);
export const updateProduct = (id, formData) => API.put(`/products/${id}/`, formData);
export const deleteProduct = (id) => API.delete(`/products/${id}/`);