// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// // تأكد من أن هذه هي الطريقة الصحيحة للاستيراد
// import LoginPage from './pages/Auth/LoginPage';
// import RegisterPage from './pages/Auth/RegisterPage';
// import ChangePasswordPage from './pages/Auth/ChangePasswordPage';
// import VerifyTokenPage from './pages/Auth/VerifyTokenPage';
// import DashboardPage from './pages/Dashboard/DashboardPage';
// import TestPage from './pages/TestPage';

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* تأكد من أن مساراتك هنا صحيحة */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/change-password" element={<ChangePasswordPage />} />
//         <Route path="/verify-token" element={<VerifyTokenPage />} />
//         <Route path="/dashboard" element={<DashboardPage />} />
//         <Route path="/test" element={<TestPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



//true

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
// import Layout from './components/Layout/Layout'; // <-- ١. استيراد Layout

// // استيراد صفحاتك
// import LoginPage from './pages/Auth/LoginPage';
// import RegisterPage from './pages/Auth/RegisterPage';
// import ChangePasswordPage from './pages/Auth/ChangePasswordPage';
// import VerifyTokenPage from './pages/Auth/VerifyEmailPage';
// import DashboardPage from './pages/Dashboard/DashboardPage';
// import TestPage from './pages/TestPage';

// /**
//  * هذا المكون الفرعي سيقوم بتغليف كل الصفحات الداخلية بالهيكل الرئيسي
//  */
// const AppLayout = () => {
//   return (
//     <Layout>
//       <Outlet /> {/* <-- سيتم عرض الصفحات الداخلية هنا */}
//     </Layout>
//   );
// };

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* --- المسارات العامة (بدون Sidebar أو Header) --- */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//         <Route path="/change-password" element={<ChangePasswordPage />} />
//         <Route path="/verify-token" element={<VerifyTokenPage />} />

//         {/* --- المسارات الداخلية (التي تظهر داخل الهيكل) --- */}
//         <Route element={<AppLayout />}>
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/test" element={<TestPage />} />
//           {/* أضف هنا بقية صفحاتك الداخلية مثل المبيعات والمخزون */}
//           {/* <Route path="/sales" element={<SalesPage />} /> */}
//         </Route>

//       </Routes>
//     </Router>
//   );
// };

// export default App;




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
// +++ استيراد صفحات الملف الشخصي +++
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

import ProductListPage from './pages/Products/ProductListPage';
import ProductFormPage from './pages/Products/ProductFormPage';

// You might not need separate routes for details, they could be part of the main invoice page
import PurchaseInvoiceDetailsFormPage from './pages/Purchases/PurchaseInvoiceDetailsFormPage';
import PurchaseInvoiceDetailsListPage from './pages/Purchases/PurchaseInvoiceDetailsListPage';

import PurchaseInvoiceFormPage from './pages/Purchases/PurchaseInvoiceFormPage';
import PurchaseInvoiceListPage from './pages/Purchases/PurchaseInvoiceListPage';


import AccountListPage from './pages/Accounts/AccountListPage';
import AccountFormPage from './pages/Accounts/AccountFormPage';

import SupplierListPage from './pages/Suppliers/SupplierListPage';
import SupplierFormPage from './pages/Suppliers/SupplierFormPage';

import SalesInvoiceListPage from './pages/Sales/SalesInvoiceListPage';
import SalesInvoiceFormPage from './pages/Sales/SalesInvoiceFormPage';
import SalesInvoiceDetailsListPage from './pages/Sales/SalesInvoiceDetailsListPage';
import SalesInvoiceDetailsFormPage from './pages/Sales/SalesInvoiceDetailsFormPage';



/**
 * هذا المكون يغلف كل الصفحات التي تحتاج إلى Sidebar و Header
 */
const AppLayout = () => {
  return (
    <Layout>
      <Outlet /> {/* سيتم عرض الصفحات الداخلية هنا (مثل Dashboard) */}
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
        <Route path="/verify-email" element={<VerifyEmailPage />} /> {/* تصحيح بسيط لاسم المسار */}

        {/* --- المسارات الداخلية (التي تظهر داخل الهيكل) --- */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} /> {/* تصحيح بسيط لاسم المسار */}
          <Route path="/test" element={<TestPage />} />

          {/* المسارات الخاصة بالمستخدمين */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/edit/:userId" element={<UserFormPage />} />

          {/* +++ إضافة المسارات الخاصة بالملف الشخصي هنا +++ */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />


          <Route path="/returns" element={<ReturnListPage />} />
          <Route path="/returns/new" element={<ReturnFormPage />} />
          <Route path="/returns/edit/:returnId" element={<ReturnFormPage />} />



          <Route path="/payments" element={<PaymentListPage />} />
          <Route path="/payments/new" element={<PaymentFormPage />} />
          <Route path="/payments/edit/:paymentId" element={<PaymentFormPage />} />



          <Route path="/Currencies" element={<CurrencyListPage />} />
          <Route path="/Currencies/new" element={<CurrencyFormPage />} />
          <Route path="/Currencies/edit/:currencyId" element={<CurrencyFormPage />} />


          <Route path="/categories" element={<CategoryListPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/edit/:categoryId" element={<CategoryFormPage />} />


          <Route path="/inventory" element={<InventoryListPage />} />
          <Route path="/inventory/new" element={<InventoryFormPage />} />
          <Route path="/inventory/edit/:itemId" element={<InventoryFormPage />} />



          <Route path="/purchases/:invoiceId/details" element={<PurchaseInvoiceDetailsListPage />} />
          <Route path="/purchases/:invoiceId/details/new" element={<PurchaseInvoiceDetailsFormPage />} />
          <Route path="/purchases/:invoiceId/details/edit/:detailId" element={<PurchaseInvoiceDetailsFormPage />} />
          <Route path="/purchases" element={<PurchaseInvoiceListPage />} />
          <Route path="/purchases/new" element={<PurchaseInvoiceFormPage />} />
          <Route path="/purchases/edit/:invoiceId" element={<PurchaseInvoiceFormPage />} />


          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/edit/:customerId" element={<CustomerFormPage />} />


          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/edit/:productId" element={<ProductFormPage />} />


          <Route path="/accounts" element={<AccountListPage />} />
          <Route path="/accounts/new" element={<AccountFormPage />} />
          <Route path="/accounts/edit/:accountId" element={<AccountFormPage />} />


          <Route path="/suppliers" element={<SupplierListPage />} />
          <Route path="/suppliers/new" element={<SupplierFormPage />} />
          <Route path="/suppliers/edit/:supplierId" element={<SupplierFormPage />} />






          <Route path="/sales" element={<SalesInvoiceListPage />} />
          <Route path="/sales/new" element={<SalesInvoiceFormPage />} />
          {/* // ملاحظة: التعديل على فاتورة كاملة قد لا يكون مطلوبًا، الأهم هو تعديل التفاصيل
          <Route path="/sales/edit/:invoiceId" element={<SalesInvoiceFormPage />} /> */}

          <Route path="/sales/:invoiceId/details" element={<SalesInvoiceDetailsListPage />} />
          <Route path="/sales/:invoiceId/details/new" element={<SalesInvoiceDetailsFormPage />} />
          <Route path="/sales/:invoiceId/details/edit/:detailId" element={<SalesInvoiceDetailsFormPage />} />












          {/* أضف هنا بقية صفحاتك الداخلية */}
          {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}

        </Route>
      </Routes>
    </Router>

  );
};

export default App;