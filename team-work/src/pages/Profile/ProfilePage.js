// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUserProfile } from '../../api/auth';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';
// import './ProfilePage.css';
// const ProfilePage = () => {
//     const [profile, setProfile] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await getUserProfile();
//                 setProfile(response.data);
//             } catch (err) {
//                 setError('فشل في جلب بيانات الملف الشخصي.');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     if (loading) return <Loader />;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div>
//             <h1>ملفي الشخصي</h1>
//             {profile && (
//                 <div style={{ lineHeight: '1.8' }}>
//                     <p><strong>اسم المستخدم:</strong> {profile.username}</p>
//                     <p><strong>الاسم الكامل:</strong> {profile.full_name}</p>
//                     <p><strong>البريد الإلكتروني:</strong> {profile.email}</p>
//                     <p><strong>رقم الهاتف:</strong> {profile.phone}</p>
//                 </div>
//             )}
//             <Button onClick={() => navigate('/profile/edit')} style={{ marginTop: '20px' }}>
//                 تعديل الملف الشخصي
//             </Button>
//         </div>
//     );
// };

// export default ProfilePage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/auth';
import Loader from '../../components/Common/Loader/Loader';
import userAvatar from '../../assets/user-avatar.png'; // تأكد من صحة المسار
import './ProfilePage.css'; // استيراد ملف التنسيق

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
    if (error) return <p className="alert alert-danger">{error}</p>;

    return (
        <div className="container mt-4 profile-page" dir="rtl">
            <div className="card shadow-sm profile-card">
                <div className="card-header bg-light profile-header">
                    <img src={userAvatar} alt="User Avatar" className="profile-avatar" />
                    <div>
                        <h1 className="profile-name">{profile?.full_name}</h1>
                        <p className="profile-username">@{profile?.username}</p>
                    </div>
                </div>
                <div className="card-body profile-body">
                    <h2 className="h4 mb-3">تفاصيل الحساب</h2>
                    {profile && (
                        <ul className="list-group list-group-flush profile-details-list">
                            <li className="list-group-item">
                                <strong>البريد الإلكتروني:</strong>
                                <span>{profile.email}</span>
                            </li>
                            <li className="list-group-item">
                                <strong>رقم الهاتف:</strong>
                                <span>{profile.phone}</span>
                            </li>
                        </ul>
                    )}
                    <div className="d-flex justify-content-end mt-4">
                        <button onClick={() => navigate('/profile/edit')} className="btn btn-primary">
                            تعديل الملف الشخصي
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;