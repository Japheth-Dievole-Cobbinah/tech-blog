/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#007BFF", // Main blue
          50: "#E6F0FF",
          100: "#CCE0FF",
          200: "#99C2FF",
          300: "#66A3FF",
          400: "#3385FF",
          500: "#007BFF", // Base
          600: "#0066CC",
          700: "#0052A3",
          800: "#003D7A",
          900: "#002952",
        },
      },
    },
  },
  plugins: [],
};
