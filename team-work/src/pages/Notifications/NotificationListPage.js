

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 1. استيراد دوال الـ API
import {
    getNotifications,
    deleteNotification,
    markNotificationAsRead,
    markAllNotificationsAsRead
} from '../../api/Notifications';

// 2. استيراد عميل Supabase
import { supabase } from '../../api/supabase';

// 3. استيراد الأيقونات
import { FaTrash, FaCheck, FaCheckDouble, FaPlus, FaBell } from 'react-icons/fa';

const NotificationListPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // دالة جلب البيانات
    const fetchNotifications = async () => {
        try {
            const response = await getNotifications();
            let data = [];
            if (Array.isArray(response.data)) {
                data = response.data;
            } else if (response.data && Array.isArray(response.data.results)) {
                data = response.data.results;
            }
            setNotifications(data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to load notifications.');
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    // useEffect للاستماع الفوري (Realtime)
    useEffect(() => {
        fetchNotifications();

        const channel = supabase
            .channel('realtime-notifications-list')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'notifications'
                },
                (payload) => {
                    console.log('🔔 New notification received:', payload.new);
                    setNotifications((prev) => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // دوال التعامل مع الأزرار
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this notification?')) return;
        setNotifications(prev => prev.filter(n => n.notification_id !== id));
        try {
            await deleteNotification(id);
        } catch (err) {
            alert('Failed to delete on server');
            fetchNotifications();
        }
    };

    const handleMarkAsRead = async (id) => {
        setNotifications(prev => prev.map(n =>
            n.notification_id === id ? { ...n, is_read: true } : n
        ));
        try {
            await markNotificationAsRead(id);
        } catch (err) {
            console.error('Error marking as read', err);
        }
    };

    const handleMarkAllRead = async () => {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
        try {
            await markAllNotificationsAsRead();
        } catch (err) {
            alert('Failed to mark all as read');
        }
    };

    // دالة مساعدة لتحديد لون التاج حسب النوع
    const getTypeColor = (type) => {
        switch (type) {
            case 'error': return 'var(--error)';
            case 'warning': return 'var(--warning)';
            case 'success': return 'var(--success)';
            default: return 'var(--primary-500)';
        }
    };

    // واجهة التحميل
    if (loading) return (
        <div className="flex justify-center items-center h-64" style={{ fontFamily: 'var(--font-family)' }}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: 'var(--primary-500)' }}></div>
        </div>
    );

    return (
        <div className="p-6 max-w-5xl mx-auto" style={{ fontFamily: 'var(--font-family)', color: 'var(--neutral-900)' }}>

            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--neutral-500)', color: 'var(--primary-500)' }}>
                        <FaBell className="text-xl" />
                    </div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--neutral-900)' }}>Notifications</h1>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold"
                        style={{ backgroundColor: 'var(--neutral-500)', color: 'var(--neutral-900)' }}>
                        {notifications.length}
                    </span>
                </div>

                <div className="flex space-x-3">
                    <button
                        onClick={handleMarkAllRead}
                        className="flex items-center px-4 py-2 border transition shadow-sm font-medium"
                        style={{
                            backgroundColor: 'var(--white)',
                            borderColor: 'var(--primary-500)',
                            color: 'var(--primary-500)',
                            borderRadius: 'var(--border-radius-main)'
                        }}
                    >
                        <FaCheckDouble className="mr-2" /> Mark All Read
                    </button>
                    <Link
                        to="/notifications/new"
                        className="flex items-center px-5 py-2 transition shadow-md font-medium text-white"
                        style={{
                            backgroundColor: 'var(--primary-500)',
                            borderRadius: 'var(--border-radius-main)'
                        }}
                    >
                        <FaPlus className="mr-2" /> New Notification
                    </Link>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="border-l-4 p-4 mb-6 rounded shadow-sm"
                    style={{
                        backgroundColor: '#FEF2F2', // Light red bg
                        borderColor: 'var(--error)',
                        color: 'var(--error)'
                    }}>
                    {error}
                </div>
            )}

            {/* Notifications List */}
            <div className="shadow-lg overflow-hidden border"
                style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: 'var(--border-radius-main)',
                    borderColor: 'var(--neutral-100)'
                }}>

                {!Array.isArray(notifications) || notifications.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="p-4 rounded-full mb-4" style={{ backgroundColor: 'var(--neutral-500)' }}>
                            <FaBell className="text-3xl" style={{ color: 'var(--disabled-text)' }} />
                        </div>
                        <h3 className="text-lg font-medium" style={{ color: 'var(--neutral-900)' }}>No notifications yet</h3>
                        <p className="mt-1" style={{ color: 'var(--disabled-text)' }}>We'll let you know when something arrives.</p>
                    </div>
                ) : (
                    <div className="divide-y" style={{ borderColor: 'var(--neutral-100)' }}>
                        {notifications.map((notification) => (
                            <div
                                key={notification.notification_id || Math.random()}
                                className="p-5 flex gap-4 transition-colors duration-200 hover:bg-opacity-50"
                                style={{
                                    backgroundColor: notification.is_read ? 'var(--white)' : 'var(--neutral-500)', // Unread gets neutral bg
                                    borderLeft: notification.is_read ? '4px solid transparent' : `4px solid var(--primary-500)`
                                }}
                            >
                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-lg"
                                            style={{ color: notification.is_read ? 'var(--neutral-900)' : 'var(--primary-500)' }}>
                                            {notification.title}
                                            {!notification.is_read && (
                                                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                                                    style={{ backgroundColor: 'var(--primary-500)' }}>
                                                    New
                                                </span>
                                            )}
                                        </h3>
                                        <span className="text-xs whitespace-nowrap ml-2" style={{ color: 'var(--disabled-text)' }}>
                                            {notification.created_at ? new Date(notification.created_at).toLocaleString('en-US') : ''}
                                        </span>
                                    </div>

                                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--neutral-900)' }}>
                                        {notification.message}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 rounded text-xs font-medium border"
                                            style={{
                                                color: getTypeColor(notification.notification_type),
                                                borderColor: getTypeColor(notification.notification_type),
                                                backgroundColor: 'var(--white)'
                                            }}>
                                            {notification.notification_type || 'Info'}
                                        </span>
                                        {notification.user_id && notification.user_id !== 0 && (
                                            <span className="px-2 py-1 rounded text-xs font-medium border"
                                                style={{
                                                    color: 'var(--neutral-900)',
                                                    backgroundColor: 'var(--neutral-500)',
                                                    borderColor: 'var(--neutral-100)'
                                                }}>
                                                User: {notification.user_id}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 justify-center ml-2 border-l pl-4" style={{ borderColor: 'var(--neutral-100)' }}>
                                    {!notification.is_read && (
                                        <button
                                            onClick={() => handleMarkAsRead(notification.notification_id)}
                                            className="p-2 rounded-lg transition"
                                            style={{ color: 'var(--primary-500)' }}
                                            title="Mark as Read"
                                        >
                                            <FaCheck />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(notification.notification_id)}
                                        className="p-2 rounded-lg transition hover:bg-red-50"
                                        style={{ color: 'var(--disabled-text)' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--error)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--disabled-text)'}
                                        title="Delete"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationListPage;