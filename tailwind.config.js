const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'light': colors.gray[200],
        'dark': colors.black,
        'green-0': '#5eead4',
        'red-0': '#fda4af',
      },
    },
  },
  plugins: [],
}
