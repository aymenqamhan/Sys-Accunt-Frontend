import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ✨ تم تصحيح أسماء الدوال المستوردة
import { getPurchase } from '../../api/purchases';
import { getPurchaseInvoiceDetails, deletePurchaseInvoiceDetail } from '../../api/purchaseInvoiceDetails';

const PurchaseInvoiceDetailsListPage = () => {
    const { purchaseId } = useParams();
    const [purchase, setPurchase] = useState(null);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchaseDetails = async () => {
            try {
                // ✨ تم استدعاء الدالة الصحيحة
                const purchaseRes = await getPurchase(purchaseId);
                setPurchase(purchaseRes.data);
                const detailsRes = await getPurchaseInvoiceDetails(purchaseId);
                setDetails(detailsRes.data);
            } catch (err) {
                setError('Failed to fetch purchase details.');
                console.error(err);
            }
        };
        fetchPurchaseDetails();
    }, [purchaseId]);

    const handleDelete = async (detailId) => {
        try {
            await deletePurchaseInvoiceDetail(purchaseId, detailId);
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
            <h2>Details for Purchase #{purchase.purchase_id}</h2>
            <Link to={`/purchases/${purchaseId}/details/new`}>Add Detail</Link>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {details.map((detail) => (
                        <tr key={detail.detail_id}>
                            <td>{detail.product_name || detail.product}</td>
                            <td>{detail.quantity}</td>
                            <td>{detail.unit_price}</td>
                            <td>{detail.total_price}</td>
                            <td>
                                <Link to={`/purchases/${purchaseId}/details/edit/${detail.detail_id}`}>Edit</Link>
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