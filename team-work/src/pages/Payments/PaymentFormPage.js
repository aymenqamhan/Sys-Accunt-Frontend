// // import React, { useState, useEffect } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { createPayment, getSinglePayment, updatePayment } from '../../api/payments';
// // import { getAccounts } from '../../api/accounts';
// // import { getCustomers } from '../../api/customers';
// // import { getSuppliers } from '../../api/suppliers';
// // import InputField from '../../components/Common/InputField/InputField';
// // import Button from '../../components/Common/Button/Button';
// // import Loader from '../../components/Common/Loader/Loader';

// // const PaymentFormPage = () => {
// //     const [formData, setFormData] = useState({
// //         account: '',
// //         customer: '',
// //         supplier: '',
// //         amount: 0,
// //         payment_date: new Date().toISOString().slice(0, 10),
// //         payment_method: 'cash',
// //         transaction_type: 'purchase',
// //     });

// //     const [accounts, setAccounts] = useState([]);
// //     const [customers, setCustomers] = useState([]);
// //     const [suppliers, setSuppliers] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const navigate = useNavigate();
// //     const { paymentId } = useParams();
// //     const isEditMode = Boolean(paymentId);

// //     useEffect(() => {
// //         const loadInitialData = async () => {
// //             setLoading(true);
// //             try {
// //                 const [accountsRes, customersRes, suppliersRes] = await Promise.all([
// //                     getAccounts(),
// //                     getCustomers(),
// //                     getSuppliers(),
// //                 ]);
// //                 setAccounts(accountsRes.data);
// //                 setCustomers(customersRes.data);
// //                 setSuppliers(suppliersRes.data);

// //                 if (isEditMode) {
// //                     const paymentRes = await getSinglePayment(paymentId);
// //                     const paymentData = paymentRes.data;
// //                     if (paymentData.payment_date) {
// //                         paymentData.payment_date = paymentData.payment_date.split('T')[0];
// //                     }
// //                     setFormData(paymentData);
// //                 }
// //             } catch (err) {
// //                 setError('فشل في جلب البيانات اللازمة.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };
// //         loadInitialData();
// //     }, [paymentId, isEditMode]);

// //     const handleChange = (e) => {
// //         setFormData({ ...formData, [e.target.name]: e.target.value });
// //     };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setLoading(true);
// //         setError('');

// //         try {
// //             const userString = localStorage.getItem('user');
// //             if (!userString) throw new Error('User not found');
// //             const user = JSON.parse(userString);

// //             // --- ✨ هذا هو الجزء الذي تم تعديله ---
// //             const payload = {
// //                 user: user.user_id,
// //                 account: parseInt(formData.account),
// //                 amount: parseFloat(formData.amount) || 0,
// //                 payment_date: formData.payment_date,
// //                 payment_method: formData.payment_method,
// //                 transaction_type: formData.transaction_type,
// //             };

// //             // شرط منفصل للعميل
// //             if (formData.customer) {
// //                 payload.customer = parseInt(formData.customer);
// //             }

// //             // شرط منفصل للمورد
// //             if (formData.supplier) {
// //                 payload.supplier = parseInt(formData.supplier);
// //             }

// //             // شرط منفصل للحفظ
// //             if (isEditMode) {
// //                 await updatePayment(paymentId, payload);
// //             } else {
// //                 await createPayment(payload);
// //             }
// //             // --- نهاية التعديل ---

// //             navigate('/payments');
// //         } catch (err) {
// //             setError('فشل في حفظ الدفعة. يرجى التحقق من كل الحقول.');
// //             console.error(err.response ? err.response.data : err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     if (loading) return <Loader />;

// //     return (
// //         <div dir="rtl">
// //             <h1>{isEditMode ? 'تعديل دفعة' : 'إنشاء دفعة جديدة'}</h1>
// //             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
// //                 <div>
// //                     <label>الحساب</label>
// //                     <select name="account" value={formData.account} onChange={handleChange} required>
// //                         <option value="">اختر حسابًا</option>
// //                         {accounts.map(acc => (
// //                             <option key={acc.account_id} value={acc.account_id}>{acc.account_name}</option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <div>
// //                     <label>العميل (اختياري)</label>
// //                     <select name="customer" value={formData.customer} onChange={handleChange}>
// //                         <option value="">اختر عميلاً</option>
// //                         {customers.map(cust => (
// //                             <option key={cust.customer_id} value={cust.customer_id}>{cust.full_name}</option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <div>
// //                     <label>المورد (اختياري)</label>
// //                     <select name="supplier" value={formData.supplier} onChange={handleChange}>
// //                         <option value="">اختر موردًا</option>
// //                         {suppliers.map(sup => (
// //                             <option key={sup.supplier_id} value={sup.supplier_id}>{sup.name}</option>
// //                         ))}
// //                     </select>
// //                 </div>
// //                 <InputField label="المبلغ" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
// //                 <InputField label="تاريخ الدفعة" name="payment_date" type="date" value={formData.payment_date} onChange={handleChange} required />
// //                 <div>
// //                     <label>طريقة الدفع</label>
// //                     <select name="payment_method" value={formData.payment_method} onChange={handleChange} required>
// //                         <option value="cash">نقدي</option>
// //                         <option value="bank_transfer">حوالة بنكية</option>
// //                         <option value="credit">آجل</option>
// //                     </select>
// //                 </div>
// //                 <div>
// //                     <label>نوع الحركة</label>
// //                     <select name="transaction_type" value={formData.transaction_type} onChange={handleChange} required>
// //                         <option value="purchase">شراء</option>
// //                         <option value="sale">بيع</option>
// //                         <option value="expense">مصروفات</option>
// //                     </select>
// //                 </div>
// //                 {error && <p style={{ color: 'red' }}>{error}</p>}
// //                 <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ الدفعة'}</Button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default PaymentFormPage;




// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createPayment, getSinglePayment, updatePayment } from '../../api/payments';
// import { getAccounts } from '../../api/accounts';
// import { getCustomers } from '../../api/customers';
// import { getSuppliers } from '../../api/suppliers';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const PaymentFormPage = () => {
//     const [formData, setFormData] = useState({
//         account: '',
//         customer: '',
//         supplier: '',
//         amount: 0,
//         payment_date: new Date().toISOString().slice(0, 10),
//         payment_method: 'cash',
//         transaction_type: 'purchase',
//     });

//     const [accounts, setAccounts] = useState([]);
//     const [customers, setCustomers] = useState([]);
//     const [suppliers, setSuppliers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { paymentId } = useParams();
//     const isEditMode = Boolean(paymentId);

//     useEffect(() => {
//         const loadInitialData = async () => {
//             setLoading(true);
//             try {
//                 const [accountsRes, customersRes, suppliersRes] = await Promise.all([
//                     getAccounts(),
//                     getCustomers(),
//                     getSuppliers(),
//                 ]);
//                 setAccounts(accountsRes.data);
//                 setCustomers(customersRes.data);
//                 setSuppliers(suppliersRes.data);

//                 if (isEditMode) {
//                     const paymentRes = await getSinglePayment(paymentId);
//                     const paymentData = paymentRes.data;
//                     if (paymentData.payment_date) {
//                         paymentData.payment_date = paymentData.payment_date.split('T')[0];
//                     }
//                     setFormData(paymentData);
//                 }
//             } catch (err) {
//                 setError('فشل في جلب البيانات اللازمة.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadInitialData();
//     }, [paymentId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');

//         try {
//             const userString = localStorage.getItem('user');
//             if (!userString) throw new Error('User not found');
//             const user = JSON.parse(userString);


//             // 1. نبدأ بالبيانات الأساسية
//             const payload = {
//                 user: user.user_id,
//                 account: parseInt(formData.account),
//                 amount: parseFloat(formData.amount) || 0,
//                 payment_date: formData.payment_date,
//                 payment_method: formData.payment_method,
//                 transaction_type: formData.transaction_type,
//             };


//             if (formData.customer) {
//                 payload.customer = parseInt(formData.customer);
//             }


//             if (formData.supplier) {
//                 payload.supplier = parseInt(formData.supplier);
//             }


//             if (isEditMode) {
//                 await updatePayment(paymentId, payload);
//             } else {
//                 await createPayment(payload);
//             }
//             // --- نهاية التعديل ---

//             navigate('/payments');
//         } catch (err) {
//             setError('فشل في حفظ الدفعة. يرجى التحقق من كل الحقول.');
//             console.error(err.response ? err.response.data : err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) return <Loader />;

//     return (
//         <div dir="rtl">
//             <h1>{isEditMode ? 'تعديل دفعة' : 'إنشاء دفعة جديدة'}</h1>
//             <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                 <div>
//                     <label>الحساب</label>
//                     <select name="account" value={formData.account} onChange={handleChange} required>
//                         <option value="">اختر حسابًا</option>
//                         {accounts.map(acc => (
//                             <option key={acc.account_id} value={acc.account_id}>{acc.account_name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>العميل (اختياري)</label>
//                     <select name="customer" value={formData.customer} onChange={handleChange}>
//                         <option value="">اختر عميلاً</option>
//                         {customers.map(cust => (
//                             <option key={cust.customer_id} value={cust.customer_id}>{cust.full_name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>المورد (اختياري)</label>
//                     <select name="supplier" value={formData.supplier} onChange={handleChange}>
//                         <option value="">اختر موردًا</option>
//                         {suppliers.map(sup => (
//                             <option key={sup.supplier_id} value={sup.supplier_id}>{sup.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <InputField label="المبلغ" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
//                 <InputField label="تاريخ الدفعة" name="payment_date" type="date" value={formData.payment_date} onChange={handleChange} required />
//                 <div>
//                     <label>طريقة الدفع</label>
//                     <select name="payment_method" value={formData.payment_method} onChange={handleChange} required>
//                         <option value="cash">نقدي</option>
//                         <option value="bank_transfer">حوالة بنكية</option>
//                         <option value="credit">آجل</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>نوع الحركة</label>
//                     <select name="transaction_type" value={formData.transaction_type} onChange={handleChange} required>
//                         <option value="purchase">شراء</option>
//                         <option value="sale">بيع</option>
//                         <option value="expense">مصروفات</option>
//                     </select>
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ الدفعة'}</Button>
//             </form>
//         </div>
//     );
// };

// export default PaymentFormPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPayment, getSinglePayment, updatePayment } from '../../api/payments';
import { getAccounts } from '../../api/accounts';
import { getCustomers } from '../../api/customers';
import { getSuppliers } from '../../api/suppliers';
import Loader from '../../components/Common/Loader/Loader';

const PaymentFormPage = () => {
    const [formData, setFormData] = useState({
        account: '',
        customer: '',
        supplier: '',
        amount: 0,
        payment_date: new Date().toISOString().slice(0, 10),
        payment_method: 'cash',
        transaction_type: 'purchase',
    });

    const [accounts, setAccounts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { paymentId } = useParams();
    const isEditMode = Boolean(paymentId);

    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            try {
                const [accountsRes, customersRes, suppliersRes] = await Promise.all([
                    getAccounts(), getCustomers(), getSuppliers(),
                ]);
                setAccounts(accountsRes.data);
                setCustomers(customersRes.data);
                setSuppliers(suppliersRes.data);

                if (isEditMode) {
                    const paymentRes = await getSinglePayment(paymentId);
                    const paymentData = paymentRes.data;
                    if (paymentData.payment_date) {
                        paymentData.payment_date = paymentData.payment_date.split('T')[0];
                    }
                    setFormData(paymentData);
                }
            } catch (err) {
                setError('فشل في جلب البيانات اللازمة.');
            } finally {
                setLoading(false);
            }
        };
        loadInitialData();
    }, [paymentId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userString = localStorage.getItem('user');
            if (!userString) throw new Error('User not found');
            const user = JSON.parse(userString);

            const payload = {
                user: user.user_id,
                account: parseInt(formData.account),
                amount: parseFloat(formData.amount) || 0,
                payment_date: formData.payment_date,
                payment_method: formData.payment_method,
                transaction_type: formData.transaction_type,
            };

            if (formData.customer) {
                payload.customer = parseInt(formData.customer);
            }
            if (formData.supplier) {
                payload.supplier = parseInt(formData.supplier);
            }

            if (isEditMode) {
                await updatePayment(paymentId, payload);
            } else {
                await createPayment(payload);
            }

            navigate('/payments');
        } catch (err) {
            setError('فشل في حفظ الدفعة. يرجى التحقق من كل الحقول.');
            console.error(err.response ? err.response.data : err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل دفعة' : 'إنشاء دفعة جديدة'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <label htmlFor="account" className="form-label">الحساب</label>
                                <select id="account" name="account" value={formData.account} onChange={handleChange} required className="form-select">
                                    <option value="">-- اختر حسابًا --</option>
                                    {accounts.map(acc => (<option key={acc.account_id} value={acc.account_id}>{acc.account_name}</option>))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="customer" className="form-label">العميل (اختياري)</label>
                                <select id="customer" name="customer" value={formData.customer} onChange={handleChange} className="form-select">
                                    <option value="">-- اختر عميلاً --</option>
                                    {customers.map(cust => (<option key={cust.customer_id} value={cust.customer_id}>{cust.full_name}</option>))}
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="supplier" className="form-label">المورد (اختياري)</label>
                                <select id="supplier" name="supplier" value={formData.supplier} onChange={handleChange} className="form-select">
                                    <option value="">-- اختر موردًا --</option>
                                    {suppliers.map(sup => (<option key={sup.supplier_id} value={sup.supplier_id}>{sup.name}</option>))}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="amount" className="form-label">المبلغ</label>
                                <input id="amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="payment_date" className="form-label">تاريخ الدفعة</label>
                                <input id="payment_date" name="payment_date" type="date" value={formData.payment_date} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="payment_method" className="form-label">طريقة الدفع</label>
                                <select id="payment_method" name="payment_method" value={formData.payment_method} onChange={handleChange} required className="form-select">
                                    <option value="cash">نقدي</option>
                                    <option value="bank_transfer">حوالة بنكية</option>
                                    <option value="credit">آجل</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="transaction_type" className="form-label">نوع الحركة</label>
                                <select id="transaction_type" name="transaction_type" value={formData.transaction_type} onChange={handleChange} required className="form-select">
                                    <option value="purchase">شراء</option>
                                    <option value="sale">بيع</option>
                                    <option value="expense">مصروفات</option>
                                </select>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>{loading ? 'جاري الحفظ...' : 'حفظ الدفعة'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PaymentFormPage;