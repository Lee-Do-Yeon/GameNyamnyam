/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, jsx}", 
    "./src/**/*"],
   theme: {
    extend: {
      fontFamily: {
        dishfont: ['OTWelcomeRA', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
