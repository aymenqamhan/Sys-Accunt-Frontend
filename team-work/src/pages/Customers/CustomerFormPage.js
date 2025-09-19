import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, getCustomer, updateCustomer } from '../../api/customers';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const CustomerFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { customerId } = useParams();
    const isEditMode = Boolean(customerId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getCustomer(customerId)
                .then(response => {
                    setFormData(response.data);
                })
                .catch(err => setError('فشل في جلب بيانات العميل.'))
                .finally(() => setLoading(false));
        }
    }, [customerId, isEditMode]);

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
                await updateCustomer(customerId, formData);
            } else {
                await createCustomer(formData);
            }
            navigate('/customers');
        } catch (err) {
            setError('فشل حفظ العميل. يرجى التحقق من البيانات المدخلة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل عميل' : 'إضافة عميل جديد'}</h1>
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

export default CustomerFormPage;