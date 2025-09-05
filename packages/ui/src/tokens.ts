/**
 * Design tokens for the Unpack app.
 */

export const colors = {
  light: {
    background: '#f0f0f0',
    text: '#333333',
    primary: '#007bff',
    card: '#ffffff',
    shadow: 'rgba(0,0,0,0.1)',
    highlight: 'rgba(255,255,255,0.7)',
  },
  dark: {
    background: '#333333',
    text: '#f0f0f0',
    primary: '#007bff',
    card: '#444444',
    shadow: 'rgba(0,0,0,0.3)',
    highlight: 'rgba(255,255,255,0.1)',
  },
};

export const typography = {
  nunitoSans: 'NunitoSans',
  inter: 'Inter',
  sizes: {
    s: 14,
    m: 18,
    l: 24,
  },
};

export const shadows = {
  soft: `4px 4px 8px ${colors.light.shadow}, -4px -4px 8px ${colors.light.highlight}`,
  inset: `inset 4px 4px 8px ${colors.dark.shadow}, inset -4px -4px 8px ${colors.dark.highlight}`,
};
