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
import ProfilePage from './pages/Profile/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfilePage';
import ReturnListPage from './pages/Returns/ReturnListPage';
import ReturnFormPage from './pages/Returns/ReturnFormPage';
import PaymentListPage from './pages/Payments/PaymentListPage';
import PaymentFormPage from './pages/Payments/PaymentFormPage';
import CurrencyListPage from './pages/Currencies/CurrencyListPage';
import CurrencyFormPage from './pages/Currencies/CurrencyFormPage';
import CategoryListPage from './pages/Categories/CategoryListPage';
import CategoryFormPage from './pages/Categories/CategoryFormPage';
import InventoryListPage from './pages/Inventory/InventoryListPage';
import InventoryFormPage from './pages/Inventory/InventoryFormPage';
import CustomerListPage from './pages/Customers/CustomerListPage';
import CustomerFormPage from './pages/Customers/CustomerFormPage';
import SupplierListPage from './pages/Suppliers/SupplierListPage';
import SupplierFormPage from './pages/Suppliers/SupplierFormPage';
import SalesInvoiceListPage from './pages/Sales/SalesInvoiceListPage';
import SalesInvoiceFormPage from './pages/Sales/SalesInvoiceFormPage';
import PurchaseInvoiceListPage from './pages/Purchases/PurchaseInvoiceListPage';
import PurchaseInvoiceFormPage from './pages/Purchases/PurchaseInvoiceFormPage';

// --- ✨ استيراد صفحات تفاصيل الفواتير الجديدة ---
import SalesInvoiceDetailsListPage from './pages/Sales/SalesInvoiceDetailsListPage';
import SalesInvoiceDetailsFormPage from './pages/Sales/SalesInvoiceDetailsFormPage';
import PurchaseInvoiceDetailsListPage from './pages/Purchases/PurchaseInvoiceDetailsListPage';
import PurchaseInvoiceDetailsFormPage from './pages/Purchases/PurchaseInvoiceDetailsFormPage';

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
        {/* --- المسارات العامة --- */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}

        {/* --- المسارات الداخلية --- */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/test" element={<TestPage />} />

          {/* ... (باقي المسارات كما هي) ... */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/edit/:userId" element={<UserFormPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/returns" element={<ReturnListPage />} />
          <Route path="/returns/new" element={<ReturnFormPage />} />
          <Route path="/returns/edit/:returnId" element={<ReturnFormPage />} />

          <Route path="/payments" element={<PaymentListPage />} />
          <Route path="/payments/new" element={<PaymentFormPage />} />
          <Route path="/payments/edit/:paymentId" element={<PaymentFormPage />} />

          <Route path="/currencies" element={<CurrencyListPage />} />
          <Route path="/currencies/new" element={<CurrencyFormPage />} />
          <Route path="/currencies/edit/:currencyId" element={<CurrencyFormPage />} />

          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/edit/:categoryId" element={<CategoryFormPage />} />

          <Route path="/inventory" element={<InventoryListPage />} />
          <Route path="/inventory/new" element={<InventoryFormPage />} />
          <Route path="/inventory/edit/:itemId" element={<InventoryFormPage />} />

          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/edit/:customerId" element={<CustomerFormPage />} />
          
          <Route path="/suppliers" element={<SupplierListPage />} />
          <Route path="/suppliers/new" element={<SupplierFormPage />} />
          <Route path="/suppliers/edit/:supplierId" element={<SupplierFormPage />} />
          
          {/* --- ✨ مسارات المبيعات وتفاصيلها المحدثة --- */}
          <Route path="/sales" element={<SalesInvoiceListPage />} />
          <Route path="/sales/new" element={<SalesInvoiceFormPage />} />
          <Route path="/sales/edit/:invoiceId" element={<SalesInvoiceFormPage />} />
          <Route path="/sales/:invoiceId/details" element={<SalesInvoiceDetailsListPage />} />
          <Route path="/sales/:invoiceId/details/new" element={<SalesInvoiceDetailsFormPage />} />
          <Route path="/sales/:invoiceId/details/edit/:detailId" element={<SalesInvoiceDetailsFormPage />} />

          {/* --- ✨ مسارات المشتريات وتفاصيلها المحدثة --- */}
          <Route path="/purchases" element={<PurchaseInvoiceListPage />} />
          <Route path="/purchases/new" element={<PurchaseInvoiceFormPage />} />
          <Route path="/purchases/edit/:invoiceId" element={<PurchaseInvoiceFormPage />} />
          <Route path="/purchases/:invoiceId/details" element={<PurchaseInvoiceDetailsListPage />} />
          <Route path="/purchases/:invoiceId/details/new" element={<PurchaseInvoiceDetailsFormPage />} />
          <Route path="/purchases/:invoiceId/details/edit/:detailId" element={<PurchaseInvoiceDetailsFormPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;