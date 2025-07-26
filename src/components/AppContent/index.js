import React, { useState, useEffect } from "react";
import InputField from "../input";
import Card from "../card";
import Spinner from "../../icons/spinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../../redux/slices/weatherSlice";
import { addSearch, clearHistory } from "../../redux/slices/searchHistorySlice";

function AppContent() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.weather);
  const { history } = useSelector((state) => state.searchHistory);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [city, setCity] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleSearch = async (city) => {
    if (city) {
      try {
        const resultAction = await dispatch(fetchWeather(city));
        if (resultAction?.payload?.cod === 200) {
          dispatch(addSearch(city));
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    }
  };

  const handleClick = (city) => {
    if (city) {
      setCity(city);
      dispatch(fetchWeather(city));
    }
  };

  return (
    <div className="App relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 left-4 z-50 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-md shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none"
      >
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Open Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-700"
      >
        ☰ History
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold">Search History</h3>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-600 dark:text-gray-300 hover:text-red-600 focus:outline-none"
          >
            ✕
          </button>
        </div>

        <ul className="flex-grow overflow-y-auto p-6 space-y-3">
          {history?.length === 0 ? (
            <li className="text-gray-400 italic">No history found.</li>
          ) : (
            history.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  handleClick(item);
                  setSidebarOpen(false);
                }}
                className="cursor-pointer px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-700"
              >
                🔍 {item[0].toUpperCase() + item.slice(1)}
              </li>
            ))
          )}
        </ul>

        <div className="px-6 pb-6 pt-2">
          <button
            onClick={() => dispatch(clearHistory())}
            disabled={history.length === 0}
            className={`w-full py-3 rounded font-medium transition ${
              history.length === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Clear History
          </button>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="pt-10 px-4 max-w-xl mx-auto">
        <InputField onClick={handleSearch} value={city} setValue={setCity} />
        {!loading ? <Card Data={data} /> : <Spinner />}
      </div>
    </div>
  );
}

export default AppContent;
