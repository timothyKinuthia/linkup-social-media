const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: 
        { comfotaar: ["Comfortaa", "cursive"] },
      colors: {
        cyan: colors.cyan,
        coolgray: colors.coolGray,
        bluegray: colors.blueGray,
        truegray: colors.trueGray,
        teal: colors.teal,
        lightblue: colors.lightBlue,
        orange: colors.orange,
        rose: colors.rose,
      },
      spacing: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "2/3": "66.666667%",
        "1/4": "25%",
        "2/4": "50%",
        "3/4": "75%",
        "1/5": "20%",
        "2/5": "405",
        "3/5": "60%",
        "4/5": "80%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
