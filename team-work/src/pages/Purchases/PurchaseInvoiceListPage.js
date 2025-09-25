
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getPurchaseInvoices, deletePurchaseInvoice } from '../../api/purchases';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const PurchaseInvoiceListPage = () => {
//     const [invoices, setInvoices] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchInvoices = async () => {
//             try {
//                 const response = await getPurchaseInvoices();
//                 setInvoices(response.data);
//             } catch (err) {
//                 setError('فشل في جلب فواتير المشتريات.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchInvoices();
//     }, []);

//     const handleEdit = (invoiceId) => {
//         navigate(`/purchases/edit/${invoiceId}`);
//     };

//     const handleDelete = async (invoiceId) => {
//         if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفاتورة؟')) {
//             try {
//                 await deletePurchaseInvoice(invoiceId);
//                 setInvoices(currentInvoices => currentInvoices.filter(inv => inv.invoice_id !== invoiceId));
//             } catch (err) {
//                 setError('فشل حذف الفاتورة.');
//             }
//         }
//     };

//     const columns = [
//         { header: 'Invoice ID', key: 'invoice_id' },
//         { header: 'Supplier', key: 'supplier_name' },
//         { header: 'User', key: 'user_name' },
//         { header: 'Total', key: 'total' },
//         { header: 'Payment Status', key: 'payment_status' },
//         { header: 'Purchase Date', key: 'purchase_date' },
//         {
//             header: 'Actions',
//             key: 'actions',
//             render: (row) => (
//                 <div>
//                     <Button onClick={() => handleEdit(row.invoice_id)} style={{ marginRight: '5px' }}>Edit</Button>
//                     <Button onClick={() => handleDelete(row.invoice_id)} variant="secondary">Delete</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                 <h1>Purchase Invoices</h1>
//                 <Button onClick={() => navigate('/purchases/new')}>+ Add New Purchase Invoice</Button>
//             </div>
//             <Table columns={columns} data={invoices} />
//         </div>
//     );
// };

// export default PurchaseInvoiceListPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchaseInvoices, deletePurchaseInvoice } from '../../api/purchases';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPurchaseInvoices, deletePurchaseInvoice } from '../../api/purchases';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';

import Loader from '../../components/Common/Loader/Loader';

const PurchaseInvoiceListPage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getPurchaseInvoices();
                setInvoices(response.data);
            } catch (err) {
                setError('فشل في جلب فواتير المشتريات.');
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);


    const handleViewDetails = (invoiceId) => {
        navigate(`/purchases/${invoiceId}/details`);
    };

    const handleDelete = async (invoiceId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفاتورة؟')) {
            try {
                await deletePurchaseInvoice(invoiceId);
                setInvoices(currentInvoices => currentInvoices.filter(inv => inv.invoice_id !== invoiceId));
            } catch (err) {
                setError('فشل حذف الفاتورة.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة فواتير المشتريات</h1>
                <button className="btn btn-primary" onClick={() => navigate('/purchases/new')}>
                    + إضافة فاتورة شراء
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">رقم الفاتورة</th>
                                    <th scope="col">المورد</th>
                                    <th scope="col">المستخدم</th>
                                    <th scope="col">الإجمالي</th>
                                    <th scope="col">حالة الدفع</th>
                                    <th scope="col">تاريخ الشراء</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(invoice => (
                                    <tr key={invoice.invoice_id}>
                                        <td>{invoice.invoice_id}</td>
                                        <td>{invoice.supplier_name}</td>
                                        <td>{invoice.user_name}</td>
                                        <td>{parseFloat(invoice.total).toFixed(2)}</td>
                                        <td>
                                            <span className={`badge ${invoice.payment_status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                                                {invoice.payment_status}
                                            </span>
                                        </td>
                                        <td>{invoice.purchase_date}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleViewDetails(invoice.invoice_id)} className="btn btn-sm btn-outline-info">عرض التفاصيل</button>
                                                <button onClick={() => navigate(`/purchases/edit/${invoice.invoice_id}`)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(invoice.invoice_id)} className="btn btn-sm btn-outline-danger">حذف</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

    
    const handleEdit = (id) => navigate(`/purchases/edit/${id}`);
    const handleDelete = async (id) => {
        if(window.confirm('هل أنت متأكد من حذف فاتورة الشراء هذه؟')) {
            try {
                await deletePurchaseInvoice(id);
                setInvoices(current => current.filter(inv => inv.invoice_id !== id));
            } catch (err) {
                setError("فشل حذف الفاتورة.");
            }
        }
    };

    const columns = [
        { header: 'رقم الفاتورة', key: 'invoice_id' },
        { header: 'المورد', key: 'supplier_name' },
        { header: 'تاريخ الفاتورة', key: 'purchase_date' },
        { header: 'الإجمالي', key: 'total_amount' },
        { header: 'حالة الدفع', key: 'payment_status' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (invoice) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    {/* --- ✨ زر التفاصيل المضاف --- */}
                    <Button onClick={() => navigate(`/purchases/${invoice.invoice_id}/details`)}>التفاصيل</Button>
                    <Button onClick={() => handleEdit(invoice.invoice_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(invoice.invoice_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>فواتير المشتريات</h1>
                <Button onClick={() => navigate('/purchases/new')}>+ فاتورة جديدة</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={invoices} />

        </div>
    );
};

export default PurchaseInvoiceListPage;