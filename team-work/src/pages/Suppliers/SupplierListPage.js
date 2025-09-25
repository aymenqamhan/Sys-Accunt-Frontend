
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getSuppliers, deleteSupplier } from '../../api/suppliers';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const SupplierListPage = () => {
//     const [suppliers, setSuppliers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSuppliers = async () => {
//             try {
//                 const response = await getSuppliers();
//                 setSuppliers(response.data);
//             } catch (err) {
//                 setError('فشل في جلب الموردين.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchSuppliers();
//     }, []);

//     const handleEdit = (id) => {
//         navigate(`/suppliers/edit/${id}`);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المورد؟')) {
//             try {
//                 await deleteSupplier(id);
//                 setSuppliers(currentSuppliers => currentSuppliers.filter(sup => sup.supplier_id !== id));
//             } catch (err) {
//                 setError('فشل حذف المورد.');
//             }
//         }
//     };

//     const columns = [
//         { header: 'Supplier Name', key: 'name' },
//         { header: 'Email', key: 'email' },
//         { header: 'Phone', key: 'phone' },
//         { header: 'Address', key: 'address' },
//         {
//             header: 'Actions',
//             key: 'actions',
//             render: (row) => (
//                 <div style={{ display: 'flex', gap: '5px' }}>
//                     <Button onClick={() => handleEdit(row.supplier_id)}>Edit</Button>
//                     <Button onClick={() => handleDelete(row.supplier_id)} variant="secondary">Delete</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                 <h1>Suppliers Management</h1>
//                 <Button onClick={() => navigate('/suppliers/new')}>+ Add New Supplier</Button>
//             </div>
//             <Table columns={columns} data={suppliers} />
//         </div>
//     );
// };

// export default SupplierListPage;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuppliers, deleteSupplier } from '../../api/suppliers';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuppliers, deleteSupplier } from '../../api/suppliers';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';

import Loader from '../../components/Common/Loader/Loader';

const SupplierListPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await getSuppliers();
                setSuppliers(response.data);
            } catch (err) {
                setError('فشل في جلب الموردين.');
            } finally {
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleEdit = (id) => {
        navigate(`/suppliers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المورد؟')) {
            try {
                await deleteSupplier(id);

                setSuppliers(currentSuppliers => currentSuppliers.filter(sup => sup.supplier_id !== id));

                setSuppliers(currentSuppliers => currentSuppliers.filter(supplier => supplier.supplier_id !== id));

            } catch (err) {
                setError('فشل حذف المورد.');
            }
        }
    };


    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة الموردين</h1>
                <button className="btn btn-primary" onClick={() => navigate('/suppliers/new')}>
                    + إضافة مورد جديد
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">اسم المورد</th>
                                    <th scope="col">البريد الإلكتروني</th>
                                    <th scope="col">رقم الهاتف</th>
                                    <th scope="col">العنوان</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliers.map(supplier => (
                                    <tr key={supplier.supplier_id}>
                                        <td>{supplier.name}</td>
                                        <td>{supplier.email}</td>
                                        <td>{supplier.phone}</td>
                                        <td>{supplier.address}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(supplier.supplier_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(supplier.supplier_id)} className="btn btn-sm btn-outline-danger">حذف</button>
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
        { header: 'الاسم', key: 'name' },
        { header: 'البريد الإلكتروني', key: 'email' },
        { header: 'الهاتف', key: 'phone' },
        { header: 'العنوان', key: 'address' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (supplier) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(supplier.supplier_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(supplier.supplier_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];
    
    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة الموردين</h1>
                <Button onClick={() => navigate('/suppliers/new')}>+ إضافة مورد جديد</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={suppliers} />

        </div>
    );
};

export default SupplierListPage;