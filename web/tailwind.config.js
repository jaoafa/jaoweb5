// https://tailwindcss.com/docs/configuration
const defaultTheme = require('tailwindcss/defaultTheme')
const sharedConfig = require('tailwind-config/tailwind.config')
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Noto Sans JP', ...defaultTheme.fontFamily.sans],
        accent: ['Lexend', 'sans-serif'],
      },
    },
  },
}
