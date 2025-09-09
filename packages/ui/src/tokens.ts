/**
 * Design tokens for the Unpack app.
 */

export const theme = {
  light: {
    colors: {
      background: '#F8F9FF',
      text: '#333333',
      textSecondary: '#888888',
      primary: '#007bff',
      card: '#F8F9FF',
      shadow: 'rgba(0,0,0,0.2)',
      highlight: 'rgba(255,255,255,0.9)',
      surface: '#F8F9FF',
      overlay: 'rgba(0, 0, 0, 0.4)',
      textOnOverlay: '#FFFFFF',
      border: '#EAEAEA',
      success: '#2ECC71',
      warning: '#F1C40F',
      danger: '#E74C3C',
      textOnPrimary: '#FFFFFF',
      premiumBackground: '#E4D5C3',
      textOnPremium: '#5C4033',
    },
    gradients: {
      primary: ['#007bff', '#0056b3'],
      secondary: ['#6c757d', '#343a40'],
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
    },
    typography: {
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
    },
    shadows: {
      soft: '4px 4px 8px rgba(0,0,0,0.1), -4px -4px 8px rgba(255,255,255,0.7)',
      inset: 'inset 4px 4px 8px rgba(0,0,0,0.3), inset -4px -4px 8px rgba(255,255,255,0.1)',
    },
  },
  dark: {
    colors: {
      background: '#2E2E2E',
      text: '#E0E0E0',
      textSecondary: '#A0A0A0',
      primary: '#BB86FC',
      card: '#2E2E2E',
      shadow: 'rgba(0,0,0,0.5)',
      highlight: 'rgba(255,255,255,0.08)',
      surface: '#2E2E2E',
      overlay: 'rgba(0, 0, 0, 0.5)',
      textOnOverlay: '#FFFFFF',
      border: '#3A3A3A',
      success: '#58D68D',
      warning: '#F7DC6F',
      danger: '#EC7063',
      textOnPrimary: '#FFFFFF',
      premiumBackground: '#B08D57',
      textOnPremium: '#FFFFFF',
    },
    gradients: {
      primary: ['#BB86FC', '#3700B3'],
      secondary: ['#03DAC6', '#018786'],
    },
    spacing: {
      small: 8,
      medium: 16,
      large: 24,
    },
    typography: {
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
    },
    shadows: {
      soft: '4px 4px 8px rgba(0,0,0,0.5), -4px -4px 8px rgba(255,255,255,0.15)',
      inset: 'inset 4px 4px 8px rgba(0,0,0,0.5), inset -4px -4px 8px rgba(255,255,255,0.15)',
    },
  },
};