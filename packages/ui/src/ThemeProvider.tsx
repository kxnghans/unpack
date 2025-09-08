import React, { createContext, useContext, useState } from 'react';
import { colors, typography, shadows } from './tokens';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
  colors: colors.light,
  typography,
  shadows,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const themeColors = theme === 'light' ? colors.light : colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: themeColors, typography, shadows }}>
      {children}
    </ThemeContext.Provider>
  );
};