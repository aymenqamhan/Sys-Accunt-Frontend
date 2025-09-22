import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSales } from '../../api/sales';
import { getPurchases } from '../../api/purchases';
// ✨ تم استبدال getSinglePayment بـ getPayment
import { getPayment, updatePayment, createPayment } from '../../api/payments';

const PaymentFormPage = () => {
    const [formData, setFormData] = useState({
        sale: '',
        purchase: '',
        amount: '',
        payment_date: '',
        payment_method: 'cash'
    });
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchSalesAndPurchases = async () => {
            try {
                const salesRes = await getSales();
                setSales(salesRes.data);
                const purchasesRes = await getPurchases();
                setPurchases(purchasesRes.data);
            } catch (error) {
                console.error('Failed to fetch sales or purchases', error);
            }
        };

        if (id) {
            const fetchPayment = async () => {
                try {
                    // ✨ تم استدعاء الدالة الصحيحة
                    const response = await getPayment(id);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Failed to fetch payment', error);
                }
            };
            fetchPayment();
        }
        fetchSalesAndPurchases();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updatePayment(id, formData);
            } else {
                await createPayment(formData);
            }
            navigate('/payments');
        } catch (error) {
            console.error('Failed to save payment', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Payment' : 'Create Payment'}</h2>
            <form onSubmit={handleSubmit}>
                <select name="sale" value={formData.sale} onChange={handleChange}>
                    <option value="">Select Sale (if applicable)</option>
                    {sales.map(sale => <option key={sale.sale_id} value={sale.sale_id}>Sale {sale.sale_id}</option>)}
                </select>
                <select name="purchase" value={formData.purchase} onChange={handleChange}>
                    <option value="">Select Purchase (if applicable)</option>
                    {purchases.map(purchase => <option key={purchase.purchase_id} value={purchase.purchase_id}>Purchase {purchase.purchase_id}</option>)}
                </select>
                <input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
                <input type="date" name="payment_date" value={formData.payment_date} onChange={handleChange} />
                <select name="payment_method" value={formData.payment_method} onChange={handleChange}>
                    <option value="cash">Cash</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                </select>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default PaymentFormPage;