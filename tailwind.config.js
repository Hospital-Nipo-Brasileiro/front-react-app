/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/techNipo/StylesTechNipo.css"
  ],
  theme: {
    extend: {
      fontFamily: {
        'bayon': ['Bayon', 'sans-serif'],
        'alef': ['Alef', 'sans-serif'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

