
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createPurchaseInvoice, getPurchaseInvoice, updatePurchaseInvoice } from '../../api/purchases';
// import { getSuppliers } from '../../api/suppliers';
// import { getProducts } from '../../api/products';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const PurchaseInvoiceFormPage = () => {
//     // حالة لبيانات الفاتورة الرئيسية
//     const [invoiceData, setInvoiceData] = useState({
//         supplier: '',
//         purchase_date: new Date().toISOString().slice(0, 10),
//         payment_status: 'pending',
//     });

//     // حالة لتفاصيل الفاتورة (قائمة المنتجات)
//     const [details, setDetails] = useState([
//         { product: '', quantity: 1, price: '', discount: 0, tax: 0 }
//     ]);

//     // حالات مساعدة لجلب البيانات
//     const [suppliers, setSuppliers] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const navigate = useNavigate();
//     const { invoiceId } = useParams();
//     const isEditMode = Boolean(invoiceId);

//     // جلب كل البيانات اللازمة عند تحميل الصفحة
//     useEffect(() => {
//         const loadInitialData = async () => {
//             setLoading(true);
//             try {
//                 // جلب قائمة الموردين والمنتجات لملء القوائم المنسدلة
//                 const suppliersRes = await getSuppliers();
//                 setSuppliers(suppliersRes.data);

//                 const productsRes = await getProducts();
//                 setProducts(productsRes.data);

//                 // في وضع التعديل، جلب بيانات الفاتورة الحالية
//                 if (isEditMode) {
//                     const invoiceRes = await getPurchaseInvoice(invoiceId);
//                     const { purchase_invoice_details, ...mainInvoiceData } = invoiceRes.data;
//                     setInvoiceData(mainInvoiceData);
//                     setDetails(purchase_invoice_details);
//                 }
//             } catch (err) {
//                 setError('فشل في جلب البيانات اللازمة.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadInitialData();
//     }, [invoiceId, isEditMode]);

//     // دوال لتحديث الحالة
//     const handleInvoiceChange = (e) => {
//         setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
//     };

//     const handleDetailChange = (index, e) => {
//         const updatedDetails = [...details];
//         updatedDetails[index][e.target.name] = e.target.value;
//         setDetails(updatedDetails);
//     };

//     const addDetailRow = () => {
//         setDetails([...details, { product: '', quantity: 1, price: '', discount: 0, tax: 0 }]);
//     };

//     const removeDetailRow = (index) => {
//         const updatedDetails = details.filter((_, i) => i !== index);
//         setDetails(updatedDetails);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             // جلب المستخدم الحالي من localStorage
//             const userString = localStorage.getItem('user');
//             const user = JSON.parse(userString);

//             // تجهيز البيانات لإرسالها بالشكل المتداخل الذي يتوقعه الـ API
//             const payload = {
//                 ...invoiceData,
//                 user: user.user_id,
//                 purchase_invoice_details: details,
//             };

//             if (isEditMode) {
//                 await updatePurchaseInvoice(invoiceId, payload);
//             } else {
//                 await createPurchaseInvoice(payload);
//             }
//             navigate('/purchases');
//         } catch (err) {
//             setError('فشل في حفظ الفاتورة. تأكد من ملء كل الحقول.');
//             console.error(err.response ? err.response.data : err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'Edit Purchase Invoice' : 'Create New Purchase Invoice'}</h1>
//             <form onSubmit={handleSubmit}>
//                 {/* جزء الفاتورة الرئيسي */}
//                 <select name="supplier" value={invoiceData.supplier} onChange={handleInvoiceChange} required>
//                     <option value="">Select a Supplier</option>
//                     {suppliers.map(sup => (
//                         <option key={sup.supplier_id} value={sup.supplier_id}>{sup.name}</option>
//                     ))}
//                 </select>
//                 <InputField label="Purchase Date" name="purchase_date" type="date" value={invoiceData.purchase_date} onChange={handleInvoiceChange} required />
//                 {/* يمكنك إضافة حقل لحالة الدفع إذا أردت */}

//                 <hr />
//                 <h3>Invoice Details</h3>

//                 {/* جزء تفاصيل الفاتورة (المنتجات) */}
//                 {details.map((detail, index) => (
//                     <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
//                         <select name="product" value={detail.product} onChange={(e) => handleDetailChange(index, e)} required>
//                             <option value="">Select a Product</option>
//                             {products.map(prod => (
//                                 <option key={prod.product_id} value={prod.product_id}>{prod.name}</option>
//                             ))}
//                         </select>
//                         <InputField name="quantity" type="number" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} placeholder="Quantity" required />
//                         <InputField name="price" type="number" step="0.01" value={detail.price} onChange={(e) => handleDetailChange(index, e)} placeholder="Price" required />
//                         {/* يمكنك إضافة حقول للخصم والضريبة هنا */}
//                         <Button type="button" onClick={() => removeDetailRow(index)} variant="secondary">Remove</Button>
//                     </div>
//                 ))}

//                 <Button type="button" onClick={addDetailRow}>+ Add Item</Button>

