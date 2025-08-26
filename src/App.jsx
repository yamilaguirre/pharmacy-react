import React, { useState } from "react";
import Sidebar from "./assets/components/layout/Sidebar";
import Dashboard from "./assets/pages/Dashboard";
import Customers from "./assets/pages/Customers";
import Products from "./assets/pages/Products";
import Suppliers from "./assets/pages/Suppliers";
import Purchases from "./assets/pages/Purchases";
import Sells from "./assets/pages/Sells";
import Users from "./assets/pages/Users";

function App() {
  const [selectedOption, setSelectedOption] = useState("Dashboard");

  const renderPage = () => {
    switch (selectedOption) {
      case "Dashboard":
        return <Dashboard />;
      case "Users":
        return <Users />;
      case "Customers":
        return <Customers />;
      case "Products":
        return <Products />;
      case "Suppliers":
        return <Suppliers />;
      case "Sells":
        return <Sells />;
      case "Purchases":
        return <Purchases />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      <div className="flex min-h-screen ">
        <Sidebar
          onSelectOption={setSelectedOption}
          selectedOption={selectedOption}
        />
        <main className="flex-grow">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;
