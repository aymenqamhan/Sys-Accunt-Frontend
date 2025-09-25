import React from 'react';
import './PrintableInvoice.css'; // سنقوم بإنشاء هذا الملف للتنسيق
import logo from '../../assets/images/image.png'; // تأكد من أن مسار الشعار صحيح

// نستخدم forwardRef لتمرير المرجع من المكتبة إلى المكون
export const PrintableInvoice = React.forwardRef(({ invoice }, ref) => {
    if (!invoice) {
        return null;
    }

    // حساب الإجماليات
    const subtotal = invoice.sales_invoice_details.reduce((acc, item) => acc + (item.quantity * item.price), 0);
    // يمكنك إضافة حسابات للخصم والضريبة هنا إذا كانت متوفرة لكل عنصر

    return (
        <div className="invoice-box" ref={ref}>
            <header className="invoice-header">
                <div className="invoice-header-left">
                    <img src={logo} alt="IBEX PRO Logo" className="invoice-logo" />
                    <h1>IBEX PRO</h1>
                </div>
                <div className="invoice-header-right">
                    <h2>فاتورة مبيعات</h2>
                    <p><strong>رقم الفاتورة:</strong> #{invoice.invoice_id}</p>
                    <p><strong>تاريخ الفاتورة:</strong> {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                </div>
            </header>

            <section className="customer-details">
                <h3>فاتورة إلى:</h3>
                <p>{invoice.customer_name}</p>
                {/* يمكنك إضافة عنوان وهاتف العميل هنا إذا كانت البيانات متاحة */}
            </section>

            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>المنتج</th>
                        <th>الكمية</th>
                        <th>سعر الوحدة</th>
                        <th>المجموع الفرعي</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.sales_invoice_details.map((item, index) => (
                        <tr key={item.detail_id}>
                            <td>{index + 1}</td>
                            <td>{item.product_name}</td>
                            <td>{item.quantity}</td>
                            <td>{parseFloat(item.price).toFixed(2)}</td>
                            <td>{parseFloat(item.subtotal).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <section className="invoice-totals">
                <p><strong>المجموع الفرعي:</strong> {subtotal.toFixed(2)}</p>
                {/* يمكنك إضافة الخصم والضريبة هنا */}
                <p className="grand-total"><strong>الإجمالي النهائي:</strong> {parseFloat(invoice.total).toFixed(2)}</p>
            </section>

            <footer className="invoice-footer">
                <p><strong>شكرًا لتعاملكم معنا!</strong></p>
                <p>IBEX PRO | your-address@example.com | +123 456 7890</p>
            </footer>
        </div>
    );
});