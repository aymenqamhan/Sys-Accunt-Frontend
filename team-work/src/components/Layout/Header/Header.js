import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../../../api/apiService';
import './Header.css';

import userAvatar from '../../../assets/user-avatar.png';

const Header = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (error) {
        console.error("Header failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const renderUserContent = () => {
    if (loading) {
      return <span className="user-name">...جار التحميل</span>;
    }
    if (!user) {
      return <span className="user-name">زائر</span>;
    }
    return (
      <>
        <div className="user-info">
          <span className="user-name">{user.full_name || 'مستخدم'}</span>
          <span className="user-role">{user.role || 'عضو'}</span>
        </div>
        <img src={userAvatar} alt="User Avatar" className="user-avatar" />
      </>
    );
  };

  return (
    <header className="header">
      <div className="page-title">
        <h2>لوحة التحكم</h2>
      </div>
      <div className="user-profile">
        {renderUserContent()}
      </div>
    </header>
  );
};

export default Header;