import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSalesInvoice } from '../../api/sales';
import { deleteSalesInvoiceDetail } from '../../api/salesInvoiceDetails';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SalesInvoiceDetailsListPage = () => {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { invoiceId } = useParams();

    const fetchInvoiceDetails = async () => {
        setLoading(true);
        try {
            const response = await getSalesInvoice(invoiceId);
            setInvoice(response.data);
        } catch (err) {
            setError('فشل في جلب تفاصيل الفاتورة.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoiceDetails();
    }, [invoiceId]);

    const handleDelete = async (detailId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
            try {
                await deleteSalesInvoiceDetail(detailId);
                fetchInvoiceDetails();
            } catch (err) {
                setError('فشل حذف العنصر.');
            }
        }
    };

    const columns = [
        { header: 'المنتج', key: 'product_name' },
        { header: 'الكمية', key: 'quantity' },
        { header: 'السعر', key: 'price' },
        { header: 'الخصم', key: 'discount' },
        { header: 'الضريبة', key: 'tax' },
        { header: 'المجموع الفرعي', key: 'subtotal' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (row) => (
                <div>
                    <Button onClick={() => navigate(`/sales/${invoiceId}/details/edit/${row.detail_id}`)} style={{ marginRight: '5px' }}>تعديل</Button>
                    <Button onClick={() => handleDelete(row.detail_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!invoice) return <p>الفاتورة غير موجودة.</p>;

    return (
        <div dir="rtl">
            <h1>تفاصيل الفاتورة رقم #{invoice.invoice_id}</h1>
            <div style={{ marginBottom: '20px' }}>
                <p><strong>العميل:</strong> {invoice.customer_name}</p>
                <p><strong>التاريخ:</strong> {invoice.invoice_date}</p>
                <p><strong>الإجمالي:</strong> {invoice.total}</p>
            </div>

            <hr />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <Button onClick={() => navigate(`/sales/${invoiceId}/details/new`)}>+ إضافة منتج جديد</Button>
            </div>

            <Table columns={columns} data={invoice.sales_invoice_details} />
        </div>
    );
};

export default SalesInvoiceDetailsListPage;