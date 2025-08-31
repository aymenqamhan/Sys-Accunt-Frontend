
### -================================================================

### `نظرة عامة على هيكلية المشروع`

يتبع المشروع هيكلية ملفات قياسية وقابلة للتوسع لتطبيق React. هذه الهيكلية مصممة للحفاظ على الكود منظمًا وسهل الصيانة، ويسهل على أعضاء الفريق الجدد فهمه.

`تعرف تشوف باهيكل داخل المشروع بالتفصيل الهيكل العام `
/team-work/
├── public/
├── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── pages/
│ ├── store/
│ ├── utils/
│ ├── App.js
│ └── index.js
└── ...

### شرح تفصيلي للمجلدات

### public/

`هذا المجلد يحتوي على الأصول الثابتة التي لا يتم معالجتها بواسطة Webpack. يتم نسخها مباشرة إلى مجلد البناء عند تجميع المشروع.`

### index.html:` ملف HTML الرئيسي للتطبيق. يعمل كنقطة دخول لتطبيق React بأكمله.`

ملفات أخرى: أصول مثل logo192.png وlogo512.png وmanifest.json التي تُستخدم في تطبيقات الويب التقدمية (PWA) وميزات المتصفح الأخرى.

### src/

هذا هو جوهر التطبيق حيث يوجد كل الكود المصدر.

### api/

هذا المجلد مخصص للتعامل مع جميع اتصالات API وطلبات الشبكة إلى الواجهة الخلفية. كل ملف هنا يمثل مجموعة محددة من نقاط اتصال API.

### axios.js: `ملف الإعداد المركزي لمكتبة Axios. يمكن أن يتضمن إعدادات افتراضية مثل عنوان URL الأساسي لـ API.`

### auth.js: `يحتوي على جميع الدوال المتعلقة بمصادقة المستخدمين، مثل login وregister وchangePassword وverifyToken.`

### products.js، purchases.js، sales.js، `إلخ.: كل ملف من هذه الملفات يجمع دوال API الخاصة بميزة معينة، مما يجعل الكود منظمًا.`

### assets/

`مستودع مركزي لجميع ملفات الوسائط الثابتة المستخدمة في التطبيق.`

### fonts/

`الخطوط المخصصة.`

### icons/

`ملفات الأيقونات (SVG أو PNG).`

### images/

`جميع الصور المستخدمة في واجهة المستخدم.`

### components/

`هذا المجلد يضم المكونات القابلة لإعادة الاستخدام والتي لا تحتوي على حالة خاصة بها. هذه المكونات معيارية ويمكن استخدامها في صفحات مختلفة.`

### Common/

`مجلد فرعي للمكونات العامة للغاية التي يمكن استخدامها في أي مكان في التطبيق.`

### Button/, `الازرار`

### InputField/، `حقول الادخال`

### Loader/،` مؤشر تحميل`

### Modal/،`يحتوي على مكون نافذة منبثقة (Modal) هذه النوافذ تُستخدم لإظهار محتوى مهم أو طلب إدخال من المستخدم دون الانتقال إلى صفحة جديدة`

### Table/:`ستخدم لتنظيم المكونات المتعلقة بـ الجداول. قد يحتوي هذا المجلد على مكونات فرعية مثل TableHeader و TableRow و TableCell لإنشاء جدول مرن وقابل لإعادة الاستخدام.`

### Layout/ `يحتوي كل مجلد على المكون وملف CSS الخاص به، مما يتبع هيكلية "مكون لكل مجلد" لتنظيم أفضل.`

### Header/، Sidebar/` المكونات التي تحدد الهيكل العام وتخطيط التطبيق.`

### pages/ `مكونات شريط التنقل العلوي وشريط التنقل الجانبي`.

### Auth/ `هذا المجلد يحتوي على المكونات الرئيسية للتطبيق. كل مجلد فرعي يمثل عادةً قسمًا أو ميزة رئيسية.`

### Customers/، Products/، Sales/ `يحتوي على جميع الصفحات المتعلقة بالمصادقة مثل LoginPage.js وRegisterPage.js. هذه الصفحات هي نقاط الدخول لمصادقة المستخدمين.`

### store/ `إلخ.: يحتوي كل مجلد على الصفحات المطلوبة لميزة عمل محددة مثل صفحة قائمة وصفحة نموذج.`

### utils/ `هذا المجلد مخصص لإدارة الحالة (state management). هنا يمكنك إعداد مكتبة مثل Redux أو Zustand. وجوده يضمن أن حالة التطبيق مركزية ويمكن الوصول إليها من أي مكون.`

`يحتوي على دوال مساعدة مفيدة عبر التطبيق ولكنها لا تنتمي إلى مكون أو API معين`

`businessRules.js`: دوال تتعامل مع منطق العمل الأساسي.

`formValidators.js`: دوال قابلة لإعادة الاستخدام للتحقق من صحة مدخلات النماذج.

`App.js`: المكون الرئيسي للتطبيق. عادة ما يتعامل مع التوجيه (routing) باستخدام React Router، ويحدد أي مكون يتم عرضه لكل مسار URL.



`index.js`: نقطة الدخول الرئيسية لتطبيق React. يقوم بعرض المكون App.js في ملف index.html.

### تثبيت المتطلبات

> npm istall




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

