
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createSupplier, getSupplier, updateSupplier } from '../../api/suppliers';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const SupplierFormPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         address: '',
//         email: '',
//         phone: '',
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { supplierId } = useParams();
//     const isEditMode = Boolean(supplierId);

//     useEffect(() => {
//         if (isEditMode) {
//             setLoading(true);
//             getSupplier(supplierId)
//                 .then(response => setFormData(response.data))
//                 .catch(err => setError('Failed to fetch supplier data.'))
//                 .finally(() => setLoading(false));
//         }
//     }, [supplierId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             if (isEditMode) {
//                 await updateSupplier(supplierId, formData);
//             } else {
//                 await createSupplier(formData);
//             }
//             navigate('/suppliers');
//         } catch (err) {
//             setError('فشل في حفظ المورد. تأكد من أن البيانات فريدة وصحيحة.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && isEditMode) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'Edit Supplier' : 'Create New Supplier'}</h1>
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Supplier Name" name="name" value={formData.name} onChange={handleChange} required />
//                 <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
//                 <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} required />
//                 <InputField label="Address" name="address" value={formData.address} onChange={handleChange} />
//                 {error && <p className="error-message">{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Supplier'}</Button>
//             </form>
//         </div>
//     );
// };

// export default SupplierFormPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSupplier, getSupplier, updateSupplier } from '../../api/suppliers';

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSupplier, getSupplier, updateSupplier } from '../../api/suppliers';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';

import Loader from '../../components/Common/Loader/Loader';

const SupplierFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',

        address: '',
        email: '',
        phone: '',

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

                .catch(err => setError('فشل في جلب بيانات المورد.'))

                .catch(() => setError('فشل في جلب بيانات المورد.'))

                .finally(() => setLoading(false));
        }
    }, [supplierId, isEditMode]);

    const handleChange = (e) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });

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

            setError('فشل في حفظ المورد. تأكد من أن البيانات فريدة وصحيحة.');

            setError('فشل حفظ المورد. يرجى التحقق من البيانات.');

        } finally {
            setLoading(false);
        }
    };


    if (loading && isEditMode) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل مورد' : 'إنشاء مورد جديد'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">اسم المورد</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
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
                                {loading ? 'جاري الحفظ...' : 'حفظ المورد'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

    
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