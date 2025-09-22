import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomers } from '../../api/customers';
import { getProducts } from '../../api/products';
// ✨ تم تصحيح أسماء الدوال المستوردة
import { getSale, updateSale, createSale } from '../../api/sales';
import './InvoiceForm.css';

const SalesInvoiceFormPage = () => {
    const [formData, setFormData] = useState({
        customer: '',
        sale_date: new Date().toISOString().slice(0, 10),
        total_amount: 0,
        details: [{ product: '', quantity: 1, unit_price: 0, total_price: 0 }]
    });
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const customersRes = await getCustomers();
                setCustomers(customersRes.data);
                const productsRes = await getProducts();
                setProducts(productsRes.data);
            } catch (error) {
                console.error('Failed to fetch initial data', error);
            }
        };

        if (id) {
            const fetchSale = async () => {
                try {
                    // ✨ تم استدعاء الدالة الصحيحة
                    const response = await getSale(id);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Failed to fetch sale', error);
                }
            };
            fetchSale();
        }
        fetchData();
    }, [id]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDetailChange = (index, e) => {
        const details = [...formData.details];
        details[index][e.target.name] = e.target.value;

        if (e.target.name === 'product') {
            const product = products.find(p => p.product_id.toString() === e.target.value);
            if (product) {
                details[index]['unit_price'] = product.sale_price;
            }
        }
        
        const quantity = parseFloat(details[index]['quantity']) || 0;
        const unit_price = parseFloat(details[index]['unit_price']) || 0;
        details[index]['total_price'] = quantity * unit_price;

        const total_amount = details.reduce((sum, item) => sum + item.total_price, 0);
        setFormData({ ...formData, details, total_amount });
    };

    const addDetail = () => {
        setFormData({
            ...formData,
            details: [...formData.details, { product: '', quantity: 1, unit_price: 0, total_price: 0 }]
        });
    };

    const removeDetail = (index) => {
        const details = [...formData.details];
        details.splice(index, 1);
        const total_amount = details.reduce((sum, item) => sum + item.total_price, 0);
        setFormData({ ...formData, details, total_amount });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                // ✨ تم استدعاء الدالة الصحيحة
                await updateSale(id, formData);
            } else {
                // ✨ تم استدعاء الدالة الصحيحة
                await createSale(formData);
            }
            navigate('/sales');
        } catch (error) {
            console.error('Failed to save sale', error);
        }
    };

    return (
        <div className="invoice-form-container">
            <h2>{id ? 'Edit Sale' : 'Create Sale'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for customer, date, etc. */}
                <button type="submit">Save Sale</button>
            </form>
        </div>
    );
};

export default SalesInvoiceFormPage;