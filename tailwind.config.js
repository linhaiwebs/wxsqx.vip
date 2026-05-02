/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'xb-bg': '#f7f9fb',
        'xb-surface': '#f7f9fb',
        'xb-surface-low': '#f2f4f6',
        'xb-surface-container': '#eceef0',
        'xb-surface-high': '#e6e8ea',
        'xb-surface-highest': '#e0e3e5',
        'xb-primary': '#003dc7',
        'xb-primary-container': '#0051ff',
        'xb-primary-fixed-dim': '#b7c4ff',
        'xb-secondary': '#006d42',
        'xb-secondary-container': '#63faac',
        'xb-secondary-fixed-dim': '#44e094',
        'xb-tertiary': '#3f4f64',
        'xb-tertiary-container': '#57677d',
        'xb-surface-tint': '#004bee',
        'xb-on-bg': '#191c1e',
        'xb-on-surface-variant': '#434656',
        'xb-outline': '#737688',
        'xb-outline-variant': '#c3c5d9',
        'xb-error': '#ba1a1a',
        'xb-error-container': '#ffdad6',
      },
      animation: { 'fadeIn': 'fadeIn 0.2s ease-in' },
      keyframes: { 'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } } },
      fontFamily: {
        'display': ['Inter', 'Noto Sans JP', 'sans-serif'],
        'body': ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
