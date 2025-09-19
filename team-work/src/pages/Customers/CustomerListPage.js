// src/pages/Customers/CustomerListPage.js (Final Merged Version)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, deleteCustomer } from '../../api/customers';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const CustomerListPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (err) {
                setError('فشل في جلب العملاء.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleEdit = (id) => {
        navigate(`/customers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العميل؟')) {
            try {
                await deleteCustomer(id);
                // Use the safer functional update from your branch
                setCustomers(currentCustomers => currentCustomers.filter(customer => customer.customer_id !== id));
            } catch (err) {
                setError('فشل حذف العميل.');
                console.error(err);
            }
        }
    };

    const columns = [
        // Use full_name from the main branch
        { header: 'الاسم الكامل', key: 'full_name' },
        { header: 'البريد الإلكتروني', key: 'email' },
        { header: 'الهاتف', key: 'phone' },
        { header: 'العنوان', key: 'address' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (customer) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(customer.customer_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(customer.customer_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة العملاء</h1>
                <Button onClick={() => navigate('/customers/new')}>+ إضافة عميل جديد</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={customers} />
        </div>
    );
};

export default CustomerListPage;