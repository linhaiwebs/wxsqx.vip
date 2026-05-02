/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cx-bg': '#f9f9ff',
        'cx-surface': '#f9f9ff',
        'cx-surface-lowest': '#ffffff',
        'cx-surface-low': '#eff3ff',
        'cx-surface-container': '#e6eeff',
        'cx-surface-high': '#dde9ff',
        'cx-surface-highest': '#d4e3ff',
        'cx-surface-bright': '#f9f9ff',
        'cx-surface-dim': '#c6dbff',
        'cx-navy': '#001c3a',
        'cx-lime': '#ccff00',
        'cx-lime-dim': '#abd600',
        'cx-pink': '#e4006c',
        'cx-pink-soft': '#b60055',
        'cx-yellow': '#ffeda7',
        'cx-yellow-bright': '#ffe25c',
        'cx-yellow-dim': '#e6c500',
        'cx-olive': '#506600',
        'cx-inverse': '#163152',
        'cx-inverse-text': '#ebf1ff',
        'cx-on-bg': '#001c3a',
        'cx-on-surface-variant': '#444933',
        'cx-outline': '#747a60',
        'cx-outline-variant': '#c4c9ac',
        'cx-error': '#ba1a1a',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      fontFamily: {
        'display': ['Spline Sans', 'Noto Sans JP', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
