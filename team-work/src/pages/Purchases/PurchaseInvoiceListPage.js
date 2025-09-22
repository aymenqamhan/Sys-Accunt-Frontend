// src/pages/Purchases/PurchaseInvoiceListPage.js (Corrected)
import React, { useEffect, useState } from 'react';
import { getPurchases, deletePurchase } from '../../api/purchases';
import { Link } from 'react-router-dom';

const PurchaseInvoiceListPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                const response = await getPurchases();
                setPurchases(response.data);
            } catch (err) {
                setError('Failed to fetch purchases.');
                console.error(err);
            }
        };
        fetchPurchases();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deletePurchase(id);
            // ✅ تم التصحيح: استخدام invoice_id للفلترة
            setPurchases(purchases.filter((p) => p.invoice_id !== id));
        } catch (err) {
            setError('Failed to delete purchase.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Purchases</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link to="/purchases/new">Add Purchase</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Supplier</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {purchases.map((purchase) => (
                        // ✅ تم التصحيح: استخدام invoice_id كـ key
                        <tr key={purchase.invoice_id}>
                            {/* ✅ تم التصحيح: عرض invoice_id */}
                            <td>{purchase.invoice_id}</td>
                            <td>{purchase.supplier_name || purchase.supplier}</td>
                            <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                            {/* ✅ تم التصحيح: عرض total */}
                            <td>{purchase.total}</td>
                            <td>
                                {/* ✅ تم التصحيح: استخدام invoice_id في الروابط */}
                                <Link to={`/purchases/edit/${purchase.invoice_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(purchase.invoice_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseInvoiceListPage;