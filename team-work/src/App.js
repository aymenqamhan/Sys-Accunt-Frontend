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
// تم تصحيح الاسم والمسار هنا ليكون أوضح
import VerifyEmailPage from './pages/Auth/VerifyEmailPage';



// --- استيراد الصفحات الداخلية ---
import DashboardPage from './pages/Dashboard/DashboardPage';
import TestPage from './pages/TestPage';

//    ١. استيراد صفحات المستخدمين الجديدة
import UserListPage from './pages/Users/UserListPage';
import UserFormPage from './pages/Users/UserFormPage';

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
        {/* تم تحديث المسار هنا ليكون أوضح */}
        <Route path="/VerifyEmailPage" element={<VerifyEmailPage />} />
        {/* هذا المسار يجب أن يكون داخلياً (بعد تسجيل الدخول) */}


        {/* --- المسارات الداخلية (التي تظهر داخل الهيكل) --- */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/ChangePasswordPage" element={<ChangePasswordPage />} />
          <Route path="/test" element={<TestPage />} />


          {/*    ٢. إضافة المسارات الخاصة بالمستخدمين هنا */}
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/edit/:userId" element={<UserFormPage />} />

          {/* أضف هنا بقية صفحاتك الداخلية مثل المبيعات والمخزون والمستخدمين */}
          {/* <Route path="/users" element={<UserListPage />} /> */}
        </Route>

      </Routes>
    </Router>
  );
};

export default App;