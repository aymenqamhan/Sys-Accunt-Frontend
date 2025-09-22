import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../api/products';
// ✨ تم استبدال getSingleInventoryItem بـ getInventoryItem
import { getInventoryItem, updateInventoryItem, createInventoryItem } from '../../api/inventory';

const InventoryFormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        quantity: '',
        location: ''
    });
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        if (id) {
            const fetchInventoryItem = async () => {
                try {
                    // ✨ تم استدعاء الدالة الصحيحة
                    const response = await getInventoryItem(id);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Failed to fetch inventory item', error);
                }
            };
            fetchInventoryItem();
        }
        fetchProducts();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateInventoryItem(id, formData);
            } else {
                await createInventoryItem(formData);
            }
            navigate('/inventory');
        } catch (error) {
            console.error('Failed to save inventory item', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Inventory Item' : 'Create Inventory Item'}</h2>
            <form onSubmit={handleSubmit}>
                <select name="product" value={formData.product} onChange={handleChange}>
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.product_id} value={product.product_id}>{product.product_name}</option>
                    ))}
                </select>
                <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default InventoryFormPage;