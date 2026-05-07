import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [homeTheme, setHomeTheme] = useState('light'); // 'light' or 'dark'

  const toggleHomeTheme = () => {
    setHomeTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ homeTheme, toggleHomeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
