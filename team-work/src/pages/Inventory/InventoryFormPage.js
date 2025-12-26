
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createInventoryItem, getSingleInventoryItem, updateInventoryItem } from '../../api/inventory';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';


// const InventoryFormPage = () => {
//     const [formData, setFormData] = useState({
//         product: '',
//         movement_type: 'IN',
//         quantity: '',
//         reason: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { itemId } = useParams();
//     const isEditMode = Boolean(itemId);

//     useEffect(() => {
//         if (isEditMode) {
//             setLoading(true);
//             getSingleInventoryItem(itemId)
//                 .then(response => {
//                     const { product, movement_type, quantity, reason } = response.data;
//                     setFormData({ product, movement_type, quantity, reason });
//                 })
//                 .catch(err => setError('Failed to fetch item data.'))
//                 .finally(() => setLoading(false));
//         }
//     }, [itemId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             if (isEditMode) {
//                 await updateInventoryItem(itemId, formData);
//             } else {
//                 await createInventoryItem(formData);
//             }
//             navigate('/inventory');
//         } catch (err) {
//             setError('فشل في حفظ حركة المخزون. تأكد من أن كل الحقول صحيحة.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && isEditMode) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'Edit Inventory Movement' : 'Create New Inventory Movement'}</h1>
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Product ID" name="product" type="number" value={formData.product} onChange={handleChange} required />

//                 {/* 👇 الكود المباشر للقائمة المنسدلة */}
//                 <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
//                     <label htmlFor="movement_type" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Movement Type</label>
//                     <select
//                         id="movement_type"
//                         name="movement_type"
//                         value={formData.movement_type}
//                         onChange={handleChange}
//                         required
//                         style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
//                     >
//                         <option value="IN">إدخال (Stock In)</option>
//                         <option value="OUT">إخراج (Stock Out)</option>
//                     </select>
//                 </div>

//                 <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
//                 <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} required />

//                 {error && <p className="error-message">{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Movement'}</Button>
//             </form>
//         </div>
//     );
// };

// export default InventoryFormPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInventoryItem, getSingleInventoryItem, updateInventoryItem } from '../../api/inventory';
import { getProducts } from '../../api/products'; // لجلب المنتجات
import Loader from '../../components/Common/Loader/Loader';

const InventoryFormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        movement_type: 'IN',
        quantity: '',
        reason: ''
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { itemId } = useParams();
    const isEditMode = Boolean(itemId);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // جلب قائمة المنتجات لملء القائمة المنسدلة
                const productsRes = await getProducts();
                setProducts(productsRes.data);

                if (isEditMode) {
                    const itemRes = await getSingleInventoryItem(itemId);
                    setFormData(itemRes.data);
                }
            } catch (err) {
                setError('فشل في جلب البيانات اللازمة.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [itemId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateInventoryItem(itemId, formData);
            } else {
                await createInventoryItem(formData);
            }
            navigate('/inventory');
        } catch (err) {
            setError('فشل في حفظ حركة المخزون.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل حركة مخزون' : 'إنشاء حركة مخزون جديدة'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="product" className="form-label">المنتج</label>
                                <select id="product" name="product" value={formData.product} onChange={handleChange} required className="form-select">
                                    <option value="">-- اختر منتجًا --</option>
                                    {products.map(p => (
                                        <option key={p.product_id} value={p.product_id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="movement_type" className="form-label">نوع الحركة</label>
                                <select id="movement_type" name="movement_type" value={formData.movement_type} onChange={handleChange} required className="form-select">
                                    <option value="IN">إدخال</option>
                                    <option value="OUT">إخراج</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="quantity" className="form-label">الكمية</label>
                                <input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="reason" className="form-label">السبب</label>
                                <input id="reason" name="reason" value={formData.reason} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ الحركة'}
                            </button>
                            <button className="btn btn-secondary ms-2" onClick={() => navigate('/dashboard')}>
                                العودة للوحة التحكم
                            </button>

                            <button
                                type="button"
                                className="btn btn-success px-4"
                                onClick={() => navigate('/inventory-report')}
                            >
                                تقرير حركة المخزون
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InventoryFormPage;