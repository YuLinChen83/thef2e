const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: { black: { 100: "#F3F3F3", 200: "#E7E7E7", 300: "#B9B9B9", DEFAULT: "#2B2B2B" } },
    extend: {
      colors: {
        primary: { light: "#06B1A7", DEFAULT: "#007F77", dark: "#035A55" },
        danger: { light: "#FEE8E8", DEFAULT: "#D12419" },
        warning: { light: "#F6ECD2", DEFAULT: "#E2A70D" },
        border: "#949494",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};