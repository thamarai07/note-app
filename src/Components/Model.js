import React, { useEffect, useRef, useState } from 'react';
import "../App.css"
import { UpdateLocalStorageNote } from '../Functions.js/updateLocalStorage';

const Modal = ({ isOpen, onClose, children, title, id }) => {

  const [from, setform] = useState({
    title: title,
    description: children
  })
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  const handleUpdate = (id) => {
    UpdateLocalStorageNote("notes", id, from)
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex="-1"
        ref={modalRef}
      >
        <div className="modal-header">
          {title && <input id="modal-title" value={from.title} onChange={(e) => setform({ ...from, title: e.target.value })} />}
          <span className="modal-close-button" onClick={onClose} aria-label="Close modal">
            &times;
          </span>
        </div>
        <div className="modal-body">
          <textarea value={from.description} onChange={(e) => setform({ ...from, description: e.target.value })}>
          </textarea>
        </div>
        <button className='update_btn' onClick={() => handleUpdate(id)}>Update</button>
      </div>
    </div>
  );
};

export default Modal;