import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInventoryItem, getSingleInventoryItem, updateInventoryItem } from '../../api/inventory';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const InventoryFormPage = () => {
    const [formData, setFormData] = useState({
        product: '', // Assuming you'll have a dropdown for products
        quantity: 0,
        location: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { itemId } = useParams();
    const isEditMode = Boolean(itemId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSingleInventoryItem(itemId)
                .then(response => setFormData(response.data))
                .catch(err => setError('Failed to fetch item data.'))
                .finally(() => setLoading(false));
        }
    }, [itemId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateInventoryItem(itemId, formData);
            } else {
                await createInventoryItem(formData);
            }
            navigate('/inventory');
        } catch (err) {
            setError('Failed to save inventory item.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'Edit Inventory Item' : 'Create New Inventory Item'}</h1>
            <form onSubmit={handleSubmit}>
                {/* Note: You will likely replace the 'product' InputField with a dropdown select menu */}
                <InputField label="Product ID" name="product" value={formData.product} onChange={handleChange} required />
                <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                <InputField label="Location" name="location" value={formData.location} onChange={handleChange} />
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Item'}</Button>
            </form>
        </div>
    );
};

export default InventoryFormPage;