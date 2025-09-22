// import apiClient from './axios';


// export const getCategories = () => apiClient.get('/categories/');

// export const getSingleCategory = (categoryId) => apiClient.get(`/categories/${categoryId}/`);

// export const createCategory = (categoryData) => apiClient.post('/categories/', categoryData);


// export const updateCategory = (categoryId, categoryData) => apiClient.patch(`/categories/${categoryId}/`, categoryData);


// export const deleteCategory = (categoryId) => apiClient.delete(`/categories/${categoryId}/`);



import apiClient from './axios';

export const getCategories = () => apiClient.get('/api/categories/');
export const getCategory = (id) => apiClient.get(`/api/categories/${id}/`);
export const createCategory = (data) => apiClient.post('/api/categories/', data);
export const updateCategory = (id, data) => apiClient.put(`/api/categories/${id}/`, data);
export const deleteCategory = (id) => apiClient.delete(`/api/categories/${id}/`);