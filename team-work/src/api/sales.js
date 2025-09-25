import API from './axios';

export const getSalesInvoices = () => API.get('/sales-invoices/');
export const createSalesInvoice = (formData) => API.post('/sales-invoices/', formData);
export const getSalesInvoice = (id) => API.get(`/sales-invoices/${id}/`);
export const updateSalesInvoice = (id, formData) => API.put(`/api/sales-invoices/${id}/`, formData);
export const deleteSalesInvoice = (id) => API.delete(`/sales-invoices/${id}/`);