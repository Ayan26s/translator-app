/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        righteous: ['Righteous', 'sans-serif'],
        russoOne: ['Russo One', 'sans-serif'],
        notoSansJP: ['"Noto Sans JP"', 'sans-serif'], // Fixed capitalization & added quotes
        shojumaru: ['Shojumaru', 'system-ui'],
      },
      // Deleted "translate: ['active']" - see explanation below
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          /* Chrome, Safari and Opera */
          '::-webkit-scrollbar': { display: 'none' },
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
        }
      }
      addUtilities(newUtilities)
    }
  ],
}