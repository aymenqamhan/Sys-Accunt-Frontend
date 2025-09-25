

// export const getPurchaseInvoices = () => API.get('/purchase-invoices/');
// export const createPurchaseInvoice = (formData) => API.post('/purchase-invoices/', formData);
// export const getPurchaseInvoice = (id) => API.get(`/purchase-invoices/${id}/`);
// export const updatePurchaseInvoice = (id, formData) => API.put(`/api/purchase-invoices/${id}/`, formData);
// export const deletePurchaseInvoice = (id) => API.delete(`/purchase-invoices/${id}/`);


import API from './axios';
export const getPurchaseInvoices = () => API.get('/purchase-invoices/');
export const createPurchaseInvoice = (formData) => API.post('/purchase-invoices/', formData);
export const getPurchaseInvoice = (id) => API.get(`/purchase-invoices/${id}/`);
export const updatePurchaseInvoice = (id, formData) => API.patch(`/purchase-invoices/${id}/`, formData);
export const deletePurchaseInvoice = (id) => API.delete(`/purchase-invoices/${id}/`);