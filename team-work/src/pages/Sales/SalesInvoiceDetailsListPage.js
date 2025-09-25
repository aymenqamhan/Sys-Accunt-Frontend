import React, { useState, useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { getSalesInvoice } from '../../api/sales';
import { deleteSalesInvoiceDetail } from '../../api/salesInvoiceDetails';

import { useParams, useNavigate } from 'react-router-dom';

import { getSalesInvoice } from '../../api/sales'; 
import { deleteSalesInvoiceDetail } from '../../api/salesInvoiceDetails'; // تم استيرادها من الملف الصحيح
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