/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'tsdy': {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      backgroundImage: {
        'tsdy-gradient': 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #2dd4bf 100%)',
      },
      boxShadow: {
        'tsdy-glow': '0 0 20px rgba(20, 184, 166, 0.4)',
        'tsdy-glow-lg': '0 0 40px rgba(20, 184, 166, 0.5)',
      },
      animation: {
        'pulse-tsdy': 'pulse-tsdy 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-rotate': 'float-rotate 4s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-in',
        'breathe': 'breathe 3s ease-in-out infinite',
        'shine': 'shine 2.5s ease-in-out infinite',
      },
      keyframes: {
        'pulse-tsdy': {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px rgba(20, 184, 166, 0.4)' },
          '50%': { opacity: 0.9, boxShadow: '0 0 40px rgba(20, 184, 166, 0.6)' },
        },
        'float-rotate': {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '50%': { transform: 'rotate(5deg) translateY(-10px)' },
        },
        'fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.08)', opacity: 0.95 },
        },
        'shine': {
          '0%': { transform: 'translateX(-100%) translateY(-100%) rotate(30deg)' },
          '50%': { transform: 'translateX(100%) translateY(100%) rotate(30deg)' },
          '100%': { transform: 'translateX(100%) translateY(100%) rotate(30deg)' },
        },
      },
      fontFamily: {
        'title': ['HYYaKuHeiW', 'Noto Sans JP', 'sans-serif'],
        'subtitle': ['Adobe Heiti Std', 'Hiragino Sans', 'sans-serif'],
      },
      borderRadius: {
        'modern-xl': '20px',
        'modern-lg': '16px',
        'modern-md': '12px',
      },
    },
  },
  plugins: [],
};
