
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        full_name: '',
        phone: '',
        password: '',
        password_confirm: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // تحقق من تطابق كلمتي المرور
        if (formData.password !== formData.password_confirm) {
            setError('كلمتا المرور غير متطابقتين.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const apiData = {
                email: formData.email,
                username: formData.username,
                full_name: formData.full_name,
                phone: formData.phone,
                password: formData.password,
                password_confirm: formData.password_confirm,
            };

            await register(apiData);

            // نجاح → الانتقال لصفحة التحقق مع تمرير البريد
            // This is the corrected line
            navigate('/verify-email', { state: { email: formData.email } });
        } catch (err) {
            setError('فشل إنشاء الحساب. قد يكون البريد الإلكتروني أو اسم المستخدم موجودًا بالفعل.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {loading && <Loader />}
            <h2 className="auth-title">إنشاء حساب جديد</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <InputField
                    label="البريد الإلكتروني"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
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
                <Button type="submit" disabled={loading}>إنشاء حساب</Button>
            </form>

            {error && <p className="auth-error-message">{error}</p>}

            <div className="auth-links">
                <Link to="/login">هل لديك حساب؟ تسجيل الدخول</Link>
            </div>
        </div>
    );
};

export default RegisterPage;
