// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createNotification, bulkCreateNotifications } from '../../api/Notifications';

// const NotificationFormPage = () => {
//     const navigate = useNavigate();
//     const [mode, setMode] = useState('single'); // 'single' or 'bulk'

//     // Single mode state
//     const [singleData, setSingleData] = useState({
//         user_id: '',
//         title: '',
//         message: '',
//         notification_type: 'info',
//         data: ''
//     });

//     // Bulk mode state
//     const [bulkNotifications, setBulkNotifications] = useState([]);
//     const [currentBulkItem, setCurrentBulkItem] = useState({
//         user_id: '',
//         title: '',
//         message: '',
//         notification_type: 'info',
//         data: ''
//     });

//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSingleChange = (e) => {
//         setSingleData({ ...singleData, [e.target.name]: e.target.value });
//     };

//     const handleBulkItemChange = (e) => {
//         setCurrentBulkItem({ ...currentBulkItem, [e.target.name]: e.target.value });
//     };

//     const addBulkItem = () => {
//         if (!currentBulkItem.title || !currentBulkItem.message) {
//             alert('Title and Message are required');
//             return;
//         }
//         setBulkNotifications([...bulkNotifications, currentBulkItem]);
//         setCurrentBulkItem({
//             user_id: '',
//             title: '',
//             message: '',
//             notification_type: 'info',
//             data: ''
//         });
//     };

//     const removeBulkItem = (index) => {
//         setBulkNotifications(bulkNotifications.filter((_, i) => i !== index));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             if (mode === 'single') {
//                 await createNotification({
//                     ...singleData,
//                     user_id: parseInt(singleData.user_id) || 0
//                 });
//             } else {
//                 if (bulkNotifications.length === 0) {
//                     setError('Please add at least one notification for bulk send.');
//                     setLoading(false);
//                     return;
//                 }
//                 const formattedData = {
//                     notifications: bulkNotifications.map(n => ({
//                         ...n,
//                         user_id: parseInt(n.user_id) || 0
//                     }))
//                 };
//                 await bulkCreateNotifications(formattedData);
//             }
//             navigate('/notifications');
//         } catch (err) {
//             console.error(err);
//             setError('Failed to send notification(s). ' + (err.response?.data?.detail || err.message));
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="p-6 max-w-4xl mx-auto">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold text-gray-800">
//                         {mode === 'single' ? 'Send Notification' : 'Bulk Notifications'}
//                     </h1>
//                     <div className="space-x-2 bg-gray-100 p-1 rounded-lg">
//                         <button
//                             type="button"
//                             onClick={() => setMode('single')}
//                             className={`px-4 py-2 rounded-md text-sm font-medium transition ${mode === 'single' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         >
//                             Single
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setMode('bulk')}
//                             className={`px-4 py-2 rounded-md text-sm font-medium transition ${mode === 'bulk' ? 'bg-white shadow text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
//                         >
//                             Bulk Send
//                         </button>
//                     </div>
//                 </div>

//                 {error && (
//                     <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
//                         {error}
//                     </div>
//                 )}

//                 <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">

//                     {/* Input Fields */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
//                             <input
//                                 type="text"
//                                 name="title"
//                                 required={mode === 'single'}
//                                 value={mode === 'single' ? singleData.title : currentBulkItem.title}
//                                 onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                             <select
//                                 name="notification_type"
//                                 value={mode === 'single' ? singleData.notification_type : currentBulkItem.notification_type}
//                                 onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//                             >
//                                 <option value="info">Info</option>
//                                 <option value="warning">Warning</option>
//                                 <option value="error">Error</option>
//                                 <option value="success">Success</option>
//                             </select>
//                         </div>
//                         <div className="md:col-span-2">
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
//                             <textarea
//                                 name="message"
//                                 rows="3"
//                                 required={mode === 'single'}
//                                 value={mode === 'single' ? singleData.message : currentBulkItem.message}
//                                 onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//                             ></textarea>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">User ID (0 for all)</label>
//                             <input
//                                 type="number"
//                                 name="user_id"
//                                 value={mode === 'single' ? singleData.user_id : currentBulkItem.user_id}
//                                 onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">Extra Data (Optional)</label>
//                             <input
//                                 type="text"
//                                 name="data"
//                                 value={mode === 'single' ? singleData.data : currentBulkItem.data}
//                                 onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
//                                 className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>
//                     </div>

//                     {/* Bulk Actions */}
//                     {mode === 'bulk' && (
//                         <div className="mb-8 border-t pt-4">
//                             <button
//                                 type="button"
//                                 onClick={addBulkItem}
//                                 className="w-full bg-gray-100 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-200 transition mb-4 border border-gray-300 border-dashed"
//                             >
//                                 + Add to Batch
//                             </button>

//                             {bulkNotifications.length > 0 && (
//                                 <div className="space-y-2">
//                                     <h3 className="font-semibold text-gray-700">Batch List ({bulkNotifications.length})</h3>
//                                     {bulkNotifications.map((item, idx) => (
//                                         <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
//                                             <div>
//                                                 <span className="font-medium text-gray-900">{item.title}</span>
//                                                 <span className="text-gray-500 text-sm mx-2">-</span>
//                                                 <span className="text-gray-600 text-sm truncate max-w-xs">{item.message}</span>
//                                             </div>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => removeBulkItem(idx)}
//                                                 className="text-red-500 hover:text-red-700 text-sm"
//                                             >
//                                                 Remove
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}

