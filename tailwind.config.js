/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#9A9A9A",
          100: "#4A4A4A",
          200: "#3B3B3B",
          300: "#2C2C2C",
          400: "#1F1F1F",
          500: "#121212",
        },
        secondary: {
          50: "#FFE082",
          100: "#FFE082",
          200: "#FFD54F",
          300: "#FFC107",
          400: "#FFB300",
          500: "#FFA000",
        },
      },
      fontFamily: {
        Lato: ["LatoRegular", "sans-serif"],
        latoBold: ["LatoBold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
