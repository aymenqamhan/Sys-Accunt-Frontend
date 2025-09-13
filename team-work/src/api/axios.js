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
    baseURL: 'http://localhost:8000/api',
});

// --- 1. معترض الطلبات (Request Interceptor) ---
// هذا الجزء يضيف التوكن لكل طلب قبل إرساله
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
// هذا الجزء يتعامل مع الأخطاء، خاصة خطأ انتهاء صلاحية التوكن
apiClient.interceptors.response.use(
    (response) => response, // لا تفعل شيئًا إذا كان الطلب ناجحًا
    async (error) => {
        const originalRequest = error.config;

        // تحقق إذا كان الخطأ هو 401 (غير مصرح به) وأن الطلب لم تتم إعادة محاولته من قبل
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    window.location.href = '/login';
                    return Promise.reject(error);
                }

                // طلب access token جديد
                const response = await refreshTokenAPI({ refresh: refreshToken });
                const newAccessToken = response.data.access;

                // حفظ التوكن الجديد
                localStorage.setItem('token', newAccessToken);

                // تحديث هيدر الطلب الأصلي بالتوكن الجديد
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                // إعادة محاولة الطلب الأصلي الذي فشل
                return apiClient(originalRequest);

            } catch (refreshError) {
                // إذا فشل التجديد أيضًا، قم بتسجيل خروج المستخدم
                localStorage.clear(); // مسح كل شيء
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// قم بتغيير اسم المتغير هنا إذا كنت تستخدم apiClient في بقية مشروعك
// إذا كنت تستخدم API، اتركها كما هي: export default API;
export default apiClient;