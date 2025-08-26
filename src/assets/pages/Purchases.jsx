// src/pages/Purchases.jsx
import React from "react";

function Purchases() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-5xl font-bold text-orange-700 mb-6 text-center">
        Registro de Compras 📦
      </h2>
      <p className="text-xl text-gray-700 max-w-lg text-center leading-relaxed">
        Controla todas las adquisiciones de inventario que realizas a tus
        proveedores. ¡Mantén tu stock siempre al día!
      </p>
      {/* Espacio para un listado de compras o formularios */}
    </div>
  );
}

export default Purchases;
