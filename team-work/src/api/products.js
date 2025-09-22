// import API from './axios';

// export const getProducts = () => API.get('/api/products/');
// export const createProduct = (formData) => API.post('/api/products/', formData);
// export const getProduct = (id) => API.get(`/api/products/${id}/`);
// export const updateProduct = (id, formData) => API.put(`/api/products/${id}/`, formData);
// export const deleteProduct = (id) => API.delete(`/api/products/${id}/`);



import apiClient from './axios';

export const getProducts = () => apiClient.get('/api/products/');
export const getProduct = (id) => apiClient.get(`/api/products/${id}/`);
export const createProduct = (product) => apiClient.post('/api/products/', product);
export const updateProduct = (id, product) => apiClient.put(`/api/products/${id}/`, product);
export const deleteProduct = (id) => apiClient.delete(`/api/products/${id}/`);