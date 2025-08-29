import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import categoryService from "../../assets/services/categoryService.js";

const ProductForm = ({ isOpen, onClose, onSave, product = null, title }) => {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    description: "",
    unit: "",
    weight: "",
    categoryId: "",
    purchasePrice: "",
    salePrice: "",
    imageUrl: "",
    currentStock: "",
    desiredStock: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        code: "",
        name: "",
        description: "",
        unit: "",
        weight: "",
        categoryId: "",
        purchasePrice: "",
        salePrice: "",
        imageUrl: "",
        currentStock: "",
        desiredStock: "",
      });
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      categoryService.fetchCategories()
        .then(setCategories)
        .catch(console.error);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { categoryId, ...productFields } = formData;
    const productData = {
      ...productFields,
      category: {
        id: categoryId
      }
    };
    onSave(productData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">
              Product Code
            </label>
            <input
              type="text"
              name="code"
              id="code"
              value={formData.code}
              onChange={handleChange}
              required
              maxLength={255}
              title="Product code"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={255}
              title="Product name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            required
            maxLength={255}
            title="Product description"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
              Unit
            </label>
            <input
              type="text"
              name="unit"
              id="unit"
              value={formData.unit}
              onChange={handleChange}
              required
              maxLength={255}
              title="Unit of measurement"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
              Weight
            </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              title="Product weight"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryId"
              id="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="purchasePrice" className="block text-sm font-medium text-gray-700">
              Purchase Price
            </label>
            <input
              type="number"
              name="purchasePrice"
              id="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              title="Purchase price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700">
              Sale Price
            </label>
            <input
              type="number"
              name="salePrice"
              id="salePrice"
              value={formData.salePrice}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              title="Sale price"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label htmlFor="currentStock" className="block text-sm font-medium text-gray-700">
              Current Stock
            </label>
            <input
              type="number"
              name="currentStock"
              id="currentStock"
              value={formData.currentStock}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              title="Current stock"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="desiredStock" className="block text-sm font-medium text-gray-700">
              Desired Stock
            </label>
            <input
              type="number"
              name="desiredStock"
              id="desiredStock"
              value={formData.desiredStock}
              onChange={handleChange}
              min="0"
              title="Desired stock level"
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
              placeholder="example: product.jpg"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
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
            {product ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductForm;
