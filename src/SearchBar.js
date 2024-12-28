import React from 'react';
import './SearchBar.css'; // Add styles for search bar

function SearchBar({ searchQuery, handleSearchChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />
    </div>
  );
}

export default SearchBar;
