import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getSingleCategory, updateCategory } from '../../api/categories';
import Loader from '../../components/Common/Loader/Loader';

const CategoryFormPage = () => {
    const [formData, setFormData] = useState({
        category_name: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const isEditMode = Boolean(categoryId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSingleCategory(categoryId)
                .then(response => setFormData(response.data))
                .catch(err => setError('Failed to fetch category data.'))
                .finally(() => setLoading(false));
        }
    }, [categoryId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateCategory(categoryId, formData);
            } else {
                await createCategory(formData);
            }
            navigate('/categories');
        } catch (err) {
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                const errorMessage = Object.values(errorData).flat().join(' ');
                setError(errorMessage || 'فشل في حفظ الفئة. يرجى التحقق من البيانات.');
            } else {
                setError('فشل في حفظ الفئة. حدث خطأ في الشبكة.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل فئة' : 'إنشاء فئة جديدة'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="category_name" className="form-label">اسم الفئة</label>
                            <input
                                id="category_name"
                                name="category_name"
                                className="form-control"
                                value={formData.category_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">الوصف (اختياري)</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ الفئة'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryFormPage;