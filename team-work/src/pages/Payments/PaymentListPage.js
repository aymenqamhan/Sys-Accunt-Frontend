import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPayments, deletePayment } from '../../api/payments';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const PaymentListPage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await getPayments();
                setPayments(response.data);
            } catch (err) {
                setError('Failed to fetch payments.');
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, []);

    const handleEdit = (paymentId) => {
        navigate(`/payments/edit/${paymentId}`);
    };

    const handleDelete = async (paymentId) => {
        if (window.confirm('Are you sure you want to delete this payment?')) {
            try {
                await deletePayment(paymentId);
                setPayments(payments.filter(payment => payment.id !== paymentId));
            } catch (err) {
                setError('Failed to delete payment.');
            }
        }
    };

    const columns = [
        { header: 'Invoice ID', key: 'invoice_id' }, // Assuming fields
        { header: 'Amount', key: 'amount' },
        { header: 'Date', key: 'payment_date' },
        {
            header: 'Actions',
            key: 'actions',
            render: (row) => (
                <div>
                    <Button onClick={() => handleEdit(row.id)} style={{ marginRight: '5px' }}>Edit</Button>
                    <Button onClick={() => handleDelete(row.id)} variant="secondary">Delete</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Payment Management</h1>
                <Button onClick={() => navigate('/payments/new')}>+ Add New Payment</Button>
            </div>
            <Table columns={columns} data={payments} />
        </div>
    );
};

export default PaymentListPage;