
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyemail, resend_otp } from '../../api/auth';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';
import IbexProLogo from '../.../../../assets/ibex-pro-logo-light.svg';

import './AuthPages.css';
const VerifyEmailPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(''); // <-- ١. إضافة حالة للنجاح
    const [loading, setLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState('');
    const [resendLoading, setResendLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;

    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown]);

    if (!email) {
        navigate('/register');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await verifyemail({ email, otp_code: otp });

            // بما أن الـ API لا يرجع توكن، سنعرض رسالة نجاح ونوجه المستخدم لصفحة الدخول
            setSuccess('تم تفعيل حسابك بنجاح! سيتم توجيهك الآن لصفحة تسجيل الدخول.');

            // ٣. الانتظار ٣ ثوان ثم التوجيه
            setTimeout(() => {
                navigate('/login');
            }, 3000);

        } catch (err) {
            setError('رمز التحقق غير صحيح أو انتهت صلاحيته.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        // ... (هذه الدالة تبقى كما هي بدون تغيير)
        setResendLoading(true);
        setResendMessage('');
        setError('');
        try {
            await resend_otp({ email });
            setResendMessage('✅ تم إرسال رمز جديد إلى بريدك الإلكتروني.');
            setCountdown(60);
        } catch (err) {
            setResendMessage('❌ حدث خطأ أثناء إعادة الإرسال.');
            console.error(err);
        } finally {
            setResendLoading(false);
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
                <div className="auth-card">            {loading && <Loader />}
                    <h2 className="auth-title">التحقق من البريد الإلكتروني</h2>
                    <p>لقد أرسلنا رمز تحقق إلى <strong>{email}</strong>. يرجى إدخاله أدناه.</p>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <InputField
                            label="رمز التحقق (OTP)"
                            name="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={loading}>تحقق</Button>
                    </form>

                    {/* ٤. إضافة مكان لعرض رسالة النجاح */}
                    {success && <p className="auth-success-message">{success}</p>}
                    {error && <p className="auth-error-message">{error}</p>}

                    <div style={{ marginTop: '15px', textAlign: 'center' }}>
                        <Button
                            onClick={handleResend}
                            disabled={resendLoading || countdown > 0}
                            variant="secondary"
                        >
                            {resendLoading
                                ? 'جاري الإرسال...'
                                : countdown > 0
                                    ? `إعادة الإرسال بعد (${countdown}) ثانية`
                                    : '🔄 إعادة إرسال الرمز'
                            }
                        </Button>
                        {resendMessage && <p style={{ marginTop: '10px' }}>{resendMessage}</p>}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VerifyEmailPage;


