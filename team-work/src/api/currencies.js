// import apiClient from './axios';
// // العملات 

// export const getCurrencies = () => apiClient.get('/currencies/');


// export const getSingleCurrency = (currencyId) => apiClient.get(`/currencies/${currencyId}/`);


// export const createCurrency = (currencyData) => apiClient.post('/currencies/', currencyData);


// export const updateCurrency = (currencyId, currencyData) => apiClient.patch(`/currencies/${currencyId}/`, currencyData);


// export const deleteCurrency = (currencyId) => apiClient.delete(`/currencies/${currencyId}/`);



import apiClient from './axios';

export const getCurrencies = () => apiClient.get('/api/currencies/');
export const getCurrency = (id) => apiClient.get(`/api/currencies/${id}/`);
export const createCurrency = (data) => apiClient.post('/api/currencies/', data);
export const updateCurrency = (id, data) => apiClient.put(`/api/currencies/${id}/`, data);
export const deleteCurrency = (id) => apiClient.delete(`/api/currencies/${id}/`);