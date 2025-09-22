// import apiClient from './axios';

// // مرتجعات 

// export const getReturns = () => apiClient.get('/api/returns/');


// export const getReturnDetails = (returnId) => apiClient.get(`/api/returns/${returnId}/`);


// export const createReturn = (returnData) => apiClient.post('/api/returns/', returnData);


// export const updateReturn = (returnId, returnData) => apiClient.patch(`/api/returns/${returnId}/`, returnData);


// export const deleteReturn = (returnId) => apiClient.delete(`/api/returns/${returnId}/`);


// import apiClient from './axios';

// // FIX: Removed '/api/' from all paths
// export const getReturns = () => apiClient.get('/returns/');
// export const getReturnDetails = (returnId) => apiClient.get(`/returns/${returnId}/`);
// export const createReturn = (returnData) => apiClient.post('/returns/', returnData);
// export const updateReturn = (returnId, returnData) => apiClient.patch(`/returns/${returnId}/`, returnData);
// export const deleteReturn = (returnId) => apiClient.delete(`/returns/${returnId}/`);


import apiClient from './axios';

export const getReturns = () => apiClient.get('/api/returns/');
export const getReturn = (id) => apiClient.get(`/api/returns/${id}/`);
export const createReturn = (returnData) => apiClient.post('/api/returns/', returnData);
export const updateReturn = (id, returnData) => apiClient.put(`/api/returns/${id}/`, returnData);
export const deleteReturn = (id) => apiClient.delete(`/api/returns/${id}/`);