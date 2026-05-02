/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'xy-bg': '#faf9ff',
        'xy-surface': '#faf9ff',
        'xy-surface-low': '#f3f3fa',
        'xy-surface-container': '#ededf5',
        'xy-surface-high': '#e8e7ef',
        'xy-surface-highest': '#e2e2e9',
        'xy-primary': '#064192',
        'xy-primary-container': '#2d5aab',
        'xy-primary-fixed-dim': '#afc6ff',
        'xy-secondary': '#006d37',
        'xy-secondary-container': '#7bf8a1',
        'xy-tertiary-container': '#904a00',
        'xy-tertiary-fixed-dim': '#ffb781',
        'xy-on-bg': '#1a1b21',
        'xy-on-surface-variant': '#434751',
        'xy-outline': '#737783',
        'xy-outline-variant': '#c3c6d3',
        'xy-error': '#ba1a1a',
        'xy-error-container': '#ffdad6',
      },
      animation: { 'fadeIn': 'fadeIn 0.2s ease-in' },
      keyframes: { 'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } } },
      fontFamily: {
        'display': ['Public Sans', 'Noto Sans JP', 'sans-serif'],
        'body': ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
