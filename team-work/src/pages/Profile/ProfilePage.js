import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/auth';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getUserProfile();
                setProfile(response.data);
            } catch (err) {
                setError('فشل في جلب بيانات الملف الشخصي.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div>
            <h1>ملفي الشخصي</h1>
            {profile && (
                <div style={{ lineHeight: '1.8' }}>
                    <p><strong>اسم المستخدم:</strong> {profile.username}</p>
                    <p><strong>الاسم الكامل:</strong> {profile.full_name}</p>
                    <p><strong>البريد الإلكتروني:</strong> {profile.email}</p>
                    <p><strong>رقم الهاتف:</strong> {profile.phone}</p>
                </div>
            )}
            <Button onClick={() => navigate('/profile/edit')} style={{ marginTop: '20px' }}>
                تعديل الملف الشخصي
            </Button>
        </div>
    );
};

export default ProfilePage;