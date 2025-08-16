import React, { useState } from "react";
import Sidebar from "./assets/components/layout/Sidebar";
import MainContent from "./assets/components/layout/MainContent";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="flex font-inter min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Sidebar
        onSelectOption={setSelectedOption}
        selectedOption={selectedOption}
      />
      <MainContent selectedOption={selectedOption} />
    </div>
  );
}

export default App;
