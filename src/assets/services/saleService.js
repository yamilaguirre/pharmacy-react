import { API_BASE_URL } from './ApiUrl.js';

const saleService = {
  fetchSales: async () => {
    const response = await fetch(`${API_BASE_URL}/invoices`);
    if (!response.ok) throw new Error('Failed to fetch sales');
    return response.json();
  },

  createSale: async (saleData) => {
    const response = await fetch(`${API_BASE_URL}/invoices`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData),
    });
    if (!response.ok) throw new Error('Failed to create sale');
    return response.json();
  },

  deleteSale: async (id) => {
    const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete sale');
    return response.json();
  },
};

export default saleService;