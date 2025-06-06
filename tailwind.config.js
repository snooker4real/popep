/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'rouge-indien': '#D46559',
        'vieux-rose': '#946863',
        'rose-pale': '#EBD0C6',
        'vert-eau': '#D8E6DB',
        'vert-cyan': '#5F7F6E',
        // Secondary Colors
        'vert-vif': '#59D493',
        'gris-fonce': '#544B4A',
        // Neutral Colors
        'noir': '#000000',
        'blanc': '#FFFFFF',
        // New Values Color
        'valeurs': '#AAD1B5'
      },
      fontFamily: {
        'title': ['Bebas Neue', 'sans-serif'],
        'subtitle': ['Quicksand', 'sans-serif'],
        'body': ['Libre Baskerville', 'serif'],
        'decorative': ['Dancing Script', 'cursive'],
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(4px)',
      },
    },
  },
  plugins: [],
};