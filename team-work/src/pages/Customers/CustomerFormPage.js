import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, getSingleCustomer, updateCustomer } from '../../api/customers';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const CustomerFormPage = () => {
    const [formData, setFormData] = useState({
        // ✨ FIX: Use full_name
        full_name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { customerId } = useParams();
    const isEditMode = Boolean(customerId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSingleCustomer(customerId)
                .then(response => setFormData(response.data))
                .catch(err => setError('Failed to fetch customer data.'))
                .finally(() => setLoading(false));
        }
    }, [customerId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            setError('فشل في حفظ العميل.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h1>
            <form onSubmit={handleSubmit}>
                {/* ✨ FIX: Use full_name */}
                <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} />
                <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />
                <InputField label="العنوان" name="address" value={formData.address} onChange={handleChange} />
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ العميل'}</Button>
            </form>
        </div>
    );
};

export default CustomerFormPage;