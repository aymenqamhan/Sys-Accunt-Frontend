import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSuppliers } from '../../api/suppliers';
import { getProducts } from '../../api/products';
import { createPurchaseInvoice, getPurchaseInvoice, updatePurchaseInvoice } from '../../api/purchases';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';
import '../Sales/InvoiceForm.css'; // إعادة استخدام نفس ملف التنسيق

const PurchaseInvoiceFormPage = () => {
    const [invoice, setInvoice] = useState({
        supplier: '',
        purchase_date: new Date().toISOString().slice(0, 10),
        payment_status: 'unpaid',
        items: [{ product: '', quantity: 1, unit_price: '' }],
    });
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { invoiceId } = useParams();
    const isEditMode = Boolean(invoiceId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const suppliersRes = await getSuppliers();
                setSuppliers(suppliersRes.data);
                const productsRes = await getProducts();
                setProducts(productsRes.data);

                if (isEditMode) {
                    const invoiceRes = await getPurchaseInvoice(invoiceId);
                    setInvoice(invoiceRes.data);
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
            return total + (parseFloat(item.quantity) * parseFloat(item.unit_price) || 0);
        }, 0).toFixed(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const submissionData = {
            ...invoice,
            total_amount: calculateTotal(),
            supplier_id: invoice.supplier,
            purchase_items: invoice.items.map(item => ({
                product_id: item.product,
                quantity: item.quantity,
                unit_price: item.unit_price
            }))
        };
        delete submissionData.items;
        delete submissionData.supplier;

        try {
            if (isEditMode) {
                await updatePurchaseInvoice(invoiceId, submissionData);
            } else {
                await createPurchaseInvoice(submissionData);
            }
            navigate('/purchases');
        } catch (err) {
            setError('فشل في حفظ الفاتورة.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل فاتورة مشتريات' : 'إنشاء فاتورة مشتريات جديدة'}</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="invoice-form">
                <div className="form-header">
                    <div className="form-group">
                        <label>المورد</label>
                        <select name="supplier" value={invoice.supplier} onChange={handleInvoiceChange} required>
                            <option value="">اختر مورد</option>
                            {suppliers.map(s => <option key={s.supplier_id} value={s.supplier_id}>{s.name}</option>)}
                        </select>
                    </div>
                    <InputField label="تاريخ الشراء" name="purchase_date" type="date" value={invoice.purchase_date} onChange={handleInvoiceChange} required />
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

export default PurchaseInvoiceFormPage;