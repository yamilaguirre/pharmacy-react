import React from "react";
import Modal from "./Modal";

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar", type = "danger" }) => {
  const buttonStyles = {
    danger: "bg-red-500 hover:bg-red-600",
    warning: "bg-yellow-500 hover:bg-yellow-600",
    success: "bg-green-500 hover:bg-green-600"
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="max-w-md">
      <div className="text-gray-600 mb-6">
        {message}
      </div>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          {cancelText}
        </button>
        <button
          onClick={onConfirm}
          className={`px-6 py-2 ${buttonStyles[type]} text-white rounded-md transition-colors`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;