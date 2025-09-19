import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// --- ✨ التصحيح هنا ---
import { getSalesInvoice } from '../../api/sales'; 
import { deleteSalesInvoiceDetail } from '../../api/salesInvoiceDetails'; // تم استيرادها من الملف الصحيح
// --- نهاية التصحيح ---
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SalesInvoiceDetailsListPage = () => {
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { invoiceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getSalesInvoice(invoiceId);
                setInvoiceDetails(response.data);
            } catch (err) {
                setError('فشل في جلب تفاصيل الفاتورة.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [invoiceId]);

    const handleDelete = async (detailId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا البند؟')) {
            try {
                await deleteSalesInvoiceDetail(detailId);
                // Refresh the details after deletion
                const response = await getSalesInvoice(invoiceId);
                setInvoiceDetails(response.data);
            } catch (err) {
                setError('فشل حذف البند.');
            }
        }
    };
    
    const columns = [
        { header: 'المنتج', key: 'product_name' },
        { header: 'الكمية', key: 'quantity' },
        { header: 'سعر الوحدة', key: 'unit_price' },
        { header: 'الإجمالي الفرعي', key: 'subtotal' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (item) => (
                <div>
                    <Button onClick={() => navigate(`/sales/${invoiceId}/details/edit/${item.detail_id}`)}>تعديل</Button>
                    <Button onClick={() => handleDelete(item.detail_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>تفاصيل الفاتورة رقم: {invoiceDetails?.invoice_id}</h1>
                <Button onClick={() => navigate(`/sales/${invoiceId}/details/new`)}>+ إضافة بند جديد</Button>
            </div>
            <p><strong>العميل:</strong> {invoiceDetails?.customer_name}</p>
            <p><strong>الإجمالي:</strong> {invoiceDetails?.total_amount}</p>
            <Table columns={columns} data={invoiceDetails?.items || []} />
        </div>
    );
};

export default SalesInvoiceDetailsListPage;