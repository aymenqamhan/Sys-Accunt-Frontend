// import apiClient from './axios';


// export const getInventoryItems = () => apiClient.get('/inventory/');


// export const getSingleInventoryItem = (itemId) => apiClient.get(`/inventory/${itemId}/`);

// export const createInventoryItem = (itemData) => apiClient.post('/inventory/', itemData);

// export const updateInventoryItem = (itemId, itemData) => apiClient.patch(`/inventory/${itemId}/`, itemData);


// export const deleteInventoryItem = (itemId) => apiClient.delete(`/inventory/${itemId}/`);





import apiClient from './axios';

export const getInventoryItems = () => apiClient.get('/api/inventory/');
export const getInventoryItem = (id) => apiClient.get(`/api/inventory/${id}/`);
export const createInventoryItem = (item) => apiClient.post('/api/inventory/', item);
export const updateInventoryItem = (id, item) => apiClient.put(`/api/inventory/${id}/`, item);
export const deleteInventoryItem = (id) => apiClient.delete(`/api/inventory/${id}/`);