
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createInventoryItem, getSingleInventoryItem, updateInventoryItem } from '../../api/inventory';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';
// ❌ تأكد من حذف سطر استيراد SelectField من هنا

const InventoryFormPage = () => {
    const [formData, setFormData] = useState({
        product: '',
        movement_type: 'IN',
        quantity: '',
        reason: ''
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
                .then(response => {
                    const { product, movement_type, quantity, reason } = response.data;
                    setFormData({ product, movement_type, quantity, reason });
                })
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
            setError('فشل في حفظ حركة المخزون. تأكد من أن كل الحقول صحيحة.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'Edit Inventory Movement' : 'Create New Inventory Movement'}</h1>
            <form onSubmit={handleSubmit}>
                <InputField label="Product ID" name="product" type="number" value={formData.product} onChange={handleChange} required />

                {/* 👇 الكود المباشر للقائمة المنسدلة */}
                <div style={{ marginTop: '15px', marginBottom: '15px', display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="movement_type" style={{ marginBottom: '5px', fontWeight: 'bold' }}>Movement Type</label>
                    <select
                        id="movement_type"
                        name="movement_type"
                        value={formData.movement_type}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }}
                    >
                        <option value="IN">إدخال (Stock In)</option>
                        <option value="OUT">إخراج (Stock Out)</option>
                    </select>
                </div>

                <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} required />

                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Movement'}</Button>
            </form>
        </div>
    );
};

export default InventoryFormPage;