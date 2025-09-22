// src/pages/Products/ProductListPage.js (كامل)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/products';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response.data);
            } catch (err) {
                setError('فشل في جلب المنتجات.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleEdit = (id) => {
        navigate(`/products/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
            try {
                await deleteProduct(id);
                setProducts(currentProducts => currentProducts.filter(product => product.product_id !== id));
            } catch (err) {
                setError('فشل حذف المنتج.');
                console.error(err);
            }
        }
    };

    const columns = [
        { header: 'اسم المنتج', key: 'name' },
        { header: 'الفئة', key: 'category_name' },
        { header: 'سعر التكلفة', key: 'cost_price' },
        { header: 'سعر البيع', key: 'sale_price' },
        { header: 'الكمية بالمخزون', key: 'stock_quantity' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (product) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(product.product_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(product.product_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة المنتجات</h1>
                <Button onClick={() => navigate('/products/new')}>+ إضافة منتج جديد</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={products} />
        </div>
    );
};

export default ProductListPage;