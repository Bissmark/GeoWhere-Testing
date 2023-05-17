/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", ],
  theme: {
    extend: {
      backgroundImage: {
        'home-picture': "url('./Earthview.jpg')",
      },
    },
    fontFamily: {
      'cagliostro': ['Cagliostro', 'sans-serif'],
    }
  },
  plugins: [],
}
