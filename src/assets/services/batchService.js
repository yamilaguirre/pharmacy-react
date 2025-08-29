import { API_BASE_URL } from './ApiUrl.js';

const batchService = {
  fetchBatches: async () => {
    const response = await fetch(`${API_BASE_URL}/batches`);
    if (!response.ok) throw new Error('Failed to fetch batches');
    return response.json();
  },

  fetchBatchesByPurchaseId: async (purchaseId) => {
    const response = await fetch(`${API_BASE_URL}/batches/purchase-detail/${purchaseId}`);
    if (!response.ok) throw new Error('Failed to fetch batches');
    return response.json();
  },

  createBatch: async (batchData) => {
    const response = await fetch(`${API_BASE_URL}/batches`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batchData),
    });
    if (!response.ok) throw new Error('Failed to create batch');
    return response.json();
  },

  updateBatch: async (id, batchData) => {
    const response = await fetch(`${API_BASE_URL}/batches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(batchData),
    });
    if (!response.ok) throw new Error('Failed to update batch');
    return response.json();
  },

  deleteBatch: async (id) => {
    const response = await fetch(`${API_BASE_URL}/batches/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete batch');
    return response.json();
  },
};

export default batchService;