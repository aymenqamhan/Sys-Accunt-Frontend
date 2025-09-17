import React from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; // Import the CSS file

// Import icons
import { FaUsers, FaUserTie, FaBoxOpen, FaShoppingCart, FaMoneyBillWave, FaUndo, FaCubes, FaCoins } from 'react-icons/fa';

const DashboardPage = () => {

    // Define the navigation cards for each management section
    const navLinks = [
        { to: '/users', icon: <FaUsers />, label: 'إدارة المستخدمين' },
        { to: '/customers', icon: <FaUserTie />, label: 'إدارة العملاء' },
        { to: '/products', icon: <FaBoxOpen />, label: 'إدارة المنتجات' },
        { to: '/categories', icon: <FaCubes />, label: 'إدارة الفئات' },
        { to: '/sales', icon: <FaShoppingCart />, label: 'إدارة المبيعات' },
        { to: '/purchases', icon: <FaMoneyBillWave />, label: 'إدارة المشتريات' },
        { to: '/returns', icon: <FaUndo />, label: 'إدارة المرتجعات' },
        { to: '/currencies', icon: <FaCoins />, label: 'إدارة العملات' },
        { to: '/payments', icon: <FaMoneyBillWave />, label: 'إدارة الدفعات' },
        { to: '/Inventory', icon: <FaMoneyBillWave />, label: 'إدارة المخزون' },
        { to: '/suppliers', icon: <FaMoneyBillWave />, label: 'إدارة الموردين' },



        // Add more links here as needed
    ];

    return (
        <div>
            <h1>أهلاً بك في لوحة التحكم!</h1>
            <p>اختر أحد أقسام الإدارة للبدء.</p>

            {/* Navigation Cards Section */}
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