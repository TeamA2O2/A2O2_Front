import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, closeModal, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{message}</h2>
        <button className="modal-button" onClick={closeModal}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default Modal;
