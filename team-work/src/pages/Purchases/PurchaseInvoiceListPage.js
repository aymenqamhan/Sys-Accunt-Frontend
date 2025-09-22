import React, { useEffect, useState } from 'react';
// ✨ تم تصحيح أسماء الدوال المستوردة
import { getPurchases, deletePurchase } from '../../api/purchases';
import { Link } from 'react-router-dom';

const PurchaseInvoiceListPage = () => {
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPurchases = async () => {
            try {
                // ✨ تم استدعاء الدالة الصحيحة
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
            // ✨ تم استدعاء الدالة الصحيحة
            await deletePurchase(id);
            setPurchases(purchases.filter((p) => p.purchase_id !== id));
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
                        <tr key={purchase.purchase_id}>
                            <td>{purchase.purchase_id}</td>
                            <td>{purchase.supplier_name || purchase.supplier}</td>
                            <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                            <td>{purchase.total_amount}</td>
                            <td>
                                <Link to={`/purchases/edit/${purchase.purchase_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(purchase.purchase_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PurchaseInvoiceListPage;