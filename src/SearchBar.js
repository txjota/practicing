import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <header className="header">
      <h1>The Rick and Morty</h1>
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Procure seu personagem"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </header>
  );
}

export default SearchBar;
