import axios from "axios";
import { API_BASE_URL } from "./ApiUrl.js";

const categoryService = {
  fetchCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
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

  createCategory: async (categoryData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories`, categoryData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error creating category"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to create category."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/categories/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error updating category"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to update category."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error deleting category"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to delete category."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },
};

export default categoryService;