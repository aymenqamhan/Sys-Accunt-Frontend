import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ChangePasswordPage = () => {
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.new_password !== formData.new_password_confirm) {
            setError('كلمة المرور الجديدة وتأكيدها غير متطابقين.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // نرسل فقط البيانات التي يتوقعها الـ API
            const apiData = {
                old_password: formData.old_password,
                new_password: formData.new_password
            };

            await changePassword(apiData);
            setSuccess('تم تغيير كلمة المرور بنجاح. سيتم توجيهك لصفحة الدخول.');

            // تسجيل خروج المستخدم وتوجيهه لصفحة الدخول
            setTimeout(() => {
                localStorage.removeItem('token');
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError('فشل تغيير كلمة المرور. تأكد من كلمة المرور القديمة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {loading && <Loader />}
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
                <Button type="submit" disabled={loading}>تحديث كلمة المرور</Button>
            </form>
            {error && <p className="auth-error-message">{error}</p>}
            {success && <p className="auth-success-message">{success}</p>}
        </div>
    );
};

export default ChangePasswordPage;