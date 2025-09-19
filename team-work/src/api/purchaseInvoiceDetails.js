import apiClient from './axios';

export const getPurchaseInvoiceDetails = () => apiClient.get('/purchase-invoice-details/');

export const getSinglePurchaseInvoiceDetail = (detailId) => apiClient.get(`/purchase-invoice-details/${detailId}/`);

export const createPurchaseInvoiceDetail = (detailData) => apiClient.post('/purchase-invoice-details/', detailData);

export const updatePurchaseInvoiceDetail = (detailId, detailData) => apiClient.patch(`/purchase-invoice-details/${detailId}/`, detailData);

export const deletePurchaseInvoiceDetail = (detailId) => apiClient.delete(`/purchase-invoice-details/${detailId}/`);