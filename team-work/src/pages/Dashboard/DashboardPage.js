import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPage.css'; // استيراد ملف التنسيق

// ✨ 1. استيراد كل دوال جلب البيانات اللازمة
import { getUsers } from '../../api/users';
import { getCustomers } from '../../api/customers';
import { getSuppliers } from '../../api/suppliers';
import { getProducts } from '../../api/products';
import { getCategories } from '../../api/categories';
import { getInventoryItems } from '../../api/inventory';
import { getSalesInvoices } from '../../api/sales';
import { getPurchaseInvoices } from '../../api/purchases';
import { getReturns } from '../../api/returns';
import { getAccounts } from '../../api/accounts';
import { getPayments } from '../../api/payments';
import { getCurrencies } from '../../api/currencies';

// ✨ 2. استيراد الأيقونات
import { FaUsers, FaUserTie, FaBoxOpen, FaShoppingCart, FaMoneyBillWave, FaUndo, FaCubes, FaCoins, FaUniversity, FaWarehouse, FaTruck } from 'react-icons/fa';

const DashboardPage = () => {
    const [userName, setUserName] = useState('');

    // ✨ 3. إضافة حالة لتخزين الإحصائيات
    const [stats, setStats] = useState({
        users: 0, customers: 0, suppliers: 0, products: 0, categories: 0,
        inventory: 0, sales: 0, purchases: 0, returns: 0,
        accounts: 0, payments: 0, currencies: 0,
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setUserName(user.full_name || user.username);
        }

        // ✨ 4. دالة لجلب كل الإحصائيات بالتوازي
        const fetchAllStats = async () => {
            try {
                const responses = await Promise.all([
                    getUsers(), getCustomers(), getSuppliers(), getProducts(),
                    getCategories(), getInventoryItems(), getSalesInvoices(),
                    getPurchaseInvoices(), getReturns(), getAccounts(), getPayments(), getCurrencies()
                ]);

                setStats({
                    users: responses[0].data.length,
                    customers: responses[1].data.length,
                    suppliers: responses[2].data.length,
                    products: responses[3].data.length,
                    categories: responses[4].data.length,
                    inventory: responses[5].data.length,
                    sales: responses[6].data.length,
                    purchases: responses[7].data.length,
                    returns: responses[8].data.length,
                    accounts: responses[9].data.length,
                    payments: responses[10].data.length,
                    currencies: responses[11].data.length,
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoadingStats(false);
            }
        };

        fetchAllStats();
    }, []);

    // ✨ 5. تحديث الروابط لتشمل مفتاحًا للإحصائيات ونصًا مفردًا
    const navLinks = [
        { to: '/users', icon: <FaUsers />, label: 'المستخدمين', statKey: 'users', singular: 'مستخدم' },
        { to: '/customers', icon: <FaUserTie />, label: 'العملاء', statKey: 'customers', singular: 'عميل' },
        { to: '/suppliers', icon: <FaTruck />, label: 'الموردين', statKey: 'suppliers', singular: 'مورد' },
        { to: '/products', icon: <FaBoxOpen />, label: 'المنتجات', statKey: 'products', singular: 'منتج' },
        { to: '/categories', icon: <FaCubes />, label: 'الفئات', statKey: 'categories', singular: 'فئة' },
        { to: '/inventory', icon: <FaWarehouse />, label: 'حركات المخزون', statKey: 'inventory', singular: 'حركة' },
        { to: '/sales', icon: <FaShoppingCart />, label: 'المبيعات', statKey: 'sales', singular: 'فاتورة' },
        { to: '/purchases', icon: <FaMoneyBillWave />, label: 'المشتريات', statKey: 'purchases', singular: 'فاتورة' },
        { to: '/returns', icon: <FaUndo />, label: 'المرتجعات', statKey: 'returns', singular: 'مرتجع' },
        { to: '/accounts', icon: <FaUniversity />, label: 'الحسابات', statKey: 'accounts', singular: 'حساب' },
        { to: '/payments', icon: <FaMoneyBillWave />, label: 'الدفعات', statKey: 'payments', singular: 'دفعة' },
        { to: '/currencies', icon: <FaCoins />, label: 'العملات', statKey: 'currencies', singular: 'عملة' },
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

                        <div className="nav-card-stat">
                            {loadingStats ? (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <>
                                    <span className="stat-number">{stats[link.statKey]}</span>
                                    <span className="stat-label">{link.singular}</span>
                                </>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;