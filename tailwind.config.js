/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kw-bg': '#131313',
        'kw-surface': '#131313',
        'kw-surface-lowest': '#0e0e0e',
        'kw-surface-low': '#1b1c1c',
        'kw-surface-container': '#1f2020',
        'kw-surface-high': '#2a2a2a',
        'kw-surface-highest': '#353535',
        'kw-tertiary-container': '#070809',
        'kw-primary-container': '#080808',
        'kw-accent': '#d2f000',
        'kw-accent-dim': '#b8d300',
        'kw-white': '#ffffff',
        'kw-on-bg': '#e4e2e1',
        'kw-on-surface-variant': '#c4c7c7',
        'kw-on-primary-container': '#7a7878',
        'kw-on-accent': '#2c3400',
        'kw-on-accent-container': '#5d6b00',
        'kw-outline': '#8e9192',
        'kw-outline-variant': '#444748',
        'kw-error': '#ffb4ab',
        'kw-header': '#080808',
        'kw-footer': '#080808',
        'kw-zinc': '#E8E8E8',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
      },
      keyframes: {
        'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
      },
      fontFamily: {
        'display': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'body': ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
