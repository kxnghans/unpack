/**
 * This file defines the ThemeProvider and useTheme hook for managing the
 * application's theme (light or dark mode).
 */
import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { theme as defaultTheme } from './tokens';

/**
 * The context for the theme, providing the theme name, preference, and functions
 * to update them, as well as the current theme's colors, fonts, etc.
 */
const ThemeContext = createContext({
  theme: 'light',
  themePreference: 'auto',
  setThemePreference: (theme: string) => {},
  toggleTheme: () => {},
  ...defaultTheme.light,
});

/**
 * A hook to get the current theme from the ThemeContext.
 * @returns The current theme context.
 */
export const useTheme = () => useContext(ThemeContext);

/**
 * A provider for the theme that wraps the application and provides the theme
 * context to all components.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The children to render within the provider.
 */
export const ThemeProvider = ({ children }) => {
  const [themePreference, setThemePreference] = useState('auto');
  const colorScheme = useColorScheme();

  // The theme is determined by the user's preference, or the device's color scheme if set to 'auto'.
  const theme = themePreference === 'auto' ? colorScheme : themePreference;

  /**
   * Toggles the theme preference between light and dark.
   */
  const toggleTheme = () => {
    setThemePreference(theme === 'light' ? 'dark' : 'light');
  };

  // Select the appropriate theme object based on the current theme name.
  const currentTheme = theme === 'light' ? defaultTheme.light : defaultTheme.dark;

  return (
    <ThemeContext.Provider value={{ theme, themePreference, setThemePreference, toggleTheme, ...currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
