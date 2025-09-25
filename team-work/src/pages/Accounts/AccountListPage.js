import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccounts, deleteAccount } from '../../api/accounts';
import Loader from '../../components/Common/Loader/Loader';

const AccountListPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await getAccounts();
                setAccounts(response.data);
            } catch (err) {
                setError('فشل في جلب الحسابات.');
            } finally {
                setLoading(false);
            }
        };
        fetchAccounts();
    }, []);

    const handleEdit = (id) => {
        navigate(`/accounts/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا الحساب؟')) {
            try {
                await deleteAccount(id);
                setAccounts(currentAccounts => currentAccounts.filter(acc => acc.account_id !== id));
            } catch (err) {
                setError('فشل حذف الحساب.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة الحسابات</h1>
                <button className="btn btn-primary" onClick={() => navigate('/accounts/new')}>
                    + إضافة حساب جديد
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">اسم الحساب</th>
                                    <th scope="col">نوع الحساب</th>
                                    <th scope="col">العملة</th>
                                    <th scope="col">الرصيد الحالي</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.map(account => (
                                    <tr key={account.account_id}>
                                        <td>{account.account_name}</td>
                                        <td>{account.account_type}</td>
                                        <td>{account.currency_code}</td>
                                        <td>{parseFloat(account.current_balance).toFixed(2)}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(account.account_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(account.account_id)} className="btn btn-sm btn-outline-danger">حذف</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountListPage;