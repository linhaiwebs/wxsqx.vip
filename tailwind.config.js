/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cnmb-bg': '#f9f9f9',
        'cnmb-surface': '#f9f9f9',
        'cnmb-white': '#ffffff',
        'cnmb-lime': '#ccff00',
        'cnmb-lime-dark': '#506600',
        'cnmb-lime-dim': '#abd600',
        'cnmb-on-bg': '#1a1c1c',
        'cnmb-on-surface-variant': '#444933',
        'cnmb-gray': '#5e5e5e',
        'cnmb-gray-light': '#e2e2e2',
        'cnmb-gray-dark': '#696b6b',
        'cnmb-outline': '#747a60',
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
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
        'display': ['Space Grotesk', 'Noto Sans JP', 'sans-serif'],
        'body': ['Epilogue', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
