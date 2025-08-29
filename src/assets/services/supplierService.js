import axios from "axios";
import { API_BASE_URL } from "./ApiUrl.js";

const supplierService = {
  fetchSuppliers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/suppliers`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Unknown error"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server. Make sure the backend is running."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  createSupplier: async (supplierData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/suppliers`, supplierData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error creating supplier"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to create supplier."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  updateSupplier: async (supplierId, supplierData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/suppliers/${supplierId}`, supplierData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error updating supplier"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to update supplier."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  deleteSupplier: async (supplierId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/suppliers/${supplierId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error deleting supplier"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to delete supplier."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },
};

export default supplierService;