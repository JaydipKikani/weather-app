import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import { cities } from "../../data/cities";

const InputField = ({ onClick, value, setValue }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("");

  const searchCities = useMemo(
    () =>
      debounce((query) => {
        if (!query) return setSuggestions([]);

        const filtered = cities
          .filter((c) => c.name.toLowerCase().startsWith(query.toLowerCase()))
          .slice(0, 10);

        setSuggestions(filtered);
      }, 300),
    []
  );

  useEffect(() => {
    searchCities(city);
  }, [city]);

  const callData = () => {
    if (value) {
      onClick(value);
      setSuggestions([]);
      setCity("");
    }
  };

  const handleSuggestionClick = (selectedCity) => {
    setValue(selectedCity.name);
    onClick(selectedCity.name);
    setSuggestions([]);
    setCity("");
  };

  return (
    <div className="mt-16 relative max-w-md mx-auto">
      <div className="max-w-md mx-auto">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => {
              setValue(e.target.value.trim());
              setCity(e.target.value.trim());
            }}
            value={value}
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="Search City..."
            required
          />
          <button
            onClick={callData}
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </div>

      {suggestions?.length > 0 && (
        <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto">
          {suggestions?.map((c, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(c)}
              className="px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {c.name}, {c.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InputField;
