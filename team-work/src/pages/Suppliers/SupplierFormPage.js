import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSupplier, getSupplier, updateSupplier } from '../../api/suppliers';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SupplierFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { supplierId } = useParams();
    const isEditMode = Boolean(supplierId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSupplier(supplierId)
                .then(response => setFormData(response.data))
                .catch(() => setError('فشل في جلب بيانات المورد.'))
                .finally(() => setLoading(false));
        }
    }, [supplierId, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateSupplier(supplierId, formData);
            } else {
                await createSupplier(formData);
            }
            navigate('/suppliers');
        } catch (err) {
            setError('فشل حفظ المورد. يرجى التحقق من البيانات.');
        } finally {
            setLoading(false);
        }
    };
    
    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل مورد' : 'إضافة مورد جديد'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <InputField label="الاسم" name="name" value={formData.name} onChange={handleChange} required />
                <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField label="الهاتف" name="phone" value={formData.phone} onChange={handleChange} />
                <InputField label="العنوان" name="address" value={formData.address} onChange={handleChange} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ'}</Button>
            </form>
        </div>
    );
};

export default SupplierFormPage;