// src/pages/TestPage.js
import React from 'react';
import Button from '../components/Common/Button/Button';
import InputField from '../components/Common/InputField/InputField';
import Card from '../components/Common/Card/Card'; // افترض أنك أنشأت مكون Card

const TestPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>صفحة اختبار المكونات</h1>

      {/* اختبار الأزرار */}
      <h2>Buttons</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Button variant="primary">زر أساسي</Button>
        <Button variant="secondary">زر ثانوي</Button>
        <Button disabled>زر معطل</Button>
      </div>

      {/* اختبار حقول الإدخال */}
      <h2>Input Fields</h2>
      <InputField label="الحالة الافتراضية" placeholder="أدخل النص هنا..." />
      <InputField label="حالة الخطأ" placeholder="حقل خاطئ" error="هذا الحقل مطلوب." />

      {/* يمكنك إضافة بقية المكونات هنا مثل Card, Loader, etc. */}
      {/* مثال للـ Card */}
      {/* <Card>محتوى البطاقة هنا</Card> */}

    </div>
  );
};

export default TestPage;