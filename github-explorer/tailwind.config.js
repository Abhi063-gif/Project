module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          light: '#f6f8fa',
          blue: '#0969da',
          green: '#2da44e'
        }
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    extend: {},
  },
  plugins: [],
}
