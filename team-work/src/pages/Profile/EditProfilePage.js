// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUserProfile, updateUserProfile } from '../../api/auth';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const EditProfilePage = () => {
//     const [formData, setFormData] = useState({
//         full_name: '',
//         phone: '',
//         email: '', // سيتم عرضه للقراءة فقط
//         username: '', // سيتم عرضه للقراءة فقط
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // جلب البيانات الحالية لملء النموذج
//     useEffect(() => {
//         getUserProfile()
//             .then(response => {
//                 setFormData(response.data);
//             })
//             .catch(err => setError('فشل في جلب البيانات.'))
//             .finally(() => setLoading(false));
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             // نرسل فقط البيانات القابلة للتعديل
//             const dataToUpdate = {
//                 full_name: formData.full_name,
//                 phone: formData.phone,
//             };
//             await updateUserProfile(dataToUpdate);
//             // العودة إلى صفحة الملف الشخصي بعد النجاح
//             navigate('/profile');
//         } catch (err) {
//             setError('فشل في تحديث الملف الشخصي.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <Loader />;

//     return (
//         <div>
//             <h1>تعديل الملف الشخصي</h1>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
//                 <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />

//                 {/* حقول غير قابلة للتعديل */}
//                 <InputField label="اسم المستخدم" name="username" value={formData.username} onChange={() => { }} disabled />
//                 <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={() => { }} disabled />

//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}</Button>
//             </form>
//         </div>
//     );
// };

// export default EditProfilePage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../../api/auth';
import Loader from '../../components/Common/Loader/Loader';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        username: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUserProfile()
            .then(response => setFormData(response.data))
            .catch(err => setError('فشل في جلب البيانات.'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const dataToUpdate = {
                full_name: formData.full_name,
                phone: formData.phone,
            };
            await updateUserProfile(dataToUpdate);
            navigate('/profile');
        } catch (err) {
            setError('فشل في تحديث الملف الشخصي.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">تعديل الملف الشخصي</h1>
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
                                <label htmlFor="username" className="form-label">اسم المستخدم (غير قابل للتعديل)</label>
                                <input id="username" name="username" value={formData.username} readOnly disabled className="form-control-plaintext" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="email" className="form-label">البريد الإلكتروني (غير قابل للتعديل)</label>
                                <input id="email" name="email" type="email" value={formData.email} readOnly disabled className="form-control-plaintext" />
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;