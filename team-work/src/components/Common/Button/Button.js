import React from 'react';
import './Button.css';

const Button = ({ variant = 'primary', children, ...props }) => {
  return (
    <button className={`btn ${variant}`} {...props}>
      {children}
    </button>
  );
};

export default Button;