import apiClient from './axios';

// دالة لجلب قائمة كل العملاء
// GET /api/customers/
export const getCustomers = () => apiClient.get('/customers/');

// دالة لجلب عميل واحد عن طريق المعرّف (ID)
// GET /api/customers/{customer_id}/
export const getSingleCustomer = (customerId) => apiClient.get(`/customers/${customerId}/`);

// دالة لإنشاء عميل جديد
// POST /api/customers/
export const createCustomer = (customerData) => apiClient.post('/customers/', customerData);

// دالة لتحديث بيانات عميل (باستخدام PATCH للتحديثات الجزئية)
// PATCH /api/customers/{customer_id}/
export const updateCustomer = (customerId, customerData) => apiClient.patch(`/customers/${customerId}/`, customerData);

// دالة لحذف عميل
// DELETE /api/customers/{customer_id}/
export const deleteCustomer = (customerId) => apiClient.delete(`/customers/${customerId}/`);