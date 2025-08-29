import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import supplierService from "../../assets/services/supplierService.js";
import productService from "../../assets/services/productService.js";

const PurchaseForm = ({ isOpen, onClose, onSave, purchase = null }) => {
  const [formData, setFormData] = useState({
    supplierId: "",
    purchaseDate: "",
    batches: [{ productId: "", quantity: "", expirationDate: "" }]
  });

  useEffect(() => {
    if (purchase) {
      setFormData({
        supplierId: purchase.supplierId || "",
        purchaseDate: purchase.purchaseDate || "",
        batches: purchase.batches || [{ productId: "", quantity: "", expirationDate: "" }]
      });
    } else {
      setFormData({
        supplierId: "",
        purchaseDate: "",
        batches: [{ productId: "", quantity: "", expirationDate: "" }]
      });
    }
  }, [purchase]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isOpen) {
      supplierService.fetchSuppliers().then(setSuppliers).catch(console.error);
      productService.fetchProducts().then(setProducts).catch(console.error);
    }
  }, [isOpen]);

  const addBatch = () => {
    setFormData({
      ...formData,
      batches: [...formData.batches, { productId: "", quantity: "", expirationDate: "" }]
    });
  };

  const removeBatch = (index) => {
    setFormData({
      ...formData,
      batches: formData.batches.filter((_, i) => i !== index)
    });
  };

  const updateBatch = (index, field, value) => {
    const updatedBatches = formData.batches.map((batch, i) => 
      i === index ? { ...batch, [field]: value } : batch
    );
    setFormData({ ...formData, batches: updatedBatches });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={purchase ? "Edit Purchase" : "New Purchase"} size="max-w-4xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Supplier</label>
            <select
              value={formData.supplierId}
              onChange={(e) => setFormData({...formData, supplierId: e.target.value})}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            >
              <option value="">Select supplier</option>
              {suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Purchase Date</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Products</label>
            <button type="button" onClick={addBatch} className="text-blue-600 text-sm">+ Add Product</button>
          </div>
          {formData.batches.map((batch, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 mb-2 p-2 border rounded">
              <select
                value={batch.productId}
                onChange={(e) => updateBatch(index, 'productId', e.target.value)}
                required
                className="rounded-md border-gray-300 shadow-sm p-2 border"
              >
                <option value="">Select product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>{product.name}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Quantity"
                value={batch.quantity}
                onChange={(e) => updateBatch(index, 'quantity', e.target.value)}
                required
                min="1"
                className="rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <input
                type="date"
                value={batch.expirationDate}
                onChange={(e) => updateBatch(index, 'expirationDate', e.target.value)}
                required
                className="rounded-md border-gray-300 shadow-sm p-2 border"
              />
              <button type="button" onClick={() => removeBatch(index)} className="text-red-600 text-sm">
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 border rounded">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Save Purchase
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PurchaseForm;