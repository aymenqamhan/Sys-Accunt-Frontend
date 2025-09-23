import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../../api/users';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const UserListPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                // API يرجع البيانات في مصفوفة مباشرة
                setUsers(response.data);
            } catch (err) {
                setError('فشل في جلب المستخدمين.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (userId) => {
        navigate(`/users/edit/${userId}`);
    };

    const handleDelete = async (userId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
            try {
                await deleteUser(userId);
                // تحديث القائمة بعد الحذف
                setUsers(currentUsers => currentUsers.filter(user => user.user_id !== userId));
            } catch (err) {
                setError('فشل حذف المستخدم.');
                console.error(err);
            }
        }
    };

    const columns = [
        { header: 'اسم المستخدم', key: 'username' },
        { header: 'الاسم الكامل', key: 'full_name' },
        { header: 'البريد الإلكتروني', key: 'email' },
        { header: 'رقم الهاتف', key: 'phone' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (user) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(user.user_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(user.user_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة المستخدمين</h1>
                <Button onClick={() => navigate('/users/new')}>+ إضافة مستخدم جديد</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={users} />
        </div>
    );
};

export default UserListPage;