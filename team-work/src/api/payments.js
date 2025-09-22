// import apiClient from './axios';


// export const getPayments = () => apiClient.get('/payments/');


// export const getSinglePayment = (paymentId) => apiClient.get(`/payments/${paymentId}/`);


// export const createPayment = (paymentData) => apiClient.post('/payments/', paymentData);


// export const updatePayment = (paymentId, paymentData) => apiClient.patch(`/payments/${paymentId}/`, paymentData);


// export const deletePayment = (paymentId) => apiClient.delete(`/payments/${paymentId}/`);




import apiClient from './axios';

export const getPayments = () => apiClient.get('/api/payments/');
export const getPayment = (id) => apiClient.get(`/api/payments/${id}/`);
export const createPayment = (payment) => apiClient.post('/api/payments/', payment);
export const updatePayment = (id, payment) => apiClient.put(`/api/payments/${id}/`, payment);
export const deletePayment = (id) => apiClient.delete(`/api/payments/${id}/`);



