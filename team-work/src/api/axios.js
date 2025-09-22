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


// import axios from 'axios';
import { refreshToken as refreshTokenAPI } from './auth';

// const apiClient = axios.create({
//     baseURL: 'http://localhost:8000/api',
// });

// // --- 1. معترض الطلبات (Request Interceptor) ---
// // هذا الجزء يضيف التوكن لكل طلب قبل إرساله
// apiClient.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// //----------------------------------------------------------
// // الربط مع السرفر السحابي الجديد 
// //----------------------------------------------------------
// import axios from 'axios';

// const apiClient = axios.create({
//     baseURL: 'https://as-praivite.vercel.app' // <--- هذا هو التعديل المطلوب
// });

// // ... باقي الكود المسؤول عن إضافة التوكن تلقائياً
// apiClient.interceptors.request.use(req => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
// });

// export default apiClient;   




// ///----------------------------------------------------------





// // --- 2. معترض الاستجابة (Response Interceptor) ---
// // هذا الجزء يتعامل مع الأخطاء، خاصة خطأ انتهاء صلاحية التوكن
// apiClient.interceptors.response.use(
//     (response) => response, // لا تفعل شيئًا إذا كان الطلب ناجحًا
//     async (error) => {
//         const originalRequest = error.config;

//         // تحقق إذا كان الخطأ هو 401 (غير مصرح به) وأن الطلب لم تتم إعادة محاولته من قبل
//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const refreshToken = localStorage.getItem('refreshToken');
//                 if (!refreshToken) {
//                     window.location.href = '/login';
//                     return Promise.reject(error);
//                 }

//                 // طلب access token جديد
//                 const response = await refreshTokenAPI({ refresh: refreshToken });
//                 const newAccessToken = response.data.access;

//                 // حفظ التوكن الجديد
//                 localStorage.setItem('token', newAccessToken);

//                 // تحديث هيدر الطلب الأصلي بالتوكن الجديد
//                 originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

//                 // إعادة محاولة الطلب الأصلي الذي فشل
//                 return apiClient(originalRequest);

//             } catch (refreshError) {
//                 // إذا فشل التجديد أيضًا، قم بتسجيل خروج المستخدم
//                 localStorage.clear(); // مسح كل شيء
//                 window.location.href = '/login';
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// قم بتغيير اسم المتغير هنا إذا كنت تستخدم apiClient في بقية مشروعك
// إذا كنت تستخدم API، اتركها كما هي: export default API;
// export default apiClient;



import axios from 'axios';

// سيتم التعامل مع دالة تسجيل الخروج من خلال الـ interceptor مباشرة
// بدلاً من استيرادها هنا لتجنب الاستيراد الدائري (circular dependency)

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000',
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    // إذا لم يوجد refresh token، قم بتسجيل الخروج
                    window.location.href = '/login';
                    return Promise.reject(error);
                }
                const response = await axios.post(`${apiClient.defaults.baseURL}/api/token/refresh/`, {
                    refresh: refreshToken,
                });
                const { access } = response.data;
                localStorage.setItem('accessToken', access);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return apiClient(originalRequest);
            } catch (err) {
                console.error("Refresh token failed, logging out.", err);
                // فشل تحديث التوكن، قم بإزالة التوكنات وتوجيه المستخدم لصفحة تسجيل الدخول
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(err);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;