//                 <hr />
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Invoice'}</Button>
//             </form>
//         </div>
//     );
// };

// export default PurchaseInvoiceFormPage;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPurchaseInvoice, getPurchaseInvoice, updatePurchaseInvoice } from '../../api/purchases';
import { getSuppliers } from '../../api/suppliers';
import { getProducts } from '../../api/products';
import Loader from '../../components/Common/Loader/Loader';

const PurchaseInvoiceFormPage = () => {
    const [invoiceData, setInvoiceData] = useState({
        supplier: '',
        purchase_date: new Date().toISOString().slice(0, 10),
        payment_status: 'pending',
    });
    const [details, setDetails] = useState([
        { product: '', quantity: 1, price: '', discount: 0, tax: 0 }
    ]);

    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


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

        const loadInitialData = async () => {
            setLoading(true);
            try {
                const [suppliersRes, productsRes] = await Promise.all([getSuppliers(), getProducts()]);
                setSuppliers(suppliersRes.data);

        const fetchData = async () => {
            try {
                const suppliersRes = await getSuppliers();
                setSuppliers(suppliersRes.data);
                const productsRes = await getProducts();

                setProducts(productsRes.data);

                if (isEditMode) {
                    const invoiceRes = await getPurchaseInvoice(invoiceId);

                    const { purchase_invoice_details, ...mainData } = invoiceRes.data;
                    setInvoiceData(mainData);
                    setDetails(purchase_invoice_details);
                }
            } catch (err) {
                setError('فشل في جلب البيانات اللازمة.');

                    setInvoice(invoiceRes.data);
                }
            } catch (err) {
                setError('فشل في تحميل البيانات.');

            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, [invoiceId, isEditMode]);

    const handleInvoiceChange = (e) => setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
    const handleDetailChange = (index, e) => {
        const updatedDetails = [...details];
        updatedDetails[index][e.target.name] = e.target.value;
        setDetails(updatedDetails);
    };
    const addDetailRow = () => setDetails([...details, { product: '', quantity: 1, price: '', discount: 0, tax: 0 }]);
    const removeDetailRow = (index) => setDetails(details.filter((_, i) => i !== index));

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

        setError('');
        try {
            const userString = localStorage.getItem('user');
            if (!userString) throw new Error('User not found');
            const user = JSON.parse(userString);

            const payload = { ...invoiceData, user: user.user_id, purchase_invoice_details: details };

            if (isEditMode) {
                await updatePurchaseInvoice(invoiceId, payload);
            } else {
                await createPurchaseInvoice(payload);
            }
            navigate('/purchases');
        } catch (err) {
            setError('فشل في حفظ الفاتورة. تأكد من ملء كل الحقول.');
            console.error(err.response ? err.response.data : err);


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

        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل فاتورة شراء' : 'إنشاء فاتورة شراء جديدة'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <fieldset className="border p-3 mb-4">
                            <legend className="w-auto px-2 h6">بيانات الفاتورة</legend>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="supplier" className="form-label">المورد</label>
                                    <select id="supplier" name="supplier" value={invoiceData.supplier} onChange={handleInvoiceChange} required className="form-select">
                                        <option value="">-- اختر موردًا --</option>
                                        {suppliers.map(sup => (<option key={sup.supplier_id} value={sup.supplier_id}>{sup.name}</option>))}
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="purchase_date" className="form-label">تاريخ الشراء</label>
                                    <input id="purchase_date" name="purchase_date" type="date" value={invoiceData.purchase_date} onChange={handleInvoiceChange} required className="form-control" />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="border p-3">
                            <legend className="w-auto px-2 h6">تفاصيل المنتجات</legend>
                            {details.map((detail, index) => (
                                <div key={index} className="row g-2 align-items-center mb-2">
                                    <div className="col-md-4">
                                        <select name="product" value={detail.product} onChange={(e) => handleDetailChange(index, e)} required className="form-select">
                                            <option value="">-- اختر منتجًا --</option>
                                            {products.map(prod => (<option key={prod.product_id} value={prod.product_id}>{prod.name}</option>))}
                                        </select>
                                    </div>
                                    <div className="col-md-2"><input name="quantity" type="number" value={detail.quantity} onChange={(e) => handleDetailChange(index, e)} placeholder="الكمية" required className="form-control" /></div>
                                    <div className="col-md-2"><input name="price" type="number" step="0.01" value={detail.price} onChange={(e) => handleDetailChange(index, e)} placeholder="السعر" required className="form-control" /></div>
                                    <div className="col-md-2"><input name="discount" type="number" step="0.01" value={detail.discount} onChange={(e) => handleDetailChange(index, e)} placeholder="الخصم" className="form-control" /></div>
                                    <div className="col-md-1"><button type="button" onClick={() => removeDetailRow(index)} className="btn btn-sm btn-outline-danger">X</button></div>
                                </div>
                            ))}
                            <button type="button" onClick={addDetailRow} className="btn btn-sm btn-outline-secondary mt-2">+ إضافة منتج آخر</button>
                        </fieldset>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ الفاتورة'}</button>
                        </div>
                    </form>
                </div>
            </div>

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