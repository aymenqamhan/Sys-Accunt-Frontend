import React from 'react';

const InputField = ({ label, ...props }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...props} />
        </div>
    );
};

export default InputField;