import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../../api/auth';

const VerifyTokenPage = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('جارٍ التحقق من الرمز...');

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                setStatus('الرمز غير موجود. يرجى تسجيل الدخول.');
                setTimeout(() => navigate('/login'), 2000);
                return;
            }

            try {
                const response = await verifyToken(token);
                console.log('Token verified:', response.data);
                setStatus('الرمز صالح. يتم التوجيه إلى لوحة التحكم...');
                setTimeout(() => navigate('/dashboard'), 1500);
            } catch (err) {
                console.error('Token verification failed:', err.response || err);
                setStatus('الرمز غير صالح. يرجى تسجيل الدخول مرة أخرى.');
                setTimeout(() => navigate('/login'), 2000);
            }
        };

        checkToken();
    }, [navigate]);

    return (
        <div className="auth-container">
            <h2 className="auth-title">التحقق من حالة الحساب</h2>
            <p className="auth-status-message">{status}</p>
        </div>
    );
};

export default VerifyTokenPage;