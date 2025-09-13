import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, getUser, updateUser } from '../../api/users';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const UserFormPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        email: '',
        phone: '',
        password: '',
        is_active: true,
        is_staff: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams();
    const isEditMode = Boolean(userId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getUser(userId)
                .then(response => {
                    const { username, full_name, email, phone, is_active, is_staff } = response.data;
                    setFormData({ username, full_name, email, phone, is_active, is_staff, password: '' });
                })
                .catch(err => setError('فشل في جلب بيانات المستخدم.'))
                .finally(() => setLoading(false));
        }
    }, [userId, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // تحضير البيانات للإرسال
            const dataToSend = { ...formData };
            if (isEditMode && !dataToSend.password) {
                // عند التعديل، لا نرسل كلمة المرور إذا كانت فارغة
                delete dataToSend.password;
            }

            if (isEditMode) {
                await updateUser(userId, dataToSend);
            } else {
                await createUser(dataToSend);
            }
            navigate('/users');
        } catch (err) {
            setError('فشل حفظ المستخدم. يرجى التحقق من البيانات المدخلة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل مستخدم' : 'إنشاء مستخدم جديد'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <InputField label="اسم المستخدم" name="username" value={formData.username} onChange={handleChange} required />
                <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />
                <InputField label={`كلمة المرور ${isEditMode ? '(اتركها فارغة لتبقى كما هي)' : ''}`} name="password" type="password" value={formData.password} onChange={handleChange} required={!isEditMode} />

                <div>
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        مستخدم نشط (Active)
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
                        عضو في فريق العمل (Staff)
                    </label>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ المستخدم'}</Button>
            </form>
        </div>
    );
};

export default UserFormPage;