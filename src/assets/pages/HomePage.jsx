import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to PharmaCare Dashboard!
      </h2>
      <p className="text-lg text-gray-600 text-center max-w-xl">
        Select an option from the sidebar to start managing your pharmacy.
      </p>
    </div>
  );
}

export default HomePage;
