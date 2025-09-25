import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSalesInvoice } from '../../api/sales';
import { getCustomers } from '../../api/customers';
import { getProducts } from '../../api/products';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SalesInvoiceFormPage = () => {
    const [invoiceData, setInvoiceData] = useState({
        customer: '',
        invoice_date: new Date().toISOString().slice(0, 10),
        payment_status: 'pending',
    });
    const [details, setDetails] = useState([
        { product: '', quantity: 1, price: '', discount: 0, tax: 0 }
    ]);

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const [customersRes, productsRes] = await Promise.all([getCustomers(), getProducts()]);
                setCustomers(customersRes.data);
                setProducts(productsRes.data);
            } catch (err) {
                setError('فشل في جلب البيانات اللازمة.');
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, []);

    const handleInvoiceChange = (e) => {
        setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
    };

    const handleDetailChange = (index, e) => {
        const updatedDetails = [...details];
        updatedDetails[index][e.target.name] = e.target.value;
        setDetails(updatedDetails);
    };

    const addDetailRow = () => {
        setDetails([...details, { product: '', quantity: 1, price: '', discount: 0, tax: 0 }]);
    };

    const removeDetailRow = (index) => {
        const updatedDetails = details.filter((_, i) => i !== index);
        setDetails(updatedDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userString = localStorage.getItem('user');
            if (!userString) throw new Error('User not found');
            const user = JSON.parse(userString);

            const payload = { ...invoiceData, user: user.user_id, sales_invoice_details: details };
            await createSalesInvoice(payload);
            navigate('/sales');
        } catch (err) {
            setError('فشل في حفظ الفاتورة. تأكد من ملء كل الحقول.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div dir="rtl">
            <h1>إنشاء فاتورة مبيعات جديدة</h1>
            <form onSubmit={handleSubmit}>
                <select name="customer" value={invoiceData.customer} onChange={handleInvoiceChange} required>
                    <option value="">اختر عميلاً</option>
                    {customers.map(cust => (
                        <option key={cust.customer_id} value={cust.customer_id}>{cust.full_name}</option>
                    ))}
                </select>
                <InputField label="تاريخ الفاتورة" name="invoice_date" type="date" value={invoiceData.invoice_date} onChange={handleInvoiceChange} required />

                <hr />
                <h3>تفاصيل الفاتورة</h3>

                {details.map((detail, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                        <select name="product" value={detail.product} onChange={(e) => handleDetailChange(index, e)} required>
                            <option value="">اختر منتجًا</option>
                            {products.map(prod => (
                                <option key={prod.product_id} value={prod.product_id}>{prod.name}</option>
                            ))}
                        </select>
                        <InputField name="quantity" type="number" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} placeholder="الكمية" required />
                        <InputField name="price" type="number" step="0.01" value={detail.price} onChange={(e) => handleDetailChange(index, e)} placeholder="السعر" required />
                        <Button type="button" onClick={() => removeDetailRow(index)} variant="secondary">إزالة</Button>
                    </div>
                ))}

                <Button type="button" onClick={addDetailRow}>+ إضافة منتج</Button>

                <hr />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ الفاتورة'}</Button>
            </form>
        </div>
    );
};

export default SalesInvoiceFormPage;