import React, { useState, useEffect } from "react";
import userService from "../services/userService.js";
import UserForm from "../../components/forms/UserForm.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

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
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
          User List
        </h2>
        <button
          onClick={() => {
            setSelectedUser(null);
            setIsUserFormOpen(true);
          }}
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Create User
        </button>
      </div>
      {users.length > 0 ? (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Email</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Role</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{user.firstName} {user.lastName}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-teal-600 font-semibold">{user.role}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user);
                          setIsUserFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setUserToDelete(user);
                          setIsDeleteModalOpen(true);
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 text-lg text-center">
          There are no users yet.
        </p>
      )}

      <UserForm
        isOpen={isUserFormOpen}
        onClose={() => {
          setIsUserFormOpen(false);
          setSelectedUser(null);
        }}
        onSave={async (userData) => {
          console.log(userData);
          try {
            if (selectedUser) {
              const updatedUser = await userService.updateUser(
                selectedUser.id,
                userData
              );
              setUsers(
                users.map((user) =>
                  user.id === selectedUser.id ? updatedUser : user
                )
              );
            } else {
              const newUser = await userService.createUser(userData);
              setUsers([...users, newUser]);
            }
            setIsUserFormOpen(false);
            setSelectedUser(null);
          } catch (error) {
            console.error("Error al guardar usuario:", error);
            setError(error.message);
          }
        }}
        user={selectedUser}
        title={selectedUser ? "Editar Usuario" : "Añadir Nuevo Usuario"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        }}
        onConfirm={async () => {
          try {
            await userService.deleteUser(userToDelete.id);
            setUsers(users.filter((user) => user.id !== userToDelete.id));
            setIsDeleteModalOpen(false);
            setUserToDelete(null);
          } catch (error) {
            console.error("Error al eliminar usuario:", error);
            setError(error.message);
          }
        }}
        title="Eliminar Usuario"
        message={`¿Estás seguro de que deseas eliminar a ${userToDelete?.firstName} ${userToDelete?.lastName}?`}
        confirmText="Eliminar"
        type="danger"
      />
    </div>
  );
}

export default Users;
