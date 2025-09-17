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
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleEdit = (customerId) => {
        navigate(`/customers/edit/${customerId}`);
    };

    const handleDelete = async (customerId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العميل؟')) {
            try {
                await deleteCustomer(customerId);
                // ✨ FIX: Filter using customer_id
                setCustomers(customers.filter(customer => customer.customer_id !== customerId));
            } catch (err) {
                setError('فشل حذف العميل.');
            }
        }
    };

    const columns = [
        // ✨ FIX: Use full_name
        { header: 'اسم العميل', key: 'full_name' },
        { header: 'البريد الإلكتروني', key: 'email' },
        { header: 'رقم الهاتف', key: 'phone' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (row) => (
                <div>
                    {/* ✨ FIX: Use customer_id */}
                    <Button onClick={() => handleEdit(row.customer_id)} style={{ marginRight: '5px' }}>تعديل</Button>
                    <Button onClick={() => handleDelete(row.customer_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>إدارة العملاء</h1>
                <Button onClick={() => navigate('/customers/new')}>+ إضافة عميل جديد</Button>
            </div>
            <Table columns={columns} data={customers} />
        </div>
    );
};

export default CustomerListPage;