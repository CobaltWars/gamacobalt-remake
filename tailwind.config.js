module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "blue-dark": {
          900: "#0a192f",
          800: "#112240",
          700: "#233554",
        },
        "blue-white": {
          100: "#e6f1ff",
          200: "#ccd6f6",
          300: "#a8b2d1",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};