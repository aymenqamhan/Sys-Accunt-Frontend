import React, { useState, useEffect } from 'react';
import { createCategory, getCategory, updateCategory } from '../../api/categories';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryFormPage = () => {
    const [formData, setFormData] = useState({
        // ✨ تم التعديل من 'name' إلى 'category_name'
        category_name: '',
        description: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchCategory = async () => {
                try {
                    const response = await getCategory(id);
                    setFormData({
                        category_name: response.data.category_name,
                        description: response.data.description,
                    });
                } catch (error) {
                    console.error('Failed to fetch category', error);
                }
            };
            fetchCategory();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateCategory(id, formData);
            } else {
                await createCategory(formData);
            }
            navigate('/categories');
        } catch (error) {
            console.error('Failed to save category', error);
        }
    };

    return (
        <div>
            <h2>{id ? 'Edit Category' : 'Create Category'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Category Name</label>
                    <input
                        type="text"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default CategoryFormPage;