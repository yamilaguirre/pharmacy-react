import React from "react";

function Sidebar({ onSelectOption, selectedOption }) {
  const menuOptions = [
    { name: "Users", icon: "👤" },
    { name: "Customers", icon: "👥" },
    { name: "Suppliers", icon: "🚚" },
    { name: "Products", icon: "💊" },
    { name: "Sells", icon: "📈" },
    { name: "Purchases", icon: "📦" },
  ];

  return (
    <div className="w-64 bg-teal-800 text-white min-h-screen p-4 flex flex-col rounded-r-lg shadow-xl">
      <div className="text-3xl font-extrabold text-center mb-10 mt-4 tracking-wider">
        PharmaAdmin
      </div>
      <nav className="flex-grow">
        <ul className="space-y-3">
          {menuOptions.map((option) => (
            <li key={option.name}>
              <button
                onClick={() => onSelectOption(option.name)}
                className={`w-full flex items-center p-3 rounded-lg text-lg font-medium transition duration-200 ease-in-out
                  ${
                    selectedOption === option.name
                      ? "bg-teal-600 text-white shadow-md"
                      : "hover:bg-teal-700"
                  }
                  transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-opacity-75`}
              >
                <span className="mr-3 text-2xl">{option.icon}</span>
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-4 border-t border-teal-700 text-sm text-center opacity-80">
        &copy; {new Date().getFullYear()} Your Pharmacy App
      </div>
    </div>
  );
}

export default Sidebar;
