// src/pages/Sells.jsx
import React from "react";

function Sells() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-5xl font-bold text-red-700 mb-6 text-center">
        Registro de Ventas 📈
      </h2>
      <p className="text-xl text-gray-700 max-w-lg text-center leading-relaxed">
        Analiza el rendimiento de tus ventas diarias, semanales o mensuales.
        ¡Genera informes para optimizar tu negocio!
      </p>
      {/* Espacio para gráficos o tablas de ventas */}
    </div>
  );
}

export default Sells;
