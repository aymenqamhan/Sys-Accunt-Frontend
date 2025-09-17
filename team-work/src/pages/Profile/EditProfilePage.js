import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, updateUserProfile } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const EditProfilePage = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '', // سيتم عرضه للقراءة فقط
        username: '', // سيتم عرضه للقراءة فقط
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // جلب البيانات الحالية لملء النموذج
    useEffect(() => {
        getUserProfile()
            .then(response => {
                setFormData(response.data);
            })
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
            // نرسل فقط البيانات القابلة للتعديل
            const dataToUpdate = {
                full_name: formData.full_name,
                phone: formData.phone,
            };
            await updateUserProfile(dataToUpdate);
            // العودة إلى صفحة الملف الشخصي بعد النجاح
            navigate('/profile');
        } catch (err) {
            setError('فشل في تحديث الملف الشخصي.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div>
            <h1>تعديل الملف الشخصي</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />

                {/* حقول غير قابلة للتعديل */}
                <InputField label="اسم المستخدم" name="username" value={formData.username} onChange={() => { }} disabled />
                <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={() => { }} disabled />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}</Button>
            </form>
        </div>
    );
};

export default EditProfilePage;