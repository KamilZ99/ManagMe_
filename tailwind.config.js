/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        bounce: 'bounce 4s infinite',
        'bounce-slow': 'bounce 6s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(-10%)' },
          '50%': { transform: 'translateY(10%)' },
        },
      },
      borderRadius: {
        'custom': '30px',
      },
    },
  },
  plugins: [],
}

