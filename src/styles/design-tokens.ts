export const designTokens = {
  colors: {
    primary: {
      50: 'rgb(239 246 255)', // blue-50
      100: 'rgb(219 234 254)', // blue-100
      500: 'rgb(59 130 246)', // blue-500
      600: 'rgb(37 99 235)', // blue-600
      700: 'rgb(29 78 216)', // blue-700
    },
    background: {
      light: 'rgb(255 255 255)', // white
      dark: 'rgb(17 24 39)', // gray-900
    },
    surface: {
      light: 'rgb(249 250 251)', // gray-50
      dark: 'rgb(31 41 55)', // gray-800
    },
    border: {
      light: 'rgb(229 231 235)', // gray-200
      dark: 'rgb(75 85 99)', // gray-600
    },
    text: {
      primary: {
        light: 'rgb(17 24 39)', // gray-900
        dark: 'rgb(249 250 251)', // gray-50
      },
      secondary: {
        light: 'rgb(107 114 128)', // gray-500
        dark: 'rgb(156 163 175)', // gray-400
      },
    },
  },
  spacing: {
    section: '5rem', // 80px
    container: '1.5rem', // 24px
    card: '1rem', // 16px
  },
  borderRadius: {
    card: '0.75rem', // 12px
    button: '0.5rem', // 8px
    input: '0.375rem', // 6px
  },
  shadows: {
    soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    hover: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
} as const;

export type DesignTokens = typeof designTokens;