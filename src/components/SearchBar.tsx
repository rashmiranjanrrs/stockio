import React, { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (symbol: string) => void;
  jsonData: { symbol: string; name: string }[]; // JSON data structure
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, jsonData }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    { symbol: string; name: string }[]
  >([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false); // Controls dropdown visibility

  // Filter suggestions based on the search term
  useEffect(() => {
    if (!isDropdownVisible || searchTerm.trim() === "") {
      setSuggestions([]); // Clear suggestions when dropdown is hidden
    } else {
      const filtered = jsonData.filter(
        (item) =>
          item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10)); // Limit to 10 suggestions
    }
  }, [searchTerm, isDropdownVisible, jsonData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setErrorMessage("Please enter a stock symbol.");
      return;
    }
    setErrorMessage(""); // Clear any existing error messages
    onSearch(searchTerm.trim().toUpperCase());
    setIsDropdownVisible(false); // Hide the dropdown on search
  };

  const handleSuggestionClick = (symbol: string) => {
    setSearchTerm(symbol); // Fill the input field
    setSuggestions([]); // Clear suggestions immediately
    setIsDropdownVisible(false); // Explicitly hide the dropdown
    onSearch(symbol); // Trigger search
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setErrorMessage("");
    setIsDropdownVisible(value.trim() !== ""); // Show dropdown only when input is not empty
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 relative">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter stock symbol (e.g., AAPL)"
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onFocus={() => setIsDropdownVisible(true)} // Show dropdown on focus
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-r-md hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

      {/* Suggestions Dropdown */}
      {isDropdownVisible && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
              onClick={() => handleSuggestionClick(item.symbol)}
            >
              <strong>{item.symbol}</strong> - {item.name}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
