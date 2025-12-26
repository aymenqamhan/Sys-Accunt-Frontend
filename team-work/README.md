# 📌 هيكلية المشروع

المشروع مبني باستخدام **React** بهيكلية ملفات قياسية تساعد على التعامل مع Api للتكامل مع جزء الــ backend وتتميز :

- 🗂️ التنظيم
- ⚡ سهولة الصيانة
- 🚀 قابلية التوسع

---

## 📂 شجرة المجلدات

```bash
/team-work/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   ├── axios.js
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── sales.js
│   │   ...
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   └── images/
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Button/
│   │   │   ├── InputField/
│   │   │   ├── Loader/
│   │   │   ├── Modal/
│   │   │   └── Table/
│   │   └── Layout/
│   │       ├── Header/
│   │       └── Sidebar/
│   ├── pages/
│   │   ├── Auth/
│   │   ├── Customers/
│   │   ├── Products/
│   │   └── Sales/
│   │   ...
│   ├── store/
│   ├── utils/
│   │   ├── businessRules.js
│   │   └── formValidators.js
│   ├── App.js
│   └── index.js
└── package.json
```

📖 شرح المجلدات
public/ → يحتوي على الأصول الثابتة مثل index.html وملفات PWA (manifest, icons).

src/ → قلب التطبيق:

api/: جميع دوال الاتصال بـ API.

assets/: الخطوط، الأيقونات، الصور.

components/: المكونات القابلة لإعادة الاستخدام.

pages/: الصفحات الأساسية (Auth, Products, Sales...).

store/: إدارة الحالة (Redux/Zustand).

utils/: دوال مساعدة مثل التحقق من النماذج.

App.js: المكون الرئيسي للتطبيق.

index.js: نقطة الدخول.

⚙️ تشغيل المشروع

### 1. نسخ المشروع الخاص بالـــ backend

```bash
git clone https://github.com/Akil-x/AS.git
cd AS
```

### 2. إنشاء وتفعيل البيئة الافتراضية

```bash
python -m venv venv
source venv/bin/activate   # على Linux / Mac
venv\Scripts\activate      # على Windows
```

### 3. تثبيت المتطلبات

```bash
pip install -r requirements.txt
```

### 4. تنفيذ الهجرات (migrations)

```bash
python manage.py migrate
```

### 5. تشغيل الخادم

```bash
python manage.py runserver
```

سيعمل الخادم على:
👉 `http://127.0.0.1:8000/`

---

1️⃣ نسخ المشروع الخاص بالــ frontend

```bash
git clone https://github.com/aymenqamhan/Sys-Accunt-Frontend.git
cd team-work
```

2️⃣ تثبيت المتطلبات

```bash
npm install
```

3️⃣ تشغيل الخادم المحلي للـ Backend

```bash
python manage.py runserver
```

🔗 يعمل على: http://127.0.0.1:8000/

4️⃣ تشغيل واجهة React (في Terminal آخر)

```bash
npm start
```

🔗 يعمل على: http://localhost:3000/

---

# تحديث نظام الإشعارات (New Notification System)

تمت إعادة بناء نظام الإشعارات بالكامل في هذا التحديث ليدعم التنبيهات اللحظية (Realtime) وتوحيد الهوية البصرية للنظام.

## أبرز الاضافات

### 1. إشعارات لحظية (Realtime Support)

- تم الربط مع خدمة **Supabase Realtime**.
- يستمع النظام الآن لأي تغييرات في قاعدة البيانات (Event: `INSERT`) ويقوم بإظهار الإشعار للمستخدم **فوراً** دون الحاجة لإعادة تحميل الصفحة (Refresh).

### 2. واجهة مستخدم جديدة (UI/UX Overhaul)

- **الهوية البصرية:** تطبيق ألوان الهوية المعتمدة (Primary & Neutral Colors).
- **الخطوط:** اعتماد خط **Cairo** في جميع واجهات الإشعارات.
- **تفاعلية:** تمييز بصري واضح بين الإشعارات المقروءة وغير المقروءة، مع ألوان مخصصة لكل نوع تنبيه (Info, Warning, Error, Success).

### 3. إدارة متقدمة للإرسال

- **نموذج موحد:** صفحة جديدة تتيح للمسؤول إرسال إشعار لمستخدم واحد (**Single**) أو لمجموعة مستخدمين دفعة واحدة (**Bulk**).
- **التحقق:** إضافة قيود للتحقق من صحة البيانات قبل الإرسال لمنع الأخطاء.

---

## متطلبات التشغيل لهذا التحديث

لضمان عمل الإشعارات الجديدة، يرجى تنفيذ الخطوات التالية في مجلد مشروع الـــ **Frontend**:

### 1️ تثبيت المكتبات الجديدة

تمت إضافة مكتبات للتعامل مع Supabase والأيقونات، لذا يجب تشغيل:

```bash
npm install @supabase/supabase-js react-icons
```

### this is opcional

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
