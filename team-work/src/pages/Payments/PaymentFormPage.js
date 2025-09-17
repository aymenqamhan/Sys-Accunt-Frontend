import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPayment, getSinglePayment, updatePayment } from '../../api/payments';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const PaymentFormPage = () => {
    const [formData, setFormData] = useState({
        invoice_id: '',
        amount: '',
        payment_date: new Date().toISOString().slice(0, 10), // Default to today
        payment_method: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { paymentId } = useParams();
    const isEditMode = Boolean(paymentId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSinglePayment(paymentId)
                .then(response => setFormData(response.data))
                .catch(err => setError('Failed to fetch payment data.'))
                .finally(() => setLoading(false));
        }
    }, [paymentId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updatePayment(paymentId, formData);
            } else {
                await createPayment(formData);
            }
            navigate('/payments');
        } catch (err) {
            setError('Failed to save payment.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'Edit Payment' : 'Create New Payment'}</h1>
            <form onSubmit={handleSubmit}>
                <InputField label="Invoice ID" name="invoice_id" value={formData.invoice_id} onChange={handleChange} required />
                <InputField label="Amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleChange} required />
                <InputField label="Payment Date" name="payment_date" type="date" value={formData.payment_date} onChange={handleChange} required />
                <InputField label="Payment Method" name="payment_method" value={formData.payment_method} onChange={handleChange} />
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Payment'}</Button>
            </form>
        </div>
    );
};

export default PaymentFormPage;