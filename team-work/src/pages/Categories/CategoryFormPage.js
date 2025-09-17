import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCategory, getSingleCategory, updateCategory } from '../../api/categories';
import InputField from '../../components/Common/InputField/InputField';
import Button from '../../components/Common/Button/Button';
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
            // ... (error handling code remains the same)
            console.error('Save category error response:', err.response);
            if (err.response && err.response.data) {
                const errorData = err.response.data;
                const errorMessage = Object.values(errorData).flat().join(' ');
                setError(errorMessage || 'Failed to save category. Please check the data.');
            } else {
                setError('Failed to save category. A network error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div>
            <h1>{isEditMode ? 'Edit Category' : 'Create New Category'}</h1>
            <form onSubmit={handleSubmit}>
                {/* ✨ FIX: Changed 'name' to 'category_name' */}
                <InputField label="Name" name="category_name" value={formData.category_name} onChange={handleChange} required />
                <InputField label="Description" name="description" value={formData.description} onChange={handleChange} />
                {error && <p className="error-message">{error}</p>}
                <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Category'}</Button>
            </form>
        </div>
    );
};

export default CategoryFormPage;