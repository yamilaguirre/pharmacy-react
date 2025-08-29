import React, { useState, useEffect } from "react";
import PurchaseForm from "../../components/forms/PurchaseForm.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";
import purchaseService from "../services/purchaseService.js";
import batchService from "../services/batchService.js";
function Purchases() {
  const [purchases, setPurchases] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, purchase: null });

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const data = await purchaseService.fetchPurchases();
      setPurchases(data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          New Purchase
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Purchase #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Supplier
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {purchases.map((purchase) => (
              <tr key={purchase.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  #{purchase.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {purchase.purchaseDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {purchase.supplier?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${purchase.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    onClick={async () => {
                      try {
                        const fullPurchase = await purchaseService.fetchPurchaseById(purchase.id);
                        const batches = await batchService.fetchBatchesByPurchaseId(purchase.id);
                        const purchaseWithBatches = {
                          ...fullPurchase,
                          supplierId: fullPurchase.supplier?.id,
                          batches: batches.map(batch => ({
                            productId: batch.product?.id,
                            quantity: batch.quantity,
                            expirationDate: batch.expirationDate
                          }))
                        };
                        setEditingPurchase(purchaseWithBatches);
                        setIsFormOpen(true);
                      } catch (error) {
                        console.error('Error fetching purchase details:', error);
                      }
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setDeleteConfirm({ isOpen: true, purchase })}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PurchaseForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingPurchase(null);
        }}
        purchase={editingPurchase}
        onSave={async (data) => {
          try {
            if (editingPurchase) {
              await purchaseService.updatePurchase(editingPurchase.id, data);
            } else {
              await purchaseService.createPurchase(data);
            }
            fetchPurchases();
            setIsFormOpen(false);
            setEditingPurchase(null);
          } catch (error) {
            console.error('Error saving purchase:', error);
          }
        }}
      />

      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, purchase: null })}
        onConfirm={async () => {
          try {
            await purchaseService.deletePurchase(deleteConfirm.purchase.id);
            fetchPurchases();
            setDeleteConfirm({ isOpen: false, purchase: null });
          } catch (error) {
            console.error('Error deleting purchase:', error);
          }
        }}
        title="Delete Purchase"
        message={`Are you sure you want to delete purchase #${deleteConfirm.purchase?.id}?`}
      />
    </div>
  );
}

export default Purchases;
