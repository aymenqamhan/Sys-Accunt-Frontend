import apiClient from './axios';
// العملات 

export const getCurrencies = () => apiClient.get('/currencies/');


export const getSingleCurrency = (currencyId) => apiClient.get(`/currencies/${currencyId}/`);


export const createCurrency = (currencyData) => apiClient.post('/currencies/', currencyData);


export const updateCurrency = (currencyId, currencyData) => apiClient.patch(`/currencies/${currencyId}/`, currencyData);


export const deleteCurrency = (currencyId) => apiClient.delete(`/currencies/${currencyId}/`);