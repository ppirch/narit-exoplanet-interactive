/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ci: {
          white: '#F9F7F7',
          grey: '#DBE2EF',
          orange: {
            50: '#fef6ee',
            100: '#fee9d6',
            200: '#fbd0ad',
            300: '#f9af78',
            400: '#f58342',
            500: '#f26522',
            600: '#e34813',
            700: '#bc3412',
            800: '#962b16',
            900: '#792615',
            950: '#411009'
          },
          secondary: '#3F72AF',
          primary: '#112D4E',
          title: '#2e5481',
          content: '#333333'
        }
      }
    }
  },
  plugins: []
}
