const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    colors: {
      ...colors,
      gray: colors.zinc,
      blue: colors.sky,
    },
    extend: {},
  },
  plugins: [],
};
