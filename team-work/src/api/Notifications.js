import API from './axios';

export const getNotifications = () => API.get('/notifications/');
export const createNotification = (data) => API.post('/notifications/', data);
export const bulkCreateNotifications = (data) => API.post('/notifications/bulk/', data); // Renamed for clarity but kept consistent
export const getNotification = (id) => API.get(`/notifications/${id}/`);
export const deleteNotification = (id) => API.delete(`/notifications/${id}/`);
export const markNotificationAsRead = (id) => API.post(`/notifications/${id}/read/`);

// Retaining these if they are supported by backend, otherwise they can be removed or kept as potential features
export const markAllNotificationsAsRead = () => API.post('/notifications/mark-all-read/');
export const getUnreadNotificationsCount = () => API.get('/notifications/unread-count/');