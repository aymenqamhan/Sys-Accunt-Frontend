import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { LuX } from 'react-icons/lu'; 


const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button onClick={onClose} className="close-button">
            <LuX />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </>,
    document.getElementById('portal') 
  );
};

export default Modal;