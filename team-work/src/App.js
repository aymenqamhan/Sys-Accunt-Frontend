import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// تأكد من أن هذه هي الطريقة الصحيحة للاستيراد
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ChangePasswordPage from './pages/Auth/ChangePasswordPage';
import VerifyTokenPage from './pages/Auth/VerifyTokenPage';
import DashboardPage from './pages/Dashboard/DashboardPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* تأكد من أن مساراتك هنا صحيحة */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/verify-token" element={<VerifyTokenPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;