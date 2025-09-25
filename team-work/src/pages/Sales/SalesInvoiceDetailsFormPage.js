import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSalesInvoiceDetail, getSingleSalesInvoiceDetail, updateSalesInvoiceDetail } from '../../api/salesInvoiceDetails';
import { getProducts } from '../../api/products';
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

                if (isEditMode) {
                    const detailRes = await getSingleSalesInvoiceDetail(detailId);
                    setFormData(detailRes.data);
                }
            } catch (err) {
                setError('فشل في جلب البيانات.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
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
            </form>
        </div>
    );
};

export default SalesInvoiceDetailsFormPage;