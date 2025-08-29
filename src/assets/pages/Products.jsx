import React, { useState, useEffect } from "react";
import productService from "../services/productService.js";
import ProductForm from "../../components/forms/ProductForm.jsx";
import ConfirmModal from "../../components/common/ConfirmModal.jsx";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    productService
      .fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full h-full p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
      <div className="w-full max-w-3xl flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold text-gray-800 text-center flex-1">
          Product Catalog 💊
        </h2>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setIsProductFormOpen(true);
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Add Product
        </button>
      </div>
      {products.length > 0 ? (
        <div className="w-full max-w-6xl overflow-x-auto">
          <table className="table-auto w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Code</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Price</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Stock</th>
                <th className="px-4 py-3 text-left text-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800">{product.name}</td>
                  <td className="px-4 py-3 text-gray-600">{product.code}</td>
                  <td className="px-4 py-3 text-green-600 font-semibold">${product.salePrice}</td>
                  <td className="px-4 py-3 text-gray-600">{product.currentStock}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsProductFormOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(product);
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
        <p className="text-gray-600 text-lg text-center">No products found.</p>
      )}

      <ProductForm
        isOpen={isProductFormOpen}
        onClose={() => {
          setIsProductFormOpen(false);
          setSelectedProduct(null);
        }}
        onSave={async (productData) => {
          try {
            if (selectedProduct) {
              const updatedProduct = await productService.updateProduct(
                selectedProduct.id,
                productData
              );
              setProducts(
                products.map((product) =>
                  product.id === selectedProduct.id ? updatedProduct : product
                )
              );
            } else {
              const newProduct = await productService.createProduct(
                productData
              );
              setProducts([...products, newProduct]);
            }
            setIsProductFormOpen(false);
            setSelectedProduct(null);
          } catch (error) {
            console.error("Error saving product:", error);
            setError(error.message);
          }
        }}
        product={selectedProduct}
        title={selectedProduct ? "Edit Product" : "Add New Product"}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setProductToDelete(null);
        }}
        onConfirm={async () => {
          try {
            await productService.deleteProduct(productToDelete.id);
            setProducts(
              products.filter((product) => product.id !== productToDelete.id)
            );
            setIsDeleteModalOpen(false);
            setProductToDelete(null);
          } catch (error) {
            console.error("Error deleting product:", error);
            setError(error.message);
          }
        }}
        title="Delete Product"
        message={`Are you sure you want to delete ${productToDelete?.name}?`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  );
}

export default Products;
