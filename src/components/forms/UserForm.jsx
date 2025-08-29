import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";

const UserForm = ({ isOpen, onClose, onSave, user = null, title }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    startDate: "",
    role: "",
    identificationNumber: "",
    address: "",
    phoneNumber: "",
    salary: "",
    profilePictureUrl: "",
    pharmacy: {
      id: 1,
    },
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        startDate: "",
        role: "",
        identificationNumber: "",
        address: "",
        phoneNumber: "",
        salary: "",
        profilePictureUrl: "",
        pharmacy: {
          id: 1,
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces, minimum 2 characters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={50}
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces, minimum 2 characters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              maxLength={100}
              title="Enter a valid email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required={!user}
              minLength={6}
              maxLength={50}
              title="Minimum 6 characters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              max={new Date().toISOString().split('T')[0]}
              title="Select a valid date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={30}
              pattern="[A-Za-z\s]+"
              title="Only letters and spaces, minimum 3 characters"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="identificationNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Identification Number
            </label>
            <input
              type="text"
              name="identificationNumber"
              id="identificationNumber"
              value={formData.identificationNumber}
              onChange={handleChange}
              required
              minLength={7}
              maxLength={15}
              pattern="[0-9]+"
              title="Only numbers, between 7 and 15 digits"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={200}
              title="Minimum 10 characters for address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              minLength={10}
              maxLength={15}
              pattern="[0-9]+"
              title="Only numbers, between 10 and 15 digits"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              required
              min="0"
              max="999999"
              step="0.01"
              title="Enter a valid salary"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="profilePictureUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture Name
          </label>
          <input
            type="text"
            name="profilePictureUrl"
            id="profilePictureUrl"
            value={formData.profilePictureUrl}
            onChange={handleChange}
            pattern=".*\.(jpg|jpeg|png|gif|webp)$"
            title="Must be a valid image file (.jpg, .jpeg, .png, .gif, .webp)"
            placeholder="example: user.jpg"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
          />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-md transition-colors"
          >
            {user ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserForm;
