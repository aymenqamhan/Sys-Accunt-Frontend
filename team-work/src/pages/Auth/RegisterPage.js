import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        phone: '',
        email: '',
        password: '',
        password_confirm: '',
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await register(formData);
            console.log('Registration successful:', response.data);
            setSuccess('تم إنشاء الحساب بنجاح. يمكنك الآن تسجيل الدخول.');
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            console.error('Registration error:', err.response || err);
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                if (typeof errorData === 'object') {
                    const errorMessage = Object.values(errorData).flat().join(' ');
                    setError(errorMessage);
                } else {
                    setError(errorData);
                }
            } else {
                setError('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>إنشاء حساب جديد</h2>
            <form onSubmit={handleSubmit}>
                <InputField
                    label="اسم المستخدم"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="الاسم الكامل"
                    name="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="رقم الهاتف"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="كلمة المرور"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="تأكيد كلمة المرور"
                    name="password_confirm"
                    type="password"
                    value={formData.password_confirm}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">تسجيل</Button>
            </form>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                هل لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
            </p>
        </div>
    );
};

export default RegisterPage;