/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html, js, jsx}", 
    "./src/**/*"],
    theme: {
      extend: {
        fontFamily: {
          dish: ['OTWelcomeRA', 'sans-serif'],
          dish2: ['establishRoomNo703OTF', 'sans-serif'],
          jamsil: ['TheJamsil5Bold', 'sans-serif'],
        },
      }
    },
  plugins: [],
}
