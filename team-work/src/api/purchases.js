import API from './axios';

// export const getPurchaseInvoices = () => API.get('/purchase-invoices/');
// export const createPurchaseInvoice = (formData) => API.post('/purchase-invoices/', formData);
// export const getPurchaseInvoice = (id) => API.get(`/purchase-invoices/${id}/`);
// export const updatePurchaseInvoice = (id, formData) => API.put(`/api/purchase-invoices/${id}/`, formData);
// export const deletePurchaseInvoice = (id) => API.delete(`/purchase-invoices/${id}/`);



// export const getPurchaseInvoices = () => API.get('/purchase-invoices/');
// export const createPurchaseInvoice = (formData) => API.post('/purchase-invoices/', formData);
// export const getPurchaseInvoice = (id) => API.get(`/purchase-invoices/${id}/`);
// export const updatePurchaseInvoice = (id, formData) => API.patch(`/purchase-invoices/${id}/`, formData);
// export const deletePurchaseInvoice = (id) => API.delete(`/purchase-invoices/${id}/`);



import apiClient from './axios';

export const getPurchases = () => apiClient.get('/api/purchases/');
export const getPurchase = (id) => apiClient.get(`/api/purchases/${id}/`);
export const createPurchase = (purchase) => apiClient.post('/api/purchases/', purchase);
export const updatePurchase = (id, purchase) => apiClient.put(`/api/purchases/${id}/`, purchase);
export const deletePurchase = (id) => apiClient.delete(`/api/purchases/${id}/`);