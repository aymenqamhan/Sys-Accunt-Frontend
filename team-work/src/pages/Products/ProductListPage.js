import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../api/products';
import Loader from '../../components/Common/Loader/Loader'; // Loader ما زال مستخدماً

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

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة المنتجات</h1>
                <button className="btn btn-primary" onClick={() => navigate('/products/new')}>
                    <i className="bi bi-plus-lg me-2"></i> {/* أيقونة اختيارية */}
                    إضافة منتج جديد
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">الرقم</th>
                                    <th scope="col">صورة</th>
                                    <th scope="col">الاسم</th>
                                    <th scope="col">الفئة</th>
                                    <th scope="col">باركود</th>
                                    <th scope="col">سعر التكلفة</th>
                                    <th scope="col">سعر البيع</th>
                                    <th scope="col">الكمية</th>
                                    <th scope="col">تاريخ الانتهاء</th>
                                    <th scope="col">كمية منخفضة؟</th>
                                    <th scope="col">منتهي الصلاحية؟</th>
                                    <th scope="col">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.product_id}>
                                        <td>{product.product_id}</td>
                                        <td>
                                            <img
                                                src={product.image || 'https://via.placeholder.com/50'}
                                                alt={product.name}
                                                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.category_name}</td>
                                        <td>{product.barcode}</td>
                                        <td>{product.cost_price}</td>
                                        <td>{product.sale_price}</td>
                                        <td>{product.stock_quantity}</td>
                                        <td>{product.expiry_date}</td>
                                        <td>
                                            {product.is_low_stock
                                                ? <span className="badge bg-warning text-dark">نعم</span>
                                                : <span className="badge bg-light text-muted">لا</span>
                                            }
                                        </td>
                                        <td>
                                            {product.is_expired
                                                ? <span className="badge bg-danger">نعم</span>
                                                : <span className="badge bg-success">لا</span>
                                            }
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(product.product_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(product.product_id)} className="btn btn-sm btn-outline-danger">حذف</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListPage;