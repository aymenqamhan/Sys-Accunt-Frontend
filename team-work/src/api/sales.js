// import API from './axios';

// export const getSalesInvoices = () => API.get('/api/sales-invoices/');
// export const createSalesInvoice = (formData) => API.post('/api/sales-invoices/', formData);
// export const getSalesInvoice = (id) => API.get(`/api/sales-invoices/${id}/`);
// export const updateSalesInvoice = (id, formData) => API.put(`/api/sales-invoices/${id}/`, formData);
// export const deleteSalesInvoice = (id) => API.delete(`/api/sales-invoices/${id}/`);


import apiClient from './axios';

export const getSales = () => apiClient.get('/api/sales/');
export const getSale = (id) => apiClient.get(`/api/sales/${id}/`);
export const createSale = (sale) => apiClient.post('/api/sales/', sale);
export const updateSale = (id, sale) => apiClient.put(`/api/sales/${id}/`, sale);
export const deleteSale = (id) => apiClient.delete(`/api/sales/${id}/`);