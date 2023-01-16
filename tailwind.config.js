/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary-dark': '#6B9B37',
      'primary-medium': '#9CCC65',
      'primary-light': '#CFFF95',
      'primary-text': '#292524',
      'secondary-dark': '#1C1917',
      'secondary-medium': '#6366F1',
      'secondary-light': '#A5B4FC',
      'secondary-text': '#FFFFFF',
      'background': '#FAFDF7',
      'primary-light-30': '#DAFDBA',
      'primary-text-60': '#78716c',
      'primary-text-30': '#e7e5e4',
      'transparent': 'transparent',
      black: colors.black,
      white: colors.white,
      gray: colors.stone,
      red: colors.red,
      indigo: colors.indigo,
      yellow: colors.yellow,
      stone: colors.stone
    },
    extend: {
      fontFamily: {
        'sans': 'Inter',
        'mono': 'Ubuntu Mono'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
