import React from "react";
import { Dialog } from '@headlessui/react';

const Modal = ({ isOpen, onClose, title, children, size = "max-w-2xl" }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className={`bg-white rounded-xl shadow-lg w-full ${size} p-6 md:p-8`}>
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-800">
              {title}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;