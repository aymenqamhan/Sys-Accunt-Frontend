import API from './axios';

export const getSalesInvoices = () => API.get('/api/sales-invoices/');
export const createSalesInvoice = (formData) => API.post('/api/sales-invoices/', formData);
export const getSalesInvoice = (id) => API.get(`/api/sales-invoices/${id}/`);
export const updateSalesInvoice = (id, formData) => API.put(`/api/sales-invoices/${id}/`, formData);
export const deleteSalesInvoice = (id) => API.delete(`/api/sales-invoices/${id}/`);