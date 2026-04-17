import React, { createContext, useContext, useEffect, useState } from 'react';

// Context is ideal for global values that don't change very often but are needed 
// everywhere in the component tree (e.g., Theme, Auth user, Language).
// We use Redux for more complex, frequently changing state (like the shopping cart).

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // useState: Handles the local state of the theme. Initializes based on localStorage or defaults to 'light'.
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  // useEffect: A side effect that runs whenever the 'theme' state changes.
  // It applies the theme class to the HTML element and saves the standard in localStorage.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]); // The dependency array ensures this only runs when 'theme' changes.

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to easily use the theme context anywhere we need it.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
