import React, { useState, useEffect } from 'react';
// ✨ تم استبدال getSingleCurrency بـ getCurrency
import { getCurrency, createCurrency, updateCurrency } from '../../api/currencies';
import { useNavigate, useParams } from 'react-router-dom';

const CurrencyFormPage = () => {
    const [formData, setFormData] = useState({
        currency_code: '',
        currency_name: '',
        exchange_rate: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchCurrency = async () => {
                try {
                    // ✨ تم استدعاء الدالة الصحيحة
                    const response = await getCurrency(id);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Failed to fetch currency', error);
                }
            };
            fetchCurrency();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateCurrency(id, formData);
            } else {
                await createCurrency(formData);
            }
            navigate('/currencies');
        } catch (error) {
            console.error('Failed to save currency', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Currency' : 'Create Currency'}</h2>
            <form onSubmit={handleSubmit}>
                <input name="currency_code" value={formData.currency_code} onChange={handleChange} placeholder="Currency Code" />
                <input name="currency_name" value={formData.currency_name} onChange={handleChange} placeholder="Currency Name" />
                <input name="exchange_rate" value={formData.exchange_rate} onChange={handleChange} placeholder="Exchange Rate" />
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CurrencyFormPage;