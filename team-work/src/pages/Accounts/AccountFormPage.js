import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createAccount, getAccount, updateAccount } from '../../api/accounts';
import { getCurrencies } from '../../api/currencies';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const AccountFormPage = () => {
    const [formData, setFormData] = useState({
        account_name: '',
        account_type: 'asset',
        currency: '',
        current_balance: 0,
    });
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { accountId } = useParams();
    const isEditMode = Boolean(accountId);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const currenciesRes = await getCurrencies();
                setCurrencies(currenciesRes.data);

                if (isEditMode) {
                    const accountRes = await getAccount(accountId);
                    setFormData(accountRes.data);
                }
            } catch (err) {
                setError('فشل في جلب البيانات اللازمة.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [accountId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateAccount(accountId, formData);
            } else {
                await createAccount(formData);
            }
            navigate('/accounts');
        } catch (err) {
            setError('فشل في حفظ الحساب.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل حساب' : 'إنشاء حساب جديد'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="account_name" className="form-label">اسم الحساب</label>
                                <input id="account_name" name="account_name" value={formData.account_name} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="account_type" className="form-label">نوع الحساب</label>
                                <select id="account_type" name="account_type" value={formData.account_type} onChange={handleChange} required className="form-select">
                                    <option value="asset">أصل (Asset)</option>
                                    <option value="liability">التزام (Liability)</option>
                                    <option value="equity">حقوق ملكية (Equity)</option>
                                    <option value="revenue">إيراد (Revenue)</option>
                                    <option value="expense">مصروف (Expense)</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="currency" className="form-label">العملة</label>
                                <select id="currency" name="currency" value={formData.currency} onChange={handleChange} required className="form-select">
                                    <option value="">اختر عملة</option>
                                    {currencies.map(curr => (
                                        <option key={curr.currency_id} value={curr.currency_id}>{curr.name} ({curr.code})</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="current_balance" className="form-label">الرصيد الافتتاحي</label>
                                <input id="current_balance" name="current_balance" type="number" step="0.01" value={formData.current_balance} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ الحساب'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountFormPage;