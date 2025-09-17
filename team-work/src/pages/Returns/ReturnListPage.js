import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReturns, deleteReturn } from '../../api/returns';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ReturnListPage = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReturns = async () => {
            try {
                const response = await getReturns();
                setReturns(response.data);
            } catch (err) {
                setError('Failed to fetch returns.');
            } finally {
                setLoading(false);
            }
        };
        fetchReturns();
    }, []);

    const handleEdit = (returnId) => {
        navigate(`/returns/edit/${returnId}`);
    };

    const handleDelete = async (returnId) => {
        if (window.confirm('Are you sure you want to delete this return?')) {
            try {
                await deleteReturn(returnId);
                // FIX: Filter using the correct ID field 'return_id'
                setReturns(returns.filter(ret => ret.return_id !== returnId));
            } catch (err) {
                setError('Failed to delete return.');
            }
        }
    };

    // FIX: Updated columns to match your API data
    const columns = [
        { header: 'Customer', key: 'customer_name' },
        { header: 'Product', key: 'product_name' },
        { header: 'Quantity', key: 'quantity' },
        { header: 'Amount', key: 'amount' },
        { header: 'Date', key: 'return_date' },
        {
            header: 'Actions',
            key: 'actions',
            render: (row) => (
                <div>
                    {/* FIX: Use the correct ID field 'return_id' */}
                    <Button onClick={() => handleEdit(row.return_id)} style={{ marginRight: '5px' }}>Edit</Button>
                    <Button onClick={() => handleDelete(row.return_id)} variant="secondary">Delete</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Returns Management</h1>
                <Button onClick={() => navigate('/returns/new')}>+ Add New Return</Button>
            </div>
            <Table columns={columns} data={returns} />
        </div>
    );
};

export default ReturnListPage;