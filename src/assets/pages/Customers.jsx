import React from "react";

function Customers() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-white rounded-xl shadow-lg">
      <h2 className="text-5xl font-bold text-blue-700 mb-6 text-center">
        Gestión de Clientes 🧑‍🤝‍🧑
      </h2>
      <p className="text-xl text-gray-700 max-w-lg text-center leading-relaxed">
        Aquí podrás ver, añadir, editar y eliminar la información de tus
        clientes. ¡Pronto tendremos aquí una tabla interactiva!
      </p>
    </div>
  );
}

export default Customers;
