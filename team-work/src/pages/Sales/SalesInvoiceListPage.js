import React, { useEffect, useState } from 'react';
// ✨ تم تصحيح أسماء الدوال المستوردة
import { getSales, deleteSale } from '../../api/sales';
import { Link } from 'react-router-dom';

const SalesInvoiceListPage = () => {
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                // ✨ تم استدعاء الدالة الصحيحة
                const response = await getSales();
                setSales(response.data);
            } catch (err) {
                setError('Failed to fetch sales.');
                console.error(err);
            }
        };
        fetchSales();
    }, []);

    const handleDelete = async (id) => {
        try {
            // ✨ تم استدعاء الدالة الصحيحة
            await deleteSale(id);
            setSales(sales.filter((s) => s.sale_id !== id));
        } catch (err) {
            setError('Failed to delete sale.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Sales</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link to="/sales/new">Add Sale</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.sale_id}>
                            <td>{sale.sale_id}</td>
                            <td>{sale.customer_name || sale.customer}</td>
                            <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
                            <td>{sale.total_amount}</td>
                            <td>
                                <Link to={`/sales/edit/${sale.sale_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(sale.sale_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesInvoiceListPage;