import React, { useState, useEffect } from "react";
import supplierService from "../services/supplierService.js";
import SupplierForm from "../../components/forms/SupplierForm.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSupplierFormOpen, setIsSupplierFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    supplierService
      .fetchSuppliers()
      .then((data) => {
        setSuppliers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching suppliers:", err);
        setError("Failed to load suppliers. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
          Supplier List 🚚
        </h2>
        <button
          onClick={() => {
            setSelectedSupplier(null);
            setIsSupplierFormOpen(true);
          }}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Supplier
        </button>
      </div>
      {suppliers.length > 0 ? (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Phone</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Address</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{supplier.name}</td>
                  <td className="px-4 py-3 text-gray-600">{supplier.phoneNumber}</td>
                  <td className="px-4 py-3 text-purple-600 font-semibold">{supplier.address}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSupplier(supplier);
                          setIsSupplierFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSupplierToDelete(supplier);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center">
          No suppliers found.
        </p>
      )}

      <SupplierForm
        isOpen={isSupplierFormOpen}
        onClose={() => {
          setIsSupplierFormOpen(false);
          setSelectedSupplier(null);
        }}
        onSave={async (supplierData) => {
          try {
            if (selectedSupplier) {
              const updatedSupplier = await supplierService.updateSupplier(selectedSupplier.id, supplierData);
              setSuppliers(suppliers.map(supplier => 
                supplier.id === selectedSupplier.id ? updatedSupplier : supplier
              ));
            } else {
              const newSupplier = await supplierService.createSupplier(supplierData);
              setSuppliers([...suppliers, newSupplier]);
            }
            setIsSupplierFormOpen(false);
            setSelectedSupplier(null);
          } catch (error) {
            console.error("Error saving supplier:", error);
            setError(error.message);
          }
        }}
        supplier={selectedSupplier}
        title={selectedSupplier ? "Edit Supplier" : "Add New Supplier"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSupplierToDelete(null);
        }}
        onConfirm={async () => {
          try {
            await supplierService.deleteSupplier(supplierToDelete.id);
            setSuppliers(suppliers.filter(supplier => supplier.id !== supplierToDelete.id));
            setIsDeleteModalOpen(false);
            setSupplierToDelete(null);
          } catch (error) {
            console.error("Error deleting supplier:", error);
            setError(error.message);
          }
        }}
        title="Delete Supplier"
        message={`Are you sure you want to delete ${supplierToDelete?.name}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}

export default Suppliers;