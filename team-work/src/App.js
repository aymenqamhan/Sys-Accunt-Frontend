// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// --- استيراد المكونات الرئيسية ---
import Layout from './components/Layout/Layout';

// --- استيراد صفحات المصادقة ---
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ChangePasswordPage from './pages/Auth/ChangePasswordPage';
import VerifyEmailPage from './pages/Auth/VerifyEmailPage';

// --- استيراد الصفحات الداخلية ---
import DashboardPage from './pages/Dashboard/DashboardPage';
import TestPage from './pages/TestPage';
import UserListPage from './pages/Users/UserListPage';
import UserFormPage from './pages/Users/UserFormPage';

// --- استيراد الصفحات الجديدة التي تم إنشاؤها ---
import CustomerListPage from './pages/Customers/CustomerListPage';
import CustomerFormPage from './pages/Customers/CustomerFormPage';
import SupplierListPage from './pages/Suppliers/SupplierListPage';
import SupplierFormPage from './pages/Suppliers/SupplierFormPage';
import SalesInvoiceListPage from './pages/Sales/SalesInvoiceListPage';
import SalesInvoiceFormPage from './pages/Sales/SalesInvoiceFormPage';
import PurchaseInvoiceListPage from './pages/Purchases/PurchaseInvoiceListPage';
import PurchaseInvoiceFormPage from './pages/Purchases/PurchaseInvoiceFormPage';


const AppLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* --- المسارات العامة (بدون Sidebar أو Header) --- */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/VerifyEmailPage" element={<VerifyEmailPage />} />

        {/* --- المسارات الداخلية (التي تظهر داخل الهيكل) --- */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />} />
          <Route path="/test" element={<TestPage />} />

          {/* --- مسارات إدارة المستخدمين --- */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/edit/:userId" element={<UserFormPage />} />

          {/* --- مسارات إدارة العملاء --- */}
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/edit/:customerId" element={<CustomerFormPage />} />
          
          {/* --- مسارات إدارة الموردين --- */}
          <Route path="/suppliers" element={<SupplierListPage />} />
          <Route path="/suppliers/new" element={<SupplierFormPage />} />
          <Route path="/suppliers/edit/:supplierId" element={<SupplierFormPage />} />

          {/* --- مسارات إدارة المبيعات --- */}
          <Route path="/sales" element={<SalesInvoiceListPage />} />
          <Route path="/sales/new" element={<SalesInvoiceFormPage />} />
          <Route path="/sales/edit/:invoiceId" element={<SalesInvoiceFormPage />} />

          {/* --- مسارات إدارة المشتريات --- */}
          <Route path="/purchases" element={<PurchaseInvoiceListPage />} />
          <Route path="/purchases/new" element={<PurchaseInvoiceFormPage />} />
          <Route path="/purchases/edit/:invoiceId" element={<PurchaseInvoiceFormPage />} />
          
        </Route>
      </Routes>
    </Router>
  );
};

export default App;