import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createSalesInvoiceDetail, getSingleSalesInvoiceDetail, updateSalesInvoiceDetail } from '../../api/salesInvoiceDetails';
import { getProducts } from '../../api/products';

import { getProducts } from '../../api/products';
import { createSalesInvoiceDetail, getSingleSalesInvoiceDetail, updateSalesInvoiceDetail } from '../../api/salesInvoiceDetails'; // Using the new API file

import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SalesInvoiceDetailsFormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        quantity: 1,

        price: '',
        discount: 0,
        tax: 0
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

        unit_price: '',
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { invoiceId, detailId } = useParams();
    const isEditMode = Boolean(detailId);

    useEffect(() => {

        const loadData = async () => {
            setLoading(true);
            try {
                const productsRes = await getProducts();
                setProducts(productsRes.data);


        const loadInitialData = async () => {
            try {
                const productsRes = await getProducts();
                setProducts(productsRes.data);

                if (isEditMode) {
                    const detailRes = await getSingleSalesInvoiceDetail(detailId);
                    setFormData(detailRes.data);
                }
            } catch (err) {

                setError('فشل في جلب البيانات.');

                setError('فشل تحميل البيانات');

            } finally {
                setLoading(false);
            }
        };

        loadData();

        loadInitialData();

    }, [detailId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setError('');

        try {
            const payload = { ...formData, invoice: invoiceId };

            if (isEditMode) {
                await updateSalesInvoiceDetail(detailId, payload);
            } else {
                await createSalesInvoiceDetail(payload);
            }
            navigate(`/sales/${invoiceId}/details`);
        } catch (err) {
            setError('فشل في حفظ العنصر.');

        // Add the invoice ID to the data being sent
        const dataToSubmit = { ...formData, sales_invoice: invoiceId };
        
        try {
            if (isEditMode) {
                await updateSalesInvoiceDetail(detailId, dataToSubmit);
            } else {
                await createSalesInvoiceDetail(dataToSubmit);
            }
            // Navigate back to the details list for the specific invoice
            navigate(`/sales/${invoiceId}/details`);
        } catch (err) {
            setError('فشل حفظ البند.');

        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (

        <div dir="rtl">
            <h1>{isEditMode ? 'تعديل عنصر في الفاتورة' : `إضافة عنصر للفاتورة رقم #${invoiceId}`}</h1>
            <form onSubmit={handleSubmit}>
                <select name="product" value={formData.product} onChange={handleChange} required>
                    <option value="">اختر منتجًا</option>
                    {products.map(prod => (
                        <option key={prod.product_id} value={prod.product_id}>{prod.name}</option>
                    ))}
                </select>
                <InputField label="الكمية" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                <InputField label="السعر" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
                <InputField label="الخصم" name="discount" type="number" step="0.01" value={formData.discount} onChange={handleChange} />
                <InputField label="الضريبة" name="tax" type="number" step="0.01" value={formData.tax} onChange={handleChange} />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ العنصر'}</Button>

        <div>
            <h1>{isEditMode ? 'تعديل بند في فاتورة المبيعات' : 'إضافة بند جديد للفاتورة'}</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>المنتج</label>
                <select name="product" value={formData.product} onChange={handleChange} required>
                    <option value="">اختر منتجًا</option>
                    {products.map(p => (
                        <option key={p.product_id} value={p.product_id}>{p.name}</option>
                    ))}
                </select>
                <InputField label="الكمية" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                <InputField label="سعر الوحدة" name="unit_price" type="number" step="0.01" value={formData.unit_price} onChange={handleChange} required />
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ'}</Button>

            </form>
        </div>
    );
};

export default SalesInvoiceDetailsFormPage;