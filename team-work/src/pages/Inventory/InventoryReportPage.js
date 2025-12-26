// // src/pages/Inventory/InventoryReportPage.jsx
// import React, { useEffect, useState } from 'react';
// import { getProducts } from '../../api/products';
// import { getInventoryItems } from '../../api/inventory'; // تحتاج تعمل هذا API
// import Loader from '../../components/Common/Loader/Loader';
// import { useNavigate, useParams } from 'react-router-dom';



// const InventoryReportPage = () => {
//     const [products, setProducts] = useState([]);
//     const [inventory, setInventory] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();
//     useEffect(() => {
//         const loadData = async () => {
//             setLoading(true);
//             try {
//                 const productsRes = await getProducts();
//                 setProducts(productsRes.data);

//                 const inventoryRes = await getInventoryItems();
//                 setInventory(inventoryRes.data);
//             } catch (err) {
//                 console.error('خطأ في جلب البيانات', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         loadData();
//     }, []);

//     if (loading) return <Loader />;

//     // --- 1. المنتجات قريبة الانتهاء (كمية أقل من 10 مثلاً) ---
//     const lowStock = products.filter(p => p.stock_quantity <= 10);
//     const totalValue = products.reduce((sum, p) => sum + (p.sale_price * p.stock_quantity), 0);
//     // --- 2. تقرير حركة المخزون (عدد الإدخال والإخراج) ---
//     const inMovements = inventory.filter(i => i.movement_type === 'IN').length;
//     const outMovements = inventory.filter(i => i.movement_type === 'OUT').length;

//     // --- 3. القيمة المالية ---
//     // const totalValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

//     return (
//         <div className="container mt-4" dir="rtl">
//             <div className="card shadow-sm mb-4">
//                 <div className="card-header bg-light py-3">
//                     <h1 className="h3 mb-0 text-center">تقرير حركة المخزون</h1>


//                 </div>

//                 <div className="card-body">

//                     {/* المرحلة 1: المنتجات قريبة الانتهاء */}
//                     <h4 className="mb-3"> المنتجات قريبة الانتهاء</h4>
//                     {lowStock.length > 0 ? (
//                         <ul className="list-group mb-4">
//                             {lowStock.map(p => (
//                                 <li key={p.product_id} className="list-group-item d-flex justify-content-between">
//                                     <span>{p.name}</span>
//                                     <span>الكمية: {p.quantity}</span>
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : <p>لا توجد منتجات قريبة الانتهاء.</p>}

//                     {/* المرحلة 2: تقرير الإدخال والإخراج */}
//                     <h4 className="mb-3"> ملخص حركة المخزون</h4>
//                     <p>عدد عمليات الإدخال: <strong>{inMovements}</strong></p>
//                     <p>عدد عمليات الإخراج: <strong>{outMovements}</strong></p>

//                     {/* المرحلة 3: القيمة المالية */}
//                     <h4 className="mb-3"> القيمة المالية للمخزون</h4>
//                     <p>إجمالي قيمة المخزون: <strong>{totalValue.toLocaleString()} ريال</strong></p>
//                     <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
//                         <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
//                             العودة للوحة التحكم
//                         </button>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InventoryReportPage;



// src/pages/Inventory/InventoryReportPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../api/products';
import { getInventoryItems } from '../../api/inventory';
import Loader from '../../components/Common/Loader/Loader';

// ✨ 1. استيراد المكتبات والمكونات اللازمة للرسوم البيانية
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';

// ✨ 2. تسجيل المكونات في ChartJS
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const InventoryReportPage = () => {
    const [products, setProducts] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const productsRes = await getProducts();
                setProducts(productsRes.data);

                const inventoryRes = await getInventoryItems();
                setInventory(inventoryRes.data);
            } catch (err) {
                console.error('خطأ في جلب البيانات', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <Loader />;

    // --- ✨ 3. تحضير البيانات للرسوم البيانية ---

    // أ. بيانات مخطط حركة المخزون (دائري)
    const inMovements = inventory.filter(i => i.movement_type === 'IN').length;
    const outMovements = inventory.filter(i => i.movement_type === 'OUT').length;
    const movementsData = {
        labels: ['عمليات الإدخال', 'عمليات الإخراج'],
        datasets: [{
            label: 'عدد الحركات',
            data: [inMovements, outMovements],
            backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        }],
    };

    // ب. بيانات مخطط المنتجات منخفضة المخزون (شريطي)
    const lowStockProducts = products.filter(p => p.stock_quantity <= 10);
    const lowStockData = {
        labels: lowStockProducts.map(p => p.name),
        datasets: [{
            label: 'الكمية المتبقية',
            data: lowStockProducts.map(p => p.stock_quantity),
            backgroundColor: 'rgba(255, 159, 64, 0.7)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1,
        }],
    };

    // ج. بيانات مخطط قيمة المخزون حسب الفئة (فطيرة)
    const valueByCategory = products.reduce((acc, product) => {
        const category = product.category_name || 'غير مصنف';
        const value = product.sale_price * product.stock_quantity;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += value;
        return acc;
    }, {});

    const categoryValueData = {
        labels: Object.keys(valueByCategory),
        datasets: [{
            label: 'قيمة المخزون',
            data: Object.values(valueByCategory),
            backgroundColor: [
                'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)',
                'rgba(153, 102, 255, 0.7)', 'rgba(255, 99, 132, 0.7)',
                'rgba(75, 192, 192, 0.7)', 'rgba(255, 159, 64, 0.7)',
            ],
            borderWidth: 1,
        }],
    };
    const totalValue = products.reduce((sum, p) => sum + (p.sale_price * p.stock_quantity), 0);

    return (
        <div className="container-fluid mt-4" dir="rtl">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">تقارير المخزون التفاعلية</h1>
                <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                    العودة للوحة التحكم
                </button>
            </div>

            {/* بطاقة القيمة الإجمالية */}
            <div className="card text-white bg-primary mb-4 shadow">
                <div className="card-body text-center">
                    <h5 className="card-title">💰 القيمة الإجمالية للمخزون</h5>
                    <p className="card-text fs-2 fw-bold">{totalValue.toLocaleString()} ريال</p>
                </div>
            </div>

            {/* صف الرسوم البيانية */}
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">📊 ملخص حركة المخزون</h5>
                            <Doughnut data={movementsData} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title text-center">📦 قيمة المخزون حسب الفئة</h5>
                            <Pie data={categoryValueData} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mt-2">
                <div className="card-body">
                    <h5 className="card-title text-center">⚠️ المنتجات التي قاربت على النفاد (10 أو أقل)</h5>
                    {lowStockProducts.length > 0 ? (
                        <Bar options={{ indexAxis: 'y', responsive: true }} data={lowStockData} />
                    ) : (
                        <p className="text-center mt-3">لا توجد منتجات قاربت على النفاد.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryReportPage;