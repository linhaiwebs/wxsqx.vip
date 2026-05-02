/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'xnw-bg': '#111318',
        'xnw-surface': '#111318',
        'xnw-surface-lowest': '#0c0e12',
        'xnw-surface-low': '#1a1c20',
        'xnw-surface-container': '#1e2024',
        'xnw-surface-high': '#282a2e',
        'xnw-surface-highest': '#333539',
        'xnw-cyan': '#00e0ff',
        'xnw-cyan-dim': '#00daf8',
        'xnw-magenta': '#ff24e4',
        'xnw-green': '#2bec00',
        'xnw-green-light': '#79ff5b',
        'xnw-on-bg': '#e2e2e8',
        'xnw-on-surface-variant': '#bac9cd',
        'xnw-outline': '#859397',
        'xnw-outline-variant': '#3b494c',
        'xnw-footer': '#0A0A12',
        'xnw-silver': '#737373',
      },
      animation: {
        'fadeIn': 'fadeIn 0.2s ease-in',
        'marquee': 'marquee 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        'fadeIn': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'marquee': { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulseGlow': { '0%, 100%': { opacity: '0.6' }, '50%': { opacity: '1' } },
      },
      fontFamily: {
        'display': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'body': ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
