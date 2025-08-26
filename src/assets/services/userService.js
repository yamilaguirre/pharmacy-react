import axios from "axios";
import { API_BASE_URL } from "./ApiUrl.js";

const userService = {
  fetchUsers: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(
          "Error de respuesta del servidor:",
          error.response.status,
          error.response.data
        );
        throw new Error(
          `Error del servidor: ${error.response.status} - ${
            error.response.data.message || "Error desconocido"
          }`
        );
      } else if (error.request) {
        console.error(
          "No se recibió respuesta del servidor. ¿Está el backend corriendo?",
          error.request
        );
        throw new Error(
          "No se pudo conectar con el servidor. Asegúrate de que el backend esté corriendo."
        );
      } else {
        console.error("Error al configurar la petición:", error.message);
        throw new Error(`Error en la petición: ${error.message}`);
      }
    }
  },

  createUser: async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      console.error("Error al crear usuario:", error);
      throw error;
    }
  },
};

export default userService;
