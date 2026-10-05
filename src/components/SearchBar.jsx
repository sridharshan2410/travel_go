import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="professional-search">

      <div className="search-icon">
        🔍
      </div>

      <input
        type="text"
        placeholder="Search destination or travel package..."
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
      />

      {searchTerm && (
        <button
          className="clear-search"
          onClick={() => setSearchTerm("")}
        >
          ✕
        </button>
      )}

      <button className="search-button">
        Search
      </button>

    </div>
  );
}

export default SearchBar;