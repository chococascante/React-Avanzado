import React, { InputHTMLAttributes } from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  search: string;
  setSearch: (search: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  label = "Buscar:",
  search,
  setSearch,
}) => {
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  return (
    <div className="flex flex-col">
      <label htmlFor="search-input" id="search-bar-label">
        {label}
      </label>
      <input
        value={search}
        type="text"
        id="search-input"
        placeholder="Escriba el título de una tarea..."
        onChange={handleInputChange}
      />
    </div>
  );
};
