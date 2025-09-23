// // import axios from 'axios';

// // const API = axios.create({ baseURL: 'http://localhost:8000/api' });

// // API.interceptors.request.use((req) => {
// //     if (localStorage.getItem('token')) {
// //         req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
// //     }
// //     return req;
// // });

// // export default API;

// import axios from 'axios';

// const API = axios.create({ baseURL: 'http://localhost:8000/api' });

// // استخدام معترض الطلبات للتعامل مع التوكن تلقائيًا
// API.interceptors.request.use(
//     (req) => {
//         // قراءة التوكن من التخزين المحلي للمتصفح
//         const token = localStorage.getItem('token');

//         // إذا كان التوكن موجودًا، يتم إضافته إلى رأس الطلب
//         if (token) {
//             req.headers.Authorization = `Bearer ${token}`;
//         }

//         // إرجاع الطلب المعدل ليكمل طريقه إلى السيرفر
//         return req;
//     },
//     (error) => {
//         // هذا الجزء للتعامل مع أي خطأ قد يحدث أثناء محاولة إعداد الطلب
//         return Promise.reject(error);
//     }
// );

// export default API;


import axios from 'axios';
import { refreshToken as refreshTokenAPI } from './auth';

const apiClient = axios.create({
    // 👇 --- تم تصحيح الرابط هنا --- 👇
    baseURL: 'https://as-praivite.vercel.app/api',
});

// --- 1. معترض الطلبات (Request Interceptor) ---
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// --- 2. معترض الاستجابة (Response Interceptor) ---
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const response = await refreshTokenAPI({ refresh: refreshToken });
                const newAccessToken = response.data.access;
                localStorage.setItem('token', newAccessToken);
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                localStorage.clear();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;