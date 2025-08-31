import API from './axios';

export const getPurchaseInvoices = () => API.get('/api/purchase-invoices/');
export const createPurchaseInvoice = (formData) => API.post('/api/purchase-invoices/', formData);
export const getPurchaseInvoice = (id) => API.get(`/api/purchase-invoices/${id}/`);
export const updatePurchaseInvoice = (id, formData) => API.put(`/api/purchase-invoices/${id}/`, formData);
export const deletePurchaseInvoice = (id) => API.delete(`/api/purchase-invoices/${id}/`);