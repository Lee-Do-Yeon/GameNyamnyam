/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, jsx}", 
    "./src/**/*"],
    theme: {
      extend: {
        fontFamily: {
          dish: ['OTWelcomeRA', 'sans-serif'],
        },
      }
    },
  plugins: [],
}
