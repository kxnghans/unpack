import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { colors, typography, shadows, spacing } from './tokens';

const ThemeContext = createContext({
  theme: 'light',
  themePreference: 'auto',
  setThemePreference: (theme: string) => {},
  toggleTheme: () => {},
  colors: colors.light,
  typography,
  shadows,
  spacing,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState('auto');
  const colorScheme = useColorScheme();

  const theme = themePreference === 'auto' ? colorScheme : themePreference;

  const toggleTheme = () => {
    setThemePreference(theme === 'light' ? 'dark' : 'light');
  };

  const themeColors = theme === 'light' ? colors.light : colors.dark;

  return (
    <ThemeContext.Provider value={{ theme, themePreference, setThemePreference, toggleTheme, colors: themeColors, typography, shadows, spacing }}>
      {children}
    </ThemeContext.Provider>
  );
};