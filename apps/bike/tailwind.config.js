const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: { 100: "#F3F3F3", 200: "#E7E7E7", 300: "#B9B9B9", 400: "#949494", DEFAULT: "#2B2B2B" },
        primary: { light: "#06B1A7", DEFAULT: "#007F77", dark: "#035A55", 10: 'rgba(0, 127, 119, 0.1)' },
        danger: { light: "#FEE8E8", DEFAULT: "#D12419" },
        warning: { light: "#F6ECD2", DEFAULT: "#E2A70D" },
        border: "#949494",
        auxiliary: { light: "#F5F7F9" }
      },
      boxShadow: {
        card: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        header: '0px 4px 5px 1px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};