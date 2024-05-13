/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
      colors: {
        ...colors,
        'dark-nav-color': "#2B3844",
        'dark-main-color': "#202C36",
        'white': "#FFFFFF",
        'light-font-color': "#111517"
      }
    },
    plugins: [],
    darkMode: "class"
}