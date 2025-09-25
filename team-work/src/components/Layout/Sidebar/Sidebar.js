import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import {
  LuLayoutDashboard, LuBoxes, LuShoppingCart,
  LuUsers, LuReceipt, LuSettings
} from 'react-icons/lu';

import IbexProLogo from '../../../assets/ibex-pro-logo-light.svg';

const navLinks = [
  { to: '/', text: 'لوحة التحكم', icon: <LuLayoutDashboard /> },
  { to: '/sales', text: 'إدارة المبيعات', icon: <LuShoppingCart /> },
  { to: '/purchases', text: 'إدارة المشتريات', icon: <LuReceipt /> },
  { to: '/inventory', text: 'إدارة المخزون', icon: <LuBoxes /> },
  { to: '/users', text: 'إدارة المستخدمين', icon: <LuUsers /> },
  { to: '/change-password', text: 'تغيير كلمة المرور', icon: <LuSettings /> },
  { to: '/profile', text: 'ملفي الشخصي', icon: <LuSettings /> },
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={IbexProLogo} alt="Ibex Pro Logo" className="logo" />
      </div>
      <nav className="sidebar-nav">
        <ul>
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className="nav-link">
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;