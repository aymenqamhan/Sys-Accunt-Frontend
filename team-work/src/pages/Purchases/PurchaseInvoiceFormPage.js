// src/pages/Purchases/PurchaseInvoiceFormPage.js (الكود الكامل والمصحح)

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSuppliers } from '../../api/suppliers';
import { getProducts } from '../../api/products';
import { getPurchase, updatePurchase, createPurchase } from '../../api/purchases';
import './../Sales/InvoiceForm.css'; // تأكد من أن هذا المسار صحيح

const PurchaseInvoiceFormPage = () => {
    const [formData, setFormData] = useState({
        supplier: '',
        purchase_date: new Date().toISOString().slice(0, 10),
        payment_status: 'pending', // حقل إضافي من الـ API
        total: 0, // ✅ تم التصحيح: من total_amount إلى total
        // ✅ تم التصحيح: اسم المصفوفة والحقول الداخلية لتطابق الـ API
        purchase_invoice_details: [{ 
            product: '', 
            quantity: 1, 
            price: 0, 
            discount: 0, 
            tax: 0, 
            subtotal: 0 
        }]
    });

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // 'id' يمثل رقم الفاتورة في حالة التعديل

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const suppliersRes = await getSuppliers();
                setSuppliers(suppliersRes.data);

                const productsRes = await getProducts();
                setProducts(productsRes.data);

                // في حالة التعديل، قم بجلب بيانات الفاتورة
                if (id) {
                    const purchaseRes = await getPurchase(id);
                    // البيانات القادمة من الـ API ستطابق بنية الحالة الآن
                    setFormData(purchaseRes.data);
                }
            } catch (error) {
                console.error('Failed to load initial data', error);
                setError('فشل في تحميل البيانات الأولية.');
            }
        };

        loadInitialData();
    }, [id]);

    // دالة لحساب المجموع الكلي وتحديث الحالة
    const calculateTotals = (details) => {
        return details.reduce((acc, current) => acc + (current.subtotal || 0), 0);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedDetails = [...formData.purchase_invoice_details];
        const detail = { ...updatedDetails[index] };

        detail[name] = value;

        // إذا تم تغيير المنتج، قم بتحديث السعر
        if (name === 'product') {
            const selectedProduct = products.find(p => p.product_id.toString() === value);
            if (selectedProduct) {
                detail.price = selectedProduct.purchase_price || 0; // ✅ اسم الحقل price
            }
        }
        
        // حساب المجموع الفرعي للصف
        const quantity = parseFloat(detail.quantity) || 0;
        const price = parseFloat(detail.price) || 0;
        detail.subtotal = quantity * price; // ✅ اسم الحقل subtotal

        updatedDetails[index] = detail;

        // حساب المجموع الكلي للفاتورة
        const newTotal = calculateTotals(updatedDetails);

        setFormData(prev => ({
            ...prev,
            purchase_invoice_details: updatedDetails,
            total: newTotal // ✅ اسم الحقل total
        }));
    };
    
    const addDetail = () => {
        setFormData(prev => ({
            ...prev,
            // ✅ إضافة عنصر جديد لبنية البيانات الصحيحة
            purchase_invoice_details: [
                ...prev.purchase_invoice_details,
                { product: '', quantity: 1, price: 0, discount: 0, tax: 0, subtotal: 0 }
            ]
        }));
    };

    const removeDetail = (index) => {
        const updatedDetails = formData.purchase_invoice_details.filter((_, i) => i !== index);
        const newTotal = calculateTotals(updatedDetails);

        setFormData(prev => ({
            ...prev,
            purchase_invoice_details: updatedDetails,
            total: newTotal
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (id) {
                await updatePurchase(id, formData);
            } else {
                await createPurchase(formData);
            }
            navigate('/purchases');
        } catch (error) {
            console.error('Failed to save purchase', error);
            setError('فشل في حفظ الفاتورة. يرجى مراجعة البيانات.');
        }
    };

    return (
        <div className="invoice-form-container">
            <h2>{id ? 'تعديل فاتورة شراء' : 'إنشاء فاتورة شراء جديدة'}</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    <div className="form-field">
                        <label>المورد</label>
                        <select name="supplier" value={formData.supplier} onChange={handleFormChange} required>
                            <option value="">اختر مورد</option>
                            {suppliers.map(s => (
                                <option key={s.supplier_id} value={s.supplier_id}>{s.full_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label>تاريخ الشراء</label>
                        <input type="date" name="purchase_date" value={formData.purchase_date} onChange={handleFormChange} required />
                    </div>
                </div>

                <h3>تفاصيل الفاتورة</h3>
                <div className="invoice-details">
                    {formData.purchase_invoice_details.map((detail, index) => (
                        <div key={index} className="detail-item form-grid">
                            <select name="product" value={detail.product} onChange={(e) => handleDetailChange(index, e)} required>
                                <option value="">اختر منتج</option>
                                {products.map(p => (
                                    <option key={p.product_id} value={p.product_id}>{p.name}</option>
                                ))}
                            </select>
                            <input type="number" name="quantity" placeholder="الكمية" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} min="1" />
                            {/* ✅ تم تصحيح name و value */}
                            <input type="number" name="price" placeholder="السعر" value={detail.price} onChange={(e) => handleDetailChange(index, e)} step="0.01" />
                            {/* ✅ تم تصحيح value */}
                            <input type="text" name="subtotal" placeholder="المجموع الفرعي" value={detail.subtotal} readOnly />
                            <button type="button" onClick={() => removeDetail(index)}>حذف</button>
                        </div>
                    ))}
                </div>
                <button type="button" onClick={addDetail} className="add-detail-btn">+ إضافة منتج آخر</button>

                <div className="invoice-summary">
                    <h4>الإجمالي الكلي: {formData.total.toFixed(2)}</h4>
                </div>
                
                <div className="form-actions">
                    <button type="submit">{id ? 'تحديث الفاتورة' : 'حفظ الفاتورة'}</button>
                    <button type="button" onClick={() => navigate('/purchases')} className="cancel-btn">إلغاء</button>
                </div>
            </form>
        </div>
    );
};

export default PurchaseInvoiceFormPage;