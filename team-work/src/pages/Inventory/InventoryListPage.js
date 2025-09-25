
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getInventoryItems, deleteInventoryItem } from '../../api/inventory';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const InventoryListPage = () => {
//     const [items, setItems] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchItems = async () => {
//             try {
//                 const response = await getInventoryItems();
//                 setItems(response.data);
//             } catch (err) {
//                 setError('Failed to fetch inventory items.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchItems();
//     }, []);

//     const handleEdit = (itemId) => {
//         navigate(`/inventory/edit/${itemId}`);
//     };

//     const handleDelete = async (itemId) => {
//         if (window.confirm('Are you sure you want to delete this movement record?')) {
//             try {
//                 await deleteInventoryItem(itemId);
//                 setItems(items.filter(item => item.id !== itemId));
//             } catch (err) {
//                 setError('Failed to delete inventory item.');
//             }
//         }
//     };

//     const columns = [
//         { header: 'Product Name', key: 'product_name' },
//         {
//             header: 'Movement Type',
//             key: 'movement_type',
//             render: (row) => (
//                 <span style={{ color: row.movement_type === 'IN' ? 'green' : 'red' }}>
//                     {row.movement_type === 'IN' ? 'Stock In' : 'Stock Out'}
//                 </span>
//             )
//         },
//         { header: 'Quantity', key: 'quantity' },
//         { header: 'Reason', key: 'reason' },
//         { header: 'Moved By', key: 'moved_by_name' },
//         {
//             header: 'Timestamp',
//             key: 'timestamp',
//             render: (row) => new Date(row.timestamp).toLocaleString()
//         },
//         {
//             header: 'Actions',
//             key: 'actions',
//             render: (row) => (
//                 <div>
//                     <Button onClick={() => handleEdit(row.id)} style={{ marginRight: '5px' }}>Edit</Button>
//                     <Button onClick={() => handleDelete(row.id)} variant="secondary">Delete</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p className="error-message">{error}</p>;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <h1>Inventory Movements</h1>
//                 <Button onClick={() => navigate('/inventory/new')}>+ Add New Movement</Button>
//             </div>
//             <Table columns={columns} data={items} />
//         </div>
//     );
// };

// export default InventoryListPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventoryItems, deleteInventoryItem } from '../../api/inventory';
import Loader from '../../components/Common/Loader/Loader';

const InventoryListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getInventoryItems();
                setItems(response.data);
            } catch (err) {
                setError('فشل في جلب حركات المخزون.');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleEdit = (itemId) => {
        navigate(`/inventory/edit/${itemId}`);
    };

    const handleDelete = async (itemId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الحركة؟')) {
            try {
                await deleteInventoryItem(itemId);
                setItems(items.filter(item => item.id !== itemId));
            } catch (err) {
                setError('فشل حذف حركة المخزون.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة حركات المخزون</h1>
                <button className="btn btn-primary" onClick={() => navigate('/inventory/new')}>
                    + إضافة حركة جديدة
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">اسم المنتج</th>
                                    <th scope="col">نوع الحركة</th>
                                    <th scope="col">الكمية</th>
                                    <th scope="col">السبب</th>
                                    <th scope="col">بواسطة</th>
                                    <th scope="col">الوقت والتاريخ</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.product_name}</td>
                                        <td>
                                            <span className={`badge ${item.movement_type === 'IN' ? 'bg-success' : 'bg-danger'}`}>
                                                {item.movement_type === 'IN' ? 'إدخال' : 'إخراج'}
                                            </span>
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.reason}</td>
                                        <td>{item.moved_by_name}</td>
                                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(item.id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(item.id)} className="btn btn-sm btn-outline-danger">حذف</button>
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

export default InventoryListPage;