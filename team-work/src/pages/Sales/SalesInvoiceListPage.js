// src/pages/Sales/SalesInvoiceListPage.js (Corrected)
import React, { useEffect, useState } from 'react';
import { getSales, deleteSale } from '../../api/sales';
import { Link } from 'react-router-dom';

const SalesInvoiceListPage = () => {
    const [sales, setSales] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSales = async () => {
            try {
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
            await deleteSale(id);
            // ✅ تم التصحيح: استخدام invoice_id للفلترة
            setSales(sales.filter((s) => s.invoice_id !== id));
        } catch (err) {
            setError('Failed to delete sale.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Sales Invoices</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Link to="/sales/new">Add Sale Invoice</Link>
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
                        // ✅ تم التصحيح: استخدام invoice_id
                        <tr key={sale.invoice_id}>
                            <td>{sale.invoice_id}</td>
                            <td>{sale.customer_name || sale.customer}</td>
                            {/* ✅ تم التصحيح: استخدام invoice_date */}
                            <td>{new Date(sale.invoice_date).toLocaleDateString()}</td>
                            {/* ✅ تم التصحيح: استخدام total */}
                            <td>{sale.total}</td>
                            <td>
                                {/* ✅ تم التصحيح: استخدام invoice_id في الروابط */}
                                <Link to={`/sales/edit/${sale.invoice_id}`}>Edit</Link>
                                <button onClick={() => handleDelete(sale.invoice_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesInvoiceListPage;