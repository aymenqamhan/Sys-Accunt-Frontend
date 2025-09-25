// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getPayments, deletePayment } from '../../api/payments';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const PaymentListPage = () => {
//     const [payments, setPayments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPayments = async () => {
//             try {
//                 const response = await getPayments();
//                 setPayments(response.data);
//             } catch (err) {
//                 setError('Failed to fetch payments.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPayments();
//     }, []);

//     const handleEdit = (paymentId) => {
//         navigate(`/payments/edit/${paymentId}`);
//     };

//     const handleDelete = async (paymentId) => {
//         if (window.confirm('Are you sure you want to delete this payment?')) {
//             try {
//                 await deletePayment(paymentId);
//                 setPayments(payments.filter(payment => payment.payment_id !== paymentId));
//             } catch (err) {
//                 setError('Failed to delete payment.');
//             }
//         }
//     };


//     const columns = [
//         { header: 'ID', key: 'payment_id' },
//         { header: 'Account', key: 'account_name' },
//         { header: 'Customer', key: 'customer_name' },
//         { header: 'Supplier', key: 'supplier_name' },
//         { header: 'Amount', key: 'amount' },
//         { header: 'Date', key: 'payment_date' },
//         { header: 'Method', key: 'payment_method' },
//         {
//             header: 'Actions',
//             key: 'actions',
//             render: (row) => (
//                 <div>
//                     <Button onClick={() => handleEdit(row.payment_id)} style={{ marginRight: '5px' }}>Edit</Button>
//                     <Button onClick={() => handleDelete(row.payment_id)} variant="secondary">Delete</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p className="error-message">{error}</p>;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1>Payment Management</h1>
//                 <Button onClick={() => navigate('/payments/new')}>+ Add New Payment</Button>
//             </div>
//             <Table columns={columns} data={payments} />
//         </div>
//     );
// };

// export default PaymentListPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPayments, deletePayment } from '../../api/payments';
import Loader from '../../components/Common/Loader/Loader';

const PaymentListPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await getPayments();
                setPayments(response.data);
            } catch (err) {
                setError('فشل في جلب الدفعات.');
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const handleEdit = (paymentId) => {
        navigate(`/payments/edit/${paymentId}`);
    };

    const handleDelete = async (paymentId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الدفعة؟')) {
            try {
                await deletePayment(paymentId);
                setPayments(payments.filter(payment => payment.payment_id !== paymentId));
            } catch (err) {
                setError('فشل حذف الدفعة.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة الدفعات</h1>
                <button className="btn btn-primary" onClick={() => navigate('/payments/new')}>
                    + إضافة دفعة جديدة
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">رقم الدفعة</th>
                                    <th scope="col">الحساب</th>
                                    <th scope="col">العميل</th>
                                    <th scope="col">المورد</th>
                                    <th scope="col">المبلغ</th>
                                    <th scope="col">التاريخ</th>
                                    <th scope="col">طريقة الدفع</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(payment => (
                                    <tr key={payment.payment_id}>
                                        <td>{payment.payment_id}</td>
                                        <td>{payment.account_name}</td>
                                        <td>{payment.customer_name || '-'}</td>
                                        <td>{payment.supplier_name || '-'}</td>
                                        <td>{parseFloat(payment.amount).toFixed(2)}</td>
                                        <td>{payment.payment_date}</td>
                                        <td>{payment.payment_method}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(payment.payment_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(payment.payment_id)} className="btn btn-sm btn-outline-danger">حذف</button>
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

export default PaymentListPage;