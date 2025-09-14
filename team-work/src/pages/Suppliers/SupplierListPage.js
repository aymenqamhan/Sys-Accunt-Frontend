import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSuppliers, deleteSupplier } from '../../api/suppliers';
import Table from '../../components/Common/Table/Table';
import Button from '../../components/Common/Button/Button';
import Loader from '../../components/Common/Loader/Loader';

const SupplierListPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await getSuppliers();
                setSuppliers(response.data);
            } catch (err) {
                setError('فشل في جلب الموردين.');
            } finally {
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);

    const handleEdit = (id) => {
        navigate(`/suppliers/edit/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المورد؟')) {
            try {
                await deleteSupplier(id);
                setSuppliers(currentSuppliers => currentSuppliers.filter(supplier => supplier.supplier_id !== id));
            } catch (err) {
                setError('فشل حذف المورد.');
            }
        }
    };

    const columns = [
        { header: 'الاسم', key: 'name' },
        { header: 'البريد الإلكتروني', key: 'email' },
        { header: 'الهاتف', key: 'phone' },
        { header: 'العنوان', key: 'address' },
        {
            header: 'الإجراءات',
            key: 'actions',
            render: (supplier) => (
                <div style={{ display: 'flex', gap: '5px' }}>
                    <Button onClick={() => handleEdit(supplier.supplier_id)}>تعديل</Button>
                    <Button onClick={() => handleDelete(supplier.supplier_id)} variant="secondary">حذف</Button>
                </div>
            )
        }
    ];
    
    if (loading) return <Loader />;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>إدارة الموردين</h1>
                <Button onClick={() => navigate('/suppliers/new')}>+ إضافة مورد جديد</Button>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Table columns={columns} data={suppliers} />
        </div>
    );
};

export default SupplierListPage;