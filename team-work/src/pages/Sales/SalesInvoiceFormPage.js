// src/pages/Sales/SalesInvoiceFormPage.js (Corrected)
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomers } from '../../api/customers';
import { getProducts } from '../../api/products';
import { getSale, updateSale, createSale } from '../../api/sales';
import './InvoiceForm.css';

const SalesInvoiceFormPage = () => {
    // ✅ تم إعادة بناء الحالة لتطابق الـ API بشكل كامل
    const [formData, setFormData] = useState({
        customer: '',
        invoice_date: new Date().toISOString().slice(0, 10),
        payment_status: 'pending',
        total: 0,
        sales_invoice_details: [{ 
            product: '', 
            quantity: 1, 
            price: 0, 
            discount: 0, 
            tax: 0, 
            subtotal: 0 
        }]
    });

    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const customersRes = await getCustomers();
                setCustomers(customersRes.data);
                const productsRes = await getProducts();
                setProducts(productsRes.data);

                if (id) {
                    const response = await getSale(id);
                    setFormData(response.data); // ستعمل الآن بشكل صحيح
                }
            } catch (error) {
                console.error('Failed to fetch initial data', error);
            }
        };
        loadInitialData();
    }, [id]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDetailChange = (index, e) => {
        // ✅ تم التصحيح: التعامل مع sales_invoice_details
        const details = [...formData.sales_invoice_details];
        const currentDetail = details[index];
        currentDetail[e.target.name] = e.target.value;

        if (e.target.name === 'product') {
            const product = products.find(p => p.product_id.toString() === e.target.value);
            if (product) {
                currentDetail.price = product.sale_price; // ✅ استخدام price
            }
        }
        
        const quantity = parseFloat(currentDetail.quantity) || 0;
        const price = parseFloat(currentDetail.price) || 0;
        currentDetail.subtotal = quantity * price; // ✅ حساب subtotal

        const total = details.reduce((sum, item) => sum + item.subtotal, 0);
        setFormData({ ...formData, sales_invoice_details: details, total }); // ✅ تحديث total
    };

    const addDetail = () => {
        setFormData({
            ...formData,
            // ✅ إضافة عنصر جديد إلى sales_invoice_details
            sales_invoice_details: [
                ...formData.sales_invoice_details, 
                { product: '', quantity: 1, price: 0, discount: 0, tax: 0, subtotal: 0 }
            ]
        });
    };

    const removeDetail = (index) => {
        const details = formData.sales_invoice_details.filter((_, i) => i !== index);
        const total = details.reduce((sum, item) => sum + item.subtotal, 0);
        setFormData({ ...formData, sales_invoice_details: details, total });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateSale(id, formData);
            } else {
                await createSale(formData);
            }
            navigate('/sales');
        } catch (error) {
            console.error('Failed to save sale', error);
        }
    };

    // ... يجب تعديل الـ JSX ليعكس بنية الحالة الجديدة
    return (
        <div className="invoice-form-container">
            <h2>{id ? 'Edit Sale Invoice' : 'Create Sale Invoice'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label>Customer</label>
                    <select name="customer" value={formData.customer} onChange={handleFormChange} required>
                        <option value="">Select Customer</option>
                        {customers.map(c => <option key={c.customer_id} value={c.customer_id}>{c.full_name}</option>)}
                    </select>
                </div>
                <div className="form-field">
                    <label>Invoice Date</label>
                    {/* ✅ تم التصحيح: name="invoice_date" */}
                    <input type="date" name="invoice_date" value={formData.invoice_date} onChange={handleFormChange} required />
                </div>

                <h3>Invoice Details</h3>
                {/* ✅ تم التصحيح: formData.sales_invoice_details */}
                {formData.sales_invoice_details.map((detail, index) => (
                    <div key={index} className="detail-item">
                        <select name="product" value={detail.product} onChange={(e) => handleDetailChange(index, e)} required>
                            <option value="">Select Product</option>
                            {products.map(p => <option key={p.product_id} value={p.product_id}>{p.name}</option>)}
                        </select>
                        <input type="number" name="quantity" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} placeholder="Quantity" />
                        {/* ✅ تم التصحيح: name="price" */}
                        <input type="number" name="price" value={detail.price} onChange={(e) => handleDetailChange(index, e)} placeholder="Price" />
                        <input type="text" value={detail.subtotal} placeholder="Subtotal" readOnly />
                        <button type="button" onClick={() => removeDetail(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addDetail}>+ Add Item</button>

                <h3>Total: {formData.total.toFixed(2)}</h3>

                <button type="submit">Save Sale</button>
            </form>
        </div>
    );
};

export default SalesInvoiceFormPage;