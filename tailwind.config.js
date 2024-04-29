/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        onyx: {
          50: "#f1f1f4",
          100: "rgb(227 227 232)",
          200: "rgb(200 198 210)",
          300: "rgb(175 173 190)",
          400: "rgb(148 144 167)",
          500: "rgb(120 116 144)",
          600: "rgb(96 93 117)",
          700: "rgb(75 72 91)",
          800: "rgb(52 50 63)",
          900: "rgb(31 30 38)",
          950: "rgb(28 27 34)",
        },
      },
      screens: {
        xs: "460px",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
