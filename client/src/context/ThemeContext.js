import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const THEME_STORAGE_KEY = "edostavka_theme";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "light";
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  const toggleTheme = () => setIsDark((current) => !current);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
