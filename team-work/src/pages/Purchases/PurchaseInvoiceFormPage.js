import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getSuppliers } from '../../api/suppliers';
import { getProducts } from '../../api/products';
// ✨ تم تصحيح أسماء الدوال المستوردة
import { getPurchase, updatePurchase, createPurchase } from '../../api/purchases';
import './../Sales/InvoiceForm.css';

const PurchaseInvoiceFormPage = () => {
    const [formData, setFormData] = useState({
        supplier: '',
        purchase_date: new Date().toISOString().slice(0, 10),
        total_amount: 0,
        details: [{ product: '', quantity: 1, unit_price: 0, total_price: 0 }]
    });
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const suppliersRes = await getSuppliers();
                setSuppliers(suppliersRes.data);
                const productsRes = await getProducts();
                setProducts(productsRes.data);
            } catch (error) {
                console.error('Failed to fetch initial data', error);
            }
        };

        if (id) {
            const fetchPurchase = async () => {
                try {
                    // ✨ تم استدعاء الدالة الصحيحة
                    const response = await getPurchase(id);
                    setFormData(response.data);
                } catch (error) {
                    console.error('Failed to fetch purchase', error);
                }
            };
            fetchPurchase();
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
                details[index]['unit_price'] = product.purchase_price;
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
                await updatePurchase(id, formData);
            } else {
                // ✨ تم استدعاء الدالة الصحيحة
                await createPurchase(formData);
            }
            navigate('/purchases');
        } catch (error) {
            console.error('Failed to save purchase', error);
        }
    };

    return (
        <div className="invoice-form-container">
            <h2>{id ? 'Edit Purchase' : 'Create Purchase'}</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for supplier, date, etc. */}
                <button type="submit">Save Purchase</button>
            </form>
        </div>
    );
};

export default PurchaseInvoiceFormPage;