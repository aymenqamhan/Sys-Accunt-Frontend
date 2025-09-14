import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchaseInvoices, deletePurchaseInvoice } from '../../api/purchases';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const PurchaseInvoiceListPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getPurchaseInvoices();
                setInvoices(response.data);
            } catch (err) {
                setError('فشل في جلب فواتير المشتريات.');
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);
    
    const handleEdit = (id) => navigate(`/purchases/edit/${id}`);
    const handleDelete = async (id) => {
        if(window.confirm('هل أنت متأكد من حذف فاتورة الشراء هذه؟')) {
            try {
                await deletePurchaseInvoice(id);
                setInvoices(current => current.filter(inv => inv.invoice_id !== id));
            } catch (err) {
                setError("فشل حذف الفاتورة.");
            }
        }
    };

    const columns = [
        { header: 'رقم الفاتورة', key: 'invoice_id' },
        { header: 'المورد', key: 'supplier_name' },
        { header: 'تاريخ الفاتورة', key: 'purchase_date' },
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
                <h1>فواتير المشتريات</h1>
                <Button onClick={() => navigate('/purchases/new')}>+ فاتورة جديدة</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={invoices} />
        </div>
    );
};

export default PurchaseInvoiceListPage;