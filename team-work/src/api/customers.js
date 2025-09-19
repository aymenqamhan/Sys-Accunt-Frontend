// src/api/customers.js (النسخة النهائية بعد الدمج)

import apiClient from './axios';

// دالة لجلب قائمة كل العملاء
// GET /api/customers/
export const getCustomers = () => apiClient.get('/api/customers/');

// دالة لجلب عميل واحد عن طريق المعرّف (ID)
// GET /api/customers/{id}/
export const getCustomer = (id) => apiClient.get(`/api/customers/${id}/`);

// دالة لإنشاء عميل جديد
// POST /api/customers/
export const createCustomer = (formData) => apiClient.post('/api/customers/', formData);

// دالة لتحديث بيانات عميل
// PUT /api/customers/{id}/
export const updateCustomer = (id, formData) => apiClient.put(`/api/customers/${id}/`, formData);

// دالة لحذف عميل
// DELETE /api/customers/{id}/
export const deleteCustomer = (id) => apiClient.delete(`/api/customers/${id}/`);