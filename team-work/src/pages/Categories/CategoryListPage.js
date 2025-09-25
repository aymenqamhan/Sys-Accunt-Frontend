import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../api/categories';
import Loader from '../../components/Common/Loader/Loader';

const CategoryListPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCategories();
                setCategories(response.data);
            } catch (err) {
                setError('فشل في جلب الفئات.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleEdit = (categoryId) => {
        navigate(`/categories/edit/${categoryId}`);
    };

    const handleDelete = async (categoryId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذه الفئة؟')) {
            try {
                await deleteCategory(categoryId);
                setCategories(categories.filter(category => category.category_id !== categoryId));
            } catch (err) {
                setError('فشل حذف الفئة.');
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">إدارة الفئات</h1>
                <button className="btn btn-primary" onClick={() => navigate('/categories/new')}>
                    + إضافة فئة جديدة
                </button>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">اسم الفئة</th>
                                    <th scope="col">الوصف</th>
                                    <th scope="col" className="text-center">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr key={category.category_id}>
                                        <td>{category.category_name}</td>
                                        <td>{category.description}</td>
                                        <td className="text-center">
                                            <div className="btn-group" role="group">
                                                <button onClick={() => handleEdit(category.category_id)} className="btn btn-sm btn-outline-primary">تعديل</button>
                                                <button onClick={() => handleDelete(category.category_id)} className="btn btn-sm btn-outline-danger">حذف</button>
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

export default CategoryListPage;