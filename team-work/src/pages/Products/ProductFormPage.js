import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProduct, updateProduct } from '../../api/products';
import { getCategories } from '../../api/categories';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ProductFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '', // يبدأ فارغًا، ويجب على المستخدم اختيار قيمة
        barcode: '',
        cost_price: '',
        sale_price: '',
        stock_quantity: '',
        unit: '',
        minimum_stock: '',
        expiry_date: '',
        image: null,
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { productId } = useParams();
    const isEditMode = Boolean(productId);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // جلب الفئات لملء القائمة المنسدلة
                const categoriesRes = await getCategories();
                setCategories(categoriesRes.data);

                if (isEditMode) {
                    const productRes = await getProduct(productId);
                    const productData = productRes.data;
                    if (productData.expiry_date) {
                        productData.expiry_date = productData.expiry_date.split('T')[0];
                    }
                    setFormData(productData);
                }
            } catch (err) {
                setError('فشل في جلب البيانات.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [productId, isEditMode]);

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const dataToSubmit = new FormData();
        // بناء FormData ديناميكيًا
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                // لا نرسل الصورة إذا كانت نصًا (في وضع التعديل ولم تتغير)
                if (key === 'image' && typeof formData[key] === 'string') {
                    return;
                }
                dataToSubmit.append(key, formData[key]);
            }
        });

        try {
            if (isEditMode) {
                // نستخدم PATCH للتعديل الجزئي وهو أفضل للملفات
                await updateProduct(productId, dataToSubmit);
            } else {
                await createProduct(dataToSubmit);
            }
            navigate('/products');
        } catch (err) {
            setError('فشل حفظ المنتج. يرجى التحقق من البيانات المدخلة.');
            console.error(err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل منتج' : 'إضافة منتج جديد'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            {/* -- المعلومات الأساسية -- */}
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">اسم المنتج</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="category" className="form-label">الفئة</label>
                                <select id="category" name="category" value={formData.category} onChange={handleChange} required className="form-select">
                                    <option value="">-- اختر فئة --</option>
                                    {categories.map(cat => (
                                        <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="barcode" className="form-label">باركود</label>
                                <input id="barcode" name="barcode" value={formData.barcode} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="unit" className="form-label">الوحدة (مثل: حبة, كرتون)</label>
                                <input id="unit" name="unit" value={formData.unit} onChange={handleChange} className="form-control" />
                            </div>

                            {/* -- الأسعار والمخزون -- */}
                            <div className="col-md-6">
                                <label htmlFor="cost_price" className="form-label">سعر التكلفة</label>
                                <input id="cost_price" name="cost_price" type="number" step="0.01" value={formData.cost_price} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="sale_price" className="form-label">سعر البيع</label>
                                <input id="sale_price" name="sale_price" type="number" step="0.01" value={formData.sale_price} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="stock_quantity" className="form-label">الكمية الحالية</label>
                                <input id="stock_quantity" name="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="minimum_stock" className="form-label">الحد الأدنى للمخزون</label>
                                <input id="minimum_stock" name="minimum_stock" type="number" value={formData.minimum_stock} onChange={handleChange} className="form-control" />
                            </div>

                            {/* -- الصورة والتاريخ -- */}
                            <div className="col-md-6">
                                <label htmlFor="expiry_date" className="form-label">تاريخ الانتهاء</label>
                                <input id="expiry_date" name="expiry_date" type="date" value={formData.expiry_date || ''} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="image" className="form-label">صورة المنتج</label>
                                <input id="image" type="file" name="image" onChange={handleChange} accept="image/*" className="form-control" />
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ المنتج'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

};

export default ProductFormPage;