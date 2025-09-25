import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSalesInvoices, deleteSalesInvoice } from '../../api/sales';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SalesInvoiceListPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getSalesInvoices();
                setInvoices(response.data);
            } catch (err) {
                setError('فشل في جلب فواتير المبيعات.');
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleViewDetails = (invoiceId) => {
        navigate(`/sales/${invoiceId}/details`);
    };

    const handleDelete = async (invoiceId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفاتورة؟')) {
            try {
                await deleteSalesInvoice(invoiceId);
                setInvoices(currentInvoices => currentInvoices.filter(inv => inv.invoice_id !== invoiceId));
            } catch (err) {
                setError('فشل حذف الفاتورة.');
            }
        }
    };

    const columns = [
        { header: 'رقم الفاتورة', key: 'invoice_id' },
        { header: 'العميل', key: 'customer_name' },
        { header: 'البائع', key: 'user_name' },
        { header: 'الإجمالي', key: 'total' },
        { header: 'حالة الدفع', key: 'payment_status' },
        { header: 'تاريخ الفاتورة', key: 'invoice_date' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (row) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleViewDetails(row.invoice_id)}>عرض التفاصيل</Button>
                    <Button onClick={() => handleDelete(row.invoice_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div dir="rtl">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة فواتير المبيعات</h1>
                <Button onClick={() => navigate('/sales/new')}>+ إضافة فاتورة جديدة</Button>
            </div>
            <Table columns={columns} data={invoices} />
        </div>
    );
};

export default SalesInvoiceListPage;