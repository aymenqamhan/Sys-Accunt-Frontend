// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getReturns, deleteReturn } from '../../api/returns';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const ReturnListPage = () => {
//     const [returns, setReturns] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchReturns = async () => {
//             try {
//                 const response = await getReturns();
//                 setReturns(response.data);
//             } catch (err) {
//                 setError('Failed to fetch returns.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchReturns();
//     }, []);

//     const handleEdit = (returnId) => {
//         navigate(`/returns/edit/${returnId}`);
//     };

//     const handleDelete = async (returnId) => {
//         if (window.confirm('Are you sure you want to delete this return?')) {
//             try {
//                 await deleteReturn(returnId);
//                 // FIX: Filter using the correct ID field 'return_id'
//                 setReturns(returns.filter(ret => ret.return_id !== returnId));
//             } catch (err) {
//                 setError('Failed to delete return.');
//             }
//         }
//     };

//     // FIX: Updated columns to match your API data
//     const columns = [
//         { header: 'Product', key: 'product_name' },
//         { header: 'Customer', key: 'customer_name' },
//         { header: 'User', key: 'user_name' }, // افترض أن الـ API يرجع user_name
//         { header: 'Quantity', key: 'quantity' },
//         { header: 'Amount', key: 'amount' },
//         { header: 'Return Type', key: 'return_type' },
//         {
//             header: 'Return Date',
//             key: 'return_date',
//             render: (row) => new Date(row.return_date).toLocaleDateString()
//         },
//         {
//             header: 'Actions',
//             key: 'actions',
//             render: (row) => (
//                 <div>
//                     <Button onClick={() => handleEdit(row.return_id)} style={{ marginRight: '5px' }}>Edit</Button>
//                     <Button onClick={() => handleDelete(row.return_id)} variant="secondary">Delete</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p className="error-message">{error}</p>;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1>Returns Management</h1>
//                 <Button onClick={() => navigate('/returns/new')}>+ Add New Return</Button>
//             </div>
//             <Table columns={columns} data={returns} />
//         </div>
//     );
// };

// export default ReturnListPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReturns, deleteReturn } from '../../api/returns';
import Loader from '../../components/Common/Loader/Loader';

const ReturnListPage = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReturns = async () => {
            try {
                const response = await getReturns();
                setReturns(response.data);
            } catch (err) {
                setError('فشل في جلب المرتجعات.');
            } finally {
                setLoading(false);
            }
        };
        fetchReturns();
    }, []);

    const handleEdit = (returnId) => {
        navigate(`/returns/edit/${returnId}`);
    };

    const handleDelete = async (returnId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المرتجع؟')) {
            try {
                await deleteReturn(returnId);
                setReturns(returns.filter(ret => ret.return_id !== returnId));
            } catch (err) {
                setError('فشل حذف المرتجع.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة المرتجعات</h1>
                <button className="btn btn-primary" onClick={() => navigate('/returns/new')}>
                    + إضافة مرتجع جديد
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">المنتج</th>
                                    <th scope="col">العميل</th>
                                    <th scope="col">المستخدم</th>
                                    <th scope="col">الكمية</th>
                                    <th scope="col">المبلغ</th>
                                    <th scope="col">نوع المرتجع</th>
                                    <th scope="col">تاريخ المرتجع</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returns.map(ret => (
                                    <tr key={ret.return_id}>
                                        <td>{ret.product_name}</td>
                                        <td>{ret.customer_name || '-'}</td>
                                        <td>{ret.user_name}</td>
                                        <td>{ret.quantity}</td>
                                        <td>{parseFloat(ret.amount).toFixed(2)}</td>
                                        <td>{ret.return_type}</td>
                                        <td>{new Date(ret.return_date).toLocaleDateString()}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(ret.return_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(ret.return_id)} className="btn btn-sm btn-outline-danger">حذف</button>
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

export default ReturnListPage;