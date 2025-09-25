import apiClient from './axios';

// يجب أن تبدأ المسارات بـ /api/
export const getPurchaseInvoiceDetails = (invoiceId) => apiClient.get(`/api/purchase-invoices/${invoiceId}/details/`);
export const getSinglePurchaseInvoiceDetail = (detailId) => apiClient.get(`/api/purchase-invoice-details/${detailId}/`);
export const createPurchaseInvoiceDetail = (detailData) => apiClient.post('/api/purchase-invoice-details/', detailData);
export const updatePurchaseInvoiceDetail = (detailId, detailData) => apiClient.patch(`/api/purchase-invoice-details/${detailId}/`, detailData);
export const deletePurchaseInvoiceDetail = (detailId) => apiClient.delete(`/api/purchase-invoice-details/${detailId}/`);