import apiClient from './axios';


export const getCategories = () => apiClient.get('/categories/');

export const getSingleCategory = (categoryId) => apiClient.get(`/categories/${categoryId}/`);

export const createCategory = (categoryData) => apiClient.post('/categories/', categoryData);


export const updateCategory = (categoryId, categoryData) => apiClient.patch(`/categories/${categoryId}/`, categoryData);


export const deleteCategory = (categoryId) => apiClient.delete(`/categories/${categoryId}/`);