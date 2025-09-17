import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories, deleteCategory } from '../../api/categories';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
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
                setError('Failed to fetch categories.');
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
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory(categoryId);
                // ✨ FIX 1: Filter using the correct ID field
                setCategories(categories.filter(category => category.category_id !== categoryId));
            } catch (err) {
                setError('Failed to delete category.');
            }
        }
    };

    const columns = [
        // ✨ FIX 2: The key should match the API field name ('category_name')
        { header: 'Category Name', key: 'category_name' },
        { header: 'Description', key: 'description' },
        {
            header: 'Actions',
            key: 'actions',
            render: (row) => (
                <div>
                    {/* ✨ FIX 3: Use the correct ID field from the row data */}
                    <Button onClick={() => handleEdit(row.category_id)} style={{ marginRight: '5px' }}>Edit</Button>
                    <Button onClick={() => handleDelete(row.category_id)} variant="secondary">Delete</Button>
                </div>
            )
        }
    ];

    if (loading) return <Loader />;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            {/* This is the header section you already have */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Category Management</h1>
                <Button onClick={() => navigate('/categories/new')}>+ Add New Category</Button>
            </div>

            {/* ✨ FIX: You were missing this line to display the table ✨ */}
            <Table columns={columns} data={categories} />
        </div>
    );
};

export default CategoryListPage;