//                     <div className="flex justify-end pt-4 border-t">
//                         <button
//                             type="submit"
//                             disabled={loading || (mode === 'bulk' && bulkNotifications.length === 0)}
//                             className={`bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition font-semibold disabled:opacity-50`}
//                         >
//                             {loading ? 'Sending...' : (mode === ' single' ? 'Send notification' : 'Send Bulk notifications')}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default NotificationFormPage;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNotification, bulkCreateNotifications } from '../../api/Notifications';
// إضافة أيقونات لتحسين المظهر
// أضف FaPlus إلى قائمة الاستيراد
import { FaPaperPlane, FaLayerGroup, FaUser, FaInfoCircle, FaTrash, FaPlus } from 'react-icons/fa';
const NotificationFormPage = () => {
    const navigate = useNavigate();
    const [mode, setMode] = useState('single'); // 'single' or 'bulk'

    // Single mode state
    const [singleData, setSingleData] = useState({
        user_id: '',
        title: '',
        message: '',
        notification_type: 'info',
        data: ''
    });

    // Bulk mode state
    const [bulkNotifications, setBulkNotifications] = useState([]);
    const [currentBulkItem, setCurrentBulkItem] = useState({
        user_id: '',
        title: '',
        message: '',
        notification_type: 'info',
        data: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSingleChange = (e) => {
        setSingleData({ ...singleData, [e.target.name]: e.target.value });
    };

    const handleBulkItemChange = (e) => {
        setCurrentBulkItem({ ...currentBulkItem, [e.target.name]: e.target.value });
    };

    const addBulkItem = () => {
        if (!currentBulkItem.title || !currentBulkItem.message) {
            alert('Title and Message are required');
            return;
        }
        setBulkNotifications([...bulkNotifications, currentBulkItem]);
        setCurrentBulkItem({
            user_id: '',
            title: '',
            message: '',
            notification_type: 'info',
            data: ''
        });
    };

    const removeBulkItem = (index) => {
        setBulkNotifications(bulkNotifications.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === 'single') {
                await createNotification({
                    ...singleData,
                    user_id: parseInt(singleData.user_id) || 0
                });
            } else {
                if (bulkNotifications.length === 0) {
                    setError('Please add at least one notification for bulk send.');
                    setLoading(false);
                    return;
                }
                const formattedData = {
                    notifications: bulkNotifications.map(n => ({
                        ...n,
                        user_id: parseInt(n.user_id) || 0
                    }))
                };
                await bulkCreateNotifications(formattedData);
            }
            navigate('/notifications');
        } catch (err) {
            console.error(err);
            setError('Failed to send notification(s). ' + (err.response?.data?.detail || err.message));
        } finally {
            setLoading(false);
        }
    };

    // أنماط مشتركة للحقول (Input Styles)
    const inputStyle = {
        borderColor: 'var(--neutral-500)',
        borderRadius: 'var(--border-radius-main)',
        color: 'var(--neutral-900)',
        fontFamily: 'var(--font-family)',
        backgroundColor: 'var(--white)'
    };

    const labelStyle = {
        color: 'var(--neutral-900)',
        marginBottom: '0.5rem',
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500'
    };

    return (
        <div className="p-6 max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-family)', color: 'var(--neutral-900)' }}>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--neutral-500)', color: 'var(--primary-500)' }}>
                        {mode === 'single' ? <FaPaperPlane className="text-xl" /> : <FaLayerGroup className="text-xl" />}
                    </div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--neutral-900)' }}>
                        {mode === 'single' ? 'Send Notification' : 'Bulk Notifications'}
                    </h1>
                </div>

                {/* Mode Toggle Switch */}
                <div className="flex p-1 rounded-lg" style={{ backgroundColor: 'var(--neutral-100)' }}>
                    <button
                        type="button"
                        onClick={() => setMode('single')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2`}
                        style={{
                            backgroundColor: mode === 'single' ? 'var(--white)' : 'transparent',
                            color: mode === 'single' ? 'var(--primary-500)' : 'var(--disabled-text)',
                            boxShadow: mode === 'single' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            borderRadius: 'var(--border-radius-main)'
                        }}
                    >
                        <FaUser className="text-xs" /> Single
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode('bulk')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2`}
                        style={{
                            backgroundColor: mode === 'bulk' ? 'var(--white)' : 'transparent',
                            color: mode === 'bulk' ? 'var(--primary-500)' : 'var(--disabled-text)',
                            boxShadow: mode === 'bulk' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                            borderRadius: 'var(--border-radius-main)'
                        }}
                    >
                        <FaLayerGroup className="text-xs" /> Bulk
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="border-l-4 p-4 mb-6 rounded shadow-sm flex items-center"
                    style={{
                        backgroundColor: '#FEF2F2',
                        borderColor: 'var(--error)',
                        color: 'var(--error)'
                    }}>
                    <FaInfoCircle className="mr-2" />
                    {error}
                </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="shadow-lg p-8 border"
                style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: 'var(--border-radius-main)',
                    borderColor: 'var(--neutral-100)'
                }}>

                {/* Input Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Title */}
                    <div className="md:col-span-1">
                        <label style={labelStyle}>Title *</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Notification title..."
                            required={mode === 'single'}
                            value={mode === 'single' ? singleData.title : currentBulkItem.title}
                            onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
                            className="w-full px-4 py-2 border outline-none focus:ring-2 transition-shadow"
                            style={inputStyle}
                        />
                    </div>

                    {/* Type */}
                    <div className="md:col-span-1">
                        <label style={labelStyle}>Type</label>
                        <select
                            name="notification_type"
                            value={mode === 'single' ? singleData.notification_type : currentBulkItem.notification_type}
                            onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
                            className="w-full px-4 py-2 border outline-none focus:ring-2 transition-shadow"
                            style={inputStyle}
                        >
                            <option value="info">Info ℹ️</option>
                            <option value="warning">Warning ⚠️</option>
                            <option value="error">Error ❌</option>
                            <option value="success">Success ✅</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div className="md:col-span-2">
                        <label style={labelStyle}>Message *</label>
                        <textarea
                            name="message"
                            rows="3"
                            placeholder="Write your message here..."
                            required={mode === 'single'}
                            value={mode === 'single' ? singleData.message : currentBulkItem.message}
                            onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
                            className="w-full px-4 py-2 border outline-none focus:ring-2 transition-shadow"
                            style={inputStyle}
                        ></textarea>
                    </div>

                    {/* User ID */}
                    <div>
                        <label style={labelStyle}>User ID (0 for all)</label>
                        <input
                            type="number"
                            name="user_id"
                            placeholder="e.g. 25"
                            value={mode === 'single' ? singleData.user_id : currentBulkItem.user_id}
                            onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
                            className="w-full px-4 py-2 border outline-none focus:ring-2 transition-shadow"
                            style={inputStyle}
                        />
                    </div>

                    {/* Extra Data */}
                    <div>
                        <label style={labelStyle}>Extra Data (JSON/Text)</label>
                        <input
                            type="text"
                            name="data"
                            placeholder='e.g. {"product_id": 5}'
                            value={mode === 'single' ? singleData.data : currentBulkItem.data}
                            onChange={mode === 'single' ? handleSingleChange : handleBulkItemChange}
                            className="w-full px-4 py-2 border outline-none focus:ring-2 transition-shadow"
                            style={inputStyle}
                        />
                    </div>
                </div>

                {/* Bulk Mode Actions Area */}
                {mode === 'bulk' && (
                    <div className="mb-8 pt-6 border-t border-dashed" style={{ borderColor: 'var(--neutral-500)' }}>
                        <button
                            type="button"
                            onClick={addBulkItem}
                            className="w-full py-3 rounded-md font-semibold transition-all border border-dashed flex items-center justify-center gap-2 hover:bg-opacity-80"
                            style={{
                                backgroundColor: 'var(--neutral-100)',
                                color: 'var(--neutral-900)',
                                borderColor: 'var(--neutral-500)',
                                borderRadius: 'var(--border-radius-main)'
                            }}
                        >
                            <FaPlus className="text-sm" /> Add to Batch
                        </button>

                        {/* List of items to be sent */}
                        {bulkNotifications.length > 0 && (
                            <div className="mt-4 space-y-3">
                                <h3 className="font-bold text-sm" style={{ color: 'var(--neutral-900)' }}>
                                    Batch List ({bulkNotifications.length})
                                </h3>
                                <div className="max-h-60 overflow-y-auto pr-2">
                                    {bulkNotifications.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center p-3 rounded border"
                                            style={{
                                                backgroundColor: 'var(--neutral-100)',
                                                borderColor: 'var(--neutral-500)',
                                                borderRadius: 'var(--border-radius-main)'
                                            }}>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm" style={{ color: 'var(--primary-500)' }}>
                                                    {item.title}
                                                </span>
                                                <span className="text-xs truncate max-w-xs" style={{ color: 'var(--neutral-900)' }}>
                                                    {item.message}
                                                </span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeBulkItem(idx)}
                                                className="text-sm p-2 rounded hover:bg-red-50 transition"
                                                style={{ color: 'var(--error)' }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer / Submit Button */}
                <div className="flex justify-end pt-4 border-t" style={{ borderColor: 'var(--neutral-100)' }}>
                    <button
                        type="submit"
                        disabled={loading || (mode === 'bulk' && bulkNotifications.length === 0)}
                        className="px-8 py-3 rounded-md font-semibold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
                        style={{
                            backgroundColor: 'var(--primary-500)',
                            borderRadius: 'var(--border-radius-main)'
                        }}
                    >
                        {loading ? (
                            <>Sending...</>
                        ) : (
                            <>
                                <FaPaperPlane />
                                {mode === 'single' ? 'Send Notification' : 'Send Bulk Notifications'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NotificationFormPage;