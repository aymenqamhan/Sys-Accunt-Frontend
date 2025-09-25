
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { createCurrency, getSingleCurrency, updateCurrency } from '../../api/currencies';
// import InputField from '../../components/Common/InputField/InputField';
// import Button from '../../components/Common/Button/Button';
// import Loader from '../../components/Common/Loader/Loader';

// const CurrencyFormPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         code: '',
//         exchange_rate: ''
//     });
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const { currencyId } = useParams();
//     const isEditMode = Boolean(currencyId);

//     useEffect(() => {
//         if (isEditMode) {
//             setLoading(true);
//             getSingleCurrency(currencyId)
//                 .then(response => setFormData(response.data))
//                 .catch(err => setError('Failed to fetch currency data.'))
//                 .finally(() => setLoading(false));
//         }
//     }, [currencyId, isEditMode]);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError('');
//         try {
//             if (isEditMode) {
//                 await updateCurrency(currencyId, formData);
//             } else {
//                 await createCurrency(formData);
//             }
//             navigate('/currencies');
//         } catch (err) {
//             setError('Failed to save currency.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading && isEditMode) return <Loader />;

//     return (
//         <div>
//             <h1>{isEditMode ? 'Edit Currency' : 'Create New Currency'}</h1>
//             <form onSubmit={handleSubmit}>
//                 <InputField label="Currency Name" name="name" value={formData.name} onChange={handleChange} required />
//                 <InputField label="Code (e.g., USD)" name="code" value={formData.code} onChange={handleChange} required />
//                 {/* ⚠️ تعديل: استبدال حقل symbol بحقل exchange_rate */}
//                 <InputField
//                     label="Exchange Rate"
//                     name="exchange_rate"
//                     type="number" // من الأفضل أن يكون رقمًا
//                     step="any" // للسماح بالكسور العشرية
//                     value={formData.exchange_rate}
//                     onChange={handleChange}
//                     required
//                 />
//                 {error && <p className="error-message">{error}</p>}
//                 <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Currency'}</Button>
//             </form>
//         </div>
//     );
// };

// export default CurrencyFormPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCurrency, getSingleCurrency, updateCurrency } from '../../api/currencies';
import Loader from '../../components/Common/Loader/Loader';

const CurrencyFormPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        exchange_rate: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { currencyId } = useParams();
    const isEditMode = Boolean(currencyId);

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            getSingleCurrency(currencyId)
                .then(response => setFormData(response.data))
                .catch(err => setError('فشل في جلب بيانات العملة.'))
                .finally(() => setLoading(false));
        }
    }, [currencyId, isEditMode]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await updateCurrency(currencyId, formData);
            } else {
                await createCurrency(formData);
            }
            navigate('/currencies');
        } catch (err) {
            setError('فشل في حفظ العملة.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <Loader />;

    return (
        <div className="container mt-4" dir="rtl">
            <div className="card shadow-sm">
                <div className="card-header bg-light py-3">
                    <h1 className="h3 mb-0 text-center">{isEditMode ? 'تعديل عملة' : 'إنشاء عملة جديدة'}</h1>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">اسم العملة</label>
                                <input id="name" name="name" value={formData.name} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="code" className="form-label">الرمز (مثال: USD)</label>
                                <input id="code" name="code" value={formData.code} onChange={handleChange} required className="form-control" />
                            </div>
                            <div className="col-12">
                                <label htmlFor="exchange_rate" className="form-label">سعر الصرف (مقابل العملة الأساسية)</label>
                                <input id="exchange_rate" name="exchange_rate" type="number" step="any" value={formData.exchange_rate} onChange={handleChange} required className="form-control" />
                            </div>
                        </div>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                            <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                                {loading ? 'جاري الحفظ...' : 'حفظ العملة'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CurrencyFormPage;