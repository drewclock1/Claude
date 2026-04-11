/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        avara: {
          50:  '#f5f3ef',
          100: '#e8e3d9',
          200: '#d4c9b4',
          300: '#bca98a',
          400: '#a68b65',
          500: '#8f7250',
          600: '#755c3f',
          700: '#5c4632',
          800: '#3d2e21',
          900: '#1e1710',
        },
        navy: {
          50:  '#eef1f7',
          100: '#d5dced',
          200: '#aab8db',
          300: '#7a91c5',
          400: '#4f6dad',
          500: '#344f8f',
          600: '#263b72',
          700: '#1a2a55',
          800: '#101c3a',
          900: '#080e1e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
