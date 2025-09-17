import apiClient from './axios';


export const getInventoryItems = () => apiClient.get('/inventory/');


export const getSingleInventoryItem = (itemId) => apiClient.get(`/inventory/${itemId}/`);

export const createInventoryItem = (itemData) => apiClient.post('/inventory/', itemData);

export const updateInventoryItem = (itemId, itemData) => apiClient.patch(`/inventory/${itemId}/`, itemData);


export const deleteInventoryItem = (itemId) => apiClient.delete(`/inventory/${itemId}/`);