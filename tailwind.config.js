/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cbx-bg': '#131313',
        'cbx-surface': '#131313',
        'cbx-surface-low': '#1c1b1b',
        'cbx-surface-lowest': '#0e0e0e',
        'cbx-surface-container': '#201f1f',
        'cbx-surface-high': '#2a2a2a',
        'cbx-surface-highest': '#353534',
        'cbx-white': '#ffffff',
        'cbx-lime': '#CCFF00',
        'cbx-lime-dark': '#506600',
        'cbx-blue': '#0448ff',
        'cbx-blue-light': '#b9c3ff',
        'cbx-pink': '#ffb2b8',
        'cbx-on-bg': '#e5e2e1',
        'cbx-on-surface-variant': '#c4c9ac',
        'cbx-outline': '#8e9379',
        'cbx-outline-variant': '#444933',
        'cbx-zinc': '#71717a',
        'cbx-zinc-light': '#a1a1aa',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
        'marquee': 'marquee 15s linear infinite',
      },
      keyframes: {
        'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'marquee': { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      fontFamily: {
        'display': ['Epilogue', 'Noto Sans JP', 'sans-serif'],
        'body': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'serif': ['Newsreader', 'Noto Sans JP', 'serif'],
      },
    },
  },
  plugins: [],
};
