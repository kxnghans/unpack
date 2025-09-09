import React, { createContext, useContext, useState } from 'react'
import { useColorScheme } from 'react-native'
import { theme as defaultTheme } from './tokens'
import { ThemeContextType } from './types'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themePreference, setThemePreference] = useState('auto')
  const colorScheme = useColorScheme()

  const theme =
    themePreference === 'auto' ? colorScheme || 'light' : themePreference

  const toggleTheme = () => {
    setThemePreference(theme === 'light' ? 'dark' : 'light')
  }

  const currentTheme =
    theme === 'light' ? defaultTheme.light : defaultTheme.dark

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themePreference,
        setThemePreference,
        toggleTheme,
        ...currentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
