import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createReturn, getReturnDetails, updateReturn } from '../../api/returns';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ReturnFormPage = () => {
    // FIX: Updated form state to match API fields
    const [formData, setFormData] = useState({
        product: '',
        customer: '',
        quantity: 1,
        amount: 0,
        reason: '',
        return_date: new Date().toISOString().slice(0, 10),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { returnId } = useParams();
    const isEditMode = Boolean(returnId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getReturnDetails(returnId)
                .then(response => setFormData(response.data))
                .catch(err => setError('Failed to fetch return data.'))
                .finally(() => setLoading(false));
        }
    }, [returnId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateReturn(returnId, formData);
            } else {
                await createReturn(formData);
            }
            navigate('/returns');
        } catch (err) {
            setError('Failed to save return.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'Edit Return' : 'Create New Return'}</h1>
            <form onSubmit={handleSubmit}>
                {/* FIX: Updated form fields */}
                <InputField label="Product ID" name="product" value={formData.product} onChange={handleChange} required />
                <InputField label="Customer ID" name="customer" value={formData.customer} onChange={handleChange} required />
                <InputField label="Quantity" name="quantity" type="number" value={formData.quantity} onChange={handleChange} required />
                <InputField label="Amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
                <InputField label="Reason" name="reason" value={formData.reason} onChange={handleChange} required />
                <InputField label="Return Date" name="return_date" type="date" value={formData.return_date} onChange={handleChange} required />
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Return'}</Button>
            </form>
        </div>
    );
};

export default ReturnFormPage;