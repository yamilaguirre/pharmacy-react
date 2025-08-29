import axios from "axios";
import { API_BASE_URL } from "./ApiUrl.js";

const productService = {
  fetchProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
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

  createProduct: async (productData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error creating product"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to create product."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  updateProduct: async (productId, productData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${productId}`, productData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error updating product"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to update product."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  deleteProduct: async (productId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/products/${productId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error deleting product"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to delete product."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },
};

export default productService;