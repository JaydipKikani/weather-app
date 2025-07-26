import React, { useState } from "react";
import InputField from "../input";

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [city, setCity] = useState("");

  const handleSearch = async (city) => {};

  return (
    <div className="App relative min-h-screen bg-gray-50">
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        aria-label="Open search history sidebar"
      >
        ☰ History
      </button>

      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="complementary"
        aria-label="Search history sidebar"
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">
            Search History
          </h3>
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="text-gray-600 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
          >
            ✕
          </button>
        </div>

        <ul className="flex-grow overflow-y-auto p-6 space-y-3 text-gray-700"></ul>

        <div className="px-6 pb-6 pt-2">
          <button
            onClick={() => {}}
            className={`w-full py-3 rounded-md font-medium shadow-md transition focus:outline-none focus:ring-4`}
            aria-label="Clear search history"
          >
            Clear History
          </button>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="pt-10 px-4 max-w-xl mx-auto">
        <InputField onClick={handleSearch} value={city} setValue={setCity} />
      </div>
    </div>
  );
}

export default AppContent;
