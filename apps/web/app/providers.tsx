'use client'

import { ThemeProvider } from '@ui/ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
