// src/pages/Purchases/PurchaseInvoiceDetailsListPage.js (Corrected)
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPurchase } from '../../api/purchases';
import { getPurchaseInvoiceDetails, deletePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';

const PurchaseInvoiceDetailsListPage = () => {
    // ✨ ملاحظة: تم تغيير الاسم من purchaseId إلى invoiceId ليتوافق مع السياق العام
    const { invoiceId } = useParams(); 
    const [purchase, setPurchase] = useState(null);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchaseDetails = async () => {
            try {
                const purchaseRes = await getPurchase(invoiceId);
                setPurchase(purchaseRes.data);
                const detailsRes = await getPurchaseInvoiceDetails(invoiceId);
                setDetails(detailsRes.data);
            } catch (err) {
                setError('Failed to fetch purchase details.');
                console.error(err);
            }
        };
        fetchPurchaseDetails();
    }, [invoiceId]);

    const handleDelete = async (detailId) => {
        try {
            // ✨ ملاحظة: تأكد أن دالة الحذف في الـ API لا تحتاج لـ invoiceId
            await deletePurchaseInvoiceDetail(detailId); 
            setDetails(details.filter((d) => d.detail_id !== detailId));
        } catch (err) {
            setError('Failed to delete detail.');
            console.error(err);
        }
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!purchase) return <p>Loading...</p>;

    return (
        <div>
            {/* ✅ تم التصحيح: استخدام invoice_id ليكون متوافقاً مع الأجزاء الأخرى */}
            <h2>Details for Purchase #{purchase.invoice_id}</h2>
            <Link to={`/purchases/${invoiceId}/details/new`}>Add Detail</Link>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th> {/* تم تغيير العنوان ليعكس المحتوى */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail) => (
                        <tr key={detail.detail_id}>
                            <td>{detail.product_name || detail.product}</td>
                            <td>{detail.quantity}</td>
                            {/* ✅ تم التصحيح: استخدام detail.price */}
                            <td>{detail.price}</td>
                            {/* ✅ تم التصحيح: استخدام detail.subtotal */}
                            <td>{detail.subtotal}</td>
                            <td>
                                <Link to={`/purchases/${invoiceId}/details/edit/${detail.detail_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(detail.detail_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseInvoiceDetailsListPage;