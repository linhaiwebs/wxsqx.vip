/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // EHXV Brutalist Color System
        'ehxv-50': '#fff7ed',
        'ehxv-100': '#ffedd5',
        'ehxv-200': '#fed7aa',
        'ehxv-300': '#fdba74',
        'ehxv-400': '#fb923c',
        'ehxv-500': '#f97316',
        'ehxv-600': '#ea580c',
        'ehxv-700': '#c2410c',
        'ehxv-800': '#9a3412',
        'ehxv-900': '#7c2d12',
        'ehxv-950': '#431407',
        // Accent: Electric Cyan
        'cyber-50': '#ecfeff',
        'cyber-100': '#cffafe',
        'cyber-200': '#a5f3fc',
        'cyber-300': '#67e8f9',
        'cyber-400': '#22d3ee',
        'cyber-500': '#06b6d4',
        'cyber-600': '#0891b2',
        'cyber-700': '#0e7490',
        'cyber-800': '#155e75',
        'cyber-900': '#164e63',
        // Surface (from Stitch design)
        'surface': '#f9f9f9',
        'surface-dim': '#dadada',
        'surface-variant': '#e2e2e2',
        'on-surface': '#1b1b1b',
        'primary-container': '#ff6b00',
        'secondary-container': '#00e5ff',
        'outline-custom': '#747a60',
        'outline-variant-custom': '#c4c9ac',
      },
      backgroundImage: {
        'ehxv-gradient': 'linear-gradient(135deg, #ff6b00 0%, #f97316 100%)',
        'ehxv-radial': 'radial-gradient(circle at top, #ff6b00, transparent)',
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px rgba(0,0,0,1)',
        'hard-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'hard-ehxv': '4px 4px 0px 0px #ea580c',
        'hard-lg-ehxv': '8px 8px 0px 0px #ea580c',
      },
      animation: {
        'fadeIn': 'fadeIn 0.15s ease-in',
        'brutal-glitch': 'brutal-glitch 0.3s ease-in-out',
        'scan-line': 'scan-line 2s linear infinite',
      },
      keyframes: {
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'brutal-glitch': {
          '0%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-2px, 2px)' },
          '50%': { transform: 'translate(2px, -2px)' },
          '75%': { transform: 'translate(-1px, -1px)' },
          '100%': { transform: 'translate(0)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      fontFamily: {
        'headline': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'body': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'serif': ['Newsreader', 'Noto Sans JP', 'serif'],
      },
      spacing: {
        '7.5': '30px',
      },
      borderRadius: {
        'none': '0px',
        'brutal': '2px',
      },
    },
  },
  plugins: [],
};
