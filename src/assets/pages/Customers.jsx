import React, { useState, useEffect } from "react";
import customerService from "../services/customerService.js";
import CustomerForm from "../../components/forms/CustomerForm.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCustomerFormOpen, setIsCustomerFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    customerService
      .fetchCustomers()
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching customers:", err);
        setError("Failed to load customers. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
          Customer List 👥
        </h2>
        <button
          onClick={() => {
            setSelectedCustomer(null);
            setIsCustomerFormOpen(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Customer
        </button>
      </div>
      {customers.length > 0 ? (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Email</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Phone</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{customer.firstName} {customer.lastName}</td>
                  <td className="px-4 py-3 text-gray-600">{customer.email}</td>
                  <td className="px-4 py-3 text-blue-600 font-semibold">{customer.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsCustomerFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCustomerToDelete(customer);
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
          No customers found.
        </p>
      )}

      <CustomerForm
        isOpen={isCustomerFormOpen}
        onClose={() => {
          setIsCustomerFormOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={async (customerData) => {
          try {
            if (selectedCustomer) {
              const updatedCustomer = await customerService.updateCustomer(selectedCustomer.id, customerData);
              setCustomers(customers.map(customer => 
                customer.id === selectedCustomer.id ? updatedCustomer : customer
              ));
            } else {
              const newCustomer = await customerService.createCustomer(customerData);
              setCustomers([...customers, newCustomer]);
            }
            setIsCustomerFormOpen(false);
            setSelectedCustomer(null);
          } catch (error) {
            console.error("Error saving customer:", error);
            setError(error.message);
          }
        }}
        customer={selectedCustomer}
        title={selectedCustomer ? "Edit Customer" : "Add New Customer"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCustomerToDelete(null);
        }}
        onConfirm={async () => {
          try {
            await customerService.deleteCustomer(customerToDelete.id);
            setCustomers(customers.filter(customer => customer.id !== customerToDelete.id));
            setIsDeleteModalOpen(false);
            setCustomerToDelete(null);
          } catch (error) {
            console.error("Error deleting customer:", error);
            setError(error.message);
          }
        }}
        title="Delete Customer"
        message={`Are you sure you want to delete ${customerToDelete?.firstName} ${customerToDelete?.lastName}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}

export default Customers;