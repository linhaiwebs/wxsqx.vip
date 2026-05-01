/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // QDHS TuCool Design System
        'qdhs-bg': '#131313',
        'qdhs-surface': '#1f1f1f',
        'qdhs-surface-low': '#1b1b1b',
        'qdhs-surface-lowest': '#0e0e0e',
        'qdhs-surface-high': '#2a2a2a',
        'qdhs-surface-highest': '#353535',
        'qdhs-surface-bright': '#393939',
        'qdhs-on-surface': '#e2e2e2',
        'qdhs-on-surface-variant': '#ebbbb4',
        'qdhs-red': '#ff5540',
        'qdhs-red-light': '#ffb4a8',
        'qdhs-yellow': '#ffdb3c',
        'qdhs-yellow-dim': '#e9c400',
        'qdhs-green': '#00a669',
        'qdhs-green-light': '#59de9b',
        'qdhs-outline': '#603e39',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
        'hard-red': '4px 4px 0px 0px #ff5540',
        'hard-green': '4px 4px 0px 0px #00a669',
        'inner-dark': 'inset 2px 2px 4px rgba(0,0,0,0.3)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
        'shine': 'shine 3s infinite',
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'shine': {
          '0%': { left: '-100%' },
          '20%': { left: '200%' },
          '100%': { left: '200%' },
        },
      },
      fontFamily: {
        'display': ['Epilogue', 'Noto Sans JP', 'sans-serif'],
        'body': ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
