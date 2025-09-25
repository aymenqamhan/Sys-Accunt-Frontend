
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getPurchaseInvoice } from '../../api/purchases'; // نستخدم هذه لجلب الفاتورة وتفاصيلها
// import { deletePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';
// import Table from '../../components/Common/Table/Table';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const PurchaseInvoiceDetailsListPage = () => {
//     // حالة لتخزين بيانات الفاتورة الكاملة (الرئيسية + التفاصيل)
//     const [invoice, setInvoice] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { invoiceId } = useParams(); // الحصول على ID الفاتورة من الرابط

//     // دالة لجلب البيانات
//     const fetchInvoiceDetails = async () => {
//         setLoading(true);
//         try {
//             const response = await getPurchaseInvoice(invoiceId);
//             setInvoice(response.data);
//         } catch (err) {
//             setError('فشل في جلب تفاصيل الفاتورة.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchInvoiceDetails();
//     }, [invoiceId]);

//     const handleDelete = async (detailId) => {
//         if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العنصر من الفاتورة؟')) {
//             try {
//                 await deletePurchaseInvoiceDetail(detailId);
//                 // إعادة جلب البيانات لتحديث القائمة بعد الحذف
//                 fetchInvoiceDetails();
//             } catch (err) {
//                 setError('فشل حذف العنصر.');
//             }
//         }
//     };

//     const columns = [
//         { header: 'Product', key: 'product_name' },
//         { header: 'Quantity', key: 'quantity' },
//         { header: 'Price', key: 'price' },
//         { header: 'Discount', key: 'discount' },
//         { header: 'Tax', key: 'tax' },
//         { header: 'Subtotal', key: 'subtotal' },
//         {
//             header: 'Actions',
//             key: 'actions',
//             render: (row) => (
//                 <div>
//                     <Button onClick={() => navigate(`/purchases/${invoiceId}/details/edit/${row.detail_id}`)} style={{ marginRight: '5px' }}>Edit</Button>
//                     <Button onClick={() => handleDelete(row.detail_id)} variant="secondary">Delete</Button>
//                 </div>
//             )
//         }
//     ];

//     if (loading) return <Loader />;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;
//     if (!invoice) return <p>Invoice not found.</p>;

//     return (
//         <div>
//             {/* عرض البيانات الرئيسية للفاتورة */}
//             <h1>Invoice Details #{invoice.invoice_id}</h1>
//             <div style={{ marginBottom: '20px' }}>
//                 <p><strong>Supplier:</strong> {invoice.supplier_name}</p>
//                 <p><strong>Date:</strong> {invoice.purchase_date}</p>
//                 <p><strong>Total:</strong> {invoice.total}</p>
//                 <p><strong>Status:</strong> {invoice.payment_status}</p>
//             </div>

//             <hr />

//             {/* زر لإضافة عنصر جديد لهذه الفاتورة تحديدًا */}
//             <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
//                 <Button onClick={() => navigate(`/purchases/${invoiceId}/details/new`)}>+ Add New Item</Button>
//             </div>

//             {/* جدول يعرض تفاصيل الفاتورة */}
//             <Table columns={columns} data={invoice.purchase_invoice_details} />
//         </div>
//     );
// };

// export default PurchaseInvoiceDetailsListPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPurchaseInvoice } from '../../api/purchases';
import { deletePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';
import Loader from '../../components/Common/Loader/Loader';

const PurchaseInvoiceDetailsListPage = () => {
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { invoiceId } = useParams();

    const fetchInvoiceDetails = async () => {
        setLoading(true);
        try {
            const response = await getPurchaseInvoice(invoiceId);
            setInvoice(response.data);
        } catch (err) {
            setError('فشل في جلب تفاصيل الفاتورة.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoiceDetails();
    }, [invoiceId]);

    const handleDelete = async (detailId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
            try {
                await deletePurchaseInvoiceDetail(detailId);
                fetchInvoiceDetails();
            } catch (err) {
                setError('فشل حذف العنصر.');
            }
        }
    };

    if (loading) return <Loader />;
    if (error) return <p className="alert alert-danger">{error}</p>;
    if (!invoice) return <p>الفاتورة غير موجودة.</p>;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light p-3 d-flex justify-content-between align-items-center">
                    <h1 className="h4 mb-0">تفاصيل فاتورة الشراء رقم #{invoice.invoice_id}</h1>
                    <button onClick={() => navigate(`/purchases/${invoiceId}/details/new`)} className="btn btn-primary btn-sm">+ إضافة عنصر</button>
                </div>
                <div className="card-body">
                    <div className="row mb-3">
                        <div className="col-md-6"><p><strong>المورد:</strong> {invoice.supplier_name}</p></div>
                        <div className="col-md-6"><p><strong>التاريخ:</strong> {invoice.purchase_date}</p></div>
                        <div className="col-md-6"><p><strong>الإجمالي:</strong> {invoice.total}</p></div>
                        <div className="col-md-6"><p><strong>حالة الدفع:</strong> {invoice.payment_status}</p></div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-secondary">
                                <tr>
                                    <th>المنتج</th><th>الكمية</th><th>السعر</th><th>الخصم</th><th>الضريبة</th><th>المجموع الفرعي</th><th>الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoice.purchase_invoice_details.map(row => (
                                    <tr key={row.detail_id}>
                                        <td>{row.product_name}</td><td>{row.quantity}</td><td>{row.price}</td><td>{row.discount}</td><td>{row.tax}</td><td>{row.subtotal}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button onClick={() => navigate(`/purchases/${invoiceId}/details/edit/${row.detail_id}`)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(row.detail_id)} className="btn btn-sm btn-outline-danger">حذف</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPurchaseInvoice } from '../../api/purchases';
import { deletePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const PurchaseInvoiceDetailsListPage = () => {
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { invoiceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await getPurchaseInvoice(invoiceId);
                setInvoiceDetails(response.data);
            } catch (err) {
                setError('فشل في جلب تفاصيل الفاتورة.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [invoiceId]);

    const handleDelete = async (detailId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا البند؟')) {
            try {
                await deletePurchaseInvoiceDetail(detailId);
                const response = await getPurchaseInvoice(invoiceId);
                setInvoiceDetails(response.data);
            } catch (err) {
                setError('فشل حذف البند.');
            }
        }
    };
    
    const columns = [
        { header: 'المنتج', key: 'product_name' },
        { header: 'الكمية', key: 'quantity' },
        { header: 'سعر الوحدة', key: 'unit_price' },
        { header: 'الإجمالي الفرعي', key: 'subtotal' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (item) => (
                <div>
                    <Button onClick={() => navigate(`/purchases/${invoiceId}/details/edit/${item.detail_id}`)}>تعديل</Button>
                    <Button onClick={() => handleDelete(item.detail_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>تفاصيل فاتورة الشراء رقم: {invoiceDetails?.invoice_id}</h1>
                <Button onClick={() => navigate(`/purchases/${invoiceId}/details/new`)}>+ إضافة بند جديد</Button>
            </div>
            <p><strong>المورد:</strong> {invoiceDetails?.supplier_name}</p>
            <p><strong>الإجمالي:</strong> {invoiceDetails?.total_amount}</p>
            <Table columns={columns} data={invoiceDetails?.items || []} />

        </div>
    );
};

export default PurchaseInvoiceDetailsListPage;