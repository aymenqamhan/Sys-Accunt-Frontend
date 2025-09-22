import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// ✨ تم تصحيح أسماء الدوال المستوردة
import { getSale } from '../../api/sales';
import { getSalesInvoiceDetails, deleteSalesInvoiceDetail } from '../../api/salesInvoiceDetails';

const SalesInvoiceDetailsListPage = () => {
    const { saleId } = useParams();
    const [sale, setSale] = useState(null);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                // ✨ تم استدعاء الدالة الصحيحة
                const saleRes = await getSale(saleId);
                setSale(saleRes.data);
                const detailsRes = await getSalesInvoiceDetails(saleId);
                setDetails(detailsRes.data);
            } catch (err) {
                setError('Failed to fetch sale details.');
                console.error(err);
            }
        };
        fetchSaleDetails();
    }, [saleId]);

    const handleDelete = async (detailId) => {
        try {
            await deleteSalesInvoiceDetail(saleId, detailId);
            setDetails(details.filter((d) => d.detail_id !== detailId));
        } catch (err) {
            setError('Failed to delete detail.');
            console.error(err);
        }
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!sale) return <p>Loading...</p>;

    return (
        <div>
            <h2>Details for Sale #{sale.sale_id}</h2>
            <Link to={`/sales/${saleId}/details/new`}>Add Detail</Link>
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
                                <Link to={`/sales/${saleId}/details/edit/${detail.detail_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(detail.detail_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesInvoiceDetailsListPage;