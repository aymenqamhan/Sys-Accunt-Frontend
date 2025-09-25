

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';
import IbexProLogo from '../.../../../assets/ibex-pro-logo-light.svg';
import './AuthPages.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await login(formData);

            // جلب كلا التوكنين من الرد
            const accessToken = response.data?.tokens?.access;
            const refreshToken = response.data?.tokens?.refresh;

            // التأكد من وجود كلا التوكنين قبل المتابعة
            if (accessToken && refreshToken) {
                // حفظ كل البيانات اللازمة في التخزين المحلي
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(response.data.user));

                // توجيه المستخدم إلى لوحة التحكم
                navigate('/dashboard');
            } else {
                setError('فشل تسجيل الدخول. لم يتم استلام التوكنات بشكل صحيح.');
            }

        } catch (err) {
            setError('فشل تسجيل الدخول. يرجى التحقق من البريد الإلكتروني وكلمة المرور.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-wrapper">

                {/* --- ✨ العمود الأول: الشعار والعلامة التجارية --- */}
                <div className="auth-branding">
                    <img src={IbexProLogo} alt="Ibex Pro Logo" />
                    <h2>مرحباً بك في IBEX PRO</h2>
                    <p>نظامك المحاسبي المتكامل لإدارة أعمالك بكفاءة.</p>
                </div>
                <div className="auth-card">
                    {loading && <Loader />}
                    <h2 className="auth-title">تسجيل الدخول</h2>
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
                            label="كلمة المرور"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit" disabled={loading}>دخول</Button>
                    </form>
                    {error && <p className="auth-error-message">{error}</p>}


                    <div className="auth-links">
                        <Link to="/register">ليس لديك حساب؟</Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;