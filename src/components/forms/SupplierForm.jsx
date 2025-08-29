import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const SupplierForm = ({ isOpen, onClose, onSave, supplier = null, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    identificationNumber: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {
    if (supplier) {
      setFormData(supplier);
    } else {
      setFormData({
        name: "",
        identificationNumber: "",
        phoneNumber: "",
        address: "",
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Supplier Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={255}
              title="Minimum 2 characters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label htmlFor="identificationNumber" className="block text-sm font-medium text-gray-700">
              Identification Number
            </label>
            <input
              type="text"
              name="identificationNumber"
              id="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              required
              maxLength={255}
              title="Supplier identification number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              title="Phone number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={200}
            title="Minimum 10 characters for address"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
          >
            {supplier ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SupplierForm;