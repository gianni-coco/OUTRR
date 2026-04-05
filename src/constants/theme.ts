export const colors = {
  primary: '#534AB7',
  background: '#EEEDFE',
  accent: '#7F77DD',
  white: '#FFFFFF',
  black: '#1A1A2E',
  gray: {
    100: '#F5F5F5',
    200: '#E8E8E8',
    300: '#D1D1D1',
    400: '#9E9E9E',
    500: '#6B6B6B',
    600: '#4A4A4A',
  },
  success: '#4CAF50',
  error: '#E53935',
  warning: '#FF9800',
  tabInactive: '#9994C7',
};

export const typography = {
  wordmark: {
    fontWeight: '800' as const,
    letterSpacing: -1,
    textTransform: 'uppercase' as const,
  },
  heading1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
  },
  heading2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  heading3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
};
