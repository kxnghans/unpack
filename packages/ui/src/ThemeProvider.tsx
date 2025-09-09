import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { theme as defaultTheme } from './tokens';

const ThemeContext = createContext({
  theme: 'light',
  themePreference: 'auto',
  setThemePreference: (theme: string) => {},
  toggleTheme: () => {},
  ...defaultTheme.light,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState('auto');
  const colorScheme = useColorScheme();

  const theme = themePreference === 'auto' ? colorScheme : themePreference;

  const toggleTheme = () => {
    setThemePreference(theme === 'light' ? 'dark' : 'light');
  };

  const currentTheme = theme === 'light' ? defaultTheme.light : defaultTheme.dark;

  return (
    <ThemeContext.Provider value={{ theme, themePreference, setThemePreference, toggleTheme, ...currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};