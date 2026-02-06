/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Cloud Storage Dashboard Theme Colors
        'light-bg': '#F8F9FA',
        'light-surface': '#FFFFFF',
        'light-surface-elevated': '#FFFFFF',
        'light-text-primary': '#1A1A1A',
        'light-text-secondary': '#6B7280',
        'light-border': '#E5E7EB',
        'light-accent': '#8B5CF6',
        'light-accent-hover': '#7C3AED',
        
        'dark-bg': '#0F172A',
        'dark-surface': '#1E293B',
        'dark-surface-elevated': '#334155',
        'dark-text-primary': '#F1F5F9',
        'dark-text-secondary': '#94A3B8',
        'dark-border': '#334155',
        'dark-accent': '#A78BFA',
        'dark-accent-hover': '#8B5CF6',
        
        'google': '#4285F4',
        'onedrive': '#0078D4',
        'dropbox': '#0061FF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'light-card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'light-card-hover': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'dark-card': '0 4px 6px rgba(0, 0, 0, 0.3)',
        'dark-card-hover': '0 8px 12px rgba(0, 0, 0, 0.4)',
        'neumorphic': '8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke',
      },
      transitionDuration: {
        'theme': '300ms',
      }
    },
  },
  plugins: [],
}

