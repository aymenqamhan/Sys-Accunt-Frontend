
# 📝 نظرة عامة على هيكلية المشروع

يتبع المشروع هيكلية ملفات قياسية وقابلة للتوسع لتطبيق **React**.  
تم تصميم هذه الهيكلية للحفاظ على الكود منظمًا وسهل الصيانة، مما يسهل على أعضاء الفريق الجدد فهمه والتعامل معه.

---

## 📂 الهيكل العام للمشروع

```bash
/team-work/
├── public/
├── src/
│   ├── api/
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
│   ├── store/
│   ├── utils/
│   ├── App.js
│   └── index.js
└── ...
📖 شرح تفصيلي للمجلدات
🔹 public/
يحتوي على الأصول الثابتة (Static Assets) التي لا تتم معالجتها بواسطة Webpack.

يتم نسخها مباشرة إلى مجلد البناء عند التجميع.

أهم الملفات:

index.html: نقطة الدخول للتطبيق.

logo192.png، logo512.png، manifest.json: خاصة بتطبيقات PWA وميزات المتصفح.

🔹 src/ (جوهر التطبيق)
📌 api/
مخصص لاتصالات API وطلبات الشبكة.

أمثلة على الملفات:

axios.js: إعداد مركزي لـ Axios (الـ BaseURL والإعدادات الافتراضية).

auth.js: دوال مصادقة المستخدمين (login, register, verifyToken).

products.js, purchases.js, sales.js: دوال خاصة بكل ميزة.

📌 assets/
يحتوي على جميع ملفات الوسائط:

fonts/: الخطوط المخصصة.

icons/: الأيقونات (SVG/PNG).

images/: الصور المستخدمة في الواجهة.

📌 components/
يضم المكونات القابلة لإعادة الاستخدام.

منظم بطريقة "مكون لكل مجلد":

Common/: مكونات عامة (Button, InputField, Loader, Modal, Table).

Layout/: لتخطيط الواجهة (Header, Sidebar).

📌 pages/
يحتوي على الصفحات الأساسية للتطبيق:

Auth/: صفحات تسجيل الدخول والتسجيل (LoginPage.js, RegisterPage.js).

Customers/، Products/، Sales/: صفحات الميزات المختلفة.

📌 store/
مخصص لإدارة الحالة (State Management) مثل Redux أو Zustand.

📌 utils/
دوال مساعدة لا تنتمي لمكون محدد:

businessRules.js: منطق العمل الأساسي.

formValidators.js: التحقق من صحة مدخلات النماذج.

📌 ملفات رئيسية
App.js: المكون الرئيسي + إعداد التوجيه (React Router).

index.js: نقطة الدخول التي تربط React مع index.html.

⚙️ تثبيت المتطلبات

>npm install
لتشغيل المشروع محليًا على السرفر http://localhost:3000/ :


>npm start
✅ مميزات الهيكلية
تنظيم واضح وقابل للتوسع.

سهولة التنقل وفهم الكود.

دعم لإعادة الاستخدام (Reusable Components).

جاهزية لإدارة الحالة والتكامل مع API.








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

