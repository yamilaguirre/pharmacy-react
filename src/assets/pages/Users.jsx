// src/pages/Users.jsx
import React, { useState, useEffect } from "react";
import userService from "../services/userService.js";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    userService
      .fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener usuarios:", err);
        setError("Falló la carga de usuarios. Por favor, inténtalo de nuevo.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-focus text-xl">
        <svg
          className="animate-spin -ml-1 mr-3 h-8 w-8 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Cargando usuarios...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-lg font-medium mt-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Lista de Usuarios 👤
      </h2>
      {users.length > 0 ? (
        <ul className="space-y-3 p-4 bg-gray-50 rounded-lg shadow-inner max-h-[calc(100vh-18rem)] overflow-y-auto w-full max-w-3xl">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200"
            >
              <div className="text-gray-800 font-medium">
                {user.firstName} {user.lastName}{" "}
                <span className="text-gray-500 text-sm">({user.email})</span>
              </div>
              <div className="text-teal-600 font-semibold md:ml-4 mt-1 md:mt-0">
                {user.role}
              </div>
              <button className="text-red-600 hover:text-red-800">
                Eliminar
              </button>
              <button className="text-blue-600 hover:text-blue-800 mt-2 md:mt-0">
                Editar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-lg text-center">
          No se encontraron usuarios.
        </p>
      )}
    </div>
  );
}

export default Users;
