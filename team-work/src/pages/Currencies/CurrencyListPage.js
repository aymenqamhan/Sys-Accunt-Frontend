

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrencies, deleteCurrency } from '../../api/currencies';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const CurrencyListPage = () => {
    const [currencies, setCurrencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await getCurrencies();
                setCurrencies(response.data);
            } catch (err) {
                setError('Failed to fetch currencies.');
            } finally {
                setLoading(false);
            }
        };
        fetchCurrencies();
    }, []);

    const handleEdit = (currencyId) => {
        navigate(`/currencies/edit/${currencyId}`);
    };

    const handleDelete = async (currencyId) => {
        if (window.confirm('Are you sure you want to delete this currency?')) {
            try {
                await deleteCurrency(currencyId);
                // ⚠️ تعديل: استخدام currency_id للمقارنة
                setCurrencies(currencies.filter(currency => currency.currency_id !== currencyId));
            } catch (err) {
                setError('Failed to delete currency.');
            }
        }
    };

    const columns = [
        { header: 'Currency Name', key: 'name' },
        { header: 'Code', key: 'code' },
        // ⚠️ تعديل: استبدال Symbol بـ Exchange Rate
        { header: 'Exchange Rate', key: 'exchange_rate' },
        {
            header: 'Actions',
            key: 'actions',
            render: (row) => (
                <div>
                    {/* ⚠️ تعديل: استخدام row.currency_id */}
                    <Button onClick={() => handleEdit(row.currency_id)} style={{ marginRight: '5px' }}>Edit</Button>
                    <Button onClick={() => handleDelete(row.currency_id)} variant="secondary">Delete</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Currency Management</h1>
                <Button onClick={() => navigate('/currencies/new')}>+ Add New Currency</Button>
            </div>
            <Table columns={columns} data={currencies} />
        </div>
    );
};

export default CurrencyListPage;