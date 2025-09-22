
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCurrency, getSingleCurrency, updateCurrency } from '../../api/currencies';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const CurrencyFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        exchange_rate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { currencyId } = useParams();
    const isEditMode = Boolean(currencyId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSingleCurrency(currencyId)
                .then(response => setFormData(response.data))
                .catch(err => setError('Failed to fetch currency data.'))
                .finally(() => setLoading(false));
        }
    }, [currencyId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateCurrency(currencyId, formData);
            } else {
                await createCurrency(formData);
            }
            navigate('/currencies');
        } catch (err) {
            setError('Failed to save currency.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'Edit Currency' : 'Create New Currency'}</h1>
            <form onSubmit={handleSubmit}>
                <InputField label="Currency Name" name="name" value={formData.name} onChange={handleChange} required />
                <InputField label="Code (e.g., USD)" name="code" value={formData.code} onChange={handleChange} required />
                {/* ⚠️ تعديل: استبدال حقل symbol بحقل exchange_rate */}
                <InputField
                    label="Exchange Rate"
                    name="exchange_rate"
                    type="number" // من الأفضل أن يكون رقمًا
                    step="any" // للسماح بالكسور العشرية
                    value={formData.exchange_rate}
                    onChange={handleChange}
                    required
                />
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Currency'}</Button>
            </form>
        </div>
    );
};

export default CurrencyFormPage;