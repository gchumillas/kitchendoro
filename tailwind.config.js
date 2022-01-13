const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light': colors.white,
        'dark': colors.black
      },
    },
  },
  plugins: [],
}
