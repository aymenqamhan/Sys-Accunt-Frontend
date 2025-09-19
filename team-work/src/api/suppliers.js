// src/api/suppliers.js (النسخة النهائية بعد الدمج)

import apiClient from './axios';

// دالة لجلب قائمة كل الموردين
// GET /api/suppliers/
export const getSuppliers = () => apiClient.get('/api/suppliers/');

// دالة لجلب مورد واحد عن طريق المعرّف (ID)
// GET /api/suppliers/{id}/
export const getSupplier = (id) => apiClient.get(`/api/suppliers/${id}/`);

// دالة لإنشاء مورد جديد
// POST /api/suppliers/
export const createSupplier = (formData) => apiClient.post('/api/suppliers/', formData);

// دالة لتحديث بيانات مورد
// PUT /api/suppliers/{id}/
export const updateSupplier = (id, formData) => apiClient.put(`/api/suppliers/${id}/`, formData);

// دالة لحذف مورد
// DELETE /api/suppliers/{id}/
export const deleteSupplier = (id) => apiClient.delete(`/api/suppliers/${id}/`);