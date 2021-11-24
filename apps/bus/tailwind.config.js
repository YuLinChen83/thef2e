const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  purge: createGlobPatternsForDependencies(__dirname),
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: { DEFAULT: "#4C546A", bg: '#5A637E', blue: "#5CBCDB", 'blue-dark': '#399BBA' },
        secondary: { yellow: "#EDBE62", red: "#F66A4B", blue: "#8B94B2", DEFAULT: "#BCC1D1", light: "#D8DAE0" },
        gray: { DEFAULT: "#B4B3B3", light: "#E5E5E5" }
      },
      dropShadow: {
        'logo': '0px 0px 12px rgba(255, 255, 255, 0.54)'
      },
      zIndex: {
        '999': 999
      },
      width: {
        'home-logo': '420px',
        25: '100px'
      },
      fontSize: {
        icon: '100px'
      },
      letterSpacing: {
        loose: '0.2em'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};