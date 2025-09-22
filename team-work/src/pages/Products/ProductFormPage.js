// src/pages/Products/ProductFormPage.js (كامل)
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProduct, getProduct, updateProduct } from '../../api/products';
import { getCategories } from '../../api/categories'; // تأكد من وجود هذه الدالة في ملف api
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ProductFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        barcode: '',
        cost_price: '',
        sale_price: '',
        stock_quantity: '',
        unit: '',
        minimum_stock: '',
        expiry_date: '',
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
                const categoriesRes = await getCategories();
                setCategories(categoriesRes.data);

                if (isEditMode) {
                    const productRes = await getProduct(productId);
                    const productData = productRes.data;
                    
                    // تنسيق التاريخ ليعمل بشكل صحيح مع حقل <input type="date">
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateProduct(productId, formData);
            } else {
                await createProduct(formData);
            }
            navigate('/products');
        } catch (err) {
            setError('فشل حفظ المنتج. يرجى التحقق من البيانات المدخلة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading && !categories.length) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل منتج' : 'إضافة منتج جديد'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <InputField label="اسم المنتج" name="name" value={formData.name} onChange={handleChange} required />
                
                <div>
                    <label>الفئة</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                        <option value="">اختر فئة</option>
                        {categories.map(cat => (
                            <option key={cat.category_id} value={cat.category_id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <InputField label="باركود" name="barcode" value={formData.barcode} onChange={handleChange} />
                <InputField label="الوحدة (مثل: حبة, كرتون)" name="unit" value={formData.unit} onChange={handleChange} />
                <InputField label="سعر التكلفة" name="cost_price" type="number" step="0.01" value={formData.cost_price} onChange={handleChange} required />
                <InputField label="سعر البيع" name="sale_price" type="number" step="0.01" value={formData.sale_price} onChange={handleChange} required />
                <InputField label="الكمية الحالية" name="stock_quantity" type="number" value={formData.stock_quantity} onChange={handleChange} required />
                <InputField label="الحد الأدنى للمخزون" name="minimum_stock" type="number" value={formData.minimum_stock} onChange={handleChange} />
                <InputField label="تاريخ الانتهاء" name="expiry_date" type="date" value={formData.expiry_date || ''} onChange={handleChange} />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ المنتج'}</Button>
            </form>
        </div>
    );
};

export default ProductFormPage;