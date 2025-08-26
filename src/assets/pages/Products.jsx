// src/pages/Products.jsx
import React from "react";

function Products() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-5xl font-bold text-green-700 mb-6 text-center">
        Catálogo de Productos 💊
      </h2>
      <p className="text-xl text-gray-700 max-w-lg text-center leading-relaxed">
        Administra el inventario de medicamentos y otros productos de tu
        farmacia. ¡Podrás ver existencias, precios y más!
      </p>
      {/* Espacio para una lista de productos o galería */}
    </div>
  );
}

export default Products;
