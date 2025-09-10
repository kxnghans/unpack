'use client';

import { useTheme } from '@ui/ThemeProvider';

/**
 * The home page for the web app.
 * @returns The home page.
 */
export default function HomePage() {
  const { typography } = useTheme();

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
      <h1 style={typography.fonts.pageHeader}>Unpack ✈️</h1>
      <p style={typography.fonts.body}>The smartest way to organize trips and packing lists.</p>
      <a href="https://apps.apple.com" target="_blank" rel="noreferrer">Download on App Store</a>
      <br />
      <a href="https://play.google.com" target="_blank" rel="noreferrer">Get it on Google Play</a>
    </main>
  );
}
