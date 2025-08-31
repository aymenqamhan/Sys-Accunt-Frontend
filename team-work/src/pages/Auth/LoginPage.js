import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await login(formData);

            // تحقق من أن الاستجابة تحتوي على حقل 'access'
            console.log('Login response:', response);
            if (response.data && response.data.tokens) {
                // حفظ الرمز في التخزين المحلي للمتصفح

                console.log('Login successful! Token saved:', response.data.tokens);
                // توجيه المستخدم إلى لوحة التحكم
                navigate('/dashboard');
            } else {
                setError('Login failed: Invalid credentials or token not received.');
            }
        } catch (err) {
            // التعامل مع أخطاء تسجيل الدخول (مثل 401 Unauthorized أو 400 Bad Request)
            console.error('Login error:', err.response || err);
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail);
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>تسجيل الدخول</h2>
            <form onSubmit={handleSubmit}>
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
                <Button type="submit">دخول</Button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LoginPage;