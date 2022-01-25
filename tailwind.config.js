const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        '6xl': 60
      },
      colors: {
        'light': colors.gray[200],
        'dark': colors.black,
        'green-0': '#6ee7b7',
        'red-0': '#fda4af',
      },
    },
  },
  plugins: [],
}
