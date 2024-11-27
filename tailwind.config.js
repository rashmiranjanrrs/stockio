/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#7c3aed",
          DEFAULT: "#6d28d9",
          dark: "#5b21b6",
        },
      },
    },
  },
  plugins: [],
};
