module.exports = {

  content: ["./src/**/*.{html,ts}"],


  theme: {
    extend: {
      opacity: ['disabled'],
      backgroundColour: ['dasabled']
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
