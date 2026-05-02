/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mb-bg': '#121414',
        'mb-surface': '#121414',
        'mb-surface-lowest': '#0c0f0f',
        'mb-surface-low': '#1a1c1c',
        'mb-surface-container': '#1e2020',
        'mb-surface-high': '#282a2b',
        'mb-surface-highest': '#333535',
        'mb-pink': '#ffabf3',
        'mb-magenta': '#ff00ff',
        'mb-cyan': '#00fbfb',
        'mb-cyan-dim': '#00dddd',
        'mb-on-bg': '#e2e2e2',
        'mb-on-surface-variant': '#dcbed4',
        'mb-outline': '#a4899d',
        'mb-outline-variant': '#564052',
        'mb-error': '#ffb4ab',
      },
      animation: { 'fadeIn': 'fadeIn 0.2s ease-in' },
      keyframes: { 'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } } },
      fontFamily: {
        'display': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'body': ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
