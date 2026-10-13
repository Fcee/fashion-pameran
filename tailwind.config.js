/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 3 Base Colors as per requirement: Noir, Ivory, and Champagne
        noir: {
          DEFAULT: '#141413',
          light: '#242422',
          muted: '#5A5852',
          border: '#383632',
        },
        ivory: {
          DEFAULT: '#F7F4EE',
          surface: '#FFFFFF',
          subtle: '#EFECE4',
          border: '#E2DED5',
        },
        champagne: {
          DEFAULT: '#B89563',
          light: '#CFB184',
          dark: '#967442',
          subtle: '#F4ECE0',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        ultra: '0.28em',
      },
    },
  },
  plugins: [],
}

