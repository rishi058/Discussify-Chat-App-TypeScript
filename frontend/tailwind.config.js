/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  darkMode: "class", // Enable dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          DEFAULT: '#6B7280', // Default gray color
          zinc: '#7D7D7D', // Custom gray color named zinc
        },
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

