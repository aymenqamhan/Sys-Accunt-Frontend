import apiClient from './axios';


export const getPayments = () => apiClient.get('/payments/');


export const getSinglePayment = (paymentId) => apiClient.get(`/payments/${paymentId}/`);


export const createPayment = (paymentData) => apiClient.post('/payments/', paymentData);


export const updatePayment = (paymentId, paymentData) => apiClient.patch(`/payments/${paymentId}/`, paymentData);


export const deletePayment = (paymentId) => apiClient.delete(`/payments/${paymentId}/`);