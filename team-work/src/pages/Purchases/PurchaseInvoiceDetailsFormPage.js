
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createPurchaseInvoiceDetail, getSinglePurchaseInvoiceDetail, updatePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';
// import { getProducts } from '../../api/products';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const PurchaseInvoiceDetailsFormPage = () => {
//     const [formData, setFormData] = useState({
//         product: '',
//         quantity: 1,
//         price: '',
//         discount: 0,
//         tax: 0
//     });
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     // الحصول على ID الفاتورة و ID التفصيل من الرابط
//     const { invoiceId, detailId } = useParams();
//     const isEditMode = Boolean(detailId);

//     useEffect(() => {
//         const loadData = async () => {
//             setLoading(true);
//             try {
//                 // دائمًا نحتاج قائمة المنتجات
//                 const productsRes = await getProducts();
//                 setProducts(productsRes.data);

//                 // في وضع التعديل، جلب بيانات العنصر الحالي
//                 if (isEditMode) {
//                     const detailRes = await getSinglePurchaseInvoiceDetail(detailId);
//                     setFormData(detailRes.data);
//                 }
//             } catch (err) {
//                 setError('فشل في جلب البيانات.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadData();
//     }, [detailId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             const payload = {
//                 ...formData,
//                 invoice: invoiceId, // افترضت أن اسم الحقل في الـ API هو 'invoice'
//             };

//             if (isEditMode) {
//                 await updatePurchaseInvoiceDetail(detailId, payload);
//             } else {
//                 await createPurchaseInvoiceDetail(payload);
//             }
//             // العودة إلى صفحة تفاصيل الفاتورة
//             navigate(`/purchases/${invoiceId}/details`);
//         } catch (err) {
//             setError('فشل في حفظ العنصر.');
//             console.error(err.response ? err.response.data : err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'Edit Invoice Item' : `Add Item to Invoice #${invoiceId}`}</h1>
//             <form onSubmit={handleSubmit}>
//                 <select name="product" value={formData.product} onChange={handleChange} required>
//                     <option value="">Select a Product</option>
//                     {products.map(prod => (
//                         <option key={prod.product_id} value={prod.product_id}>{prod.name}</option>
//                     ))}
//                 </select>
//                 <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
//                 <InputField label="Price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
//                 <InputField label="Discount" name="discount" type="number" step="0.01" value={formData.discount} onChange={handleChange} />
//                 <InputField label="Tax" name="tax" type="number" step="0.01" value={formData.tax} onChange={handleChange} />

//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Item'}</Button>
//             </form>
//         </div>
//     );
// };

// export default PurchaseInvoiceDetailsFormPage;



import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPurchaseInvoiceDetail, getSinglePurchaseInvoiceDetail, updatePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';
import { getProducts } from '../../api/products';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { createPurchaseInvoiceDetail, getSinglePurchaseInvoiceDetail, updatePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';

import Loader from '../../components/Common/Loader/Loader';

const PurchaseInvoiceDetailsFormPage = () => {
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

        const loadInitialData = async () => {

            try {
                const productsRes = await getProducts();
                setProducts(productsRes.data);
                if (isEditMode) {
                    const detailRes = await getSinglePurchaseInvoiceDetail(detailId);
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
    }, [detailId, isEditMode]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
            const payload = { ...formData, purchase_invoice: invoiceId };
            if (isEditMode) {
                await updatePurchaseInvoiceDetail(detailId, payload);
            } else {
                await createPurchaseInvoiceDetail(payload);
            }
            navigate(`/purchases/${invoiceId}/details`);
        } catch (err) {
            setError('فشل في حفظ العنصر.');

        const dataToSubmit = { ...formData, purchase_invoice: invoiceId };
        
        try {
            if (isEditMode) {
                await updatePurchaseInvoiceDetail(detailId, dataToSubmit);
            } else {
                await createPurchaseInvoiceDetail(dataToSubmit);
            }
            navigate(`/purchases/${invoiceId}/details`);
        } catch (err) {
            setError('فشل حفظ البند.');

        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (

        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل عنصر في الفاتورة' : `إضافة عنصر للفاتورة #${invoiceId}`}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-12">
                                <label htmlFor="product" className="form-label">المنتج</label>
                                <select id="product" name="product" value={formData.product} onChange={handleChange} required className="form-select">
                                    <option value="">-- اختر منتجًا --</option>
                                    {products.map(prod => (<option key={prod.product_id} value={prod.product_id}>{prod.name}</option>))}
                                </select>
                            </div>
                            <div className="col-md-4"><label htmlFor="quantity" className="form-label">الكمية</label><input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required className="form-control" /></div>
                            <div className="col-md-4"><label htmlFor="price" className="form-label">السعر</label><input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required className="form-control" /></div>
                            <div className="col-md-4"><label htmlFor="discount" className="form-label">الخصم</label><input id="discount" name="discount" type="number" step="0.01" value={formData.discount} onChange={handleChange} className="form-control" /></div>
                            <div className="col-md-4"><label htmlFor="tax" className="form-label">الضريبة</label><input id="tax" name="tax" type="number" step="0.01" value={formData.tax} onChange={handleChange} className="form-control" /></div>
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ العنصر'}</button>
                        </div>
                    </form>
                </div>
            </div>

        <div>
            <h1>{isEditMode ? 'تعديل بند في الفاتورة' : 'إضافة بند جديد للفاتورة'}</h1>
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

export default PurchaseInvoiceDetailsFormPage;