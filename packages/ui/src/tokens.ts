/**
 * Design tokens for the Unpack app.
 */

export const colors = {
  light: {
    background: '#FFFFFF',
    text: '#333333',
    textSecondary: '#888888',
    primary: '#007bff',
    card: '#F8F9FF',
    shadow: 'rgba(0,0,0,0.1)',
    highlight: 'rgba(255,255,255,0.7)',
    surface: '#F8F9FF',
  },
  dark: {
    background: '#333333',
    text: '#f0f0f0',
    textSecondary: '#bbbbbb',
    primary: '#007bff',
    card: '#444444',
    shadow: 'rgba(0,0,0,0.3)',
    highlight: 'rgba(255,255,255,0.1)',
    surface: '#444444',
  },
};

export const spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const typography = {
  nunitoSans: 'NunitoSans',
  inter: 'Inter',
  roboto: 'Roboto',
  sizes: {
    s: 14,
    m: 16,
    l: 22,
    xl: 34,
  },
  weights: {
    light: '400',
    regular: '500',
    bold: '700',
    extraBold: '800',
  },
  fonts: {
    pageHeader: {
      fontFamily: 'NunitoSans',
      fontSize: 34,
      fontWeight: '800',
    },
    sectionHeader: {
      fontFamily: 'NunitoSans',
      fontSize: 22,
      fontWeight: '700',
    },
    title: {
      fontFamily: 'Roboto',
      fontSize: 16,
      fontWeight: '700',
    },
    subtitle: {
      fontFamily: 'Roboto',
      fontSize: 14,
      fontWeight: '500',
    },
    description: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: '400',
    },
    heading3: {
      fontFamily: 'NunitoSans',
      fontSize: 18,
      fontWeight: '700',
    },
    body: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: '400',
    },
  },
};

export const shadows = {
  soft: `4px 4px 8px ${colors.light.shadow}, -4px -4px 8px ${colors.light.highlight}`,
  inset: `inset 4px 4px 8px ${colors.dark.shadow}, inset -4px -4px 8px ${colors.dark.highlight}`,
};