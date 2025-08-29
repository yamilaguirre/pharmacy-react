import React, { useState } from "react";
import Modal from "../common/Modal";

const SaleForm = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerId: "",
    discount: 0,
    items: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Sale">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer</label>
          <select
            value={formData.customerId}
            onChange={(e) => setFormData({...formData, customerId: e.target.value})}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          >
            <option value="">Select customer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Discount</label>
          <input
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({...formData, discount: e.target.value})}
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SaleForm;