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

    const handleEdit = (id) => navigate(`/sales/edit/${id}`);
    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
            try {
                await deleteSalesInvoice(id);
                setInvoices(current => current.filter(inv => inv.invoice_id !== id));
            } catch (err) {
                setError('فشل حذف الفاتورة.');
            }
        }
    };

    const columns = [
        { header: 'رقم الفاتورة', key: 'invoice_id' },
        { header: 'العميل', key: 'customer_name' },
        { header: 'تاريخ الفاتورة', key: 'invoice_date' },
        { header: 'الإجمالي', key: 'total_amount' },
        { header: 'حالة الدفع', key: 'payment_status' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (invoice) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(invoice.invoice_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(invoice.invoice_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>فواتير المبيعات</h1>
                <Button onClick={() => navigate('/sales/new')}>+ فاتورة جديدة</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={invoices} />
        </div>
    );
};

export default SalesInvoiceListPage;