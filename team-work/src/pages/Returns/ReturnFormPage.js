// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createReturn, getReturnDetails, updateReturn } from '../../api/returns';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const ReturnFormPage = () => {
//     // 1. تحديث الحالة الأولية لتشمل كل الحقول
//     const [formData, setFormData] = useState({
//         product: '',
//         customer: '',
//         quantity: 1,
//         amount: 0,
//         return_type: 'customer_return', // القيمة الافتراضية الصحيحة
//         reason: '', // تمت إعادة إضافة حقل السبب
//         return_date: new Date().toISOString().slice(0, 10),
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { returnId } = useParams();
//     const isEditMode = Boolean(returnId);

//     useEffect(() => {
//         if (isEditMode) {
//             setLoading(true);
//             getReturnDetails(returnId)
//                 .then(response => {
//                     const data = response.data;
//                     if (data.return_date) {
//                         data.return_date = data.return_date.split('T')[0];
//                     }
//                     setFormData(data);
//                 })
//                 .catch(err => setError('Failed to fetch return data.'))
//                 .finally(() => setLoading(false));
//         }
//     }, [returnId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             // 2. أهم تعديل: جلب ID المستخدم وإضافته للبيانات المرسلة
//             const userString = localStorage.getItem('user');
//             if (!userString) {
//                 throw new Error('User not found in local storage.');
//             }
//             const user = JSON.parse(userString);
//             const dataToSend = {
//                 ...formData,
//                 user: user.user_id // إضافة ID المستخدم
//             };

//             if (isEditMode) {
//                 await updateReturn(returnId, dataToSend);
//             } else {
//                 await createReturn(dataToSend);
//             }
//             navigate('/returns');
//         } catch (err) {
//             setError('Failed to save return. Please check all fields.');
//             console.error(err.response ? err.response.data : err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && isEditMode) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'Edit Return' : 'Create New Return'}</h1>
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Product ID" name="product" type="number" value={formData.product} onChange={handleChange} required />
//                 <InputField label="Customer ID" name="customer" type="number" value={formData.customer} onChange={handleChange} required />
//                 <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
//                 <InputField label="Amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />

//                 {/* 3. تعديل القائمة المنسدلة لإرسال القيم الصحيحة */}
//                 <div style={{ margin: '15px 0' }}>
//                     <label>Return Type</label>
//                     <select
//                         name="return_type"
//                         value={formData.return_type}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '10px', marginTop: '5px' }}
//                     >
//                         <option value="customer_return">Customer Return</option>
//                         <option value="supplier_return">Supplier Return</option>
//                         <option value="damage_return">Damage Return</option>
//                     </select>
//                 </div>

//                 {/* 4. إعادة إضافة حقل السبب */}
//                 <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} required />

//                 <InputField label="Return Date" name="return_date" type="date" value={formData.return_date} onChange={handleChange} required />

//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Return'}</Button>
//             </form>
//         </div>
//     );
// };

// export default ReturnFormPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReturn, getReturnDetails, updateReturn } from '../../api/returns';
import { getProducts } from '../../api/products';
import { getCustomers } from '../../api/customers';
import Loader from '../../components/Common/Loader/Loader';

const ReturnFormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        customer: '',
        quantity: 1,
        amount: 0,
        return_type: 'customer_return',
        reason: '',
        return_date: new Date().toISOString().slice(0, 10),
    });

    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { returnId } = useParams();
    const isEditMode = Boolean(returnId);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [productsRes, customersRes] = await Promise.all([getProducts(), getCustomers()]);
                setProducts(productsRes.data);
                setCustomers(customersRes.data);

                if (isEditMode) {
                    const returnRes = await getReturnDetails(returnId); // تم تصحيح اسم الدالة
                    const returnData = returnRes.data;
                    if (returnData.return_date) {
                        returnData.return_date = returnData.return_date.split('T')[0];
                    }
                    setFormData(returnData);
                }
            } catch (err) {
                setError('فشل في جلب البيانات اللازمة.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [returnId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userString = localStorage.getItem('user');
            if (!userString) throw new Error('User not found');
            const user = JSON.parse(userString);
            const payload = { ...formData, user: user.user_id };

            if (isEditMode) {
                await updateReturn(returnId, payload);
            } else {
                await createReturn(payload);
            }
            navigate('/returns');
        } catch (err) {
            setError('فشل في حفظ المرتجع.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل مرتجع' : 'إنشاء مرتجع جديد'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="product" className="form-label">المنتج</label>
                                <select id="product" name="product" value={formData.product} onChange={handleChange} required className="form-select">
                                    <option value="">-- اختر منتجًا --</option>
                                    {products.map(p => (<option key={p.product_id} value={p.product_id}>{p.name}</option>))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="customer" className="form-label">العميل</label>
                                <select id="customer" name="customer" value={formData.customer} onChange={handleChange} required className="form-select">
                                    <option value="">-- اختر عميلاً --</option>
                                    {customers.map(c => (<option key={c.customer_id} value={c.customer_id}>{c.full_name}</option>))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="quantity" className="form-label">الكمية</label>
                                <input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="amount" className="form-label">المبلغ المسترجع</label>
                                <input id="amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="return_type" className="form-label">نوع المرتجع</label>
                                <select id="return_type" name="return_type" value={formData.return_type} onChange={handleChange} required className="form-select">
                                    <option value="customer_return">مرتجع عميل</option>
                                    <option value="supplier_return">مرتجع لمورد</option>
                                    <option value="damage_return">مرتجع تالف</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="return_date" className="form-label">تاريخ المرتجع</label>
                                <input id="return_date" name="return_date" type="date" value={formData.return_date} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="reason" className="form-label">السبب</label>
                                <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} required className="form-control" rows="3"></textarea>
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ المرتجع'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReturnFormPage;