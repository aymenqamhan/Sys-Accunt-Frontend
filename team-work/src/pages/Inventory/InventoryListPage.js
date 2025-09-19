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
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await deleteInventoryItem(itemId);
                setItems(items.filter(item => item.id !== itemId));
            } catch (err) {
                setError('Failed to delete inventory item.');
            }
        }
    };

    const columns = [
        { header: 'Product Name', key: 'product_name' }, // Assuming a 'product_name' field
        { header: 'Quantity', key: 'quantity' },
        { header: 'Location', key: 'location' },
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
                <h1>Inventory Management</h1>
                <Button onClick={() => navigate('/inventory/new')}>+ Add New Item</Button>
            </div>
            <Table columns={columns} data={items} />
        </div>
    );
};

export default InventoryListPage;