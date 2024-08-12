import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for articles..."
        className="border rounded p-2 w-full"
      />
      <button onClick={handleSearch} className="mt-2 bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
