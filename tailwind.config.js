/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // if you're using /app
  ],
  safelist: [
    {
      pattern: /^(text|bg|border)-(red|fuchsia|indigo|sky|cyan|violet|teal|emerald|lime|yellow|orange|rose|zinc)-(100|500|800)$/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
