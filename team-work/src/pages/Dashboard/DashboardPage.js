import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; // استيراد ملف التنسيق

// استيراد الأيقونات
import { FaUsers, FaUserTie, FaBoxOpen, FaShoppingCart, FaMoneyBillWave, FaUndo, FaCubes, FaCoins, FaUniversity, FaWarehouse, FaTruck } from 'react-icons/fa';

const DashboardPage = () => {
    const [userName, setUserName] = useState('');

    // جلب اسم المستخدم من localStorage لعرض رسالة ترحيب شخصية
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setUserName(user.full_name || user.username);
        }
    }, []);

    const navLinks = [
        { to: '/users', icon: <FaUsers />, label: 'إدارة المستخدمين' },
        { to: '/customers', icon: <FaUserTie />, label: 'إدارة العملاء' },
        { to: '/suppliers', icon: <FaTruck />, label: 'إدارة الموردين' },
        { to: '/products', icon: <FaBoxOpen />, label: 'إدارة المنتجات' },
        { to: '/categories', icon: <FaCubes />, label: 'إدارة الفئات' },
        { to: '/inventory', icon: <FaWarehouse />, label: 'حركة المخزون' },
        { to: '/sales', icon: <FaShoppingCart />, label: 'إدارة المبيعات' },
        { to: '/purchases', icon: <FaMoneyBillWave />, label: 'إدارة المشتريات' },
        { to: '/returns', icon: <FaUndo />, label: 'إدارة المرتجعات' },
        { to: '/accounts', icon: <FaUniversity />, label: 'إدارة الحسابات' },
        { to: '/payments', icon: <FaMoneyBillWave />, label: 'إدارة الدفعات' },
        { to: '/currencies', icon: <FaCoins />, label: 'إدارة العملات' },
    ];

    return (
        <div className="dashboard-page" dir="rtl">
            <header className="dashboard-header">
                <h1>أهلاً بك مجددًا، {userName}!</h1>
                <p>نظام IBEX PRO بين يديك. اختر أحد أقسام الإدارة للبدء.</p>
            </header>

            <div className="dashboard-grid">
                {navLinks.map((link) => (
                    <Link key={link.to} to={link.to} className="nav-card">
                        <div className="nav-card-icon">{link.icon}</div>
                        <div className="nav-card-title">{link.label}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;