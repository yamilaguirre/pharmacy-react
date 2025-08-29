import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const CategoryForm = ({ isOpen, onClose, onSave, category = null, title }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    } else {
      setFormData({
        name: "",
        imageUrl: "",
      });
    }
  }, [category]);

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
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Category Name
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
            title="Category name, minimum 2 characters"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image Name
          </label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            pattern=".*\.(jpg|jpeg|png|gif|webp)$"
            title="Must be a valid image file (.jpg, .jpeg, .png, .gif, .webp)"
            placeholder="example: category.jpg"
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
            {category ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CategoryForm;