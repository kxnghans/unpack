import { theme } from './tokens'

export type ThemeContextType = {
  theme: string
  themePreference: string
  setThemePreference: (theme: string) => void
  toggleTheme: () => void
} & typeof theme.light
