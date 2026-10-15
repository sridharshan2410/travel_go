import React from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <form
      className="professional-search"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <span className="search-icon" aria-hidden="true">
        🔍
      </span>

      <label className="sr-only" htmlFor="travel-package-search">
        Search destination or travel package
      </label>

      <input
        id="travel-package-search"
        type="search"
        placeholder="Search destination or travel package..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoComplete="off"
      />

      {searchTerm && (
        <button
          type="button"
          className="clear-search"
          aria-label="Clear search"
          onClick={() => setSearchTerm("")}
        >
          <span aria-hidden="true">✕</span>
        </button>
      )}

      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
}

export default SearchBar;