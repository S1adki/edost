import React, { createContext, useContext, useMemo, useState } from "react";

export const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  const value = useMemo(() => ({ query, setQuery }), [query]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
};
