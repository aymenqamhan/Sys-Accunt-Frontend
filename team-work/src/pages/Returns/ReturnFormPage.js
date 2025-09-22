import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSales } from '../../api/sales';
// ✨ تم استبدال getReturnDetails بـ getReturn
import { getReturn, updateReturn, createReturn } from '../../api/returns';

const ReturnFormPage = () => {
    const [formData, setFormData] = useState({
        sale: '',
        return_date: '',
        reason: ''
    });
    const [sales, setSales] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await getSales();
                setSales(response.data);
            } catch (error) {
                console.error('Failed to fetch sales', error);
            }
        };

        if (id) {
            const fetchReturnDetails = async () => {
                try {
                    // ✨ تم استدعاء الدالة الصحيحة
                    const response = await getReturn(id);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Failed to fetch return details', error);
                }
            };
            fetchReturnDetails();
        }
        fetchSales();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateReturn(id, formData);
            } else {
                await createReturn(formData);
            }
            navigate('/returns');
        } catch (error) {
            console.error('Failed to save return', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Return' : 'Create Return'}</h2>
            <form onSubmit={handleSubmit}>
                <select name="sale" value={formData.sale} onChange={handleChange}>
                    <option value="">Select Sale</option>
                    {sales.map(sale => <option key={sale.sale_id} value={sale.sale_id}>Sale {sale.sale_id}</option>)}
                </select>
                <input type="date" name="return_date" value={formData.return_date} onChange={handleChange} />
                <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder="Reason"></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default ReturnFormPage;