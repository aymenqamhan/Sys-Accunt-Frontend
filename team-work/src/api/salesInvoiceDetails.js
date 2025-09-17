import apiClient from './axios';


export const getSalesInvoiceDetails = () => apiClient.get('/api/sales-invoice-details/');

export const getSingleSalesInvoiceDetail = (detailId) => apiClient.get(`/api/sales-invoice-details/${detailId}/`);


export const createSalesInvoiceDetail = (detailData) => apiClient.post('/api/sales-invoice-details/', detailData);


export const updateSalesInvoiceDetail = (detailId, detailData) => apiClient.patch(`/api/sales-invoice-details/${detailId}/`, detailData);


export const deleteSalesInvoiceDetail = (detailId) => apiClient.delete(`/api/sales-invoice-details/${detailId}/`);