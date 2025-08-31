import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
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

        // التحقق من تطابق كلمات المرور الجديدة
        if (formData.new_password !== formData.new_password_confirm) {
            setError('كلمة المرور الجديدة وتأكيدها غير متطابقين.');
            return;
        }

        try {
            const response = await changePassword(formData);
            console.log('Password change successful:', response.data);
            setSuccess('تم تغيير كلمة المرور بنجاح. سيتم توجيهك الآن إلى صفحة تسجيل الدخول.');
            // بعد تغيير كلمة المرور بنجاح، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            console.error('Password change error:', err.response || err);
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
        <div className="auth-container">
            <h2 className="auth-title">تغيير كلمة المرور</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <InputField
                    label="كلمة المرور القديمة"
                    name="old_password"
                    type="password"
                    value={formData.old_password}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="كلمة المرور الجديدة"
                    name="new_password"
                    type="password"
                    value={formData.new_password}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="تأكيد كلمة المرور الجديدة"
                    name="new_password_confirm"
                    type="password"
                    value={formData.new_password_confirm}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">تغيير كلمة المرور</Button>
            </form>
            {success && <p className="auth-success-message">{success}</p>}
            {error && <p className="auth-error-message">{error}</p>}
        </div>
    );
};

export default ChangePasswordPage;