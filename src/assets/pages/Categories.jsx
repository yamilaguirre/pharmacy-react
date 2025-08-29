import React, { useState, useEffect } from "react";
import categoryService from "../services/categoryService.js";
import CategoryForm from "../../components/forms/CategoryForm.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    categoryService
      .fetchCategories()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
          Category List 🏷️
        </h2>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setIsCategoryFormOpen(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Category
        </button>
      </div>
      {categories.length > 0 ? (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Image</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{category.name}</td>
                  <td className="px-4 py-3 text-orange-600 font-semibold">{category.imageUrl}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setCategoryToDelete(category);
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
          No categories found.
        </p>
      )}

      <CategoryForm
        isOpen={isCategoryFormOpen}
        onClose={() => {
          setIsCategoryFormOpen(false);
          setSelectedCategory(null);
        }}
        onSave={async (categoryData) => {
          try {
            if (selectedCategory) {
              const updatedCategory = await categoryService.updateCategory(selectedCategory.id, categoryData);
              setCategories(categories.map(category => 
                category.id === selectedCategory.id ? updatedCategory : category
              ));
            } else {
              const newCategory = await categoryService.createCategory(categoryData);
              setCategories([...categories, newCategory]);
            }
            setIsCategoryFormOpen(false);
            setSelectedCategory(null);
          } catch (error) {
            console.error("Error saving category:", error);
            setError(error.message);
          }
        }}
        category={selectedCategory}
        title={selectedCategory ? "Edit Category" : "Add New Category"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCategoryToDelete(null);
        }}
        onConfirm={async () => {
          try {
            await categoryService.deleteCategory(categoryToDelete.id);
            setCategories(categories.filter(category => category.id !== categoryToDelete.id));
            setIsDeleteModalOpen(false);
            setCategoryToDelete(null);
          } catch (error) {
            console.error("Error deleting category:", error);
            setError(error.message);
          }
        }}
        title="Delete Category"
        message={`Are you sure you want to delete ${categoryToDelete?.name}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}

export default Categories;