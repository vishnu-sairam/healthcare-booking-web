import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search by name or specialization"
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded mb-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
);

export default SearchBar;