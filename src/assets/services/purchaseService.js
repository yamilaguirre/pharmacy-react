import { API_BASE_URL } from './ApiUrl.js';

const purchaseService = {
  fetchPurchases: async () => {
    const response = await fetch(`${API_BASE_URL}/purchase-details`);
    if (!response.ok) throw new Error('Failed to fetch purchases');
    return response.json();
  },

  fetchPurchaseById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/purchase-details/${id}`);
    if (!response.ok) throw new Error('Failed to fetch purchase');
    return response.json();
  },



  createPurchase: async (purchaseData) => {
    const response = await fetch(`${API_BASE_URL}/purchase-details`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error('Failed to create purchase');
    return response.json();
  },

  updatePurchase: async (id, purchaseData) => {
    const response = await fetch(`${API_BASE_URL}/purchase-details/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    });
    if (!response.ok) throw new Error('Failed to update purchase');
    return response.json();
  },

  deletePurchase: async (id) => {
    const response = await fetch(`${API_BASE_URL}/purchase-details/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete purchase');
    return response.json();
  },
};

export default purchaseService;