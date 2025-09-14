import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomers } from '../../api/customers';
import { getProducts } from '../../api/products';
import { createSalesInvoice, getSalesInvoice, updateSalesInvoice } from '../../api/sales';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';
import './InvoiceForm.css'; // سنقوم بإنشاء هذا الملف للتنسيق

const SalesInvoiceFormPage = () => {
    const [invoice, setInvoice] = useState({
        customer: '',
        invoice_date: new Date().toISOString().slice(0, 10),
        payment_status: 'unpaid',
        items: [{ product: '', quantity: 1, unit_price: '' }],
    });
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { invoiceId } = useParams();
    const isEditMode = Boolean(invoiceId);

    // جلب البيانات الأساسية (العملاء والمنتجات)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersRes = await getCustomers();
                setCustomers(customersRes.data);
                const productsRes = await getProducts();
                setProducts(productsRes.data);

                if (isEditMode) {
                    const invoiceRes = await getSalesInvoice(invoiceId);
                    setInvoice(invoiceRes.data); // تأكد من أن الـ API تعيد البيانات بالهيكلية الصحيحة
                }
            } catch (err) {
                setError('فشل في تحميل البيانات.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [invoiceId, isEditMode]);

    const handleInvoiceChange = (e) => {
        const { name, value } = e.target;
        setInvoice(prev => ({ ...prev, [name]: value }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const newItems = [...invoice.items];
        newItems[index][name] = value;

        // إذا تم تغيير المنتج، قم بتحديث السعر تلقائيًا
        if (name === "product") {
            const selectedProduct = products.find(p => p.product_id.toString() === value);
            newItems[index].unit_price = selectedProduct ? selectedProduct.price : '';
        }

        setInvoice(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        setInvoice(prev => ({
            ...prev,
            items: [...prev.items, { product: '', quantity: 1, unit_price: '' }],
        }));
    };

    const removeItem = (index) => {
        const newItems = invoice.items.filter((_, i) => i !== index);
        setInvoice(prev => ({ ...prev, items: newItems }));
    };

    const calculateTotal = () => {
        return invoice.items.reduce((total, item) => {
            const quantity = parseFloat(item.quantity) || 0;
            const price = parseFloat(item.unit_price) || 0;
            return total + (quantity * price);
        }, 0).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const submissionData = {
            ...invoice,
            total_amount: calculateTotal(),
            // تأكد من أن أسماء الحقول تطابق ما يتوقعه الـ Backend
            customer_id: invoice.customer,
            invoice_items: invoice.items.map(item => ({
                product_id: item.product,
                quantity: item.quantity,
                unit_price: item.unit_price
            }))
        };
        
        // لا نرسل البيانات المكررة
        delete submissionData.items;
        delete submissionData.customer;


        try {
            if (isEditMode) {
                await updateSalesInvoice(invoiceId, submissionData);
            } else {
                await createSalesInvoice(submissionData);
            }
            navigate('/sales');
        } catch (err) {
            setError('فشل في حفظ الفاتورة. تحقق من صحة البيانات.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل فاتورة مبيعات' : 'إنشاء فاتورة مبيعات جديدة'}</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="invoice-form">
                <div className="form-header">
                    <div className="form-group">
                        <label>العميل</label>
                        <select name="customer" value={invoice.customer} onChange={handleInvoiceChange} required>
                            <option value="">اختر عميل</option>
                            {customers.map(c => <option key={c.customer_id} value={c.customer_id}>{c.name}</option>)}
                        </select>
                    </div>
                    <InputField label="تاريخ الفاتورة" name="invoice_date" type="date" value={invoice.invoice_date} onChange={handleInvoiceChange} required />
                    <div className="form-group">
                        <label>حالة الدفع</label>
                        <select name="payment_status" value={invoice.payment_status} onChange={handleInvoiceChange}>
                            <option value="unpaid">غير مدفوعة</option>
                            <option value="paid">مدفوعة</option>
                        </select>
                    </div>
                </div>

                <h3>بنود الفاتورة</h3>
                <div className="invoice-items">
                    {invoice.items.map((item, index) => (
                        <div key={index} className="invoice-item">
                            <select name="product" value={item.product} onChange={e => handleItemChange(index, e)} required>
                                <option value="">اختر منتج</option>
                                {products.map(p => <option key={p.product_id} value={p.product_id}>{p.name}</option>)}
                            </select>
                            <input type="number" name="quantity" value={item.quantity} onChange={e => handleItemChange(index, e)} placeholder="الكمية" min="1" />
                            <input type="number" name="unit_price" value={item.unit_price} onChange={e => handleItemChange(index, e)} placeholder="سعر الوحدة" step="0.01" />
                            <div className="item-subtotal">
                                الإجمالي الفرعي: {(parseFloat(item.quantity) * parseFloat(item.unit_price) || 0).toFixed(2)}
                            </div>
                            <Button type="button" onClick={() => removeItem(index)} variant="secondary">حذف</Button>
                        </div>
                    ))}
                </div>
                <Button type="button" onClick={addItem} style={{ marginBottom: '20px' }}>+ إضافة بند جديد</Button>

                <div className="invoice-total">
                    <h2>الإجمالي النهائي: {calculateTotal()}</h2>
                </div>

                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ الفاتورة'}</Button>
            </form>
        </div>
    );
};

export default SalesInvoiceFormPage;