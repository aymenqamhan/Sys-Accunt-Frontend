// src/pages/Sales/SalesInvoiceDetailsListPage.js (Corrected)
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSale } from '../../api/sales';
import { getSalesInvoiceDetails, deleteSalesInvoiceDetail } from '../../api/salesInvoiceDetails';

const SalesInvoiceDetailsListPage = () => {
    // ✅ تم التعديل إلى invoiceId للاتساق مع بقية التطبيق
    const { invoiceId } = useParams(); 
    const [sale, setSale] = useState(null);
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const saleRes = await getSale(invoiceId);
                setSale(saleRes.data);
                const detailsRes = await getSalesInvoiceDetails(invoiceId);
                setDetails(detailsRes.data);
            } catch (err) {
                setError('Failed to fetch sale details.');
                console.error(err);
            }
        };
        fetchSaleDetails();
    }, [invoiceId]);

    const handleDelete = async (detailId) => {
        try {
            await deleteSalesInvoiceDetail(detailId);
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
            {/* ✅ تم التصحيح: استخدام sale.invoice_id */}
            <h2>Details for Sale Invoice #{sale.invoice_id}</h2>
            <Link to={`/sales/${invoiceId}/details/new`}>Add Detail</Link>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Subtotal</th>
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
                                <Link to={`/sales/${invoiceId}/details/edit/${detail.detail_id}`}>Edit</Link>
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