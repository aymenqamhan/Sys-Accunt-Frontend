// src/pages/Customers/CustomerFormPage.js (Final Merged Version)

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Use the corrected function name from your previous merge
import { createCustomer, getCustomer, updateCustomer } from '../../api/customers';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const CustomerFormPage = () => {
    const [formData, setFormData] = useState({
        // Use full_name to match the main branch and backend
        full_name: '',
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
            // Use getCustomer as resolved in the api/customers.js file
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
        // Use the safer functional update for state
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
            // Use the more descriptive Arabic error message
            setError('فشل حفظ العميل. يرجى التحقق من البيانات المدخلة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    
    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h1>
            {/* Use the cleaner form tag and more descriptive button text from main */}
            <form onSubmit={handleSubmit}>
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