// src/pages/Dashboard.jsx
import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-5xl font-bold text-gray-800 mb-6 text-center">
        Bienvenido al Panel de Control de PharmaAdmin 📊
        akjbhsfkjabskjflhajfddflkm
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl text-center leading-relaxed">
        Aquí podrás obtener una visión general rápida de las métricas clave
        deajkhsghuasfaskdfj tu farmacia, como ventas recientes, inventario y
        rendimiento del personal.
      </p>
      <p className="text-md text-gray-500 mt-4">
        Selecciona una opción del menú lateral para explorar en detalle.
      </p>
      {/* Aquí podrías añadir widgets como gráficos de ventas, conteo de productos, etc. */}
    </div>
  );
}

export default Dashboard;
