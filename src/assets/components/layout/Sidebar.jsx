import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Users2,
  Truck,
  Pill,
  TrendingUp,
  ShoppingCart,
  Menu,
} from "lucide-react";

function Sidebar({ onSelectOption, selectedOption }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuOptions = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} className="mr-3" /> },
    { name: "Users", icon: <Users size={20} className="mr-3" /> },
    { name: "Customers", icon: <Users2 size={20} className="mr-3" /> },
    { name: "Suppliers", icon: <Truck size={20} className="mr-3" /> },
    { name: "Products", icon: <Pill size={20} className="mr-3" /> },
    { name: "Sells", icon: <TrendingUp size={20} className="mr-3" /> },
    { name: "Purchases", icon: <ShoppingCart size={20} className="mr-3" /> },
  ];

  const handleSelectAndClose = (optionName) => {
    onSelectOption(optionName);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed bottom-4 left-4 p-2 bg-background  shadow z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      <div
        className={`
        fixed inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        w-64 bg-main text-colortext p-4 flex flex-col shadow-xl 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 md:flex md:w-64 md:rounded-r-lg md:shadow-xl
      `}
      >
        <div className="text-3xl font-extrabold text-center mb-10 mt-4 tracking-wider">
          PharmaAdmin
        </div>
        <nav className="flex-grow">
          <ul className="space-y-3">
            {menuOptions.map((option) => (
              <li key={option.name}>
                <button
                  onClick={() => handleSelectAndClose(option.name)}
                  className={`w-full flex items-center p-3  text-textcolor font-medium transition duration-200 ease-in-out
                    ${
                      selectedOption === option.name
                        ? "bg-secundary text-textcolorfocus shadow-md"
                        : "hover:bg-focus"
                    }
                    transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-focus focus:ring-opacity-75`}
                >
                  {option.icon} {option.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto pt-4 border-t border-teal-700 text-sm text-center opacity-80">
          &copy; {new Date().getFullYear()} Your Pharmacy App
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
