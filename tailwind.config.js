const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light': colors.gray[200],
        'dark': colors.black
      },
    },
  },
  plugins: [],
}
