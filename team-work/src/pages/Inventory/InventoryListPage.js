
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInventoryItems, deleteInventoryItem } from '../../api/inventory';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const InventoryListPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getInventoryItems();
                setItems(response.data);
            } catch (err) {
                setError('Failed to fetch inventory items.');
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    const handleEdit = (itemId) => {
        navigate(`/inventory/edit/${itemId}`);
    };

    const handleDelete = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this movement record?')) {
            try {
                await deleteInventoryItem(itemId);
                setItems(items.filter(item => item.id !== itemId));
            } catch (err) {
                setError('Failed to delete inventory item.');
            }
        }
    };

    const columns = [
        { header: 'Product Name', key: 'product_name' },
        {
            header: 'Movement Type',
            key: 'movement_type',
            render: (row) => (
                <span style={{ color: row.movement_type === 'IN' ? 'green' : 'red' }}>
                    {row.movement_type === 'IN' ? 'Stock In' : 'Stock Out'}
                </span>
            )
        },
        { header: 'Quantity', key: 'quantity' },
        { header: 'Reason', key: 'reason' },
        { header: 'Moved By', key: 'moved_by_name' },
        {
            header: 'Timestamp',
            key: 'timestamp',
            render: (row) => new Date(row.timestamp).toLocaleString()
        },
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
                <h1>Inventory Movements</h1>
                <Button onClick={() => navigate('/inventory/new')}>+ Add New Movement</Button>
            </div>
            <Table columns={columns} data={items} />
        </div>
    );
};

export default InventoryListPage;