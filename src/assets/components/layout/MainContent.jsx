import React, { useState, useEffect } from "react";
import userService from "../../services/userService.js";

function MainContent({ selectedOption }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedOption === "Users") {
      setLoading(true);
      setError(null);
      userService
        .fetchUsers()
        .then((data) => {
          setUsers(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setError("Failed to load users. Please try again.");
          setLoading(false);
        });
    } else {
      setUsers([]);
      setError(null);
    }
  }, [selectedOption]);

  return (
    <div className="flex-grow p-8 bg-gray-100 rounded-l-lg overflow-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg h-full flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold text-gray-800 mb-6 text-center">
          {selectedOption ? `${selectedOption} Dashboard` : "Select an Option"}
        </h2>

        {loading && (
          <div className="flex items-center text-teal-600 text-xl">
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
            Loading users...
          </div>
        )}

        {error && (
          <p className="text-red-500 text-lg font-medium mt-4">{error}</p>
        )}

        {!loading && !error && selectedOption === "Users" && (
          <div className="w-full mt-6">
            <h3 className="text-3xl font-semibold text-gray-700 mb-4 text-center">
              User List
            </h3>
            {users.length > 0 ? (
              <ul className="space-y-3 p-4 bg-gray-50 rounded-lg shadow-inner max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-md shadow-sm border border-gray-200"
                  >
                    <div className="text-gray-800 font-medium">
                      {user.name}{" "}
                      <span className="text-gray-500 text-sm">
                        ({user.email})
                      </span>
                    </div>
                    <div className="text-teal-600 font-semibold md:ml-4 mt-1 md:mt-0">
                      {user.role}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600 text-lg text-center">
                No users found.
              </p>
            )}
          </div>
        )}

        {!selectedOption && (
          <p className="text-xl text-gray-600 max-w-lg text-center leading-relaxed">
            Please select an option from the sidebar to get started.
          </p>
        )}

        {!loading &&
          !error &&
          selectedOption !== "Users" &&
          selectedOption !== null && (
            <p className="text-xl text-gray-600 max-w-lg text-center leading-relaxed">
              This is where you'll manage all your{" "}
              {selectedOption.toLowerCase()} information.
            </p>
          )}
      </div>
    </div>
  );
}

export default MainContent;
