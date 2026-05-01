/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'qsdj-bg': '#fcf9f8',
        'qsdj-surface': '#fcf9f8',
        'qsdj-surface-low': '#f6f3f2',
        'qsdj-surface-container': '#f0eded',
        'qsdj-surface-high': '#eae7e7',
        'qsdj-surface-highest': '#e5e2e1',
        'qsdj-surface-dim': '#dcd9d9',
        'qsdj-on-bg': '#1c1b1b',
        'qsdj-on-surface-variant': '#564052',
        'qsdj-magenta': '#ff00ff',
        'qsdj-magenta-dark': '#a900a9',
        'qsdj-magenta-light': '#ffabf3',
        'qsdj-magenta-pink': '#ffd7f5',
        'qsdj-lime': '#c1f100',
        'qsdj-lime-dark': '#506600',
        'qsdj-lime-dim': '#abd600',
        'qsdj-teal': '#00a2a2',
        'qsdj-teal-dark': '#006a6a',
        'qsdj-teal-light': '#00dddd',
        'qsdj-outline': '#897083',
        'qsdj-outline-variant': '#dcbed4',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #1c1b1b',
        'hard-lg': '6px 6px 0px 0px #1c1b1b',
        'hard-sm': '2px 2px 0px 0px #1c1b1b',
        'hard-sm-lg': '3px 3px 0px 0px #1c1b1b',
        'inset-dark': 'inset 3px 3px 0px 0px rgba(0,0,0,0.1)',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      fontFamily: {
        'display': ['Epilogue', 'Noto Sans JP', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'Noto Sans JP', 'sans-serif'],
        'label': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
