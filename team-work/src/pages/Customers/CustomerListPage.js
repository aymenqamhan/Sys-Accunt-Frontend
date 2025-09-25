
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCustomers, deleteCustomer } from '../../api/customers';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const CustomerListPage = () => {
//     const [customers, setCustomers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchCustomers = async () => {
//             try {
//                 const response = await getCustomers();
//                 setCustomers(response.data);
//             } catch (err) {
//                 setError('فشل في جلب العملاء.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCustomers();
//     }, []);

//     const handleEdit = (customerId) => {
//         navigate(`/customers/edit/${customerId}`);
//     };

//     const handleDelete = async (customerId) => {
//         if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العميل؟')) {
//             try {
//                 await deleteCustomer(customerId);
//                 // ✨ FIX: Filter using customer_id
//                 setCustomers(customers.filter(customer => customer.customer_id !== customerId));
//             } catch (err) {
//                 setError('فشل حذف العميل.');
//             }
//         }
//     };

//     const columns = [
// 
//         { header: 'اسم العميل', key: 'full_name' },
//         { header: 'البريد الإلكتروني', key: 'email' },
//         { header: 'رقم الهاتف', key: 'phone' },
//         { header: 'العنوان', key: 'address' },
//         {
//             header: 'الإجراءات',
//             key: 'actions',
//             render: (row) => (
//                 <div>
//     
//                     <Button onClick={() => handleEdit(row.customer_id)} style={{ marginRight: '5px' }}>تعديل</Button>
//                     <Button onClick={() => handleDelete(row.customer_id)} variant="secondary">حذف</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p className="error-message">{error}</p>;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1>إدارة العملاء</h1>
//                 <Button onClick={() => navigate('/customers/new')}>+ إضافة عميل جديد</Button>
//             </div>
//             <Table columns={columns} data={customers} />
//         </div>
//     );
// };

// export default CustomerListPage;

// src/pages/Customers/CustomerListPage.js (Final Merged Version)


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomers, deleteCustomer } from '../../api/customers';
import Loader from '../../components/Common/Loader/Loader';

const CustomerListPage = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await getCustomers();
                setCustomers(response.data);
            } catch (err) {
                setError('فشل في جلب العملاء.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    const handleEdit = (id) => {
        navigate(`/customers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العميل؟')) {
            try {

                await deleteCustomer(customerId);
                setCustomers(customers.filter(customer => customer.customer_id !== customerId));

                await deleteCustomer(id);
                // Use the safer functional update from your branch
                setCustomers(currentCustomers => currentCustomers.filter(customer => customer.customer_id !== id));

            } catch (err) {
                setError('فشل حذف العميل.');
                console.error(err);
            }
        }
    };


    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة العملاء</h1>
                <button className="btn btn-primary" onClick={() => navigate('/customers/new')}>
                    + إضافة عميل جديد
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">اسم العميل</th>
                                    <th scope="col">البريد الإلكتروني</th>
                                    <th scope="col">رقم الهاتف</th>
                                    <th scope="col">العنوان</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map(customer => (
                                    <tr key={customer.customer_id}>
                                        <td>{customer.full_name}</td>
                                        <td>{customer.email}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.address}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(customer.customer_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(customer.customer_id)} className="btn btn-sm btn-outline-danger">حذف</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

    const columns = [
        // Use full_name from the main branch
        { header: 'الاسم الكامل', key: 'full_name' },
        { header: 'البريد الإلكتروني', key: 'email' },
        { header: 'رقم الهاتف', key: 'phone' },
        { header: 'الهاتف', key: 'phone' },
        { header: 'العنوان', key: 'address' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (customer) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(customer.customer_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(customer.customer_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة العملاء</h1>
                <Button onClick={() => navigate('/customers/new')}>+ إضافة عميل جديد</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={customers} />

        </div>
    );
};

export default CustomerListPage;