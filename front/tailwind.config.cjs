/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, jsx}", 
    "./src/**/*"],
    theme: {
      extend: {
        fontFamily: {
          jamsil: ['TheJamsil5Bold', 'sans-serif'],
          detail: ['SUIT-Regular'],
        },
      }
    },
  plugins: [],
}