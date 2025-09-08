import React from 'react';
import './InputField.css';


const InputField = ({ label, error, ...props }) => {
  const inputClassName = `input-field ${error ? 'error' : ''}`;

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input className={inputClassName} {...props} />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;