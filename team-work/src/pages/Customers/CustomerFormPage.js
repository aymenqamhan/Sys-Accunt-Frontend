
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createCustomer, getSingleCustomer, updateCustomer } from '../../api/customers';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const CustomerFormPage = () => {
//     const [formData, setFormData] = useState({
//         // ✨ FIX: Use full_name
//         full_name: '',
//         email: '',
//         phone: '',
//         address: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { customerId } = useParams();
//     const isEditMode = Boolean(customerId);

//     useEffect(() => {
//         if (isEditMode) {
//             setLoading(true);
//             getSingleCustomer(customerId)
//                 .then(response => setFormData(response.data))
//                 .catch(err => setError('Failed to fetch customer data.'))
//                 .finally(() => setLoading(false));
//         }
//     }, [customerId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             if (isEditMode) {
//                 await updateCustomer(customerId, formData);
//             } else {
//                 await createCustomer(formData);
//             }
//             navigate('/customers');
//         } catch (err) {
//             setError('فشل في حفظ العميل.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && isEditMode) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h1>
//             <form onSubmit={handleSubmit}>
//                 {/* ✨ FIX: Use full_name */}
//                 <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
//                 <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} />
//                 <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />
//                 <InputField label="العنوان" name="address" value={formData.address} onChange={handleChange} />
//                 {error && <p className="error-message">{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ العميل'}</Button>
//             </form>
//         </div>
//     );
// };

// export default CustomerFormPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCustomer, getSingleCustomer, updateCustomer } from '../../api/customers';

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

            getSingleCustomer(customerId)
                .then(response => setFormData(response.data))

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

        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل بيانات العميل' : 'إضافة عميل جديد'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="full_name" className="form-label">الاسم الكامل</label>
                                <input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="phone" className="form-label">رقم الهاتف</label>
                                <input id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">البريد الإلكتروني (اختياري)</label>
                                <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address" className="form-label">العنوان (اختياري)</label>
                                <input id="address" name="address" value={formData.address} onChange={handleChange} className="form-control" />
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ العميل'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

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