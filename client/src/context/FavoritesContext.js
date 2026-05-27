import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const FAVORITES_STORAGE_KEY = "edostavka_favorites";

const loadFavorites = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [ids, setIds] = useState(loadFavorites);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const toggleFavorite = useCallback((id) => {
    setIds((current) =>
      current.includes(id)
        ? current.filter((itemId) => itemId !== id)
        : [...current, id]
    );
  }, []);

  const isFavorite = useCallback((id) => ids.includes(id), [ids]);

  const value = useMemo(
    () => ({ ids, toggleFavorite, isFavorite }),
    [ids, toggleFavorite, isFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
};
