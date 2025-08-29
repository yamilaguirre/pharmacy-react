import axios from "axios";
import { API_BASE_URL } from "./ApiUrl.js";

const customerService = {
  fetchCustomers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/customers`);
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

  createCustomer: async (customerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/customers`, customerData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error creating customer"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to create customer."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  updateCustomer: async (customerId, customerData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/customers/${customerId}`, customerData);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error updating customer"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to update customer."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  deleteCustomer: async (customerId) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/customers/${customerId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(
          `Server error: ${error.response.status} - ${
            error.response.data.message || "Error deleting customer"
          }`
        );
      } else if (error.request) {
        throw new Error(
          "Could not connect to server to delete customer."
        );
      } else {
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },
};

export default customerService;