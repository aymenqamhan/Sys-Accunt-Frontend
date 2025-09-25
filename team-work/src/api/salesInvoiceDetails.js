import apiClient from './axios';


export const getSalesInvoiceDetails = () => apiClient.get('/sales-invoice-details/');

export const getSingleSalesInvoiceDetail = (detailId) => apiClient.get(`/sales-invoice-details/${detailId}/`);


export const createSalesInvoiceDetail = (detailData) => apiClient.post('/sales-invoice-details/', detailData);


export const updateSalesInvoiceDetail = (detailId, detailData) => apiClient.patch(`/sales-invoice-details/${detailId}/`, detailData);


export const deleteSalesInvoiceDetail = (detailId) => apiClient.delete(`/sales-invoice-details/${detailId}/`);