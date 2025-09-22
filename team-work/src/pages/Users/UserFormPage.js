// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createUser, getUser, updateUser, updateUserPermissions } from '../../api/users';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';


// const UserFormPage = () => {
//     const [formData, setFormData] = useState({
//         username: '',
//         full_name: '',
//         email: '',
//         phone: '',
//         password: '',
//         is_active: true,
//         is_staff: false,
//         is_superuser: false
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { userId } = useParams();
//     const isEditMode = Boolean(userId);

//     useEffect(() => {
//         if (isEditMode) {
//             setLoading(true);
//             getUser(userId)
//                 .then(response => {
//                     const { username, full_name, email, phone, is_active, is_staff } = response.data;
//                     setFormData({ username, full_name, email, phone, is_active, is_staff, password: '' });
//                 })
//                 .catch(err => setError('فشل في جلب بيانات المستخدم.'))
//                 .finally(() => setLoading(false));
//         }
//     }, [userId, isEditMode]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             // --- البيانات الأساسية للمستخدم ---
//             const userData = {
//                 username: formData.username,
//                 full_name: formData.full_name,
//                 email: formData.email,
//                 phone: formData.phone,
//                 is_active: formData.is_active,
//             };

//             // أضف كلمة المرور فقط عند الإنشاء أو إذا تم إدخالها عند التعديل
//             if (!isEditMode || (isEditMode && formData.password)) {
//                 userData.password = formData.password;
//             }

//             // --- بيانات الصلاحيات ---
//             const permissionsData = {
//                 is_staff: formData.is_staff,
//                 // is_superuser: formData.is_superuser, // يمكنك إضافتها إذا أردت
//             };

//             if (isEditMode) {
//                 // --- وضع التعديل (خطوتان) ---
//                 // 1. تحديث البيانات الأساسية
//                 await updateUser(userId, userData);
//                 // 2. تحديث الصلاحيات
//                 await updateUserPermissions(userId, permissionsData);
//             } else {
//                 // --- وضع الإنشاء (خطوتان أيضًا) ---
//                 // 1. إنشاء المستخدم أولاً
//                 const response = await createUser(userData);
//                 const newUserId = response.data.user_id; // افترض أن الـ API يرجع ID المستخدم الجديد
//                 // 2. تحديث صلاحيات المستخدم الجديد
//                 await updateUserPermissions(newUserId, permissionsData);
//             }
//             navigate('/users');
//         } catch (err) {
//             setError('فشل حفظ المستخدم. يرجى التحقق من البيانات المدخلة.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && isEditMode) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'تعديل مستخدم' : 'إنشاء مستخدم جديد'}</h1>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//                 <InputField label="اسم المستخدم" name="username" value={formData.username} onChange={handleChange} required />
//                 <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
//                 <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} required />
//                 <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />
//                 <InputField label={`كلمة المرور ${isEditMode ? '(اتركها فارغة لتبقى كما هي)' : ''}`} name="password" type="password" value={formData.password} onChange={handleChange} required={!isEditMode} />

//                 <div>
//                     <label>
//                         <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
//                         مستخدم نشط (Active)
//                     </label>
//                 </div>
//                 <div>
//                     <label>
//                         <input type="checkbox" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
//                         عضو في فريق العمل (Staff)
//                     </label>
//                 </div>

//                 {error && <p style={{ color: 'red' }}>{error}</p>}

//                 <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ المستخدم'}</Button>
//             </form>
//         </div>
//     );
// };

// export default UserFormPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// 👇 1. تم تصحيح الخطأ الإملائي هنا
import { createUser, getUser, updateUser, updateUserPermissions, getUserPermissions } from '../../api/users';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const UserFormPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        full_name: '',
        phone: '',
        email: '',
        password: '',
        is_active: true,
        is_staff: false,
        is_superuser: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams();
    const isEditMode = Boolean(userId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            Promise.all([
                getUser(userId),
                getUserPermissions(userId)
            ])
                .then(([userResponse, permissionsResponse]) => {
                    const userData = userResponse.data;
                    const permissionsData = permissionsResponse.data;

                    const combinedData = {
                        username: userData.username,
                        full_name: userData.full_name,
                        email: userData.email,
                        phone: userData.phone,
                        is_active: userData.is_active,
                        is_staff: permissionsData.is_staff,
                        is_superuser: permissionsData.is_superuser,
                        password: '',
                    };
                    setFormData(combinedData);
                })
                .catch(err => {
                    console.error("Failed to fetch user data or permissions:", err);
                    setError('فشل في جلب بيانات المستخدم أو صلاحياته.');
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId, isEditMode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userData = {
                username: formData.username,
                full_name: formData.full_name,
                email: formData.email,
                phone: formData.phone,
                is_active: formData.is_active,
            };

            if (!isEditMode || (isEditMode && formData.password)) {
                userData.password = formData.password;
            }

            const permissionsData = {
                is_staff: formData.is_staff,
                is_superuser: formData.is_superuser,
            };

            if (isEditMode) {
                await updateUser(userId, userData);
                // 👇 2. تم تصحيح الخطأ الإملائي هنا
                await updateUserPermissions(userId, permissionsData);
            } else {
                const response = await createUser(userData);
                const newUserId = response.data.user_id;
                // 👇 3. تم تصحيح الخطأ الإملائي هنا
                await updateUserPermissions(newUserId, permissionsData);
            }
            navigate('/users');
        } catch (err) {
            setError('فشل حفظ المستخدم. يرجى التحقق من البيانات المدخلة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'تعديل مستخدم' : 'إنشاء مستخدم جديد'}</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <InputField label="اسم المستخدم" name="username" value={formData.username} onChange={handleChange} required />
                <InputField label="الاسم الكامل" name="full_name" value={formData.full_name} onChange={handleChange} required />
                <InputField label="البريد الإلكتروني" name="email" type="email" value={formData.email} onChange={handleChange} required />
                <InputField label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleChange} required />
                <InputField label={`كلمة المرور ${isEditMode ? '(اتركها فارغة لتبقى كما هي)' : ''}`} name="password" type="password" value={formData.password} onChange={handleChange} required={!isEditMode} />

                <div>
                    <label>
                        <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} />
                        مستخدم نشط (Active)
                    </label>
                </div>
                <div>
                    <label>
                        <input type="checkbox" name="is_staff" checked={formData.is_staff} onChange={handleChange} />
                        عضو في فريق العمل (Staff)
                    </label>
                </div>

                {/* 👇 4. تم إضافة مربع الاختيار الناقص هنا */}
                <div>
                    <label>
                        <input type="checkbox" name="is_superuser" checked={formData.is_superuser} onChange={handleChange} />
                        مدير عام (Superuser)
                    </label>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ المستخدم'}</Button>
            </form>
        </div>
    );
};

export default UserFormPage;